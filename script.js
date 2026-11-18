
document.addEventListener("DOMContentLoaded", function () {

    // DARK AND LIGHT MODE
    const themeButton = document.getElementById("themeButton");

    if (localStorage.getItem("climateTheme") === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.textContent = "☀";
    }

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        themeButton.textContent = isDark ? "☀" : "☾";
        localStorage.setItem("climateTheme", isDark ? "dark" : "light");
    });


    // MOBILE NAVIGATION
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    menuButton.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        });
    });


    // COUNTRY EXPLORER
    const countryInformation = {
        philippines: {
            flag: "🇵🇭",
            name: "Philippines",
            region: "SOUTHEAST ASIA",
            description: "The Philippines is exposed to tropical cyclones, heavy rainfall, coastal flooding, and sea-level rise. Its many coastal communities and islands face different levels of climate-related risk.",
            concern: "Tropical cyclones and coastal impacts",
            note: "Preparedness, resilient infrastructure, and coastal ecosystem protection are important."
        },

        indonesia: {
            flag: "🇮🇩",
            name: "Indonesia",
            region: "SOUTHEAST ASIA",
            description: "Indonesia's many islands and coastal settlements face challenges that include coastal flooding, sea-level rise, changing rainfall, and forest fires.",
            concern: "Coastal flooding and forest fires",
            note: "Protecting forests and improving community resilience are important."
        },

        vietnam: {
            flag: "🇻🇳",
            name: "Vietnam",
            region: "SOUTHEAST ASIA",
            description: "Vietnam's coastal areas and river deltas can be affected by flooding, storms, sea-level rise, and saltwater intrusion.",
            concern: "Flooding and saltwater intrusion",
            note: "Flood preparedness and sustainable water management can help communities adapt."
        },

        bangladesh: {
            flag: "🇧🇩",
            name: "Bangladesh",
            region: "SOUTH ASIA",
            description: "Bangladesh is vulnerable to river flooding, coastal hazards, cyclones, and changes in rainfall.",
            concern: "Flooding and coastal hazards",
            note: "Early warning systems and resilient infrastructure support disaster preparedness."
        },

        japan: {
            flag: "🇯🇵",
            name: "Japan",
            region: "EAST ASIA",
            description: "Japan faces climate-related challenges including extreme heat, heavy rainfall, and impacts on ecosystems and infrastructure.",
            concern: "Extreme heat and heavy rainfall",
            note: "Climate adaptation and disaster preparedness remain important."
        },

        fiji: {
            flag: "🇫🇯",
            name: "Fiji",
            region: "PACIFIC ISLANDS · OCEANIA",
            description: "Fiji is a Pacific island country in Oceania. Its communities face risks related to sea-level rise, coastal erosion, tropical cyclones, and changing ocean conditions.",
            concern: "Sea-level rise and coastal erosion",
            note: "Coastal protection and community-led adaptation are especially important."
        }
    };

    const countryButtons = document.querySelectorAll(".country-option");

    countryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCountry = countryInformation[button.dataset.country];

            if (!selectedCountry) return;

            countryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            document.getElementById("countryFlag").textContent = selectedCountry.flag;
            document.getElementById("countryName").textContent = selectedCountry.name;
            document.getElementById("countryRegion").textContent = selectedCountry.region;
            document.getElementById("countryDescription").textContent = selectedCountry.description;
            document.getElementById("countryConcern").textContent = selectedCountry.concern;
            document.getElementById("countryNote").textContent = selectedCountry.note;
        });
    });


    // CLIMATE CHART
    const chartCanvas = document.getElementById("climateChart");

    if (chartCanvas && window.Chart) {
        const climateChart = new Chart(chartCanvas, {
            type: "bar",

            data: {
                labels: [
                    "Philippines",
                    "Indonesia",
                    "Vietnam",
                    "Bangladesh",
                    "Japan",
                    "Fiji"
                ],

                datasets: [{
                    label: "Illustrative concern score",
                    data: [8, 7, 8, 9, 6, 9],
                    backgroundColor: [
                        "#397451",
                        "#648d69",
                        "#86a77d",
                        "#b5cbaa",
                        "#a3b09d",
                        "#527b60"
                    ],
                    borderRadius: 6,
                    maxBarThickness: 55
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true,
                            color: "#748077",
                            font: {
                                family: "DM Sans"
                            }
                        }
                    },

                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return " Demonstration score: " + context.parsed.y + "/10";
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        ticks: {
                            color: "#748077"
                        },
                        grid: {
                            display: false
                        }
                    },

                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                            color: "#748077"
                        },
                        title: {
                            display: true,
                            text: "Example score (0–10)",
                            color: "#748077"
                        }
                    }
                }
            }
        });

        // Update chart text colors when the theme changes
        themeButton.addEventListener("click", function () {
            const textColor = document.body.classList.contains("dark-mode")
                ? "#b1beb4"
                : "#748077";

            climateChart.options.plugins.legend.labels.color = textColor;
            climateChart.options.scales.x.ticks.color = textColor;
            climateChart.options.scales.y.ticks.color = textColor;
            climateChart.options.scales.y.title.color = textColor;

            climateChart.update();
        });
    }


    // CLIMATE KNOWLEDGE QUIZ
    const questions = [
        {
            question: "What is a major cause of recent global warming?",
            answers: [
                "Burning fossil fuels",
                "Reading books",
                "Planting trees",
                "Recycling paper"
            ],
            correct: 0,
            explanation: "Burning fossil fuels releases greenhouse gases that contribute to global warming."
        },
        {
            question: "What contributes to rising sea levels?",
            answers: [
                "More forests",
                "Warming oceans and melting land ice",
                "Recycling materials",
                "Using bicycles"
            ],
            correct: 1,
            explanation: "Warming oceans expand, and melting land ice adds water to the oceans."
        },
        {
            question: "Which region does Fiji belong to?",
            answers: [
                "East Asia",
                "South Asia",
                "Oceania",
                "Europe"
            ],
            correct: 2,
            explanation: "Fiji is an island country in the Pacific region of Oceania."
        },
        {
            question: "Which action helps reduce waste?",
            answers: [
                "Using more disposable products",
                "Throwing reusable items away",
                "Burning plastic",
                "Reusing and recycling materials"
            ],
            correct: 3,
            explanation: "Reusing and recycling can reduce waste and the need for new materials."
        },
        {
            question: "Which ecosystem can be affected by warmer oceans?",
            answers: [
                "Coral reefs",
                "Deserts only",
                "Mountain rocks",
                "Urban roads"
            ],
            correct: 0,
            explanation: "Warmer ocean temperatures can cause coral bleaching and stress coral reef ecosystems."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const questionNumber = document.getElementById("questionNumber");
    const questionProgress = document.getElementById("questionProgress");
    const progressFill = document.getElementById("progressFill");
    const questionText = document.getElementById("questionText");
    const answerButtons = document.getElementById("answerButtons");
    const quizFeedback = document.getElementById("quizFeedback");
    const quizScore = document.getElementById("quizScore");
    const nextButton = document.getElementById("nextButton");
    const quizResult = document.getElementById("quizResult");
    const finalScore = document.getElementById("finalScore");
    const restartButton = document.getElementById("restartButton");

    function showQuestion() {
        answered = false;

        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        questionNumber.textContent =
            "QUESTION " + (currentQuestion + 1) + " OF " + questions.length;

        questionProgress.textContent = Math.round(progress) + "%";
        progressFill.style.width = progress + "%";

        questionText.textContent = question.question;
        answerButtons.innerHTML = "";
        quizFeedback.textContent = "";
        nextButton.hidden = true;
        quizResult.hidden = true;

        question.answers.forEach(function (answer, index) {
            const button = document.createElement("button");

            button.className = "answer-button";
            button.textContent = answer;

            button.addEventListener("click", function () {
                checkAnswer(index, button);
            });

            answerButtons.appendChild(button);
        });

        quizScore.textContent = "Score: " + score;
    }

    function checkAnswer(selectedIndex, selectedButton) {
        if (answered) return;

        answered = true;

        const question = questions[currentQuestion];
        const buttons = answerButtons.querySelectorAll(".answer-button");

        buttons.forEach(function (button) {
            button.disabled = true;
        });

        if (selectedIndex === question.correct) {
            score++;
            selectedButton.classList.add("correct");
            quizFeedback.textContent = "Correct! " + question.explanation;
        } else {
            selectedButton.classList.add("incorrect");
            buttons[question.correct].classList.add("correct");
            quizFeedback.textContent = "Not quite. " + question.explanation;
        }

        quizScore.textContent = "Score: " + score;
        nextButton.hidden = false;

        nextButton.textContent =
            currentQuestion === questions.length - 1
                ? "View My Result →"
                : "Next Question →";
    }

    nextButton.addEventListener("click", function () {
        if (!answered) return;

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        questionNumber.textContent = "QUIZ COMPLETED";
        questionProgress.textContent = "100%";
        progressFill.style.width = "100%";

        questionText.textContent = "You have completed the climate quiz!";
        answerButtons.innerHTML = "";
        quizFeedback.textContent = "";
        nextButton.hidden = true;
        quizResult.hidden = false;

        finalScore.textContent =
            "You answered " + score + " out of " + questions.length +
            " questions correctly.";

        quizScore.textContent = "Final score: " + score + "/" + questions.length;
    }

    restartButton.addEventListener("click", function () {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });

    showQuestion();


    // BACK TO TOP
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ACTIVE NAVIGATION LINK
    const pageSections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navItems.forEach(function (link) {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -65% 0px"
    });

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });

});
