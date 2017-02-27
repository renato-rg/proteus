import React, {Component} from 'react'
import {render} from 'react-dom'
import {header, nav, section} from './styles/global.css'
import TabsWrapper from './components/TabsWrapper.jsx'

// Mockup data
const tabs = [
    "Tab x",
    "Tab y",
    "Tab z"
]
const contents = [
    "Tab x's contents",
    "Tab y's contents",
    "Tab z's contents"
]

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
        this.getMyTabsFromHeader = this.getMyTabsFromHeader.bind(this);
        this.myTabsHeader;
    }

    componentWillMount() {
        this.myTabsHeader = (<div>Loading...</div>)
    }

    componentDidMount() {
        this.getMyTabsFromHeader();
    }

    getMyTabsFromHeader() {
        setTimeout(function (){
            this.myTabsHeader = (<TabsWrapper tabs={tabs} contents={contents}/>);
            this.setState({
                loaded: true
            })
        }.bind(this),2000);
    }

    render() {
        return (
            <div>
                <header>
                    {this.myTabsHeader}
                </header>
                <main>
                    <nav>
                        <div>Tabs</div>
                        <div>Tree</div>
                    </nav>
                    <section>
                        <div>Tabs</div>
                        <div>Doc</div>
                    </section>
                </main>
            </div>
        )
    }
}
