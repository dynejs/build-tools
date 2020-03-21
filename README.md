# Build tools
It's a simple webpack config wrapper with predefined loaders and configuration to compile js and vue files.

## Usage
```js
const builder = require('@dyne/build-tools')

module.exports = builder({
    'my-awesome-file': 'src/index.js'
})
```

Builder second argument is the target directory, which is `public` by default

## Features
- compile js and vue files
- extract sass and css files from source to a separate file
- production build hash in filenames
- make manifest json with references for the built files
