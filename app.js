// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
// click event listener on nav toggler
navToggle.addEventListener('click', function(){
    // Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    // check if parent div of links has a hieght of zero 
    if (containerHeight === 0) {
        // set parent div height to height of links
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        // set height to zero
        linksContainer.style.height = 0;
    }
});

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
// scroll event listener on window element
window.addEventListener('scroll', function(){
    // get vertical scroll height
    const scrollHeight = window.pageYOffset;
    // get navbar height
    const navHeight = navbar.getBoundingClientRect().height;
    // check if vertical scroll height is greater than navbar height
    if (scrollHeight > navHeight) {
        // add fixed nav class
        navbar.classList.add('fixed-nav');
    } else {
        // remove fixed nav class
        navbar.classList.remove('fixed-nav');
    }
    // check if scrollHeight is greater than 400
    if (scrollHeight > 400){
        // add class to show top link
        topLink.classList.add('show-link');
    } else {
        // remove class to show top link 
        topLink.classList.remove('show-link');
    }
});
// ********** smooth scroll ************
// select links
