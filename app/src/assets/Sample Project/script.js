const fs = require('fs')

projectPath = 'C:/Users/pasta/Desktop/Example'

repoPath = projectPath + '/repository'

const isDirectory = (path) => {
    return fs.statSync(path).isDirectory()
}

const getJSON = (path) => {
    return JSON.parse(fs.readFileSync(path))
}

const getChildren = (dir) => {
    children = fs.readdirSync(dir).filter( name => name != 'rem.json').map( node => {
        const nodePath = dir + '/' + node

        if ( isDirectory(nodePath) ) {
            const innerDirectory = getJSON(nodePath + '/rem.json')
            innerDirectory.children = getChildren(nodePath)
            return innerDirectory
        } else {
            return getJSON(nodePath)
        }
    })
    return children.sort((a,b) => a.index - b.index)
}


const docs = fs
    .readdirSync(repoPath)
    .filter( name => name != 'assets')
    .map( dir =>  {
        dir = repoPath + '/' + dir
        const doc = getJSON(dir + '/rem.json')
        doc.children = getChildren(dir + '/root')
        return doc })
    .sort((a,b) => a.index - b.index)

console.log(JSON.stringify(docs))
