
# Setup inicial 📝  




## Pasos  


- Crear carpeta del proyecto
- Inicializar proyecto con npm
~~~bash
npm init -y
~~~~
- [Inicializar git] (https://gitignore.io/)

### Crear archivos de configuración (Extensión EditorConfig for VS Code)
### VER ERRORES DEL CODIGO (Extensión ESLINT)
- config .editorconfig
~~~code
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.js]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
~~~~

- .eslintrc.json
~~~code
{
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-console": "warn"
  }
}
~~~~
- Crear archivo index.js
- Crear scripts dentro del package.json
~~~~code
"scripts": {
    "dev": "nodemon index.js",
    "start" : "node index.js",
    "lint" : "eslint",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
~~~~
- Instalar dependencias
~~~bash
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
~~~~
- Probar entornos desde los scripts npm
~~~~
nodemon index.js
~~~~


#EMPEZANDO
~~~~bash
npm i express
~~~~


~~~~javascript
const express = require("express");
const app = express();
const port = 3002;

///USO DE JSON
app.use(express.json());

~~~~

## Badges  
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://choosealicense.com/licenses/gpl-3.0/)  
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](https://choosealicense.com/licenses/gpl-3.0/)  