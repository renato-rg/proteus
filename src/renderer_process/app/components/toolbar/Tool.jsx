import React from 'react'
import fs from 'fs'
import path from 'path'

//Redux
import { connect } from 'react-redux'

import remDefaultImage from '../../assets/img/rem.png'
import { setDraggingData } from '../../state_manager/actions'

class Tool extends React.Component {

  constructor(props) {
    super(props)
    
    this.onDragStart = () => {
      this.props.setDraggingData({ fromToolbar: true, sourceType: this.props.type })
    }
  }

  render() {
    return (
      <img
        height={16}
        width={16}
        src={this.props.image}
        title={this.props.type}

        draggable
        onDragStart={this.onDragStart}

      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      classes: state.classes,
        image: state.classes.details[ownProps.type].image || ''
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDraggingData: payload => dispatch(setDraggingData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tool)
