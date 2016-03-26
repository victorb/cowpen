var packages = require('./packages')
var assert = require('assert')
var tmpdir = require('os').tmpdir

var lodash_data = {
  package: 'lodash',
  version: '1.0.0',
  hash: 'ABCDEF'
}

var underscore_data = {
  package: 'underscore',
  version: '2.0.0',
  hash: '123456'
}

var lodash_data_new_version = {
  package: 'lodash',
  version: '2.0.0',
  hash: 'ABCDEG'
}

const packages_file = tmpdir() + '/test-packages.json'

console.log('Using: ' + packages_file + ' for storing the packages')

describe('Packages', () => {
  beforeEach(() => {
    packages.clearAllPackages(packages_file)
  })
  it('Can read the packages.json file even if it doesnt exist', () => {
    assert.deepEqual({}, packages.allPackages(packages_file))
  })
  it('Add new package', () => {
    packages.addPackage(packages_file, lodash_data)
    assert.deepEqual({
      'lodash': {'1.0.0': 'ABCDEF'}
    }, packages.allPackages(packages_file))
  })
  it('Add two new different packages', () => {
    packages.addPackage(packages_file, lodash_data)
    packages.addPackage(packages_file, underscore_data)
    assert.deepEqual({
      'lodash': {'1.0.0': 'ABCDEF'},
      'underscore': {'2.0.0': '123456'}
    }, packages.allPackages(packages_file))
  })
  it('Add two versions of same package', () => {
    packages.addPackage(packages_file, lodash_data)
    packages.addPackage(packages_file, lodash_data_new_version)
    assert.deepEqual({
      'lodash': {
        '1.0.0': 'ABCDEF',
        '2.0.0': 'ABCDEG'
      }
    }, packages.allPackages(packages_file))
  })
})

