import React, {Component} from 'react'
import {render} from 'react-dom'

/* This way, Tabs instances can recieve the same busData prop in order to
** synchronize their current active tab behavior
*/

export class Tabs extends React.Component {
    render() {
        return (
            <div>
                {this.props.tabs.map( (title, index) =>
                    <div key={index} onClick={()=>this.props.bus({[this.props.busData]: index})}>
                        {title} - Active: {this.props.activeTab} - Name: {this.props.busData}
                    </div>
                )}
            </div>
        );
    }
}
