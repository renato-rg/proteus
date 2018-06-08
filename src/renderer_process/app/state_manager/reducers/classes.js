import { ADD_CUSTOM_OBJECTS, REPLACE_ALL_CUSTOM_OBJECTS } from '../actions'
import update from 'immutability-helper'

import classesInitialState from './classesInitialState.json'

const initialState = classesInitialState

function classesReducer(state = initialState, action) {
    switch (action.type) {

        case REPLACE_ALL_CUSTOM_OBJECTS: {
            const newState = update(initialState, {
                names: { $push: action.payload.names },
                details: { $merge: action.payload.details }
            })
            
            return newState
        }


        case ADD_CUSTOM_OBJECTS: {
            const newState = update(state, {
                names: { $push: action.payload.names },
                details: { $merge: action.payload.details }
            })
            
            return newState
        }

        default:
            return state
    }
}

export default classesReducer
