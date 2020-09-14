'use strict';
// set initial count to 0
let count = 0;
const value = document.querySelector("#value");

// select all buttons to use forEach method on the nodelist returned (nodelist is array-like)
const btns = document.querySelectorAll(".btn");

//parameter parsed into forEach callback function reps each item/element in the 'btns' nodelist
btns.forEach(function (btn) {
    // e parameter represents event object to target which btn was clicked
    btn.addEventListener('click', function (e){
        const styles =  e.currentTarget.classList;
        // conditional statements to check if currentTarget containes certain classes
        if (styles.contains('decrease')){
            count--;
        } else if (styles.contains('increase')){
            count++;
        } else if (styles.contains('reset')){
            count = 0;
        }
        // check if count is greater than, less than or equal to 0 then change value color
        if (count > 0){
            value.style.color = 'green';
        }
        if (count < 0){
            value.style.color = 'red';
        }
        if (count === 0){
            value.style.color = "black";
        }
        value.textContent = count;
        console.log(value);
    });
});
