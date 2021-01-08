const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
    // async function to fetch data from API
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    // save response in json object
    const respData = await resp.json();
    // assign first recipe to randomMeal variable
    const randomMeal = respData.meals[0];
    // use randomMeal as a param to addMeal to the screen
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch( "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

    const respData = await resp.json();

    const meal = respData.meals[0];

    return meal;
}


async function getMealsBySearch(term){
    const resp = await fetch( "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term );

    const respData = await resp.json();

    const meals = respData.meals;

    return meals;
}

// add meal to screen
function addMeal(mealData, random = false ){
    
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
    <div class="meal-header">
        ${ random ? `<span class="random"> Random Recipe </span>` : "" }
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>
`;
    // select fav-btn and add Event listener to toggle active class on click 
    const btn = meal.querySelector(".meal-body .fav-btn");
    
    btn.addEventListener("click", () => {
        // check if btn is active then remove class and run remove from LS function
        if (btn.classList.contains("active")){
            removeMealLS(mealData.idMeal);
            btn.classList.remove('active');
        } 
        // else add active class and run add to LS function
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active');
        }
        fetchFavMeals();
    });
    // show recipe on click
    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    // append new meals to screen
    mealsEl.appendChild(meal);
}
// add meal to local storage
function addMealLS(mealId) {
    // first get meals from LS if any
    const mealIds = getMealsLS();
    // add new meal to LS array
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

// remove meal from Local storage
function removeMealLS(mealId) {
    // first get meals from LS if any
    const mealIds = getMealsLS();
    // filter ids that are NOT the mealId parsed to remove the parsed meal
    localStorage.setItem( "mealIds", JSON.stringify(mealIds.filter(id => id !== mealId)));
}

// get meals data stored in Local storage
function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    // return mealIds if any else return empty array
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    // clean container
    favoriteContainer.innerHTML = "";

    // get mealIds by invoking func
    const mealIds = getMealsLS();

    // loop thru each id then addFavMeal
    for(let i=0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal =  await getMealById(mealId);
        // meals.push(meal);

        addFavMeal(meal);
    }
}

function addFavMeal(mealData){
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    // select clear button
    const btn = favMeal.querySelector(".clear");
    // add listener to remove meal from ls
    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);
        // invoke fetch fav meals func
        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
    // clean it up
    mealInfoEl.innerHTML = "";

    // update the Meal info
    const mealEl = document.createElement("div");

    const ingredients = [];

    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${
                    mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(
                (ing) => `<li>${ing}</li>`).join("")
            }
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove("hidden");
}

// search for meals
searchBtn.addEventListener("click", async () => {
    // clean container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    // save search results in meals
    const meals = await getMealsBySearch(search);
    // check if meals is NOT empty 
    if (meals) {
        meals.forEach((meal) => {
            // add each meal to screen
            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});
