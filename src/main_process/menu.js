// Electron's modules
const electron = require('electron')
const {dialog} = electron

// Utils to create chromium windows
const {newBrowserWindow} = require('./utils')

// Menu definition
// TODO: reacts to state
module.exports = [{
    label: 'File',
    submenu: [
        {
            label: 'New Window',
            accelerator: process.platform === 'darwin'?'Alt+Command+N':'Ctrl+Shift+N',
            click (item, focusedWindow) {
                newBrowserWindow()
            }
        },{
            label: 'New Project',
            accelerator: process.platform === 'darwin'?'Command+N':'Ctrl+N',
            click (item, focusedWindow) {
                focusedWindow.webContents.send('new-project-form')
            }
        },{
            label: 'Open Project',
            accelerator: process.platform === 'darwin'?'Command+O':'Ctrl+O',
            click (item, focusedWindow) {
                const projectPath = dialog.showOpenDialog({
                    title: 'Open Project',
                    properties: [ 'openDirectory' ]
                })
                if (projectPath != undefined ) {
                    focusedWindow.webContents.send('open-project', projectPath[0])
                }
            }
        },{
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin'?'Alt+Command+I':'Ctrl+Shift+I',
            click (item, focusedWindow) {
                if (focusedWindow) focusedWindow.toggleDevTools()
            }
        },{
            type: 'separator'
        },{
            label: 'Save Project',
            accelerator: 'CmdOrCtrl+S',
            enabled: false,
            click (item, focusedWindow) {
                focusedWindow.webContents.send('menu-save')
            }
        },{
            label: 'Save Project As...',
            accelerator: process.platform === 'darwin'?'Alt+Command+S':'Ctrl+Shift+S',
            enabled: false,
            click (item, focusedWindow) {
                const filename = dialog.showOpenDialog({
                    title: 'Save Project As...',
                    properties: [ 'openDirectory' ]
                })
                if (filename != undefined ) {
                    focusedWindow.webContents.send('menu-save-as', filename[0])
                }
            }
        },{
            type: 'separator'
        },{
            label: 'Language...',
            submenu: [
                {
                    label: 'English',
                    type: 'checkbox',
                    click (item, focusedWindow) {
                        focusedWindow.webContents.send('menu-language',
                        { language: 'English', code: 'en' })
                    }
                }, {
                    label: 'Español',
                    type: 'checkbox',
                    click (item, focusedWindow) {
                        focusedWindow.webContents.send('menu-language',
                        { language: 'Español', code: 'es' })
                    }
                }
            ]
        },{
            type: 'separator'
        },{
            label: 'Close',
            accelerator: 'CmdOrCtrl+Z',
            role: 'close'
        }
    ]
}]
