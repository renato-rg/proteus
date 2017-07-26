const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const path = require('path')

const appPath = path.join(__dirname, '..', '..', 'src', 'main_process', 'index.js')

const app = new Application({
    path: require('electron'),
    args: [appPath]
})

chai.should()
chai.use(chaiAsPromised)
chaiAsPromised.transferPromiseness = app.transferPromiseness // Allows chai promises

describe('application launch', function () {
    this.timeout(10000)

    beforeEach(function () {
        return app.start()
    })

    afterEach(function () {
        if (app && app.isRunning())
            return app.stop()
    })

    it('opens a window', function () {
        return app.client.waitUntilWindowLoaded()
            .browserWindow.isMinimized().should.eventually.be.false
            .browserWindow.isDevToolsOpened().should.eventually.be.false
            .browserWindow.isVisible().should.eventually.be.true
            .browserWindow.isFocused().should.eventually.be.true
            .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
            .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
    })
})
