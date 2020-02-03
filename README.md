## README 

# Deployed environments

- [staging](http://staging-funkly.herokuapp.com/)
- [Latest "stable"](http://funkly.herokuapp.com/)

# Task boards

* [Sprint backlog](https://github.com/funktionaalinen-graafinen-kieli/backlogs/projects/3)
* [Product backlog](https://github.com/funktionaalinen-graafinen-kieli/backlogs/projects/1)

# Usage

## Installing 
- - `git clone https://github.com/funktionaalinen-graafinen-kieli/funkly` to get the sources
- Need to have npm installed 
- `npm install` to install dependencies
## Running

- `npm start` serves the project on localhost

## Configuration

- Change available Blockly-blocks in Editor's render method. List of blocks by type can be found _here_ https://github.com/google/blockly/tree/master/blocks

# Development

## Logging
 - Use loglevel for logging (https://github.com/pimterry/loglevel) instead of console.log (it supports log levels and is syntactically almost as low-effort).
    ```
    import * as log from "loglevel"
    log.warn("ultra-compatible")
    log.trace("an unimportant trace message")
    ```

## Testing

### Running
- `npm test` runs tests using jest as the testrunner. Edit package.json's `test` script if you want to run tests in watch mode

### Writing

- Writing tests is done using __tests__ folders adjacent to the files to be tested. See example
- root_folder
    - example.tsx
    - __tests__
	- example_test.js
- Recommended way is to write tests with Javascript, even for typescript and JSX / TSX files.


