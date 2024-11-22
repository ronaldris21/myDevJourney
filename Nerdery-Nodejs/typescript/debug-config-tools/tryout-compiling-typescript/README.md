# Compiling TypeScript

## Installing and Running the Completed Package

1. OPTIONAL - Install the TypeScript compiler globally (local install is also possible):
`npm install -g typescript`

2. Install this package with Git:
`git clone git@github.com:danielstern/compiling-typescript.git`

3. Install local packages with `npm`:
`npm install`

4. Run TypeScript compilation and start the server simultaneously with:
`npm start`

## Exploring the Project

### /public

Contains HTML file which is served to the user - aggregates references to generated .js files.

### /src

Contains the non-compiled TypeScript code. This code becomes JavaScript that the browser can work with.

### build Typescript files on project only

`tsc --p ./server/tsconfig.json`

<!-- Encontrado en: https://github.com/danielstern/compiling-typescript.git -->

### .vscode/task.json       --- MINIMAL SAMPLE

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Ris tsc: build - server/tsconfig.json",
      "type": "shell",
      "command": "tsc",
      "args": ["-p", "server/tsconfig.json", "--watch"],
      "problemMatcher": ["$tsc"],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "options": {
        "cwd": "${workspaceFolder}"
      }
    }
  ]
}

```

### tsconfig references

/tsconfig.json

```json

{
  "extends": "./tsconfig-base.json",
  "references": [
    {
      "path": "./server"
    }
  ]
}

```

/tsconfig-base.json

```json
//original

```

/server/tsconfig.json

```json
{
  "extends": "./../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "./../build/server",
    "composite": true
  }
}


```
