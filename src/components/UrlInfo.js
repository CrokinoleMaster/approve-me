import React, { Component } from 'react'

import { parseUrl } from '../utils/url'

class UrlInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { url } = this.props
        if (!url) {
            return null
        }
        const urlData = parseUrl(url)
        console.log(urlData)
        return (
            <div className="row flex-center">
                <div className="col sm-4">Owner: {urlData.ownerName}</div>
                <div className="col sm-4">Repo: {urlData.repoName}</div>
            </div>
        )
    }
}

export default UrlInfo
