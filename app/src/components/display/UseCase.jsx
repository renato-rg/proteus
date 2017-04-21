import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'

const UseCase = (props) => {
    const { node, childrenNodes } = props
    return <div className={styles.useCase}>
        <table>
            <thead>
                <tr>
                    <th>UC</th>
                    <td>{node.title}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Description</th>
                    <td>Uhhh nice descp man!</td>
                </tr>
                <tr>
                    <th>Secuencia</th>
                    <td>
                        <table>
                            <thead>
                                <tr>
                                    <th>Step</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {childrenNodes.map((step, index) =>
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{step.title}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}
const mapStateToProps = (state, ownProps) => {
    return {
        childrenNodes: ownProps.node.childrenIDs.map( n => state.project[n] )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UseCase)
