const countdownTextEl = document.getElementById('countdown-text');
const circle = document.getElementById('c2');
const time_per_question = 45

let countdownInterval = null
let timeLeft = null; // total time in seconds

function timer(){
    timeLeft--;
    countdownTextEl.textContent = timeLeft;

    // Change color based on remaining time
    if (timeLeft <= 15) {
        circle.style.stroke = '#ff0000'; // Red for last 15 seconds

    } else if (timeLeft <= 30) {
        circle.style.stroke = '#ffa500'; // Yellow from 30 to 15 seconds

    } else {
        circle.style.stroke = '#198051'; // Green for the initial 30 seconds

    }

    if (timeLeft <= 0) {
        nextQuestion(questions_global)
    }
}

questions_global = []

document.getElementById('nextButton').addEventListener('click', ()=>{
    nextQuestion(questions_global)
})
document.getElementById('Hints').addEventListener('click', ()=>{
    showHint(questions_global)
})

async function generateContent(apiKey, subject, level) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{
            parts: [{ 'text': ```Write a list of MCQ questions and answers and a hint. There should be 10 questions in total. ${subject}. On a scale of difficulty out of 5, the difficulty should be ${level}. Respond in json format as a list of questions. The question attribute is "question", "options" for options and "answer" for the answer, "hint" for the hint. Just the json format.``` }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error generating content:', error);
        return null;
    }
}

// generateContent(GOOGLE_API_KEY, 'Machine Learning with Python', 1)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

let current_index = 0;

