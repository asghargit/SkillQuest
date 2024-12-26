document.addEventListener('DOMContentLoaded', () => {
    // Get the query parameter from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const courseName = urlParams.get("course");

    // Course data
    const courseData = {
        WebDevelopment: {
            title: "Web Development",
            description: "Learn the foundations of web development including HTML, CSS, and JavaScript.",
            steps: [
                "Introduction",
                "Assessment 1",
                "Quiz 1",
                "Assessment 2",
                "Quiz 2",
                "Final Quiz"
            ]
        },
        DataStructuresAndAlgorithms: {
            title: "Data Structures and Algorithms",
            description: "Strengthen your problem-solving skills with algorithms and data structures.",
            steps: [
                "Introduction",
                "Assessment 1",
                "Quiz 1",
                "Assessment 2",
                "Quiz 2",
                "Final Quiz"
            ]
        },
        MachineLearning: {
            title: "Machine Learning using Python",
            description: "Dive into machine learning concepts and build predictive models.",
            steps: [
                "Introduction",
                "Assessment 1",
                "Quiz 1",
                "Assessment 2",
                "Quiz 2",
                "Final Quiz"
            ]
        },
        DBMS: {
            title: "Database Management Systems",
            description: "Master database design and SQL queries.",
            steps: [
                "Introduction",
                "Assessment 1",
                "Quiz 1",
                "Assessment 2",
                "Quiz 2",
                "Final Quiz"
            ]
        },
        MathematicalAptitude: {
            title: "Mathematical Aptitude",
            description: "Sharpen your mathematical skills for aptitude tests.",
            steps: [
                "Introduction",
                "Assessment 1",
                "Quiz 1",
                "Assessment 2",
                "Quiz 2",
                "Final Quiz"
            ]
        },
        VerbalAbility: {
            title: "Verbal Ability and Vocabulary",
            description: "Enhance your verbal reasoning and vocabulary skills.",
            steps: [
                "Introduction",
                "Assessment 1",
                "Quiz 1",
                "Assessment 2",
                "Quiz 2",
                "Final Quiz"
            ]
        }
    };

   // Get DOM elements
const courseTitle = document.getElementById("course-title");
const courseDescription = document.getElementById("course-description");
const roadmapSteps = document.getElementById("roadmap-steps");
const roadmapContainer = document.getElementById("roadmap-container");

// Function to populate the roadmap content
const populateRoadmap = (course) => {
    // Update title and description
    courseTitle.textContent = course.title;
    courseDescription.textContent = course.description;

    // Clear previous steps and add new ones
    roadmapSteps.innerHTML = "";
    course.steps.forEach((step, index) => {
        const button = document.createElement("button");
        button.setAttribute("type", "button"); // Ensure it's a button
        button.className =
            "flex flex-col items-center focus:outline-none group transition-all";
        button.innerHTML = `
            <div class="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-yellow-500 transition">
                ${index + 1}
            </div>
            <p class="mt-2 text-center group-hover:text-yellow-500 transition">${step}</p>
        `;
        roadmapSteps.appendChild(button);
    });

    // Ensure roadmap container is visible
    roadmapContainer.style.display = "flex";
};

// Check if the course name is valid
if (courseName && courseData[courseName]) {
    populateRoadmap(courseData[courseName]);
} else {
    // Fallback if the course is not found
    roadmapContainer.innerHTML =
        "<p class='text-center text-yellow-400'>Course not found. Please go back and select a valid course.</p>";
    roadmapContainer.style.display = "flex";
}
});
