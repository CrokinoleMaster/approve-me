const Octokat = require('octokat')

const octo = new Octokat({ token: process.env.REACT_APP_APPROVE_ME_TOKEN })

const repo = octo.repos('orbitalinsight', 'frontend')
const pull = repo.pulls(172)
// pull.reviews
//     .create({
//         body: 'test',
//         event: 'APPROVE'
//     })
//     .then(console.log)
pull.reviews.fetch().then(console.log)
// pull.reviews(150808372)
//     .remove()
//     .then(console.log)

export default octo
