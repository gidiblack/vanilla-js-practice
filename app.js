// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    // set id to string of new date in milliseconds
    const id = new Date().getTime().toString();
    // check if value returns true and edidFlag is false
    if(value && !editFlag){
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
        // append child
        list.appendChild(element);
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
        console.log('editing');
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
    // localStorage.removeItem('list');
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
    console.log("saved to local storage");
}

// ****** SETUP ITEMS **********
