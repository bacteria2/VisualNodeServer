var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(__dirname, "../lib/"), err => {
  if (err) throw err
  console.log(chalk.cyan('  clean complete.\n'))
  spinner.stop()
})