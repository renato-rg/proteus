import React, {Component} from 'react'
import { connect } from 'react-redux'

class DocView extends Component {
    render() {
        return (
            <div className="docView">
                { this.props.document && <DocNode
                    children={this.props.document.children}
                    indexes={[]}/>
                }
            </div>
        )
    }
}

class DocNode extends Component {

    render() {

        const { children } = this.props

        return (
            <dl>
                {children.map((item, index) =>
                    <div key={index}>
                        <span>{item.title}</span>
                        {item.children && <DocNode children={item.children}/>}
                    </div>
                )}
            </dl>
        )

    }

}

const mapStateToProps = (state, ownProps) => {
  return {
    document: state.documents[state.switchDocument.navActiveTab]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocView)
