const {app} = require('electron')
const fs = require('fs')
const path = require('path')
const dataPath = path.join(app.getPath('userData'), 'appState.json')

let data = null

const load = _ => {
    if (data == null)
        data = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf-8')) : {}
}

const save = _ => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))

module.exports = {
    set: (key, value) => {
        load()
        data[key] = value
        save()
    },

    get: key => {
        load()
        return data[key]
    },

    unset: key => {
        load()
        delete data[key]
        save()
    }
}
