var fs = require('fs')
var merge = require('deepmerge')

const allPackages = (packages_file) => {
  try {
    return JSON.parse(fs.readFileSync(packages_file).toString())
  } catch (err) {
    return {}
  }
}
const clearAllPackages = (packages_file) => {
  try {
    return fs.unlinkSync(packages_file)
  } catch (err) {
    return false
  }
}

const addPackage = (packages_file, opts) => {
  var old_packages_file = allPackages(packages_file)
  var new_packages_file = merge(old_packages_file, {[opts.package]: {
    [opts.version]: opts.hash
  }})
  return fs.writeFileSync(packages_file, JSON.stringify(new_packages_file, null, 2))
}

module.exports = {
  allPackages: allPackages,
  clearAllPackages: clearAllPackages,
  addPackage: addPackage
}

