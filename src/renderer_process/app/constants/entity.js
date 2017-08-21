const def = require('./default.json')
const useCase = require('./useCase.json')

const entity = type => {
    if (type === 'useCase')
        return useCase
    else
        return def
}

export default entity
