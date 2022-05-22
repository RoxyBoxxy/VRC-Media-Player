// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var { Titlebar, Color } = require('custom-electron-titlebar');
const { ipcRenderer } = require('electron')
window.addEventListener('DOMContentLoaded', () => {
  // Title bar implemenation
  new Titlebar({
    backgroundColor: Color.fromHex("#000000"),
  });
  console.log("Ran Preload")
});

ipcRenderer.on('asynchronous-message', function (evt, message) {
  console.log(message); // Returns: {'SAVED': 'File Saved'}
});