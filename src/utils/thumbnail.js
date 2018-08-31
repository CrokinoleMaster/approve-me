import thumbnail1 from '../images/thumbsup1.jpg'
import thumbnail2 from '../images/thumbsup2.jpg'
import thumbnail3 from '../images/thumbsup3.jpg'
import thumbnail4 from '../images/thumbsup4.jpg'
import thumbnail5 from '../images/thumbsup5.jpg'
import thumbnail6 from '../images/thumbsup6.jpg'
import thumbnail7 from '../images/thumbsup7.jpg'
import thumbnail8 from '../images/thumbsup8.jpg'
import thumbnail9 from '../images/thumbsup9.jpg'

const NUM_THUMBNAILS = 9

const getRandomThumbsUp = () => {
    const thumbnailNumber = Math.round(Math.random() * (NUM_THUMBNAILS - 1) + 1)
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
        case 6:
            return thumbnail6
        case 7:
            return thumbnail7
        case 8:
            return thumbnail8
        case 9:
            return thumbnail9
    }
}

export { getRandomThumbsUp }
