const { cooking } = require('./cooking-challenge')
const { crafting } = require('./crafting-challenge')
const { decluttering } = require('./decluttering-challenge')
const { digitalDetox } = require('./digital-detox-challenge')
const { movies } = require('./movie-challenge')
const { reading } = require('./reading-challenge')

const { selfcare } = require('./selfcare-challenge')
const { socializing } = require('./social-challenge')

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
    {
        id: 'reading',
        name: 'Reading',
        icon: '/images/icons8-book-64 (1).png',
        content: reading
    },
    {
        id: 'cooking',
        name: 'Cooking',
        icon: '/images/icons8-food-64.png',
        content: cooking
    },
    {
        id: 'movies',
        name: 'Movies',
        icon: '/images/icons8-movie-64.png',
        content: movies
    },
    {
        id: 'social',
        name: 'Social',
        icon: '/images/icons8-user-groups-64.png',
        content: socializing
    },
    {
        id: 'digitalDetox',
        name: 'Digital Detox',
        icon: '/images/icons8-computer-64.png',
        content: digitalDetox
    },
    {
        id: 'crafting',
        name: 'Crafting',
        icon: '/images/icons8-hammer-64.png',
        content: crafting
    },

]
 
module.exports = {
    challenges
}