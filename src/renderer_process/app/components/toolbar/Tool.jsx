import React from 'react'
import { DragSource } from 'react-dnd'

const size = 24

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
        const {src, connectDragSource} = this.props
        return connectDragSource(
            <img src={src} height={size} width={size}></img>,
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
