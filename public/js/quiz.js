const countdownTextEl = document.getElementById('countdown-text');
const circle = document.getElementById('c2');
const time_per_question = 45
const GOOGLE_API_KEY="AIzaSyDN-IhHu2LE9NXM9dn2QUZJ2uOKohUGUTE"
const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get("course");
const step = urlParams.get("step");

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
    contents: [
      {
        parts: [
          {
            text: `Write a list of MCQ questions and answers and a hint. There should be 10 questions in total. The subject is "${subject}". On a scale of difficulty out of 5, the difficulty should be ${level}. Respond in JSON format as a list of questions. The question attributes should be "question", "options", "answer", and "hint".`
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

        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
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
function cleanJson(rawJson) {
  // Remove the json and the surrounding whitespace/newlines
  const cleanedJson = rawJson.trim().replace(/^json/, '').replace(/```$/, '');

  try {
    // Parse the cleaned JSON string
    const parsedData = JSON.parse(cleanedJson);
    return parsedData;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}



