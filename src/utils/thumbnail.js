import thumbnail1 from '../images/thumbsup1.jpg'
import thumbnail2 from '../images/thumbsup2.jpg'
import thumbnail3 from '../images/thumbsup3.jpg'
import thumbnail4 from '../images/thumbsup4.jpg'
import thumbnail5 from '../images/thumbsup5.jpg'

const getRandomThumbsUp = () => {
    const thumbnailNumber = Math.round(Math.random() * (5 - 1) + 1)
    switch (thumbnailNumber) {
        case 1:
            return thumbnail1
        case 2:
            return thumbnail2
        case 3:
            return thumbnail3
        case 4:
            return thumbnail4
        case 5:
            return thumbnail5
    }
}

export { getRandomThumbsUp }
