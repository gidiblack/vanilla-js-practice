// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

const btn = document.querySelector('.switch-btn');
const video = document.querySelector('.video-container');

btn.addEventListener('click', function(){
    // check if btn does NOT contain class of slide
    if(!btn.classList.contains('slide')){
        // add class of slide
        btn.classList.add('slide');
        // pause video
        video.pause();
    } else {
        btn.classList.remove('slide');
        video.play();
    }
})

const preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
    preloader.classList.add('hide-preloader');
});