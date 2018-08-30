import React, { Component, Fragment } from 'react'

class RepoInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prUrl: ''
        }
        this.onChangePrUrl = this.onChangePrUrl.bind(this)
    }

    onChangePrUrl(e) {
        this.setState({
            prUrl: e.target.value
        })
    }

    render() {
        const { prUrl } = this.state
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
                                placeholder="https://github.com/mycompany/myrepo/pull/172"
                                id="pr-url"
                                style={{
                                    width: '100%'
                                }}
                                value={prUrl}
                                onChange={this.onChangePrUrl}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RepoInput
