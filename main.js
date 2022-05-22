// Modules to control application life and create native browser window
const {app, Tray, Menu, nativeImage, BrowserWindow} = require('electron')
const path = require('path')
var {ElectronBlocker} = require('@cliqz/adblocker-electron');
var {fetch} = require('cross-fetch');
var { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
const { ipcMain } = require('electron')
const client = require('discord-rich-presence')('977988221743022080');
setupTitlebar();
let mainWindow

function createWindow () {
  // Create the browser window.
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + './res/main.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    },
    titleBarStyle: 'hidden' 
  })
  attachTitlebarToWindow(mainWindow);
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(mainWindow.webContents.session);
  });
  console.log(mainWindow.title)

  var myInt = setInterval(function () {
    client.updatePresence({
      state: mainWindow.title,
      details: 'Playing Music',
      largeImageKey: 'icon',
      smallImageKey: 'icon',
      instance: true,
    });
}, 500);
  const exampleMenuTemplate = () => [
    {
      label: "File",
      submenu: [
        {
          label: "Quit",
          click: () => app.quit()
        }
      ]
    },
    {
      label: "Service",
      submenu: [
        {
          label: "Youtube",
          type: "radio",
          click: () => mainWindow.webContents.executeJavaScript("foo.loadURL('https://youtube.com')")
        },
        {
          label: "SoundCloud",
          type: "radio",
          click: () => mainWindow.webContents.executeJavaScript("foo.loadURL('https://soundcloud.com')")
        },
        {
          label: "Youtube Music",
          type: "radio",
          click: () => mainWindow.webContents.executeJavaScript("foo.loadURL('https://music.youtube.com')")
        }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "resetZoom" },
        { role: "toggleDevTools" }
      ],
    },
  ]
  const menu = Menu.buildFromTemplate(exampleMenuTemplate());
  Menu.setApplicationMenu(menu);
  // Open the DevTools.
   mainWindow.webContents.openDevTools()
}
let tray


app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('res/main.png')
  tray = new Tray(icon)

  // note: your contextMenu, Tooltip and Title code will go here!
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.




