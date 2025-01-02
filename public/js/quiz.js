const countdownTextEl = document.getElementById('countdown-text');
const circle = document.getElementById('c2');
const time_per_question = 45
const GOOGLE_API_KEY="AIzaSyDlfmn5W5RQeAUPsYfbDrDcVvHnx6qlCUE"
const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get("course");
const step = urlParams.get("step");
const answers = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

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

document.getElementById('optionA').addEventListener('click', ()=>{
  answers[current_index-1] = 0;
})

document.getElementById('optionB').addEventListener('click', ()=>{
  answers[current_index-1] = 1;
})

document.getElementById('optionC').addEventListener('click', ()=>{
  answers[current_index-1] = 2;
})

document.getElementById('optionD').addEventListener('click', ()=>{
  answers[current_index-1] = 3;
})

async function generateContent(apiKey, subject, level) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Write a list of MCQ questions and answers and a hint. There should be 10 questions in total. The subject is "${subject}". On a scale of difficulty out of 5, the difficulty should be ${level}. Respond in JSON format as a list of questions. The question attributes should be "question", "options" as a list, "answer" as the index of the list, and "hint".`
          }
        ]
      }
    ]
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
    console.error("Error generating content:", error);
    return null;
  }
}
let current_index = 0;

async function loadQuestions() {


  // questions_global = [
  //   {
  //     "question": "Which of the following is an example of supervised learning?",
  //     "options": [
  //       "Clustering customer data",
  //       "Predicting house prices based on features",
  //       "Finding patterns in unlabelled data",
  //       "Generating new data points"
  //     ],
  //     "answer": 1,
  //     "hint": "Supervised learning involves labeled data."
  //   },
  //   {
  //     "question": "What does the term 'overfitting' refer to in machine learning?",
  //     "options": [
  //       "A model performing well on training data but poorly on unseen data",
  //       "A model that underperforms on training data",
  //       "A model with too few parameters",
  //       "A model with too much regularization"
  //     ],
  //     "answer": 0,
  //     "hint": "Overfitting occurs when the model is too complex and memorizes the training data."
  //   },
  //   {
  //     "question": "Which of these algorithms is commonly used for classification problems?",
  //     "options": [
  //       "Linear Regression",
  //       "K-Nearest Neighbors (KNN)",
  //       "K-Means Clustering",
  //       "Principal Component Analysis (PCA)"
  //     ],
  //     "answer": 1,
  //     "hint": "Classification problems often involve predicting categories."
  //   },
  //   {
  //     "question": "What is the purpose of a validation dataset?",
  //     "options": [
  //       "To train the model",
  //       "To test the model on unseen data",
  //       "To fine-tune hyperparameters",
  //       "To generate predictions"
  //     ],
  //     "answer": 2,
  //     "hint": "Validation data helps optimize the model without testing it."
  //   },
  //   {
  //     "question": "Which metric is most appropriate for evaluating a regression model?",
  //     "options": [
  //       "Accuracy",
  //       "Precision",
  //       "Mean Squared Error (MSE)",
  //       "Confusion Matrix"
  //     ],
  //     "answer": 2,
  //     "hint": "Regression models require metrics that measure prediction errors."
  //   },
  //   {
  //     "question": "What is the purpose of regularization in machine learning?",
  //     "options": [
  //       "To increase the model's complexity",
  //       "To reduce overfitting",
  //       "To improve training speed",
  //       "To evaluate the model"
  //     ],
  //     "answer": 1,
  //     "hint": "Regularization discourages the model from relying too much on specific features."
  //   },
  //   {
  //     "question": "Which of the following is NOT a type of neural network?",
  //     "options": [
  //       "Convolutional Neural Network (CNN)",
  //       "Recurrent Neural Network (RNN)",
  //       "Bayesian Neural Network",
  //       "Decision Tree Neural Network"
  //     ],
  //     "answer": 3,
  //     "hint": "Neural networks typically don't use tree structures."
  //   },
  //   {
  //     "question": "What does a confusion matrix measure?",
  //     "options": [
  //       "The accuracy of a regression model",
  //       "The number of correct and incorrect predictions for classification",
  //       "The loss during training",
  //       "The similarity between clusters"
  //     ],
  //     "answer": 1,
  //     "hint": "A confusion matrix is a table used for classification evaluations."
  //   },
  //   {
  //     "question": "Which of these techniques can be used to handle missing data?",
  //     "options": [
  //       "Drop rows with missing values",
  //       "Replace missing values with the mean or median",
  //       "Use algorithms that support missing values",
  //       "All of the above"
  //     ],
  //     "answer": 3,
  //     "hint": "There are multiple ways to deal with missing data."
  //   },
  //   {
  //     "question": "Which activation function is commonly used in the output layer for binary classification?",
  //     "options": [
  //       "ReLU",
  //       "Sigmoid",
  //       "Tanh",
  //       "Softmax"
  //     ],
  //     "answer": 1,
  //     "hint": "Binary classification outputs probabilities between 0 and 1."
  //   }
  // ]

  // nextQuestion(); // Load the first question


  // return;

  try {
    const data = await generateContent(GOOGLE_API_KEY, courseName, );

    if (data && data.candidates && data.candidates[0].content) {
      const rawText = data.candidates[0].content.parts[0].text;
      let sanitizedText;
      try {
        // Remove backticks and trim the response
          sanitizedText = rawText
          .replace(/```json\s*/g, "")  // Remove leading ```json and any leading whitespace
          .replace(/\s*```/g, "")      // Remove trailing backticks and any trailing whitespace
          .trim();                    // Remove extra whitespace from the start and end

        console.log("Sanitized Text:", sanitizedText); // Debugging log

        // Parse the sanitized JSON
        const parsedQuestions = JSON.parse(sanitizedText);
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'block';

        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          console.log(parsedQuestions);
          questions_global = parsedQuestions; // Save parsed questions
          current_index = 0; // Reset the question index
          nextQuestion(); // Load the first question
        } else {
          throw new Error("Parsed JSON is valid but doesn't contain questions.");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON from API:", jsonError);
        console.error("Raw API Response:", rawText);
        console.error("Sanitized API Response:", sanitizedText);
        alert("Error parsing questions. Please check the console for details.");
      }
    } else {
      console.error("No valid response received from API:", data);
      alert("Error fetching questions. Please try again.");
    }
  } catch (error) {
    console.error("Error loading questions:", error);
    alert("Error loading questions. Please check your API key or internet connection.");
  }
}



// Call loadQuestions to initiate question fetching
loadQuestions();

// Assuming you have a function nextQuestion that handles displaying the next question


// Function to load the next question
function nextQuestion() {
  
  if (current_index < questions_global.length) {
      clearInterval(countdownInterval);
      timeLeft = time_per_question;
      countdownTextEl.textContent = time_per_question;
      circle.style.animationDuration = `${time_per_question}s`;
      countdownInterval = setInterval(timer, 1000);

      const question = questions_global[current_index];
      document.getElementById("hint-text").textContent = "";

      // Set the question text
      document.getElementById("question-text").textContent = question.question;

      document.getElementById("hint-text").style.display = "none";

      // Set the options
      const options = document.querySelectorAll(".option-button");
      options.forEach((button, index) => {
          button.textContent = `${String.fromCharCode(65 + index)}: ${question.options[index]}`;
      });
     
      // Increment the current index for the next question
      current_index++;
  } else {

    let correct = 0
    console.log(answers);
    performanceData = []
      for(let i = 0; i<10; i++){
        performanceData.push({
          correct: answers[i] == questions_global[i].answer
        })
        if(answers[i] == questions_global[i].answer){
          correct += 1
        }
      }

      console.log(performanceData);


      localStorage.setItem('finalScore', correct);
      localStorage.setItem('totalQuestions', 10);
      localStorage.setItem('correctAnswers', correct);
      localStorage.setItem('performanceData', JSON.stringify(performanceData));

      // Redirect to the results page when all questions are completed
      window.location.href = `/public/pages/results.html`; // Adjust for your server setup

  }
}

function showHint(){
    if (current_index < questions_global.length){
        document.getElementById("hint-text").style.display = "block";
        document.getElementById("hint-text").textContent = questions_global[current_index].hint;
    }
}
// window.location.href = '../pages/results.html';




