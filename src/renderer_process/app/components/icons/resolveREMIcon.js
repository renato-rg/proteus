import folder from '../../assets/img/folder.png'
import paragraph from '../../assets/img/paragraph.png'
import image from '../../assets/img/image.png'

import organization from '../../assets/img/organization.png'
import stakeholder from '../../assets/img/stakeholder.png'
import meeting from '../../assets/img/meeting.png'

import objective from '../../assets/img/objective.png'
import actor from '../../assets/img/actor.png'
import informationReq from '../../assets/img/informationReq.png'
import constraintReq from '../../assets/img/constraintReq.png'
import useCase from '../../assets/img/useCase.png'
import functionalReq from '../../assets/img/functionalReq.png'
import nonFunctionalReq from '../../assets/img/nonFunctionalReq.png'
import traceabilityMatrix from '../../assets/img/traceabilityMatrix.png'

import objectType from '../../assets/img/objectType.png'
import valueType from '../../assets/img/valueType.png'
import asociation from '../../assets/img/asociation.png'
import systemOperation from '../../assets/img/systemOperation.png'

import conflict from '../../assets/img/conflict.png'
import defect from '../../assets/img/defect.png'
import changeRequest from '../../assets/img/changeRequest.png'

import rem from '../../assets/img/rem.png'

const dictionary = {
    folder,
    paragraph,
    image,

    organization,
    stakeholder,
    meeting,

    objective,
    actor,
    informationReq,
    constraintReq,
    useCase,
    functionalReq,
    nonFunctionalReq,
    traceabilityMatrix,

    objectType,
    valueType,
    asociation,
    systemOperation,

    conflict,
    defect,
    changeRequest
}


const resolveREMIcon = (type = '') => {
    return dictionary[type] || rem
}

export default resolveREMIcon
