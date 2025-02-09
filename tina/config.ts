import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/src/assets/",
      publicFolder: "/",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/post",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Subtitle",
            required: false,
          },
          {
            type: "image",
            name: "image",
            label: "Hero Image",
            required: true,
          },
          {
            type: 'datetime',
            name: 'publishDate',
            label: 'Date',
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,  // Esto permite múltiples entradas
            required: false,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Is a Draft?'
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});