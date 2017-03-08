import React, {Component} from 'react'
import {render} from 'react-dom'
import {header, nav, section} from './styles/global.css'
import {Tabs} from './components/TabsComponent.jsx'

// React-dnd context
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'

// Transformers
import TreeView from './components/TreeView.jsx';
import DocView from './components/DocView.jsx';

// Mockup data
const uc1 = require('../build/obj1.json')
const uc2 = require('../build/obj2.json')
const uc3 = require('../build/obj3.json')

// Mockup data
const document1 = {
    title: 'Doc 1',
    children: [uc1, uc2]
}
const document2 = {
    title: 'Doc 2',
    children: [uc3]
}
const document3 = {
    title: 'Doc 3',
    children: []
}

// Mockup data
var tabs = [
    document1.title,
    document2.title,
    document3.title
]

// Mockup data
let documents = [
    document1,
    document2,
    document3
]

class App extends Component {
    constructor(props){
        super(props)
        // App's current state
        this.state = {
            loaded: false,
            navActiveTab: 0,
            sectionActiveTab: 0,
            store: {
                documents: documents
            }
        }
        // Communication Bus for App's state
        this.bus = this.bus.bind(this);

        // Handle treeView
        this.moveNode = this.moveNode.bind(this);
    }

    // Communication Bus
    bus(payload) {
        this.setState(payload)
    }

    moveNode(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes) {
        console.log(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes)

        //TODO determine if it goes down or up, using screen coordinates myb?
        let fixer = sourceDepth > targetDepth

        // Dragged node
        let draggedItem = sourceIndexes.reduce((last, current) => {
            return last.children[current]
        }, this.state.store.documents[this.state.navActiveTab])

        const query = (navActiveTab, indexes, query) => {
            return {
                store: {
                    documents: {
                        [navActiveTab]: indexes.reduceRight((last, current) => {
                        	return { children: { [current]: last } }
                        }, { children: { $splice: [ query ] } })
                    }
                }
            }
        }

        // Query to remove the dragged node
        sourceIndex = sourceIndexes.pop()
        let remove = query(this.state.navActiveTab, sourceIndexes, [sourceIndex, 1])

        // Query to insert dragged node in new place
        targetIndex = targetIndexes.pop()
        let insert = query(this.state.navActiveTab, targetIndexes, [targetIndex, 0, draggedItem])

        this.setState( update( update(this.state, remove), insert))
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
                        <Tabs tabs={tabs}
                            styles="tabs"
                            activeClass="activeTab"
                            activeTab={this.state.navActiveTab}
                            bus={this.bus}
                            busData={'navActiveTab'}/>

                        <TreeView
                            document={this.state.store.documents[this.state.navActiveTab]}
                            moveNode={this.moveNode}/>
                    </nav>

                    <section>
                        <Tabs tabs={[`View 1`, `View 2`]}
                            styles="tabs"
                            activeClass="activeTab"
                            activeTab={this.state.sectionActiveTab}
                            bus={this.bus}
                            busData={'sectionActiveTab'}/>

                        <DocView
                            document={this.state.store.documents[this.state.navActiveTab]}
                            modifier={this.state.sectionActiveTab}/>
                    </section>
                </main>

                <footer/>
            </div>
        )
    }
}


export default DragDropContext(HTML5Backend)(App)
