// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// preload with contextIsolation enabled
/**
 * 添加隔离环境下的模块
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('service', {
  hello: () => {
    console.log('Hello electron ipc send channel...')
  }
})
// 发送 ipc 命令
contextBridge.exposeInMainWorld('ipc', {
  relaunch: () => {
    ipcRenderer.send('relaunch')
    // console.log('relaunch')
  },
})
