const form = document.getElementById("recommendationForm");

const loading = document.getElementById("loading");

const resultsSection =
    document.getElementById("resultsSection");

const recommendationList =
    document.getElementById("recommendationList");

const userSummary =
    document.getElementById("userSummary");

const resultMessage =
    document.getElementById("resultMessage");


// Form submit
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get form values
    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const department =
        document.getElementById("department").value;

    const interest =
        document.getElementById("interest").value;

    const skillLevel =
        document.getElementById("skillLevel").value;

    const careerGoal =
        document.getElementById("careerGoal").value.trim();


    // Frontend validation
    if (
        !name ||
        !email ||
        !department ||
        !interest ||
        !skillLevel ||
        !careerGoal
    ) {

        alert("Please complete all fields.");

        return;
    }


    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    // Show loading
    loading.classList.add("active");


    // Data sent to backend
    const userData = {

        name: name,

        email: email,

        department: department,

        interest: interest,

        skillLevel: skillLevel,

        careerGoal: careerGoal

    };


    try {

        // POST API request
        const response = await fetch(
            "/api/recommend",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)
            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Something went wrong."
            );

        }


        // Display result
        displayRecommendations(result.data);


    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server. " +
            "Please make sure the backend is running."
        );

    } finally {

        loading.classList.remove("active");

    }

});


// Display recommendations
function displayRecommendations(data) {

    // Create summary
    userSummary.innerHTML = `

        <p>
            <strong>Name:</strong>
            ${escapeHTML(data.name)}
        </p>

        <p>
            <strong>Interest:</strong>
            ${escapeHTML(data.interest)}
        </p>

        <p>
            <strong>Skill Level:</strong>
            ${capitalize(data.skillLevel)}
        </p>

        <p>
            <strong>Career Goal:</strong>
            ${escapeHTML(data.careerGoal)}
        </p>

    `;


    // Clear old recommendations
    recommendationList.innerHTML = "";


    // Add recommendation cards
    data.recommendations.forEach(
        function (skill) {

            const item =
                document.createElement("div");

            item.className =
                "recommendation-item";

            item.textContent = skill;

            recommendationList.appendChild(item);

        }
    );


    resultMessage.textContent =
        "Based on your profile, these skills can help you move toward your career goal.";


    // Show result section
    resultsSection.classList.add("show");


    // Scroll to results
    resultsSection.scrollIntoView({
        behavior: "smooth"
    });

}


// Reset form
function resetForm() {

    form.reset();

    resultsSection.classList.remove("show");

    document.getElementById("form")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Capitalize text
function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


// Basic HTML escaping
function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}