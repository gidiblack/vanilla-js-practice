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
    // pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
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
const scrollLinks = document.querySelectorAll('.scroll-link');
// add click event listener for Each link
scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
        // prevent default scrolling
        e.preventDefault();
        // slice the first character[0] off the attribute string -- slice extracts a section of a string without modifying original string
        const id = e.currentTarget.getAttribute('href').slice(1); 
        // console.log(id);
        const element = document.getElementById(id);
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');
        //offsetTop - A Number, representing the top position of the element, in pixels
        let position = element.offsetTop - navHeight;
        // console.log(position);
        // check if fixedNav returns false
        if (!fixedNav){
            // subtract navHeight from position
            position = position - navHeight;
        }
        // check if navHeight is greather than 85 (ie on mobile screens)
        if (navHeight > 85){
            // add containerHeight to position
            position = position + containerHeight;
        }
        // navigate to specific sections
        window.scrollTo({
            left: 0,
            top: position
        });
        // remove container height on small screens when link is clicked
        linksContainer.style.height = 0;
    });
});