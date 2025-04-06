import fs from 'node:fs';
import yaml from 'js-yaml';

const replaceEnvVariables = (config: any): any => {
  if (typeof config === 'string') {
    // Reemplaza variables de entorno en cadenas
    return config.replace(/\$\{(\w+)\}/g, (_, envVar) => process.env[envVar] || '');
  } else if (Array.isArray(config)) {
    // Reemplaza variables de entorno en arrays
    return config.map(replaceEnvVariables);
  } else if (typeof config === 'object' && config !== null) {
    // Reemplaza variables de entorno en objetos
    for (const key in config) {
      config[key] = replaceEnvVariables(config[key]);
    }
  }
  return config;
};

const loadConfig = async (configPathOrData: string | object) => {
  let config;
  
  if (typeof configPathOrData === 'string') {
    const content = fs.readFileSync(configPathOrData, 'utf8');
    if (configPathOrData.endsWith('.yaml') || configPathOrData.endsWith('.yml')) {
      return yaml.load(content);
    }
    return content;
  }

  // Reemplaza las variables de entorno en el contenido cargado
  return replaceEnvVariables(config);
};

export default loadConfig;
