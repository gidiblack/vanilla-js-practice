// using selectors inside the element

const questions = document.querySelectorAll('.question');
// select all questions class in DOM
questions.forEach(function(q){
    // select btns in question
    const btn = q.querySelector('.question-btn');
    // add event listener to btns
    btn.addEventListener('click', function(){
        // check if item is not equal to the selected question then remove show-text class
        questions.forEach(function(item){
            if(item !== q){
                item.classList.remove('show-text');
            }
        });
        // show text of the question clicked
        q.classList.toggle('show-text');
    });
});


// traversing the dom
// const questionBtns = document.querySelectorAll('.question-btn');
// loop thru all buttons and add event listener for each of them
// questionBtns.forEach(function(btn){
//     btn.addEventListener('click', function(e){
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     });
// });