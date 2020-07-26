//https://github.com/noobcola/ios-parallax-effect/blob/master/src/ios-parallax.js
//从jq中抽离
//
// Element.prototype.iosParallax = function(options) {
const iosParallax = function($ele, options) {
    let base = $ele
    const $element = $ele
    let centerCoordinates = { x: 0, y: 0 }
    let targetCoordinates = { x: 0, y: 0 }
    let transitionCoordinates = { x: 0, y: 0 }

    function getBackgroundImageUrl() {
        let backgroundImage = window.getComputedStyle($element, null).getPropertyValue('background-image').match(/url\(.*\)/ig)
        if (!backgroundImage || backgroundImage.length < 1) {
            throw 'No background image found'
        }
        return backgroundImage[0].replace(/url\(|'|"|'|"|\)$/ig, "")
    }

    function getBackgroundImageSize() {
        let img = new Image
        img.src = getBackgroundImageUrl()
        return { width: img.width, height: img.height }
    }

    function setCenterCoordinates() {
        let bgImgSize = getBackgroundImageSize()
        centerCoordinates.x = -1 * Math.abs(bgImgSize.width - $element.offsetWidth) / 2
        centerCoordinates.y = -1 * Math.abs(bgImgSize.height - $element.offsetWidth) / 2
        targetCoordinates.x = centerCoordinates.x
        targetCoordinates.y = centerCoordinates.y
        transitionCoordinates.x = centerCoordinates.x
        transitionCoordinates.y = centerCoordinates.y
    }

    function bindEvents() {
        $element.onmousemove = function(e) {
            let width = base.options.movementFactor / $element.offsetWidth
            let height = base.options.movementFactor / $element.offsetWidth
            let cursorX = e.pageX - (document.body.clientWidth / 2)
            let cursorY = e.pageY - (document.body.clientHeight / 2)
            targetCoordinates.x = width * cursorX * -1 + centerCoordinates.x
            targetCoordinates.y = height * cursorY * -1 + centerCoordinates.y
        }

        // Slowly converge the background image position to the target coordinates in 60 FPS
        let loop = setInterval(function() {
            transitionCoordinates.x += ((targetCoordinates.x - transitionCoordinates.x) / base.options.dampenFactor)
            transitionCoordinates.y += ((targetCoordinates.y - transitionCoordinates.y) / base.options.dampenFactor)
            $element.style.backgroundPosition = `${transitionCoordinates.x}px ${transitionCoordinates.y}px`
        }, 16)

        window.onresize = function() {
            setCenterCoordinates();
        }
        // There's a problem with getting image height and width when the image isn't loaded.
        let img = new Image
        img.src = getBackgroundImageUrl()
        img.onload = function() {
            setCenterCoordinates()
        }
    }
    const defaultOptions = {
        // How fast the background moves
        movementFactor: 50,
        // How much to dampen the movement (higher is slower)
        dampenFactor: 36
    }

    base.init = function() {
        base.options = Object.assign(defaultOptions, options)
        bindEvents()
    }
    base.init()
}
export default iosParallax