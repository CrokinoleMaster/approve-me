import React, { Component } from 'react'

import './App.css'
import './utils/approve'
import { setBackground } from './utils/background'
import RepoInput from './components/RepoInput'

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
                        <RepoInput />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
