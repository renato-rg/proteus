import React from 'react'
import { connect } from 'react-redux'
import { addCustomObjects } from '../../state_manager/actions'
import update from 'immutability-helper'

import { T } from '../../i18n'
import { Button } from '../propertiesPanels/common'

const refineData = obj => {
    const scheme = {}
    Object.keys(obj.scheme).map(section => {
        if (obj.scheme[section].length > 0) scheme[section] = obj.scheme[section].slice()
    })
    return {
        names: [obj.type],
        details: {
            [obj.type]: update(obj, {
                $unset: ['validations'],
                defaultInstance: { $merge: { type: obj.type } },
                scheme: { $set: scheme }
            })
        }
    }
}

const CreateTableWrapper = props => {
    return  <Button onClick={e =>props.createTable(refineData(props.getData()))}
        hoverStyle={{ backgroundColor: '#576aff' }}
        pressStyle={{ backgroundColor: '#b8c0ff' }}>
            <T>CREATE_TABLE</T>
        </Button>
}

const mapDispatchToProps = dispatch => {
    return {
        createTable: payload => dispatch(addCustomObjects(payload))
    }
}

export default connect(null, mapDispatchToProps)(CreateTableWrapper)