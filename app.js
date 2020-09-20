// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// declare edit options
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// load items from local storage
window.addEventListener('DOMContentLoaded', setUpItems);

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    // set id to string of new date in milliseconds
    const id = new Date().getTime().toString();
    // check if value returns true and edidFlag is false
    if(value && !editFlag){
        // call create list item function and parse in 'id' and 'value'
        createListItem(id, value);
        // display alert
        displayAlert("item added to list", "success");
        // show container
        container.classList.add('show-container');
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    }
    // check if value and edidFlag returns true
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('item edited', 'success');
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else{
        displayAlert("please enter value", "danger");
    }
}

// display alert function
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert after 1.5s
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1500);
}

// clear items function
function clearItems (){
    const items = document.querySelectorAll('.grocery-item');
    // check if items lenght is more than 0
    if(items.length > 0){
        // remove each item
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('list cleared', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete item function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}

// edit item function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML
    // set edit flag to true
    editFlag = true;
    // set edit id to dataset id generated
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

// set to default state
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = 'submit';
 }

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    // save id and value parameters to local storage id and vale properties
    const listItems = {id:id, value:value};
    // set items to the result of the ternary operator in the function
    let items = getLocalStorage();
    // push listItems to items array
    items.push(listItems);
    // convert items array to string with stringify method and set to list in local storage 
    localStorage.setItem('list', JSON.stringify(items));
    console.log(localStorage.getItem('list'));
}

function removeFromLocalStorage(id){
    // set items to the result of the ternary operator in the function
    let items = getLocalStorage();
    // filter thru each of the items (filter works with 'let' keyword)
    items = items.filter(function(item){
        // check for item the doesn't match the id of item clicked
        if(item.id !== id){
            // return that item
            return item
        }
    });
    // set local storage to new items returned after removing the one matching the id clicked
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value){
    // set items to the result of the ternary operator in the function
    let items = getLocalStorage();
    // map thru each of the items to get return separate arrays similar to filter method
    items = items.map(function(item){
        // check id of item is the same as id parsed into the function
        if(item.id === id){
            // set new value of item
            item.value = value;
        }
        // else return item as is
        return item;
    });
    // set local storage to new items returned after removing the one matching the id clicked
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage(){
    // if 'list' exists in localStorage set items to list, if list doesn't exist in localStorage set items to empty array
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// ****** SETUP ITEMS **********
function setUpItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
}

function createListItem(id, value){
    const element = document.createElement('article');
        // add class to new element
        element.classList.add('grocery-item');
        // add id to new element
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                                <button class="edit-btn">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="delete-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>`
        // set up event listeners on buttons after you have access to them since they're added dynamically
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        // append child
        list.appendChild(element);
}