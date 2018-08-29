import React, { Component } from 'react'

import './App.css'
import './approve'
import { setBackground } from './background'

setBackground('orbital insight')

class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col sm-12">
                    <div className="paper">
                        <header className="row flex-spaces child-borders">
                            <h1 className="col margin">YES I Approve!</h1>
                        </header>
                        <div className="row flex-spaces">
                            <div className="col margin">
                                <p>
                                    To get started, edit <code>src/App.js</code>{' '}
                                    and save to reload.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
