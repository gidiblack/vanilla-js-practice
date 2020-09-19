'use strict';
const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

// add click event listener to about element
about.addEventListener('click', function(e){
    const id = e.target.dataset.id;
    // check if id returns true
    if(id){
        btns.forEach(function(btn){
            // remove active from all btns
            btn.classList.remove('active');
            // add active to btn clicked
            e.target.classList.add('active');
        });
        // hide all article content
        articles.forEach(function(content){
            content.classList.remove('active');
        })
        // set element to id of button clicked
        const element = document.getElementById(id);
        // add active class to element
        element.classList.add('active');
    }
});