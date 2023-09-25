const { decluttering } = require('./decluttering-challenge')

const { selfcare } = require('./selfcare-challenge')

const challenges = [
    {
        id: 'decluttering',
        name: 'Decluttering',
        icon: '/images/icons8-clean-64.png',
        content: decluttering
    },
    {
        id: 'selfcare',
        name: 'Selfcare',
        icon: '/images/icons8-mirror-64.png',
        content: selfcare
    },

]

module.exports = {
    challenges
}