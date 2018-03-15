#!/usr/bin/env node
let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs-extra')
let templates = require('./src/templates')

let appName = process.argv[2]
let appDirectory = `${process.cwd()}/${appName}`

const devDependencies = ['redux-devtools-extension', 'standard', 'why-did-you-update']

const packages = [
  'redux', 'reduxsauce', 'react-redux', 'redux-saga', 'redux-persist',
  'redux-logger', 'reselect', 'apisauce', 'normalize.css', 'prop-types',
  'ramda', 'react-grid-system', 'react-helmet', 'react-loadable',
  'react-router-dom', 'react-snapshot', 'seamless-immutable', 'styled-components'
]

const createReactApp = () => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`create-react-app ${appName}`, () => {
        console.log('Created react app')
        resolve(true)
      })
    } else {
      console.log('\nNo app name was provided.'.red)
      console.log('\nProvide an app name in the following format: ')
      console.log('\ignite-react-app ', 'app-name\n'.cyan)
      resolve(false)
    }
  })
}

const cdIntoNewApp = () => {
  return new Promise(resolve => {
    shell.exec(`cd ${appName}`, () => { resolve() })
  })
}

const installDevDependencies = () => {
  return new Promise(resolve => {
    console.log('\nInstalling dev dependencies\n'.cyan)

    shell.exec(`npm install --save-dev ${devDependencies.join(' ')}`, () => {
      console.log('\nFinished installing dev dependencies\n'.green)
      resolve()
    })
  })
}

const installPackages = () => {
  return new Promise(resolve => {
    console.log('\nInstalling packages\n'.cyan)

    shell.exec(`npm install --save ${packages.join(' ')}`, () => {
      console.log('\nFinished installing packages\n'.green)
      resolve()
    })
  })
}

const updateTemplates = () => {
  return new Promise(resolve => {
    let promises = []
    templates.forEach(folder => {
      const { folderName, files } = folder
      files.forEach((file, i) => {
        promises[i] = new Promise(res => {
          const { fileName, fileContent } = file
          if (folderName === 'root') {
            fs.writeFile(`${appDirectory}/src/${fileName}`, fileContent, function (err) {
              if (err) { return console.log(err) }
              res()
            })
          } else {
            fs.ensureDir(`${appDirectory}/src/${folderName}`)
            .then(() => {
              fs.writeFile(`${appDirectory}/src/${folderName}/${fileName}`, fileContent, function (err) {
                if (err) { return console.log(err) }
                res()
              })
            })
            .catch(err => {
              if (err) { return console.log(err) }
            })
          }
        })
      })
    })
    Promise.all(promises).then(() => { resolve() })
  })
}

const run = async () => {
  let success = await createReactApp()
  if (!success) {
    console.log('Something went wrong while trying to create a new React app using create-react-app'.red)
    return false
  }
  await cdIntoNewApp()
  await installDevDependencies()
  await installPackages()
  await updateTemplates()
  console.log(`\nTo start run cd ${appName} && yarn start`.green)
  console.log(`Or cd ${appName} && npm start`.green)
  console.log('All done! Hack away'.green)
  console.log('🔥'.repeat(10))
}
run()
