import React, { Component, Fragment } from 'react'

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
        return (
            <Fragment>
                <div className="card-header">Repo Info</div>
                <div className="card-body">
                    <h4 className="card-title">{urlData.ownerName}</h4>
                    <h5 className="card-subtitle">{urlData.repoName}</h5>
                    <p className="card-text">PR# {urlData.id}</p>
                    <button>Let me go here!</button>
                </div>
            </Fragment>
        )
    }
}

export default UrlInfo
