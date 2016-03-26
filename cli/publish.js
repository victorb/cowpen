var IPFSApi = require('ipfs-api')

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

module.exports = (args) => {
  const pkg_json = require(process.cwd() + '/package.json')
  const pkg_name = pkg_json.name
  const pkg_version = pkg_json.version
  console.log('Publishing ' + unify(pkg_name, pkg_version))

  const ipfs = new IPFSApi('localhost', '5001')
  ipfs.add('.', {recursive: true}, (err, res) => {
    if (err) {
      throw new Error(err)
    }
    console.log(findHashFromName(res, pkg_name))
  })
}
