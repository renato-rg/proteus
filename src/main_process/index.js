// Electron's modules
const electron = require('electron')
const {app, ipcMain, BrowserWindow} = electron

// App's constants
const path = require('path')
const webAppPath = path.resolve(__dirname, '../renderer_process/index.html')

// Native Menu
const rebuildMenuFromTemplate = require('./menu')

// Utils to create chromium windows, and manage app's configuration file
const {newBrowserWindow, saveAppLocale} = require('./utils')

// Allow electron reloads by itself when webpack detects changes in ./app/
if (process.env.ELECTRON_ENV === 'dev') require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron')
})

// Prevents default window to be garbage collected
let mainWindow

// Shuts down any attempt to open another instance of the app
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) return true
})
if (shouldQuit) app.quit()

app.on('ready', () => {

    // Set app's native menu
    rebuildMenuFromTemplate()

    // Launches a new chromium window and loads the web app
    mainWindow = newBrowserWindow({restoreWindowState: true})

    // Creates a new window and requests to load certain project in it
    // This new window will have default size and position
    ipcMain.on('load-project-in-new-window', (event, projectPath) => {
        newBrowserWindow({projectPath})
    })

    // When a user changes the language from the menu, in the web app context,
    // this event is emmited
    ipcMain.on('menu-language-updated', (event, {language, code}) => {
        rebuildMenuFromTemplate({language, code})
        saveAppLocale({language, code})
    })

})

// Allows AppVeyor close the app right after it is opened
if (process.env.CI) app.on('browser-window-focus', () => app.exit())
