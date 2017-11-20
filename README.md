<img src="http://bit.ly/2mxmKKI" width="500" alt="Hapiness" />

<div style="margin-bottom:20px;">
<div style="line-height:60px">
    <a href="https://travis-ci.org/hapinessjs/quick-start.svg?branch=master">
        <img src="https://travis-ci.org/hapinessjs/quick-start.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/hapinessjs/quick-start?branch=master">
        <img src="https://coveralls.io/repos/github/hapinessjs/quick-start/badge.svg?branch=master" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/hapinessjs/quick-start">
        <img src="https://david-dm.org/hapinessjs/quick-start/status.svg" alt="dependencies"/>
    </a>
    <a href="https://david-dm.org/hapinessjs/quick-start?type=dev">
        <img src="https://david-dm.org/hapinessjs/quick-start/dev-status.svg" alt="devDependencies" />
    </a>
</div>
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://hapijs.com">
        <img src="http://bit.ly/2lYPYPw"
             align="right" alt="Hapijs logo" width="75" style="border:none;" />
    </a>
</div>
</div>

# Hapiness Quick Start Project

Quick start project to create a [Hapiness](https://github.com/hapinessjs/hapiness) application with all its [features](https://github.com/hapinessjs/hapiness/blob/master/API.md).

## Table of contents

* [Starter](#starter)
* [Folders](#folders)
* [Files](#files)
    * [Typescript configuration files](#typescript-configuration-files)
    * [Typescript validation](#typescript-validation)
    * [NPM](#npm)
    * [Package definition](#package-definition)
    * [NVM](#nvm)
* [Development](#development)
    * [Modules](#modules)
    * [Services](#services)
    * [Routes](#routes)
    * [Libraries](#libraries)
    * [Tests](#tests)
* [Deployment](#deployment)
* [Change History](#change-history)
* [Maintainers](#maintainers)
* [License](#license)

## Starter

Download this [starter](https://github.com/hapinessjs/quick-start/releases/tag/v1.2.0) and change `hapinessjs/quick-start` and `@hapiness/quick-start`, according **your module name and repository**, in these files:
* `package.json`
* `README.md`

In `README.md`, you need to update the documentation to explain what's your module and what it does.

Delete `.travis.yml` if you don't want to have [travis-ci](https://travis-ci.org) integration. 

[Back to top](#table-of-contents)

## Folders

All **files** for your application will be in **`src`** folder and wrote in `Typescript`. 

All **tests files** for your module will be in **`test`** folder and wrote in `Typescript` too.
* **Unit** tests will be in `test/unit` folder 
* **Integration** tests will be in `test/integration` folder

All **packaging files** for your module will be in **`tools`** folder and wrote in `Typescript` too.

[Back to top](#table-of-contents)

## Files

### Typescript configuration files

`tsconfig.json` is used for **development** process and  `tsconfig.build.json` is used for **build** process.

In both case, add externals types from `@types/{...}` inside `compilerOptions.types` array.
 
### Typescript validation

`tslint.json` contains all rules for `Typescript` validation during `pretest` process.

### NPM

`yarn.lock` contains fixed packages' versions for all `node_modules` used in your module.
 
 Use it to install modules :
 
 ```bash
 $ yarn install
 ```
 
 We use `bunyan` for logger format output and installation with `yarn` failed so we need to use latest `npm` version to install all packages.
 
### Package definition

`package.json` contains your module definition with **name**, **description**, **scripts**, **dependencies**, etc.

To install existing or new dependencies use `npm`.

In `scripts` part, you have all needed scripts to work. All scripts reference elements in `Makefile`.

[Back to top](#table-of-contents)

### NVM

If you want to use `nvm`, install `node` version according `.nvmrc` file and type:

```bash
$ cd path/to/hapiness/application
$ nvm use
```

[Back to top](#table-of-contents)

## Development

All your application's contents must be inside `src` folder.

Each folder must have a `barrels` index file.

We have a convention name for each files so follow this guideline to be ok with the next `hapiness-cli`

To have **live reload** during development, just execute:


```bash
$ cd path/to/hapiness/application

$ yarn run dev:watch

or

$ npm run dev:watch
```

You can organize your application by **modules** or write **services**, **routes** and/or **libraries** in the root folder of your application.

### Modules

If you want to organize your application by **modules**, you need to follow the guideline of [@hapiness/empty-module](https://github.com/hapinessjs/empty-module) project.

### Services

All **services** files must be inside `src/services/{my-service}` folder and named `{my-service}.service.ts`. Class will be `{MyService}Service`.

**Service** needs to have `@Inject()` **decorator** and be added inside **module** `metadata`'s **providers** array.

Export it with `barrels` index at the root of `src/services`.

You can organize **services** by **features** and create folders for that. Don't forget to create `barrels` index for each folder.

### Routes

All **routes** files must be inside `src/routes` folder and organize by **resources**. In each resource folder, you need to create `barrels` index and  **method** folder. In each method folder, you need to create `barrels` index and **type** file named `{type}.route.ts`. Class will be `{MethodTypeResource}Route`.

**Route** needs to have `@Route({...})` **decorator** and be added inside **module** `metadata`'s **declarations** array.

Export it with `barrels` index at the root of `src/routes`.

Example of path for the route to get one user :

```bash
$ src/routes/user/get/one.route.ts
```

Implementation of the route will be :

```javascript
@Route({
    path: '/user/{id}',
    method: 'GET'
})
export class GetOneUserRoute implements OnGet {}
```

### Libraries

All **libraries** files must be inside `src/libraries` folder and named `{my-library}.library.ts`. Class will be `{MyLibrary}Library`.

**Library** needs to have `@Lib()` **decorator** and be added inside **module** `metadata`'s **declarations** array.

Export it with `barrels` index at the root of `src/libraries`.

You can organize **libraries** by **features** and create folders for that. Don't forget to create `barrels` index for each folder.

### Tests

You must **unit** test each **service**, **route** and **library**.

Your **application** and **services** must be tested with an **integration** in `Hapiness` server application.

Each file name will be suffixed by `test`: `{my-module}.module.test.ts`, `{my-service}.service.test.ts`, `{resource}.{method}.route.test.ts` or `{my-library}.library.test.ts`.

Classes will be suffixed by `Test`: `{MyModule}ModuleTest`, `{MyService}ServiceTest`, `{MethodResource}RouteTest` or `{MyLibrary}LibraryTest`.

To **run** your tests, just execute:

```bash
$ cd path/to/hapiness/application

$ yarn run test

or

$ npm run test
```

**Coverage** result will be inside `./coverage/lcov-report` folder. Just open the folder in your browser to see the result.

[Back to top](#table-of-contents)

## Deployment

Build your project:

```bash
$ cd path/to/hapiness/application

$ yarn run build

or

$ npm run build
```

Packaging will be created inside `dist` folder. You must to **publish only the content of this folder**.

[Back to top](#table-of-contents)

## Change History

* v1.1.0 (2017-11-20)
    * Latest packages' versions.
    * Documentation.
    * Change packaging process.
* v1.1.0 (2017-11-14)
    * Create `quick-start` **application**.
    * Create **tests** for each component.
    * Application **guideline** style.
    * Lettable `Observable` form `RxJS`
    * Integration of [http-server](https://github.com/hapinessjs/hapiness/tree/master/src/extensions/http-server) extension, [config](https://github.com/hapinessjs/config) library, [biim](https://github.com/hapinessjs/error) library, [logger](https://github.com/hapinessjs/logger-module) module, [swag](https://github.com/hapinessjs/swag-module) module and [http](https://github.com/hapinessjs/http-module) module.
    * Documentation
    
[Back to top](#table-of-contents)

## Maintainers

<table>
    <tr>
        <td colspan="4" align="center"><a href="https://www.tadaweb.com"><img src="http://bit.ly/2xHQkTi" width="117" alt="tadaweb" /></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil"><img src="https://avatars3.githubusercontent.com/u/6546204?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/antoinegomez"><img src="https://avatars3.githubusercontent.com/u/997028?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/reptilbud"><img src="https://avatars3.githubusercontent.com/u/6841511?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/njl07"><img src="https://avatars3.githubusercontent.com/u/1673977?v=3&s=117" width="117"/></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil">Julien Fauville</a></td>
        <td align="center"><a href="https://github.com/antoinegomez">Antoine Gomez</a></td>
        <td align="center"><a href="https://github.com/reptilbud">Sébastien Ritz</a></td>
        <td align="center"><a href="https://github.com/njl07">Nicolas Jessel</a></td>
    </tr>
</table>

[Back to top](#table-of-contents)

## License

Copyright (c) 2017 **Hapiness** Licensed under the [MIT license](https://github.com/hapinessjs/empty-module/blob/master/LICENSE.md).

[Back to top](#table-of-contents)