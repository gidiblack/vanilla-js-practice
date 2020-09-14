const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener('click', function (){
    // get random number between 0 - 3(array length)
    const randomNumber = getRandomNumber();
    console.log(randomNumber);
    //apply color in "colors" array to background color of document body
    document.body.style.backgroundColor = colors[randomNumber];
    //change text inside "color" span to current color code
    color.textContent = colors[randomNumber];
});

// get random number by multiplying the length of the array with the result of math.random which is always between 0 - 1, never 1...then wrap with math.floor to round down to the nearest interger (e.g 1.56767 becomes 1)
function getRandomNumber (){
    return Math.floor(Math.random() * colors.length);
}
