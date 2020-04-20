# Funkly

Funkly is a block-based visual programming language. Its purpose is to teach children functional programming by offering an interface where one can build games and other programs using blocks. It is modelled after MIT's Scratch but whereas Scratch teaches imperative programming, Funkly aims to teach functional programming. Like Scratch, Funkly is built on top of Google's Blockly library.

- [Scratch](http://scratch.mit.edu)
- [Blockly](https://developers.google.com/blockly)

## Project

### Deployed environments

- [Staging](http://staging-funkly.herokuapp.com/)
- [Funkly in Heroku](http://funkly.herokuapp.com/)

### Task boards

* [Product backlog](https://github.com/funktionaalinen-graafinen-kieli/backlogs/projects/1)
* [Sprint backlog - old](https://github.com/funktionaalinen-graafinen-kieli/backlogs/projects/3)

## How to use

### Installing 
- `git clone https://github.com/funktionaalinen-graafinen-kieli/funkly` to get the sources
- `npm install` to install dependencies

### Running

- `npm start` serves the project on localhost

### Configuration
TODO: is this actually something anyone does / should do?
- Change available Blockly-blocks in Editor's render method. List of blocks by type can be found _here_ https://github.com/google/blockly/tree/master/blocks

## Development

### Architecture / file structure

TODO: add contents

### Testing

#### Running
- `npm test` runs tests using jest as the testrunner. Edit package.json's `test` script if you want to run tests in watch mode

#### Writing

- Writing tests is done using __tests__ folders adjacent to the files to be tested. See example
- root_folder
    - example.tsx
    - __tests__
	- example_test.js
- Recommended way is to write tests with Javascript, even for typescript and JSX / TSX files.

### Licence
MIT License
