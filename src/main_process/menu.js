// Electron's modules
const electron = require('electron')
const {Menu, dialog} = electron

// Utils to create chromium windows
const {newBrowserWindow, getAppLocale} = require('./utils')

// Dictionary
const en = require('./i18n/en')
const es = require('./i18n/es')
const dictionary = { en, es }

// Returns a translated native menu
const getMenuTemplate = ({language, code} = getAppLocale()) => {
    const __ = keyword => {
        return dictionary[code][keyword] || keyword
    }
    return  [{
        label: __('File'),
        submenu: [
            {
                label: __('New Window'),
                accelerator: 'CmdOrCtrl+Z',
                click (item, focusedWindow) {
                    newBrowserWindow()
                }
            },{
                label: __('Open Project'),
                accelerator: process.platform === 'darwin'?'Command+O':'Ctrl+O',
                click (item, focusedWindow) {
                    const projectPath = dialog.showOpenDialog({
                        title: __('Open Project'),
                        properties: [ 'openDirectory' ]
                    })
                    if (projectPath !== undefined )
                        focusedWindow.webContents.send('open-project', projectPath[0])
                }
            },{
                label: __('Add Template...'),
                submenu: [
                    {
                        label: 'MADEJA',
                        click (item, focusedWindow) {
                            focusedWindow.webContents.send('menu-add-template', 'MADEJA')
                        }
                    }
                ]
            },{
                label: __('Toggle Developer Tools'),
                accelerator: process.platform === 'darwin'?'Alt+Command+I':'Ctrl+Shift+I',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.toggleDevTools()
                }
            },{
                type: 'separator'
            },{
                label: __('Save Project'),
                accelerator: 'CmdOrCtrl+S',
                click (item, focusedWindow) {
                    focusedWindow.webContents.send('menu-save', __('Save Project As...'))
                }
            },{
                label: __('Save Project As...'),
                accelerator: process.platform === 'darwin'?'Alt+Command+S':'Ctrl+Shift+S',
                click (item, focusedWindow) {
                    const filename = dialog.showOpenDialog({
                        title: __('Save Project As...'),
                        properties: [ 'openDirectory' ]
                    })
                    if (filename !== undefined )
                        focusedWindow.webContents.send('menu-save-as', filename[0])
                }
            },{
                type: 'separator'
            },{
                label: __('Language...'),
                submenu: [
                    {
                        label: 'English',
                        type: 'checkbox',
                        checked: language == 'English',
                        enabled: language != 'English',
                        click (item, focusedWindow) {
                            focusedWindow.webContents.send('menu-language',
                            { language: 'English', code: 'en' })
                        }
                    }, {
                        label: 'Español',
                        type: 'checkbox',
                        checked: language == 'Español',
                        enabled: language != 'Español',
                        click (item, focusedWindow) {
                            focusedWindow.webContents.send('menu-language',
                            { language: 'Español', code: 'es' })
                        }
                    }
                ]
            },{
                type: 'separator'
            },{
                label: __('Close Window'),
                accelerator: 'CmdOrCtrl+Z',
                role: 'close'
            }
        ]
    }]
}

// Each time this function module is called the entire menu es updated
module.exports = languageAndCode => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(getMenuTemplate(languageAndCode)))
}
