import React, { Component, Fragment } from 'react'
import { createPortal } from 'react-dom'

import { parseUrl } from '../utils/url'
import octo from '../utils/octo'
import {
    APPROVAL_MESSAGES,
    REVIEW_COMMENTS,
    NUM_COMMITS_TO_COMMENT,
    NUM_FILES_TO_COMMENT,
    NUM_LINES_TO_COMMENT
} from '../consts'

const getRandomMessage = () => {
    const messageIndex = Math.round(
        Math.random() * (APPROVAL_MESSAGES.length - 1)
    )
    return APPROVAL_MESSAGES[messageIndex]
}

const getRandomComment = () => {
    const commentIndex = Math.round(
        Math.random() * (REVIEW_COMMENTS.length - 1)
    )
    return REVIEW_COMMENTS[commentIndex]
}

const getPatchedLines = patch => {
    const lines = patch.split('\n')
    return lines
        .map((l, i) => {
            if (l.indexOf('+') > -1) {
                return i
            }
        })
        .filter(d => d !== undefined)
        .slice(1)
}

const getRandomSubset = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len)
    if (n > len)
        throw new RangeError('getRandom: more elements taken than available')
    while (n--) {
        var x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
    }
    return result
}

async function asyncMap(array, callback) {
    const promises = []
    for (let index = 0; index < array.length; index++) {
        promises.push(await callback(array[index], index, array))
    }
    return promises
}

class UrlInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            approvePending: false
        }
        this.onClickApprove = this.onClickApprove.bind(this)
    }

    async onClickApprove() {
        const { url } = this.props
        const urlData = parseUrl(url)
        const repo = octo.repos(urlData.ownerName, urlData.repoName)
        const pull = repo.pulls(urlData.id)
        this.setState({
            approvePending: true
        })

        // comments
        try {
            const commitsRes = await pull.commits.fetch()
            const randomCommits = getRandomSubset(
                commitsRes.items,
                Math.min(commitsRes.items.length, NUM_COMMITS_TO_COMMENT)
            )
            await asyncMap(randomCommits, async commit => {
                const commitSha = commit.sha
                const res = await repo.commits(commitSha).fetch()
                const randomFiles = getRandomSubset(
                    res.files,
                    Math.min(res.files.length, NUM_FILES_TO_COMMENT)
                )
                return await asyncMap(randomFiles, async file => {
                    if (!file.patch || !file.additions) {
                        return
                    }
                    const patchedLines = getPatchedLines(file.patch)
                    const randomLines = getRandomSubset(
                        patchedLines,
                        Math.min(patchedLines.length, NUM_LINES_TO_COMMENT)
                    )
                    return await asyncMap(randomLines, async lineNumber => {
                        try {
                            return await pull.comments.create({
                                body: getRandomComment(),
                                commit_id: commitSha,
                                path: file.filename,
                                position: lineNumber
                            })
                        } catch (e) {
                            return
                        }
                    })
                })
            })
        } catch (e) {}

        // approval
        try {
            pull.reviews
                .create({
                    body: getRandomMessage(),
                    event: 'APPROVE'
                })
                .then(
                    repo => {
                        alert(`You've been approved! 👍`)
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
        } catch (e) {
            this.setState({
                error: e,
                approvePending: false
            })
        }
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
                        {approvePending ? 'Approving...' : 'Approve'}
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
