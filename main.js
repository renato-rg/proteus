// Electron's modules
const electron = require('electron')
const {app, Menu, BrowserWindow, dialog, ipcMain} = electron

// App's constants
const menuTemplate = require('./menu.js')
const webAppPath = `file://${__dirname}/app/index.html`

// Allow electron reloads by itself when webpack detects changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

// Shuts down any intent to open another instance of the app
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) return true
})
if (shouldQuit) app.quit()

app.on('ready', () => {

    // Set app's menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))

    // Opens the app
    mainWindow = new BrowserWindow({width: 1280, height: 680, show: false})
    mainWindow.loadURL(webAppPath)
    mainWindow.on('closed', () => mainWindow = null )
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        mainWindow.maximize()
    })

    // Creates new window for project and loads a project
    ipcMain.on('load-project-in-new-window', (event, projectPath) => {
        let newWindow = new BrowserWindow({width: 1280, height: 680, show: false})
        newWindow.loadURL(webAppPath)
        newWindow.on('closed', () => newWindow = null )
        newWindow.once('ready-to-show', () => {
            newWindow.show()
            newWindow.webContents.send('open-project', projectPath)
        })
    })

})
