import React, {Component} from 'react'
import {render} from 'react-dom'


class DocView extends Component {
    render() {
        return (
            <div className="docView">
                <DocNode
                    children={this.props.document.children}
                    indexes={[]}/>
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

export default DocView
