// Add event listeners for buttons
document.getElementById('retryButton').addEventListener('click', function () {
    // Redirect to the quiz page to retry
    window.location.href = '../pages/quiz.html';
});

document.getElementById('homeButton').addEventListener('click', function () {
    // Redirect to the home page
    window.location.href = '../pages/home.html';
});

// Load and display results from localStorage
window.onload = function () {
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
