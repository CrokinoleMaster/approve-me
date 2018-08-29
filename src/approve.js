const Octokat = require('octokat')

var octo = new Octokat({ token: process.env.REACT_APP_APPROVE_ME_TOKEN })

var repo = octo.repos('orbitalinsight', 'frontend')
const pull = repo.pulls(172)
pull.reviews.create()
pull.reviews.fetch().then(console.log)
