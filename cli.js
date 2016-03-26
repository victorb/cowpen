#! /usr/bin/env node

const cmd = (args, command) => {
  if (args[2] === command) {
    require('./cli/' + command)(args)
  }
}

const argv = process.argv

if (argv[2] === undefined) {
  argv[2] = 'help'
}

cmd(argv, argv[2])
