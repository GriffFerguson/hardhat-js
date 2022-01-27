#! /bin/env node

const childProcess = require('child_process')
const path = require('path')
const { Command } = require('commander');
const program = new Command();

function run(script, callback) {
    var completed = false;

    var process = childProcess.fork(script)

    process.on('error', err => {
        if (!completed) {
            console.log(err)
            completed = true;
        }
    })

    process.on('exit', err => {
        if (!completed) {
            console.log('Completed process')
            completed = true
        }
    })
}

program
    .version('0.0.1')
    .description('CLI for Flatpack')

program
    .command('build')
    .description('build the website into the specified folder')
    .action(() => {
        console.log('Starting build script...')
        run('node_modules/flatpack/lib/build.js')
    })
    
program
    .command('serve')
    .description('start the development server')
    .action(() => {
        console.log('Starting build server...')
        run('node_modules/flatpack/lib/server.js')
    })

program.parse(process.argv)