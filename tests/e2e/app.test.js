const Application = require('spectron').Application
const path = require('path')
const electronPath = require('electron')
const { expect } = require('chai')

const appPath = path.join(__dirname, '..', '..', 'src', 'main_process', 'index.js')


let app = new Application({
    path: electronPath,
    args: [appPath]
})

describe('application tests', function () {
    this.timeout(0)

    beforeEach(async () => {
        await app.start()
    })

    afterEach(async () => {
        await app.stop()
    })

    it('instance of PROTEUS created', async () => {
        const count = await app.client.getWindowCount()
        expect(count).to.equal(2)
    })
})
