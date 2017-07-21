// Electron's modules
const electron = require('electron')
const {BrowserWindow} = electron

// Configuration files manager
const {set, get} = require('./storage')

// Constants
const path = require('path')
const webAppPath = path.resolve(__dirname, '../renderer_process/index.html')
const defaultWindowState = {
    width: 1280,
    height: 680,
    show: false
}


// Save or get fields in app's configuration file
const saveWindowState = window => _ => {
    set('windowState', Object.assign({maximized: window.isMaximized()}, window.getBounds()))
}
const getAppLocale = _ => {
    return get('appLocale') || {language: 'English', code: 'en'}
}

module.exports = {

    // Launches a new chromium window and loads a project if path is specified
    // Retrieve previous window's state from the app’s configuration file
    // Loads the web app into a chromium window
    // When this window moves, its new position is saved in the app’s configuration file
    // 'resize', 'maximize', 'unmaximize' are side effects of 'move'
    // When this window is closed, its reference is released so it can be garbage collected
    // The window is shown after the web application is fully loaded
    // Once it's ready to show React/Redux app is already initialized so
    // an action to sync the store is triggered
    newBrowserWindow: options => {
        const {projectPath, restoreWindowState} = options || {}

        let windowState = restoreWindowState ?
            Object.assign({show: false}, get('windowState') || defaultWindowState) :
            defaultWindowState
        let isMaximized = windowState.maximized
        delete windowState.maximized

        let newWindow = new BrowserWindow(windowState)
        newWindow.loadURL(webAppPath)
        newWindow.on('move', saveWindowState(newWindow))
        newWindow.on('close', saveWindowState(newWindow))
        newWindow.on('closed', _ => newWindow = null )
        newWindow.once('ready-to-show', _ => {
            newWindow.webContents.send('menu-language', getAppLocale())
            newWindow.show()
            if (projectPath) {
                newWindow.webContents.send('open-project', projectPath)
            } else if (restoreWindowState && isMaximized) {
                newWindow.maximize()
            }
        })

        return newWindow
    },

    // Save app's locale in app's configuration files
    saveAppLocale: languageAndCode => {
        set('appLocale', languageAndCode)
    }

}
