var IPFSApi = require('ipfs-api')
var path = require('path')

const unify = (name, version) => {
  return name + '@' + version
}

const findHashFromName = (hashes, name) => {
  var to_return = null
  hashes.forEach((hash) => {
    if (hash.Name === name) {
      to_return = hash.Hash
    }
  })
  return to_return
}

const addToIPFS = (directory, pkg_name, callback) => {
  const ipfs = new IPFSApi('localhost', '5001')
  ipfs.add(directory, {recursive: true}, (err, res) => {
    if (err) {
      throw new Error(err)
    }
    callback(findHashFromName(res, pkg_name))
  })
}

module.exports = (args) => {
  const pkg_json = require(process.cwd() + '/package.json')
  const pkg_name = pkg_json.name
  const pkg_version = pkg_json.version
  console.log('Publishing ' + unify(pkg_name, pkg_version))
  addToIPFS('.', pkg_name, console.log)
}
