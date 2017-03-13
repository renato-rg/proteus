import React, {Component} from 'react'
import {header, nav, section} from './styles/global.css'
import TreeViewTabs from './containers/TreeViewTabs.jsx'
import DocViewTabs from './containers/DocViewTabs.jsx'

// React-dnd context
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Transformers
import TreeView from './components/TreeView.jsx';
import DocView from './components/DocView.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <div>Tabs</div>
                    <div>Icons</div>
                </header>

                <main>
                    <nav>
                        <TreeViewTabs tabs={['Doc 1', 'Doc 2', 'Doc 3']}/>

                        <TreeView
                            moveNode={this.moveNode}/>
                    </nav>

                    <section>
                        <DocViewTabs tabs={[`View 1`, `View 2`]}/>

                        <DocView/>
                    </section>
                </main>

                <footer/>
            </div>
        )
    }
}


export default DragDropContext(HTML5Backend)(App)
