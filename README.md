# generator-dx-generator 

> Yeoman generator generating a Yeoman generator for my own style ( generate project from a remote seed project. you can maintain the seed project apart from the generator )


## Getting started

- Install: `npm install -g generator-dx-generator`
- Run: `yo dx-generator`


## Commands

* `yo dx-generator` shows a wizard for generating a new generator
* `yo dx-generator:subgenerator <name>` generates a subgenerator with the name `<name>`


## What do you get?

Scaffolds out a complete generator directory structure for you:

```
.
├── generators/
│   └── app/
│       ├── index.js
│       │── logger.js
│       │── utils.js
│       └── templates/
│           └── dummyfile.txt
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .eslintrc
├── .travis.yml
├── .yo-rc.json
├── package.json
├── gulpfile.js
├── README.md
├── LICENSE
└── test/
    └── app.js
```


### Running tests

Run `npm test` to run your test suite.

Test generated codes will locate at `./temp` directory

