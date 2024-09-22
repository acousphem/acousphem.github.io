import CitationJS from 'citation-js'
import { visit } from 'unist-util-visit'
import fs from 'fs/promises'
import path from 'path'

export function remarkBibliography() {
  return async (tree, file) => {
    const citations = new Set()
    let bibliography

    // Cargar el archivo .bib
    if (file.data.astro.frontmatter.bibliography) {
      const bibPath = path.join(process.cwd(), 'src', 'data', file.data.astro.frontmatter.bibliography)
      try {
        const bibContent = await fs.readFile(bibPath, 'utf-8')
        bibliography = new CitationJS(bibContent)
      } catch (error) {
        console.error(`Error loading bibliography file: ${error.message}`)
        return
      }
    }

    if (!bibliography) return

    // Procesar citas en el contenido
    visit(tree, 'text', (node) => {
      const regex = /@(\w+)/g
      let match
      while ((match = regex.exec(node.value)) !== null) {
        citations.add(match[1])
      }
    })

    // Reemplazar citas con enlaces
    visit(tree, 'text', (node) => {
      node.value = node.value.replace(/@(\w+)/g, (_, key) => {
        const entry = bibliography.data.find(item => item.id === key)
        if (entry) {
          return `<a href="#${key}" class="citation">[${Array.from(citations).indexOf(key) + 1}]</a>`
        }
        return `@${key}`
      })
    })

    // Añadir la bibliografía al final del documento
    if (citations.size > 0) {
      const bibItems = Array.from(citations).map((key, index) => {
        const entry = bibliography.data.find(item => item.id === key)
        if (entry) {
          const formatted = bibliography.format('bibliography', {
            format: 'html',
            template: 'apa',
            entry: [key]
          })
          return `<li id="${key}">[${index + 1}] ${formatted}</li>`
        }
        return ''
      }).join('')

      // Crear un nuevo nodo para la bibliografía
      const bibliographyNode = {
        type: 'html',
        value: `<h2>Bibliografía</h2><ol class="bibliography">${bibItems}</ol>`
      }

      // Añadir el nodo de bibliografía al final del árbol
      tree.children.push(bibliographyNode)
    }
  }
}