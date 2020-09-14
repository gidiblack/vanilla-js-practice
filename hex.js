const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener('click', function (){
    // variable to hold # tag
    let hexColor = '#';
    // for loop to add 6 values from the "hex" array to hexColor
    for(let i = 0; i < 6; i++){
        hexColor += hex[getRandomNumber()];
    }

    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
});

// get random number by multiplying the length of the array with the result of math.random which is always between 0 - 1, never 1...then wrap with math.floor to round down to the nearest interger (e.g 1.56767 becomes 1)
function getRandomNumber () {
    return Math.floor(Math.random() * hex.length);
}