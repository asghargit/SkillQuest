// Add event listeners for buttons
document.getElementById('retryButton').addEventListener('click', function () {
    // Redirect to the quiz page to retry
    window.location.href = '../pages/quiz.html';
});

// document.getElementById('homeButton').addEventListener('click', function () {
//     // Redirect to the home page
//     window.location.href = '../pages/home.html';
// });

// Load and display results from localStorage
window.onload = function () {
    console.log(132492803);
    // Fetch data from localStorage
    const playerName = localStorage.getItem('playerName') || 'Player';
    const finalScore = parseInt(localStorage.getItem('finalScore')) || 0;
    const totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 0;
    const correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;
    const performanceData = JSON.parse(localStorage.getItem('performanceData')) || [];

    // Populate the results page with data
    document.getElementById('playerName').textContent = playerName;
    document.getElementById('finalScore').textContent = finalScore;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('totalQuestions').textContent = totalQuestions;

    // Ensure performanceData is valid
    const sanitizedData = performanceData.length
        ? performanceData
        : Array(totalQuestions).fill({ correct: false }); // Default data if none exists

    // Populate performance details
    const performanceDetails = document.getElementById('performanceDetails');
    sanitizedData.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Question ${index + 1}: ${data.correct ? 'Correct' : 'Incorrect'}`;
        performanceDetails.appendChild(listItem);
    });

    // Render the performance graph
    renderPerformanceGraph(sanitizedData);
};

// Function to render performance graph
function renderPerformanceGraph(performanceData) {
    const chartCanvas = document.getElementById('performanceChart');
    if (!chartCanvas) {
        console.error('Performance chart canvas not found.');
        return;
    }
    const ctx = chartCanvas.getContext('2d');

    // Extract data for the chart
    const labels = performanceData.map((item, index) => `Q${index + 1}`);
    const scores = performanceData.map((item) => (item.correct ? 1 : 0));

    // Ensure at least one data point is present for the graph
    if (scores.length === 0) {
        labels.push('Placeholder');
        scores.push(0);
    }

    // Chart.js configuration
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // X-axis labels (e.g., Q1, Q2)
            datasets: [{
                label: 'Performance (1 = Correct, 0 = Incorrect)',
                data: scores, // Y-axis data
                backgroundColor: scores.map((score) => score ? '#1abc9c' : '#e74c3c'), // Green for correct, red for incorrect
                borderColor: '#ffcc00',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        callback: function (value) {
                            return value === 1 ? 'Correct' : 'Incorrect';
                        }
                    }
                }
            }
        }
    });
}

// next_level = document.getElementById('nextButton').addEventListener("click", () => {
//     var step = localStorage.getItem("step");
//     var course_tit = localStorage.getItem("course_tit");
//     console.log(step);
//     // Construct URL with query parameters
//     const url = `quiz.html?course=${encodeURIComponent(course_tit)}&step=${encodeURIComponent(step)}`;
//     // Redirect to quiz.html    
//     window.location.href = url;
// });
// Assuming the score is stored in localStorage with the key "quizScore"
document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById('nextButton');
    const score = parseInt(localStorage.getItem("finalScore"), 10); // Retrieve the stored score

    // Check if the score is above 6/10
    if (score > 6) {
        nextButton.style.display = "block"; // Show the button if score > 6
    } else {
        nextButton.style.display = "none"; // Hide the button otherwise
    }

    // Add event listener to the button
    nextButton.addEventListener("click", () => {
        const level = localStorage.getItem("level");
        const course_tit = localStorage.getItem("course_tit");
        console.log(level); 
        level = Number(level)+1;

        // Construct URL with query parameters
        const url = `quiz.html?course=${encodeURIComponent(course_tit)}&step=${encodeURIComponent()}`;
        // Redirect to quiz.html    
        window.location.href = url;
    });
});
