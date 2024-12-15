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
        clearInterval(countdownInterval);
    }
}

questions_global = []

document.getElementById('nextButton').addEventListener('click', ()=>{
    nextQuestion(questions_global)
})

async function generateContent(apiKey, subject, level) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{
            parts: [{ 'text': ```Write a list of MCQ questions and answers. There should be 20 questions in total. ${subject}. On a scale of difficulty out of 5, the difficulty should be ${level}. Respond in json format as a list of questions. The question attribute is "question", "options" for options and "answer" for the answer. Just the json format.``` }]
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
            "question": "Which library is commonly used for numerical computations in Python, often forming the base for machine learning?",
            "options": ["pandas", "numpy", "matplotlib", "seaborn"],
            "answer": "numpy"
        },
        {
            "question": "Which library is primarily used for data manipulation and analysis in Python?",
            "options": ["scikit-learn", "numpy", "pandas", "tensorflow"],
            "answer": "pandas"
        },
        {
            "question": "What does 'ML' stand for?",
            "options": ["Machine Logic", "Machine Learning", "Mathematical Language", "Model Learning"],
            "answer": "Machine Learning"
        },
        {
            "question": "Which of these is a popular machine learning library in Python?",
            "options": ["pygame", "scikit-learn", "requests", "beautifulsoup"],
            "answer": "scikit-learn"
        },
        {
            "question": "What is the process of finding patterns in data?",
            "options": ["Data visualization", "Data cleaning", "Machine learning", "Data storage"],
            "answer": "Machine learning"
        },
        {
            "question": "What is 'training' a machine learning model?",
            "options": ["The process of running the code", "The process of making the model predict", "The process of showing the model data to learn from", "The process of deploying the model"],
            "answer": "The process of showing the model data to learn from"
        },
        {
            "question": "Which type of machine learning is where we teach a model with labeled data?",
            "options": ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Deep Learning"],
            "answer": "Supervised Learning"
        },
        {
            "question": "In supervised learning, what are 'labels'?",
            "options": ["The input data", "The predicted output", "The known output for input data", "The model's parameters"],
            "answer": "The known output for input data"
        },
        {
            "question": "Which of the following is a basic step in a machine learning project?",
            "options": ["Uploading videos to YouTube", "Data collection and cleaning", "Ignoring the dataset", "Only using pre-built models"],
            "answer": "Data collection and cleaning"
        },
        {
            "question": "What is an 'algorithm' in machine learning?",
            "options": ["A specific dataset", "A set of instructions to solve a problem", "A way to organize data", "A measure of model accuracy"],
            "answer": "A set of instructions to solve a problem"
        },
        {
            "question": "What is a 'model' in the context of machine learning?",
            "options": ["A type of computer", "A function that makes predictions", "A type of input data", "A way to store data"],
            "answer": "A function that makes predictions"
        },
        {
            "question": "Which of these is a common task in machine learning?",
            "options": ["Writing a book", "Classifying images", "Cooking a meal", "Designing a building"],
            "answer": "Classifying images"
        },
        {
            "question": "What is the purpose of a train-test split?",
            "options": ["To format data as excel sheet", "To have separate dataset for model training and evaluation", "To confuse the model", "To avoid using the model"],
            "answer": "To have separate dataset for model training and evaluation"
        },
        {
            "question": "What is feature engineering?",
            "options": ["Ignoring data", "Selecting or creating important input features", "Writing model algorithms", "Saving models"],
            "answer": "Selecting or creating important input features"
        },
        {
            "question": "What does the 'fit' method in scikit-learn typically do?",
            "options": ["Displays the results", "Trains the model on training data", "Plots the data", "Deletes the data"],
            "answer": "Trains the model on training data"
        },
        {
            "question": "What is 'prediction' in machine learning?",
            "options": ["The accuracy of the model", "The input data", "The model's estimated output", "The way to fit model"],
            "answer": "The model's estimated output"
        },
        {
            "question": "What does 'import' do in python when you import a library?",
            "options": ["Deletes a library", "Loads library functionality into the program", "Opens a new file", "Saves the code"],
            "answer": "Loads library functionality into the program"
        },
        {
            "question": "What is the primary purpose of 'matplotlib'?",
            "options": ["Data analysis", "Data cleaning", "Data visualization", "Text processing"],
            "answer": "Data visualization"
        },
        {
            "question": "Which of these is an example of a simple classification algorithm?",
            "options": ["Linear Regression", "Logistic Regression", "Clustering", "Dimensionality Reduction"],
            "answer": "Logistic Regression"
        },
        {
            "question": "What is a common performance metric for classification?",
            "options": ["Mean Squared Error", "Accuracy", "R-squared", "Variance"],
            "answer": "Accuracy"
        }
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


