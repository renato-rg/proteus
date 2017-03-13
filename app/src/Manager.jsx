import React, {Component} from 'react'
import { connect } from 'react-redux'

class Manager extends Component {
    render() {
        console.log(this.props);
        return (
            <div>Here goes the new view</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        previousProjects: state.projectManager.previousProjects,
        projectPath: state.projectManager.projectPath
    }
}

export default connect(mapStateToProps)(Manager)