function loadQuestions() {
    questions_global = [
        {
          "question": "What is the correct way to create a function in Python?",
          "options": ["def function_name():", "function function_name():", "create function_name():", "function:function_name()"],
          "answer": "def function_name():",
          "hint": "Python uses 'def' to define functions."
        },
        {
          "question": "Which of the following is used to insert a comment in Python?",
          "options": ["//", "#", "/* */", "<!-- -->"],
          "answer": "#",
          "hint": "Comments in Python start with a special symbol used for sharp notes."
        },
        {
          "question": "What will be the output of print(2 ** 3)?",
          "options": ["6", "8", "9", "None"],
          "answer": "8",
          "hint": "The '**' operator is used for exponentiation in Python."
        },
        {
          "question": "Which data type is mutable in Python?",
          "options": ["String", "Tuple", "List", "Integer"],
          "answer": "List",
          "hint": "Look for the data structure that allows modification after creation."
        },
        {
          "question": "How do you create a variable with the value 5 in Python?",
          "options": ["x = 5", "int x = 5", "var x = 5", "x := 5"],
          "answer": "x = 5",
          "hint": "Python does not require specifying data types when declaring variables."
        },
        {
          "question": "What does the len() function do?",
          "options": ["Returns the length of an object", "Converts a string to lowercase", "Returns a random number", "Checks if an item exists in a list"],
          "answer": "Returns the length of an object",
          "hint": "It's commonly used with strings and lists to count items or characters."
        },
        {
          "question": "What is the output of print(type(5))?",
          "options": ["<class 'int'>", "<type 'int'>", "integer", "int"],
          "answer": "<class 'int'>",
          "hint": "Python's type() function provides the class of the object."
        },
        {
          "question": "What is the purpose of the pass statement in Python?",
          "options": ["Terminates the program", "Does nothing and allows the program to continue", "Skips the current iteration", "Defines a new class"],
          "answer": "Does nothing and allows the program to continue",
          "hint": "This statement is useful as a placeholder in loops or functions."
        },
        {
          "question": "Which of these is the correct syntax to import a module in Python?",
          "options": ["import module_name", "include module_name", "require module_name", "using module_name"],
          "answer": "import module_name",
          "hint": "Python uses a specific keyword to bring external code into a script."
        },
        {
          "question": "What is the correct way to handle exceptions in Python?",
          "options": ["try-except", "try-catch", "try-error", "try-handler"],
          "answer": "try-except",
          "hint": "Python uses 'try' to test and a specific word to handle exceptions."
        },
        {
          "question": "How do you start a for loop in Python?",
          "options": ["for x in y:", "for (x in y):", "foreach (x in y):", "for x of y:"],
          "answer": "for x in y:",
          "hint": "The syntax for iteration in Python uses 'in'."
        },
        {
          "question": "What is the output of print(bool(0))?",
          "options": ["True", "False", "None", "0"],
          "answer": "False",
          "hint": "Zero is considered a 'falsy' value in Python."
        },
        {
          "question": "Which of the following is not a valid Python data type?",
          "options": ["List", "Dictionary", "Array", "Set"],
          "answer": "Array",
          "hint": "Python has a similar structure but uses lists instead."
        },
        {
          "question": "How do you create an empty dictionary in Python?",
          "options": ["dict = {}", "dict = []", "dict = ()", "dict = empty()"],
          "answer": "dict = {}",
          "hint": "Dictionaries use curly braces for their structure."
        },
        {
          "question": "Which of these methods adds an item to a list?",
          "options": ["append()", "add()", "insert()", "extend()"],
          "answer": "append()",
          "hint": "It directly appends to the end of the list."
        },
        // {
        //   "question": "What is the output of 'hello'.upper()?",
        //   "options": ["HELLO", "hello", "Hello", "None"],
        //   "answer": "HELLO",
        //   "hint": "The function converts a string to uppercase."
        // },
        // {
        //   "question": "What is the purpose of the 'return' statement in Python?",
        //   "options": ["To exit a loop", "To return a value from a function", "To define a variable", "To continue a loop"],
        //   "answer": "To return a value from a function",
        //   "hint": "It is used within functions to send a value back to the caller."
        // },
        // {
        //   "question": "Which keyword is used to define a class in Python?",
        //   "options": ["class", "define", "struct", "object"],
        //   "answer": "class",
        //   "hint": "It’s the same as the word used in object-oriented programming."
        // },
        // {
        //   "question": "What does the 'is' keyword check in Python?",
        //   "options": ["If two variables are identical", "If two variables have the same value", "If two variables are equal", "If two variables have the same type"],
        //   "answer": "If two variables are identical",
        //   "hint": "'is' checks if two variables point to the same object."
        // },
        // {
        //   "question": "What will be the output of print('Hello, World!'[7:12])?",
        //   "options": ["World", "World!", "Hello", "lo, W"],
        //   "answer": "World",
        //   "hint": "Slicing in Python is inclusive of the start index and exclusive of the end index."
        // }
      ]
      
    nextQuestion()
}

loadQuestions()


// Function to load the next question
function nextQuestion() {
    if (current_index < questions_global.length) {
        clearInterval(countdownInterval)
        timeLeft = time_per_question
        countdownTextEl.textContent = time_per_question;
        circle.style.animationDuration = `0s`
        circle.style.animationDuration = `${time_per_question}s`
        countdownInterval = setInterval(timer, 1000);
        const question = questions_global[current_index];
        document.getElementById("hint-text").textContent = "";

        // Set the question text
        document.getElementById("question-text").textContent = question.question;

        // Set the options
        const options = document.querySelectorAll(".option-button");
        options.forEach((button, index) => {
            button.textContent = `${String.fromCharCode(65 + index)}: ${question.options[index]}`;
        });

        // Increment the current index for the next question
        current_index++;

    } else {
        alert("No more questions!");
    }
}
function showHint(){
    if (current_index < questions_global.length){
        document.getElementById("hint-text").textContent = questions_global[current_index].hint;
    }
}
localStorage.setItem('finalScore', currentScore);
localStorage.setItem('totalQuestions', totalQuestions);
localStorage.setItem('correctAnswers', correctAnswers);
localStorage.setItem('performanceData', JSON.stringify(performanceData));
window.location.href = '../pages/results.html';


