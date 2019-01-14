const path = require('path')
const childProcess = require('child_process')
const chokidar = require('chokidar')
const portfinder = require('portfinder')
const EventEmitter = require('events').EventEmitter

module.exports = class EasyMock extends EventEmitter {
  constructor (opts) {
    super()
    if (!opts.path) throw new Error('请设置common.path指定mock配置文件的路径')

    this.path = opts.path
    this.debug = opts.debug
    const options = require(this.path)
    this.init()
  }

  init () {
    const options = require(this.path)
    if (options.common) {
      if (options.common.mock !== undefined && !options.common.mock) {
        this.debug && console.log('options mock is false, stop the mock server...')
        return
      }
    }
    this.port = (options.common && options.common.port) || 8018
    portfinder.basePort = this.port
    portfinder.getPort((err, port) => {
      if (err) {
        throw new Error(err)
      }
      this.port = port
      this.setUpWatcher()
    })
  }

  setUpWatcher () {
    this.forkChild()
    chokidar.watch(this.path, {
      persistent: true
    }).on('change', _ => {
      this.emit('killChild')
      setTimeout(_ => {
        this.forkChild()
      }, 30)
    })
  }

  forkChild () {
    const child = childProcess.fork(path.join(__dirname, 'server.js'), [], {
      encoding: 'utf8',
      execArgv: process.execArgv
    })
    child.on('error', (data) => {
      this.debug && console.log(`Express server exited with error ${data.toString()}`)
    })

    child.on('exit', (code) => {
      this.debug && console.log(`Express server exited with code ${code || 0}`)
    })

    this.on('killChild', _ => {
      child.kill('SIGKILL')
      this.removeAllListeners()
    })
    // 给子进程传递数据
    child.send({
      path: this.path,
      port: this.port,
      debug: this.debug
    })
    return child
  }
}
