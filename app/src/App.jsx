import React, {Component} from 'react'
import {render} from 'react-dom'
import {header, nav, section} from './styles/global.css'
import {Tabs} from './components/TabsComponent.jsx'


// Mockup data
const tabs = [
    "Tab x",
    "Tab y",
    "Tab z"
]
// Mockup data
// Each content represents a document
const contents = [
    "Tab x's contents",
    "Tab y's contents",
    "Tab z's contents"
]

// Views of the same document will be handled by different components
const TreeView = (props) => <div>{props.content}</div>
const DocView = (props) => <div>{props.content}</div>

export default class App extends Component {
    constructor(props){
        super(props)
        // App's current state
        this.state = {
            loaded: false,
            navActiveTab: 0,
            sectionActiveTab: 0
        }
        // Communication Bus
        this.bus = this.bus.bind(this);
    }

    // Communication Bus
    bus(payload) {
        this.setState(payload)
    }

    render() {
        return (
            <div>
                <header>
                    <div>Tabs</div>
                    <div>Icons</div>
                </header>

                <main>
                    <nav>
                        <Tabs
                            tabs={tabs}
                            activeTab={this.state.navActiveTab}
                            bus={this.bus}
                            busData={'navActiveTab'}/>

                        <TreeView content={contents[this.state.navActiveTab]}/>
                    </nav>

                    <section>
                        <Tabs
                            tabs={[`View 1`, `View 2`]}
                            activeTab={this.state.sectionActiveTab}
                            bus={this.bus}
                            busData={'sectionActiveTab'}/>

                        <DocView
                            content={contents[this.state.navActiveTab]}
                            modifier={this.state.sectionActiveTab}/>
                    </section>
                </main>
            </div>
        )
    }
}
