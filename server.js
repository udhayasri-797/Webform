const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Temporary database
const submissions = [];

// Skill recommendation database
const skillDatabase = {
    "Web Development": {
        beginner: [
            "HTML & CSS",
            "JavaScript Fundamentals",
            "Git & GitHub"
        ],
        intermediate: [
            "React.js",
            "Node.js",
            "REST APIs"
        ],
        advanced: [
            "Next.js",
            "Cloud Deployment",
            "System Design"
        ]
    },

    "Data Science": {
        beginner: [
            "Python",
            "Statistics",
            "Excel"
        ],
        intermediate: [
            "Pandas & NumPy",
            "Data Visualization",
            "SQL"
        ],
        advanced: [
            "Machine Learning",
            "Deep Learning",
            "MLOps"
        ]
    },

    "Artificial Intelligence": {
        beginner: [
            "Python",
            "Mathematics for AI",
            "Data Structures"
        ],
        intermediate: [
            "Machine Learning",
            "TensorFlow",
            "Natural Language Processing"
        ],
        advanced: [
            "Deep Learning",
            "Generative AI",
            "AI Model Deployment"
        ]
    },

    "Cybersecurity": {
        beginner: [
            "Computer Networks",
            "Linux Fundamentals",
            "Cybersecurity Basics"
        ],
        intermediate: [
            "Ethical Hacking",
            "Network Security",
            "Digital Forensics"
        ],
        advanced: [
            "Penetration Testing",
            "Cloud Security",
            "Security Architecture"
        ]
    },

    "UI/UX Design": {
        beginner: [
            "Design Principles",
            "Color Theory",
            "Typography"
        ],
        intermediate: [
            "Figma",
            "Wireframing",
            "Prototyping"
        ],
        advanced: [
            "Design Systems",
            "UX Research",
            "Usability Testing"
        ]
    }
};


// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Health Check API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Skill Recommendation API is running",
        timestamp: new Date().toISOString()
    });
});


// POST API
app.post("/api/recommend", (req, res) => {

    const {
        name,
        email,
        department,
        interest,
        skillLevel,
        careerGoal
    } = req.body;

    // Validation
    if (
        !name ||
        !email ||
        !department ||
        !interest ||
        !skillLevel ||
        !careerGoal
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    // Get recommendations
    const interestData = skillDatabase[interest];

    let recommendations = [];

    if (interestData && interestData[skillLevel]) {
        recommendations = interestData[skillLevel];
    } else {
        recommendations = [
            "Problem Solving",
            "Communication Skills",
            "Git & GitHub"
        ];
    }

    // Create submission object
    const submission = {
        id: submissions.length + 1,
        name,
        email,
        department,
        interest,
        skillLevel,
        careerGoal,
        recommendations,
        createdAt: new Date().toISOString()
    };

    // Store submission
    submissions.push(submission);

    // Send response
    res.status(201).json({
        success: true,
        message: "Recommendation generated successfully!",
        data: submission
    });
});


// GET API - Retrieve all submissions
app.get("/api/submissions", (req, res) => {

    res.json({
        success: true,
        count: submissions.length,
        data: submissions
    });

});


// GET API - Retrieve one submission
app.get("/api/submissions/:id", (req, res) => {

    const id = Number(req.params.id);

    const submission = submissions.find(item => item.id === id);

    if (!submission) {
        return res.status(404).json({
            success: false,
            message: "Submission not found."
        });
    }

    res.json({
        success: true,
        data: submission
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/health`);
});