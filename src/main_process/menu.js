// Electron's modules
const electron = require('electron')
const { app, Menu, dialog, shell } = electron

// Utils to create chromium windows
const { newBrowserWindow, getAppLocale } = require('./utils')

// Dictionary
const en = require('./i18n/en')
const es = require('./i18n/es')
const dictionary = { en, es }

// Returns a translated native menu
const getMenuTemplate = ({ language, code } = getAppLocale()) => {
    const __ = keyword => {
        return dictionary[code][keyword] || keyword
    }
    const template = [
        {
            label: __('File'),
            submenu: [
                {
                    label: __('New Window'),
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+N' : 'Ctrl+Shift+N',
                    click(item, focusedWindow) {
                        newBrowserWindow()
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: __('Open Project'),
                    accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
                    click(item, focusedWindow) {
                        const projectPath = dialog.showOpenDialog({
                            title: __('Open Project'),
                            properties: ['openDirectory']
                        })
                        if (projectPath !== undefined)
                            focusedWindow.webContents.send('open-project', projectPath[0])
                    }
                },
                {
                    label: __('Save Project'),
                    accelerator: 'CmdOrCtrl+S',
                    click(item, focusedWindow) {
                        focusedWindow.webContents.send('menu-save', __('Save Project As...'))
                    }
                },
                {
                    label: __('Save Project As...'),
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+S' : 'Ctrl+Shift+S',
                    click(item, focusedWindow) {
                        const filename = dialog.showOpenDialog({
                            title: __('Save Project As...'),
                            properties: ['openDirectory']
                        })
                        if (filename !== undefined)
                            focusedWindow.webContents.send('menu-save-as', filename[0])
                    }
                },
                {
                    label: __('PROJECT_PROPERTIES'),
                    click(item, focusedWindow) {
                        focusedWindow.webContents.send('project-properties')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: __('New Object...'),
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+C' : 'Ctrl+Shift+C',
                    click(item, focusedWindow) {
                        focusedWindow.webContents.send('new-object')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: __('Language...'),
                    submenu: [
                        {
                            label: 'English',
                            type: 'checkbox',
                            checked: language == 'English',
                            enabled: language != 'English',
                            click(item, focusedWindow) {
                                focusedWindow.webContents.send('menu-language',
                                    { language: 'English', code: 'en' })
                            }
                        },
                        {
                            label: 'Español',
                            type: 'checkbox',
                            checked: language == 'Español',
                            enabled: language != 'Español',
                            click(item, focusedWindow) {
                                focusedWindow.webContents.send('menu-language',
                                    { language: 'Español', code: 'es' })
                            }
                        }
                    ]
                }
            ]
        },
        {
            label: __('EDIT'),
            submenu: [
                { label: __('UNDO'), accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
                { label: __('REDO'), accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
                { type: 'separator' },
                { label: __('CUT'), accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
                { label: __('COPY'), accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
                { label: __('PASTE'), accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
            ]
        },
        {
            label: __('Views'),
            submenu: [
                {
                    label: __('TREE_VIEW'),
                    type: 'checkbox',
                    checked: true,
                    click(item, focusedWindow) {
                        focusedWindow.webContents.send('show-explorer', item.checked)
                    }
                }
            ]
        },
        {
            label: __('WINDOW'),
            submenu: [
                { label: __('MINIMIZE'), role: 'minimize' },
                { label: __('CLOSE'), role: 'close' }
            ]
        },
        {
            label: __('HELP'),
            submenu: [
                {
                    label: __('REPOSITORY'),
                    click(item, focusedWindow) {
                        shell.openExternal('https://github.com/pastahito/proteus')
                    }
                }
                ,
                {
                    label: __('DEV_TOOLS'),
                    type: 'checkbox',
                    checked: false,
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.toggleDevTools()
                    }
                }
            ]
        }

    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        })

        template[2].submenu.push(
            {type: 'separator'},
            {
              label: 'Speech',
              submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
              ]
            }
          )

        // Window menu
        template[4].submenu = [
            { label: __('CLOSE'), role: 'close' },
            { label: __('MINIMIZE'), role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' }
        ]
    }

    return template
}

// Each time this function module is called the entire menu es updated
module.exports = languageAndCode => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(getMenuTemplate(languageAndCode)))
}