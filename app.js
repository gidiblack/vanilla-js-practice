'use strict';
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const timerItems = document.querySelectorAll('.deadline-format h4');
// Date method takes in year, month, day, hours, minutes, seconds -- note that month selection is zero index base
let futureDate = new Date(2020, 11, 24, 18, 30, 0);
// console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
// getMonth method returns zero index base value e.g 4 === May
let month = months[futureDate.getMonth()];

const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`;
// getTime method returns the date in milliseconds
const futureTime = futureDate.getTime();

function getRemainingTime(){
    const today = new Date().getTime();
    const t = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr

    // values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    // calculate remaining day values
    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour); // % returns the remainder
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);
    
    // set values array
    const values = [days, hours, minutes, seconds]; 
    // set format when   time is less than 10
    function format(item){
        if(item < 10){
            return item = `0${item}`
        }
        return item
    }
    // add values to each html element
    timerItems.forEach(function(item, index){
        item.innerHTML = format(values[index]);
    });
    // check if countdown has ended
    if(t < 0){
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, the giveaway has expired</h4>`
    }
}
// countdown interval method called every second 
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();