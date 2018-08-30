import React, { Component, Fragment } from 'react'
import { createPortal } from 'react-dom'

import { parseUrl } from '../utils/url'
import octo from '../utils/octo'

class UrlInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            approvePending: false
        }
        this.onClickApprove = this.onClickApprove.bind(this)
    }

    onClickApprove() {
        const { url } = this.props
        const urlData = parseUrl(url)
        const repo = octo.repos(urlData.ownerName, urlData.repoName)
        const pull = repo.pulls(urlData.id)
        this.setState({
            approvePending: true
        })
        pull.reviews
            .create({
                body: 'test',
                event: 'APPROVE'
            })
            .then(
                repo => {
                    console.log('success')
                    this.setState({
                        error: null,
                        approvePending: false
                    })
                },
                error => {
                    this.setState({
                        error,
                        approvePending: false
                    })
                }
            )
    }

    render() {
        const { url } = this.props
        const { approvePending, error } = this.state
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
                    <button
                        className="btn-large btn-success"
                        disabled={approvePending}
                        onClick={this.onClickApprove}
                    >
                        <span
                            role="img"
                            aria-label="thumbs-up"
                            style={{ fontSize: '2rem' }}
                        >
                            👍
                            {` `}
                        </span>
                        Approve
                    </button>
                </div>

                {error &&
                    createPortal(
                        <div className="alert alert-danger">
                            {error.message}
                        </div>,
                        document.getElementById('error-container')
                    )}
            </Fragment>
        )
    }
}

export default UrlInfo
