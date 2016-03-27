var IPFSApi = require('ipfs-api')
var path = require('path')
var mkdirp = require('mkdirp')
var packages = require('../lib/packages')

const COWPEN_PATH = '/Users/victor/.cowpen'
const COWPEN_PACKAGES_PATH = COWPEN_PATH + '/packages.json'

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

const addToIPFS = (directory, include_hidden, callback) => {
  const ipfs = new IPFSApi('localhost', '5001')
  ipfs.add(directory, {recursive: true, hidden: include_hidden}, (err, res) => {
    if (err) {
      throw new Error(err)
    }
    callback(res)
  })
}

const publishToIPFS = (hash, callback) => {
  const ipfs = new IPFSApi('localhost', '5001')
  ipfs.name.publish(hash, {recursive: true}, (err, res) => {
    if (err) {
      throw new Error(err)
    }
    callback(res.Name, res.Value)
  })
}

const addToPublicIndex = (packages_path, hash, pkg_json, callback) => {
  const opts = Object.assign({}, pkg_json, {hash})
  packages.addPackage(packages_path, opts)
  callback()
}

module.exports = (args) => {
  mkdirp.sync(COWPEN_PATH)
  const pkg_json = require(process.cwd() + '/package.json')
  const pkg_name = pkg_json.name
  const pkg_version = pkg_json.version
  console.log('Publishing ' + unify(pkg_name, pkg_version))
  addToIPFS(process.cwd(), false,(res) => {
    const hash = findHashFromName(res, pkg_name)
    console.log('Added to IPFS, got hash ' + hash)
    addToPublicIndex(COWPEN_PACKAGES_PATH, hash, pkg_json, () => {
      console.log('Added package to packages.json, adding to IPFS')
      addToIPFS(COWPEN_PATH, true, (res) => {
        const index_hash = findHashFromName(res, path.basename(COWPEN_PATH))
        console.log('Added to packages.json. Got hash ' + index_hash + '. Publishing to IPNS')
        publishToIPFS(index_hash, (name, value) => {
          console.log('Published!')
          console.log('Woho! ' + name + ' now points to ' + value)
        })
      })
    })
  })
}
