# Custom npm Package

## Creating a Custom npm Package

From the project's root folder, execute:

```
npm init --yes
```

Change the `package.json` to the following:

```json
{
    "name": "YourPackageName",
    "version": "1.0.0",
    "description": "An example npm package that does nothing",
    "main": "index.js",
    "author": "Some Body"
}
```



## Making Your Project an npm Package

**Important**: The js file used as `main` file **must** contain

`module.exports = the functions to export` .

From the project's root folder, where the `package.json` should be, pack it to a tarball:

```
npm pack [YourPackageName]
```

*Et voila*, you have created your own npm package!



## Consume an npm Package

Install the custom package as a tarball file:

```
npm install [local/or/network/path/to/package.tgz | url/to/package.tgz]
```

**Deinstallation**

```
npm uninstall [YourPackageName]
```



