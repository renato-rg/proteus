const folder = require('./folder.json')
const paragraph = require('./paragraph.json')

const organization = require('./organization.json')
const stakeholder = require('./stakeholder.json')
const meeting = require('./meeting.json')

const objective = require('./objective.json')
const actor = require('./actor.json')
const informationReq = require('./informationReq.json')
const constraintReq = require('./constraintReq.json')
const useCase = require('./useCase.json')
const functionalReq = require('./functionalReq.json')
const nonFunctionalReq = require('./nonFunctionalReq.json')

const conflict = require('./conflict.json')
const defect = require('./defect.json')
const changeRequest = require('./changeRequest.json')


const propTypes = type => {

    if (type === 'folder')
        return folder
    else if (type === 'paragraph')
        return paragraph

    else if (type === 'organization')
        return organization
    else if (type === 'stakeholder')
        return stakeholder
    else if (type === 'meeting')
        return meeting

    else if (type === 'objective')
        return objective
    else if (type === 'actor')
        return actor
    else if (type === 'informationReq')
        return informationReq
    else if (type === 'constraintReq')
        return constraintReq
    else if (type === 'useCase')
        return useCase
    else if (type === 'functionalReq')
        return functionalReq
    else if (type === 'nonFunctionalReq')
        return nonFunctionalReq

    else if (type === 'conflict')
        return conflict
    else if (type === 'defect')
        return defect
    else if (type === 'changeRequest')
        return changeRequest

    else
        return folder
}

export default propTypes
