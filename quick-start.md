## cowpen quick-start

Easy and quick way to get up and running!

This guide is from trying to use cowpen from the docker image `node/5.9.1-wheezy` that you can download and start if you want to have the same environment. It comes with nodejs and npm installed.

### Download IPFS

Navigate to https://ipfs.io/docs/install/ and choose your distribution. We're gonna assume linux 64 from here on.

First, lets start the container: `docker run -it --privileged node/5.9.1-wheezy bash`

Run the following commands in the container

```
apt update
apt install fuse --yes # We need to install FUSE if we don't have it already
wget http://dist.ipfs.io/go-ipfs/v0.3.11/go-ipfs_v0.3.11_linux-amd64.tar.gz # downloads IPFS binary
tar zxfv go-ipfs_v0.3.11_linux-amd64.tar.gz # Unpacks the archive
mv go-ipfs/ipfs /usr/bin/ipfs # Moves IPFS binary into path
mkdir /ipfs
mkdir /ipns
ipfs daemon --init --mount& # Starts IPFS and puts it in the background
# Wait for `Daemon is ready` and then press enter to clean the current line
# Now everything is setup for using cowpen and we can start by installing cowpen itself over IPFS
npm install -g cowpen@/ipfs/QmWYA5tDL7u83XWhHDT7szx1KgtjjajDCR88Xk9FZzUR3g
# Now you should have version 0.0.2 installed
```
