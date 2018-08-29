import GeoPattern from 'geopattern'

const $body = document.getElementsByTagName('body')[0]

const setBackground = str => {
    $body.style.background = GeoPattern.generate(str).toDataUrl()
}

export { setBackground }
