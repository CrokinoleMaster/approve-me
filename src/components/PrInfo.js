import React, { Component } from 'react'

import octo from '../utils/octo'

class PrInfo extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        const { url } = nextProps
    }

    render() {
        const { url } = this.props
        if (!url) {
            return null
        }
        return (
            <div className="row flex-center">
                <div className="col sm-8">
                    <label>
                        <span>Pull Request Info</span>
                    </label>
                </div>
            </div>
        )
    }
}

export default PrInfo
