const parseUrl = url => {
    try {
        const parts = url.pathname.split('/')
        return {
            ownerName: parts[1],
            repoName: parts[2],
            type: parts[3],
            id: parts[3]
        }
    } catch (e) {
        console.error(e)
        return {
            ownerName: '',
            repoName: '',
            type: '',
            id: ''
        }
    }
}

export { parseUrl }
