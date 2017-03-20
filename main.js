// Basic init
const electron = require('electron')
const {app, Menu, BrowserWindow} = electron
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

// Creates a new window
const newWindow = () => {
    let win = new BrowserWindow({width: 1280, height: 680, show: false})
    win.loadURL(`file://${__dirname}/app/index.html`)
    win.on('closed', () => mainWindow = null )
    return win
}


// Shuts down any intent to open another instance of the app
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) return true
})
if (shouldQuit) app.quit()

// Construct app's menu
//const template = require('./menu.js')(newWindow, process.platform)
const template = [{
    label: 'File',
    submenu: [{
        label: 'New Window',
        accelerator: process.platform === 'darwin'?'Alt+Command+N':'Ctrl+Shift+N',
        click (item, focusedWindow) {
            let win = newWindow()
            win.once('ready-to-show', () => win.show() )
        }
    },{
        label: 'New Project',
        accelerator: process.platform === 'darwin'?'Command+N':'Ctrl+N',
        click (item, focusedWindow) {
            focusedWindow.webContents.send('new-project')
        }
    },{
        label: 'Open Project',
        accelerator: process.platform === 'darwin'?'Command+O':'Ctrl+O',
        click (item, focusedWindow) {
            focusedWindow.webContents.send('open-project', 'Open Project clicked')
        }
    },{
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin'?'Alt+Command+I':'Ctrl+Shift+I',
        click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.toggleDevTools()
        }
    },{
        label: 'Close',
        accelerator: 'CmdOrCtrl+Z',
        role: 'close'
    }]
}]

app.on('ready', () => {

    // Set app's menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    // Opens the app
    mainWindow = newWindow()
    mainWindow.once('ready-to-show', () => mainWindow.show() )

})
