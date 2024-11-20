# 1. Create project

```bash
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```

npm install nodemon --save-dev

# 2. Run selected package json file

 ```bash
npm run dev
```

# 3. Interesting facts

## Emitting error

Compile ts code into js

 ```bash
tsc  hello.ts
```

## CONSTANTLY COMPILING AND EXECUTING LIVE CHANGES

On package js, add the following property on the scripts.

 ```bash
    "dev": "nodemon --watch src --exec ts-node src/intro.ts"
```

## Emitting error

To reiterate from earlier, type-checking code limits the sorts of programs you can run, and so there’s a tradeoff on what sorts of things a type-checker finds acceptable. Most of the time that’s okay, but there are scenarios where those checks get in the way. For example, imagine yourself migrating JavaScript code over to TypeScript and introducing type-checking errors. Eventually you’ll get around to cleaning things up for the type-checker, but that original JavaScript code was already working! Why should converting it over to TypeScript stop you from running it?

 ```bash
tsc --noEmitOnError hello.ts
```

## Compiling files on tsconfig.json

 ```json
 {
  "compilerOptions": {
   //...
  },
  "files": ["./src/classes.ts", "./src/intro.ts"]
}

```

This way I only have to run tsc command

## strictNullChecks
When type checking, take into account 'null' and 'undefined'.

 ```typescript
//strictNullChecks: TRUE ono tsconfig.json
// someValue = null; ///ERROR!
// someValue = undefined; ///ERROR!

let someVal: number|string|null;
someVal = null;
```

