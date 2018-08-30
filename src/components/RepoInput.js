import React, { Component, Fragment } from 'react'

import { setBackground } from '../utils/background'
import PrInfo from './PrInfo'

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
        // const { prUrl } = this.state
        // if (url.hostname !== 'github.com') {
        //     console.error(`hostname '${url.hostname}' is not github.com`)
        // }
    }

    readPrUrl() {
        const { urlInput } = this.state
        if (urlInput.length) {
            try {
                const prUrl = new URL(urlInput)
                this.setState({
                    prUrl
                })
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
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    style={{
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    {error.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <PrInfo url={prUrl} />
            </Fragment>
        )
    }
}

export default RepoInput
