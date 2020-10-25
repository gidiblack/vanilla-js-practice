const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "When did Nigerian become a Republic?",
        a: "1996",
        b: "1963",
        c: "1960",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "What is the capital of Kenya?",
        a: "Nairobi",
        b: "Tokyo",
        c: "Lagos",
        d: "Kigali",
        correct: "a",
    },
    {
        question: "Who was the President of the US in 2010?",
        a: "Donald Trump",
        b: "George Bush",
        c: "Barrack Obama",
        d: "Bill CLinton",
        correct: "c",
    },
    {
        question: "What does DVD stand for?",
        a: "Digital Version Database",
        b: "Diagonal Visible Divide",
        c: "Digital Versatile Disk",
        d: "none of the above",
        correct: "c",
    },
    {
        question: "Which of these is NOT a programming language?",
        a: "Python",
        b: "Ruby",
        c: "C+",
        d: "Bootstrap",
        correct: "d",
    },
    {
        question: "Which of these is an output device?",
        a: "LED Screen",
        b: "Keyboard",
        c: "Touchpad",
        d: "Scanner",
        correct: "a",
    }
];
// declare element variables
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answers = document.querySelectorAll('.answer');
// set quiz and score counters to 0
let currentQuiz = 0;
let score = 0;

loadQuiz();
// function to load quiz data when the page loads 
function loadQuiz(){
    // invoke function to deselect answers
    deselectAnswers();
    // get first quiz data by declaring const
    const currentQuizData = quizData[currentQuiz]; 
    // set inner text of question element 
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

// Get value of selected answer
function getSelected(){
    // set answer to undefined so as to return it when the function executes
    let answer = undefined;
    // loop thru radio buttons and thier values
    answerEls.forEach((answerEl) => {
        // check if radio btn is selected
        if (answerEl.checked) {
            // set answer to id of selected radio element
            answer = answerEl.id;
        }
    });
    return answer;
}
// function to deselect radio buttons when new quiz loads
function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

// click event listener on submit btn
submitBtn.addEventListener('click', () => {
    // store answer returned from getSelected function in 'answer' const
    const answer = getSelected();
    
    if (answer) {
        // check if answer selected is correct
        if (answer === quizData[currentQuiz].correct) {
            // increment score counter by 1
            score++;
        }
        // increment quiz counter by 1
        currentQuiz++;
        // check if quiz counter is less than total quiz length
        if (currentQuiz < quizData.length) {
            // load new quiz
            loadQuiz();
        } else {
            // else display this message
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});