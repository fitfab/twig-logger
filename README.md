## Logger Dashboard -- Parcel Bundler, Reactjs and Typescript

### front-end setup with Babel 7

[More information for Upgrade to Babel 7](https://babeljs.io/docs/en/v7-migration)

install these packages:

`yarn add @babel/core @babel/preset-env @babel/preset-react --dev`

Set the `.babelrc` file as shown below:

```js
{
    "presets": ["@babel/env", "@babel/preset-react"]
}
```

### Typescript minimal config

_tsconfig.js_

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "allowSyntheticDefaultImports": true,
    "jsx": "react"
  },
  "exclude": ["node_modules", "dist", "jest"]
}
```
