# tinted-bitmap #

creates a tinted copy of a given HTML Image

**NPM users**: please consider the [Github README](https://github.com/rozek/tinted-bitmap/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), such that I know which of my repositories to take most care of.

## Installation ##

`tinted-bitmap` may be used as an ECMAScript module (ESM), a CommonJS or AMD module or from a global variable.

You may either install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install tinted-bitmap
```

or load the plain script file directly (Browsers automatically get the bundled version, thus, the module's dependency [javascript-interface-library](https://github.com/rozek/javascript-interface-library) does not have to be loaded separately)

```
<script src="https://unpkg.com/tinted-bitmap"></script>
```

## Access ##

How to access the package depends on the type of module you prefer

* ESM (or Svelte): `import { tintedBitmap, tintedBitmapAsURL } from 'tinted-bitmap'`
* CommonJS: `const tintedBitmap = require('tinted-bitmap')`
* AMD: `require(['tinted-bitmap'], (tintedBitmap) => {...})`

Alternatively, you may access the global variable `tintedBitmap` directly.

Note for ECMAScript module users: all module functions and values are exported individually, thus allowing your bundler to perform some "tree-shaking" in order to include actually used functions or values (together with their dependencies) only.

## Usage within Svelte ##

For Svelte it is recommended to import the package within a module context:

```
<script context="module">
  import { tintedBitmapAsURL } from 'tinted-bitmap'
</script>

<script>
  let originalImage, tintedImageURL

  function tintOriginalImage () {
    tintedImageURL = tintedBitmapAsURL(originalImage,'limegreen')
  }

  $: if (originalImage != null) {
    if (originalImage.complete) {
      tintOriginalImage()
    } else {
      originalImage.addEventListener('load', tintOriginalImage)
    }
  }
</script>

<img bind:this={originalImage} style="vertical-align:middle" alt="original" src="..."/>
&nbsp; ➔ &nbsp;
<img style="vertical-align:middle" src={tintedImageURL} alt="tinted"/>
```

You will find this example in a [Svelte REPL](https://svelte.dev/repl/2cee91ac75a74bc18f77e94f28e0c16d) - feel free to play with it!

## Usage as ECMAscript Module ##

If you prefer ESMs, you will presumably also use a bundler (such as [rollup](https://rollupjs.org/guide/en/) or [webpack](https://webpack.js.org/)) to resolve any transitive dependencies and perform some "tree-shaking" to eliminate unnecessary parts (`tinted-bitmap` is fully tree-shakable). In this case, just import what you need and use it - your bundler will do the rest:

```
<script>
  import { tintedBitmapAsURL } from 'tinted-bitmap'

  window.onload = function () {
    let originalImage = document.getElementById('originalImage')
    let tintedImage   = document.getElementById('tintedImage')

    tintedImage.src = tintedBitmapAsURL(originalImage,'limegreen')
  }
</script>
<body>
  <img id="originalImage" style="vertical-align:middle" src="..."/>
  <img id="tintedImage"   style="vertical-align:middle"/>
</body>
```

## Usage as CommonJS or AMD Module (or as a global Variable) ##

Let's assume that you already "required" or "imported" (or simply loaded) the module according to your local environment. In that case, you may use it as follows:

```
<script>
  const { tintedBitmapAsURL } = tintedBitmap

  window.onload = function () {
    let originalImage = document.getElementById('originalImage')
    let tintedImage   = document.getElementById('tintedImage')

    tintedImage.src = tintedBitmapAsURL(originalImage,'limegreen')
  }
</script>
<body>
  <img id="originalImage" style="vertical-align:middle" src="..."/>
  <img id="tintedImage"   style="vertical-align:middle"/>
</body>
```

## Example ##

An example is available on the Svelte REPL - feel free to play with it!

* [tinted-bitmap](https://svelte.dev/repl/2cee91ac75a74bc18f77e94f28e0c16d)

## Background Information ##

Sometimes it is necessary to draw a given (often b/w) raster image in a different color. `tinted-bitmap` performs the necessary "tinting" of such a bitmap and may construct either the data URL for the result (which is often preferred as it may be directly assigned to the `src` attribute of a given HTML image element) or the result itself (as an instance of `HTMLImageElement`)

### JavaScript API ###

This package offers the following named JavaScript exports (function signatures are given with TypeScript type annotations, JavaScript programmers may just ignore them):

* **`tintedBitmap (Bitmap:HTMLImageElement, TintColor:string):HTMLImageElement`** <br> `tintedBitmap` takes a given HTML image element "`Bitmap`" (which must be `complete`, i.e. fully loaded), uses its alpha channel to create another image in the given `TintColor` (which must be a valid CSS color specification) and returns that image as an `HTMLImageElement`
* **`tintedBitmapAsURL (Bitmap:HTMLImageElement, TintColor:string):string`** <br> `tintedBitmapAsURL` takes a given HTML image element "`Bitmap`" (which must be `complete`, i.e. fully loaded) and uses its alpha channel to create another image in the given `TintColor` (which must be a valid CSS color specification). The contents of that bitmap are returned as a data URL

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/tinted-bitmap/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
