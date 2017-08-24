import React from 'react'
import { DragSource } from 'react-dnd'
import resolveREMIcon from '../icons/resolveREMIcon'

class Tool extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dropEffect: 'move'
        }
        this.updateDropEffectTo = this.updateDropEffectTo.bind(this)
    }

    updateDropEffectTo(dropEffect) {
        this.setState({ dropEffect })
    }

    render() {
        const {type, connectDragSource} = this.props
        return connectDragSource(
            <img src={resolveREMIcon(type)}/>,
            {dropEffect: this.state.dropEffect}
        )
    }
}

const spec = {
    beginDrag(props, monitor, component) {
        return {
            type: props.type,
            fromToolbar: true,
            updateDropEffectTo: component.updateDropEffectTo
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
})

export default DragSource('tool', spec, collect)(Tool)
