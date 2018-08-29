import React, { Component } from 'react'

import './App.css'

import './approve'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="row flex-spaces child-borders">
                    <h1 className="col margin">YES I Approve!</h1>
                </header>
                <p className="row flex-spaces">
                    <div className="col margin">
                        To get started, edit <code>src/App.js</code> and save to
                        reload.
                    </div>
                </p>
            </div>
        )
    }
}

export default App
