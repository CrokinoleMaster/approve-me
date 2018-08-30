import React, { Component, Fragment } from 'react'

import { setBackground } from '../utils/background'
import { parseUrl } from '../utils/url'
import UrlInfo from './UrlInfo'

class RepoInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            urlInput: ''
        }
        this.onChangePrUrl = this.onChangePrUrl.bind(this)
        this.readPrUrl = this.readPrUrl.bind(this)
        this.validatePrUrl = this.validatePrUrl.bind(this)
    }

    validatePrUrl() {
        const { prUrl } = this.state
        const urlData = parseUrl(prUrl)
        if (prUrl.protocol !== 'https:' && prUrl.protocol !== 'http:') {
            this.setState({
                error: new Error(`Unknown protocol '${prUrl.protocol}'`)
            })
            return
        }
        if (prUrl.hostname !== 'github.com') {
            this.setState({
                error: new Error(
                    `Unknown hostname '${prUrl.hostname}' is not 'github.com'`
                )
            })
            return
        }
        if (urlData.type !== 'pull') {
            this.setState({
                error: new Error(
                    `Unknown URL route param '${urlData.type}' is not 'pull'`
                )
            })
            return
        }
        if (!urlData.id || isNaN(urlData.id)) {
            this.setState({
                error: new Error(
                    `Unknown URL route param '${
                        urlData.id
                    }' is not a valid PR number`
                )
            })
            return
        }
    }

    readPrUrl() {
        const { urlInput } = this.state
        if (urlInput.length) {
            try {
                const prUrl = new URL(urlInput)
                this.setState(
                    {
                        prUrl
                    },
                    this.validatePrUrl
                )
            } catch (e) {
                this.setState({
                    error: e
                })
            }
        }
    }

    onChangePrUrl(e) {
        setBackground(e.target.value)
        this.setState(
            {
                urlInput: e.target.value,
                prUrl: null,
                error: ''
            },
            this.readPrUrl
        )
    }

    render() {
        const { prUrl, urlInput, error } = this.state
        return (
            <Fragment>
                <div className="row flex-spaces">
                    <div className="col">
                        <p>
                            To get started, just put in the <code>PR url</code>
                            {` `}
                            and hit approve{' '}
                            <span
                                role="img"
                                aria-label="party"
                                style={{ fontSize: '2em' }}
                            >
                                🎉
                            </span>
                        </p>
                    </div>
                </div>
                <div className="row flex-spaces">
                    <div className="col sm-8">
                        <div className="form-group">
                            <label htmlFor="pr-url">
                                <span>Pull Request URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="https://github.com/repo_owner/my_repo/pull/172"
                                id="pr-url"
                                style={{
                                    width: '100%'
                                }}
                                value={urlInput}
                                onChange={this.onChangePrUrl}
                            />
                        </div>
                    </div>
                </div>
                {!error &&
                    prUrl && (
                        <div className="card sm-6 md-4 flex-center row">
                            <UrlInfo url={prUrl} />
                        </div>
                    )}
                <div className="row flex-spaces">
                    <div className="col sm-8" id="error-container">
                        {error && (
                            <div className="alert alert-danger">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RepoInput
