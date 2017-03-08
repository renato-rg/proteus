import React, {Component} from 'react'
import {render} from 'react-dom'
/* This way, Tabs instances can recieve the same busData prop in order to
** synchronize their current active tab behavior
*/

// Consider to rename styles to rootStyle

export class Tabs extends React.Component {
    render() {
        const { styles, tabs, activeClass, bus, busData, activeTab } = this.props
        return (
            <div className={styles}>

                {tabs.map( (title, index) =>

                    <div key={index}
                         className={activeTab==index?activeClass:''}
                         onClick={()=>bus({[busData]: index})}>

                        {title}

                    </div>

                )}

            </div>
        );
    }
}
