import React, { Component } from 'react'

import './App.css'

import './utils/approve'
import { getRandomThumbsUp } from './utils/thumbnail'
import { setBackground } from './utils/background'
import RepoInput from './components/RepoInput'

setBackground('orbital insight')
console.log('public', process.env.PUBLIC_URL)

class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col sm-12">
                    <div className="paper">
                        <header className="row flex-center">
                            <h2
                                className="col margin"
                                style={{
                                    transform: 'rotate(-8deg)'
                                }}
                            >
                                YES I Approve!
                            </h2>
                            <img
                                src={getRandomThumbsUp()}
                                style={{ height: '180px' }}
                            />
                        </header>
                        <RepoInput />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
