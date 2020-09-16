'use strict';
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 44.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  }
];

const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');

// load items and buttons when window loads
window.addEventListener('DOMContentLoaded', function (){
  displayMenuItems(menu);
  displayMenuBtns();
});

function displayMenuItems(menuItems){
   // map method iterates over each array entry
   let displayMenu = menuItems.map(function(item){
    // return dynamic template string using item props in menu object 
    return `<article class="menu-item">
              <img src=${item.img} alt=${item.title} class="photo">
              <div class="item-info">
                <header>
                  <h4>${item.title}</h4>
                  <h4 class="price">$${item.price}</h4>
                </header>
                <p class="item-text">${item.desc}</p>
              </div>
            </article>`;
  });
  // join all items together - before this, items were seperated by commas, this removes the commas
  displayMenu = displayMenu.join('');
  // display menu inside parent div
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuBtns(){
  // get unique categories by calling reduce method which takes in two parameters in the callback function and must always return the first function param - values which references the returned array containing 'all'.
  const categories = menu.reduce(function(values, item){
    // check if values does NOT include a category property from item object then add that category to values that already has initial string of "all"
    if(!values.includes(item.category)){
      values.push(item.category);
    }  
    return values
  }, ['all']); // reduce method usually needs an initial value - this is set to an array with one string of "all" because all is not a preset category
  // map thru each item in categories array, return template literal, then remove commas with join method 
  const categoryBtns = categories.map(function(category){
    return `<button class="filter-btn" data-category=${category} type="button">${category}</button>`;
  }).join('');
  // add btns to html
  btnContainer.innerHTML = categoryBtns;
  // select btns after adding to html
  const filterBtns = document.querySelectorAll('.filter-btn');

  // iterate thru each filter btn and add click event listener 
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
      // dataset property targets html element with the "data-" prefix attribute
      const category = e.currentTarget.dataset.category;
      // create new array using filter method on menu array to get category from items in 'menu'
      const menuCategory = menu.filter(function (menuItem){
        // check if menuItem category property is equal to the category dataset and return menuItem
        if(menuItem.category === category) {
          return menuItem;
          // e.g if category parsed into menuItem param is breakfast, only menu items with category property of breakfast will populate the new menuCategory array
        }
      });
      // check if category parsed into menuItem param is all then display all items - 'menu' array else display 'menuCategory' array that was populated by filter method
      if (category === "all"){
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    }); 
  });
}