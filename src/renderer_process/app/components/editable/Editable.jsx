import React from 'react'
import OrderedList from './OrderedList.jsx'
import Multiline from './Multiline.jsx'
import Oneline from './Oneline.jsx'

// Field that allows editing and integrates very well with redux
const Editable = props => {
    switch (props.type) {
        case 'oneline':
            return <Oneline {...props}/>
        case 'multiline':
            return <Multiline {...props}/>
        case 'orderedList':
            return <OrderedList {...props}/>
        default:
            return <Multiline {...props}/>

    }
}

export default Editable
