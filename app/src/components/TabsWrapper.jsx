import React, {Component} from 'react'
import {render} from 'react-dom'

export default class TabsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.onTabClick = this.onTabClick.bind(this);
        this.state = {
            tabSelected: 1
        };
    }

    onTabClick(index) {
        this.setState({tabSelected: index});
    }

    render() {
        return (
            <div>

                <Tabs tabs={this.props.tabs} active={this.state.tabSelected} handler={this.onTabClick}/>
                <TabContent contents={this.props.contents} index={this.state.tabSelected}/>
            </div>
        );
    }
}

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.active != nextProps.active){
            this.setState({
                active: nextProps.active
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.active != nextProps.active
    }

    render() {
        console.log("Tabs.render");
      return (
        <div>
            {this.props.tabs.map( (title, index) =>
                <div key={index}
                    onClick={()=>this.props.handler(index)}>
                    {title} - Active: {this.state.active}
                </div>
            )}
        </div>
    );
    }
}

const TabContent = (props) => {
    return (
        <div>
            {props.contents[props.index]}
        </div>
    )
}
