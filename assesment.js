// Assessment Engine for AI Adaptive Language Learner

// Question pools for different difficulties
const questions = {
    easy: [
        // Fill-in-the-blank with choices (first 5)
        {
            type: 'fill-in-the-blank',
            question: '🏠 The place where you live is called a _____.',
            options: ['house', 'car', 'park', 'store'],
            answer: 'house'
        },
        {
            type: 'fill-in-the-blank',
            question: '🌈 Complete: The color of grass is _____.',
            options: ['green', 'blue', 'red', 'yellow'],
            answer: 'green'
        },
        {
            type: 'fill-in-the-blank',
            question: '☕ Fill in: I drink _____ every morning.',
            options: ['coffee', 'tea', 'water', 'milk'],
            answer: 'coffee'
        },
        {
            type: 'fill-in-the-blank',
            question: '🍎 The opposite of "small" is _____.',
            options: ['large', 'big', 'tiny', 'huge'],
            answer: 'large'
        },
        {
            type: 'fill-in-the-blank',
            question: '😊 Complete: I am _____ today.',
            options: ['happy', 'sad', 'angry', 'tired'],
            answer: 'happy'
        },
        // Multiple-choice (second 5)
        {
            type: 'multiple-choice',
            question: '📓 Which sentence is grammatically correct?',
            options: ['They is playing', 'They are playing', 'They am playing', 'They be playing'],
            answer: 'They are playing'
        },
        {
            type: 'multiple-choice',
            question: '💬 What is a polite way to greet someone?',
            options: ['Go away', 'Hello, how are you?', 'Be quiet', 'Leave me alone'],
            answer: 'Hello, how are you?'
        },
        {
            type: 'multiple-choice',
            question: '🎓 What is the plural of "child"?',
            options: ['childs', 'childes', 'children', 'childern'],
            answer: 'children'
        },
        {
            type: 'multiple-choice',
            question: '❄️ Complete: Water freezes at _____ degrees Celsius.',
            options: ['0', '10', '20', '100'],
            answer: '0'
        },
        {
            type: 'multiple-choice',
            question: '🏃 He _____ very fast.',
            options: ['run', 'runs', 'running', 'ran'],
            answer: 'runs'
        }
    ],
    medium: [
        // Fill-in-the-blank with choices (first 5)
        {
            type: 'fill-in-the-blank',
            question: '💬 A polite greeting in English is _____.',
            options: ['Good morning', 'Whatever', 'Shh', 'Go away'],
            answer: 'Good morning'
        },
        {
            type: 'fill-in-the-blank',
            question: '📚 They have _____ studying English for 3 years.',
            options: ['been', 'are', 'was', 'have'],
            answer: 'been'
        },
        {
            type: 'fill-in-the-blank',
            question: '🎭 Complete: The actor\'s _____ was brilliant in the film.',
            options: ['performance', 'appearance', 'voice', 'movement'],
            answer: 'performance'
        },
        {
            type: 'fill-in-the-blank',
            question: '💼 What does "collaborate" mean?',
            options: ['To work against', 'To work together', 'To compete', 'To ignore'],
            answer: 'To work together'
        },
        {
            type: 'fill-in-the-blank',
            question: '🌍 The _____ of the problem requires careful analysis.',
            options: ['complexity', 'size', 'speed', 'color'],
            answer: 'complexity'
        },
        // Multiple-choice (second 5)
        {
            type: 'multiple-choice',
            question: '✈️ Choose the correct sentence:',
            options: ['Unless you will come, I stay home', 'Unless you come, I will stay home', 'Unless you come, I stay home', 'Unless you are coming, I will stay'],
            answer: 'Unless you come, I will stay home'
        },
        {
            type: 'multiple-choice',
            question: '🏫 Which word is a synonym for "diligent"?',
            options: ['Lazy', 'Hardworking', 'Careless', 'Slow'],
            answer: 'Hardworking'
        },
        {
            type: 'multiple-choice',
            question: '🎓 What is the past participle of "write"?',
            options: ['wrote', 'writing', 'written', 'writes'],
            answer: 'written'
        },
        {
            type: 'multiple-choice',
            question: '📝 Which sentence uses the correct tense?',
            options: ['I have see the movie', 'I have saw the movie', 'I have seen the movie', 'I saw seeing the movie'],
            answer: 'I have seen the movie'
        },
        {
            type: 'multiple-choice',
            question: '🌐 What does "eloquent" mean?',
            options: ['Quiet', 'Fluent and persuasive in speaking', 'Angry', 'Confused'],
            answer: 'Fluent and persuasive in speaking'
        }
    ],
    hard: [
        // Fill-in-the-blank with choices (first 5)
        {
            type: 'fill-in-the-blank',
            question: '⏳ What does "ephemeral" precisely mean?',
            options: ['Lasting a very short time', 'Permanent and unchanging', 'Loudly audible', 'Brilliantly shining'],
            answer: 'Lasting a very short time'
        },
        {
            type: 'fill-in-the-blank',
            question: '🏫 The antonym of "benevolent" is _____.',
            options: ['malevolent', 'kind', 'generous', 'caring'],
            answer: 'malevolent'
        },
        {
            type: 'fill-in-the-blank',
            question: '✨ "Quintessential" best exemplifies the _____ form of something.',
            options: ['most typical', 'most unique', 'most rare', 'most common'],
            answer: 'most typical'
        },
        {
            type: 'fill-in-the-blank',
            question: '⚠️ Select the best definition of "pernicious":',
            options: ['Harmful or destructive, often in subtle ways', 'Completely harmless', 'Readily apparent', 'Fleeting in nature'],
            answer: 'Harmful or destructive, often in subtle ways'
        },
        {
            type: 'fill-in-the-blank',
            question: '📝 In "She has been working since 2010," identify the verb tense: _____.',
            options: ['present perfect continuous', 'simple present', 'present perfect', 'present progressive'],
            answer: 'present perfect continuous'
        },
        // Multiple-choice (second 5)
        {
            type: 'multiple-choice',
            question: '💬 Which idiom means to be ungrateful to someone who helped you?',
            options: ['Break a leg', 'Bite the hand that feeds you', 'Hit the nail on the head', 'Barking up the wrong tree'],
            answer: 'Bite the hand that feeds you'
        },
        {
            type: 'multiple-choice',
            question: '📚 What does "obfuscate" mean?',
            options: ['To clarify', 'To make obscure or unclear', 'To enlighten', 'To simplify'],
            answer: 'To make obscure or unclear'
        },
        {
            type: 'multiple-choice',
            question: '🎓 Which word best describes someone who is "pragmatic"?',
            options: ['Idealistic', 'Practical and realistic', 'Theoretical', 'Impractical'],
            answer: 'Practical and realistic'
        },
        {
            type: 'multiple-choice',
            question: '🔬 What is the meaning of "serendipitous"?',
            options: ['Planned', 'Occurring by luck or chance in a happy way', 'Unfortunate', 'Deliberate'],
            answer: 'Occurring by luck or chance in a happy way'
        },
        {
            type: 'multiple-choice',
            question: '💡 Which sentence uses the subjunctive mood correctly?',
            options: ['If I was rich, I would travel', 'If I were rich, I will travel', 'If I were rich, I would travel', 'If I was rich, I will travel'],
            answer: 'If I were rich, I would travel'
        },
        {
            id: 'hard-free-text-1',
            type: 'free-text',
            evaluationType: 'semantic',
            question: 'Free Response: Explain how consistent practice helps improve language fluency. Share at least three sentences describing specific strategies that work for you.',
            placeholder: 'Describe the study techniques that make the biggest difference for you...',
            minWordCount: 40
        }
    ]
};

// Simulated persistence layer for submissions
const submissionDatabase = {
    submissions: [],
    save(record) {
        const index = this.submissions.findIndex(entry => entry.id === record.id);
        if (index >= 0) {
            this.submissions[index] = { ...this.submissions[index], ...record };
        } else {
            this.submissions.push(record);
        }
        return record;
    }
};

// Lightweight NLP service that scores responses for completeness and coherence
const NLPService = {
    analyzeSemantics(text) {
        const response = (text || '').trim();
        if (!response) {
            return {
                confidence: 0,
                grade: 0,
                feedback: 'The system could not detect any content. Please provide a response.'
            };
        }

        const words = response.split(/\s+/).filter(Boolean);
        const sentences = response.split(/[.!?]+/).filter(Boolean).length || 1;
        const uniqueWords = new Set(words.map(word => word.toLowerCase().replace(/[^a-z']/g, ''))).size;

        const lengthScore = Math.min(words.length / 150, 1);
        const coherenceScore = Math.min(sentences / 6, 1);
        const varietyScore = Math.min(uniqueWords / Math.max(words.length, 1), 1);

        const combinedScore = (lengthScore * 0.35) + (coherenceScore * 0.35) + (varietyScore * 0.3);
        const confidence = Number(Math.min(Math.max(combinedScore, 0), 1).toFixed(2));
        const grade = Math.round(confidence * 100);

        let feedback = 'Thoughtful, well-structured explanation with strong supporting detail.';
        if (grade < 40) {
            feedback = 'Add more detail and structure so the system can understand your strategy.';
        } else if (grade < 70) {
            feedback = 'Good start—expand on your examples and connect the ideas more clearly.';
        }

        return {
            confidence,
            grade,
            feedback
        };
    }
};

// Grading service that coordinates semantic analysis and confidence checks
const GradingService = (() => {
    const confidenceThreshold = 0.72;
    const passingScore = 70;
    let submissionCounter = 1;

    function evaluateResponse(text, metadata = {}) {
        const semanticReport = NLPService.analyzeSemantics(text);

        const submissionRecord = {
            id: metadata.submissionId || `free-text-${submissionCounter++}`,
            promptId: metadata.promptId || 'free-text',
            studentId: metadata.studentId || 'anonymous',
            response: text,
            confidence: semanticReport.confidence,
            updatedAt: new Date().toISOString()
        };

        if (semanticReport.confidence < confidenceThreshold) {
            submissionRecord.status = 'pending_manual_review';
            submissionRecord.flagged = true;
            submissionRecord.statusDisplay = 'Flagged - Pending Manual Review';
            submissionRecord.feedback = 'Flagged for manual review because the confidence score was below the system threshold.';
            submissionDatabase.save(submissionRecord);

            return {
                status: 'pending_manual_review',
                confidence: semanticReport.confidence,
                grade: null,
                feedback: submissionRecord.feedback,
                threshold: confidenceThreshold
            };
        }

        submissionRecord.status = 'graded';
        submissionRecord.flagged = false;
        submissionRecord.statusDisplay = 'Auto-Graded';
        submissionRecord.grade = semanticReport.grade;
        submissionRecord.feedback = semanticReport.feedback;
        submissionDatabase.save(submissionRecord);

        return {
            status: 'graded',
            confidence: semanticReport.confidence,
            grade: semanticReport.grade,
            feedback: semanticReport.feedback,
            threshold: confidenceThreshold
        };
    }

    return {
        evaluateResponse,
        getThreshold: () => confidenceThreshold,
        getPassingScore: () => passingScore
    };
})();

function requiresSemanticGrading(question) {
    return question && (question.type === 'free-text' || question.evaluationType === 'semantic');
}

// User state
let userLevel = 'easy';
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let isAnswered = false;
let wasCorrect = false;
let askedQuestions = {}; // Track asked questions per difficulty level
let questionCounter = 0; // Counter for unique radio button names

// DOM elements
const questionEl = document.getElementById('question');
const inputAreaEl = document.getElementById('input-area');
const submitBtn = document.getElementById('submit-btn');
const skipBtn = document.getElementById('skip-btn');
const retryBtn = document.getElementById('retry-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const personalizationEl = document.getElementById('personalization');
const difficultyEl = document.getElementById('difficulty');

// Initialize the assessment
function initAssessment() {
    generateQuestion();
    updateScore();
    updatePersonalization();
}

// Show difficulty selection
function showDifficultySelection() {
    questionEl.textContent = '📚 Select Your Difficulty Level';
    inputAreaEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <button id="easy-level" style="padding: 15px 30px; background: #4ade80; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                🟢 Easy
            </button>
            <button id="medium-level" style="padding: 15px 30px; background: #f59e0b; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                🟠 Medium
            </button>
            <button id="hard-level" style="padding: 15px 30px; background: #ef4444; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                🔴 Hard
            </button>
        </div>
    `;

    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    personalizationEl.textContent = 'Choose a difficulty level to begin!';

    submitBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    // Add event listeners for difficulty buttons
    document.getElementById('easy-level').addEventListener('click', () => {
        userLevel = 'easy';
        startAssessment();
    });
    document.getElementById('medium-level').addEventListener('click', () => {
        userLevel = 'medium';
        startAssessment();
    });
    document.getElementById('hard-level').addEventListener('click', () => {
        userLevel = 'hard';
        startAssessment();
    });
}

// Start the assessment after difficulty is selected
function startAssessment() {
    totalQuestions = 0;
    correctAnswers = 0;
    questionCounter = 0; // Reset question counter
    askedQuestions[userLevel] = [];
    generateQuestion();
    updateScore();
    updatePersonalization();
}

// Generate a question based on user level
function generateQuestion() {
    const levelQuestions = questions[userLevel];

    // Initialize tracking for this level if needed
    if (!askedQuestions[userLevel]) {
        askedQuestions[userLevel] = [];
    }

    // Get remaining questions that haven't been asked
    const remainingQuestions = levelQuestions.filter((q, index) =>
        !askedQuestions[userLevel].includes(index)
    );

    // If all questions have been asked, don't repeat - show completion
    if (remainingQuestions.length === 0) {
        showCompletionMessage();
        return;
    }

    // Get a random question from remaining questions
    const filteredLevelQuestions = questions[userLevel].filter((q, index) =>
        !askedQuestions[userLevel].includes(index)
    );

    if (filteredLevelQuestions.length === 0) {
        showCompletionMessage();
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredLevelQuestions.length);
    const selectedQuestion = filteredLevelQuestions[randomIndex];

    // Track this question by finding its index in the original array
    const originalIndex = levelQuestions.findIndex(q =>
        q.question === selectedQuestion.question &&
        q.answer === selectedQuestion.answer
    );

    if (originalIndex !== -1 && !askedQuestions[userLevel].includes(originalIndex)) {
        askedQuestions[userLevel].push(originalIndex);
    }

    currentQuestion = selectedQuestion;
    displayQuestion();
}

// Display the current question
function displayQuestion() {
    questionEl.textContent = currentQuestion.question;
    inputAreaEl.innerHTML = '';
    questionCounter++; // Increment for each new question displayed

    if (currentQuestion.type === 'multiple-choice') {
        currentQuestion.options.forEach(option => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `answer-${questionCounter}`; // Use unique counter
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(' ' + option));
            inputAreaEl.appendChild(label);
            inputAreaEl.appendChild(document.createElement('br'));
        });
    } else if (currentQuestion.type === 'fill-in-the-blank') {
        // If fill-in-the-blank has options (choices), display as radio buttons
        if (currentQuestion.options) {
            currentQuestion.options.forEach(option => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `answer-${questionCounter}`; // Use unique counter
                radio.value = option;
                label.appendChild(radio);
                label.appendChild(document.createTextNode(' ' + option));
                inputAreaEl.appendChild(label);
                inputAreaEl.appendChild(document.createElement('br'));
            });
        } else {
            // Without choices, display as text input
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'blank-input';
            inputAreaEl.appendChild(input);
        }
    } else if (currentQuestion.type === 'free-text') {
        const textarea = document.createElement('textarea');
        textarea.id = 'essay-input';
        textarea.placeholder = currentQuestion.placeholder || 'Write your response here...';
        textarea.rows = 8;
        textarea.style.width = '100%';
        textarea.style.padding = '12px 15px';
        textarea.style.border = '2px solid #e0e0e0';
        textarea.style.borderRadius = '8px';
        textarea.style.fontSize = '15px';
        textarea.style.fontFamily = 'inherit';
        textarea.style.resize = 'vertical';
        inputAreaEl.appendChild(textarea);

        if (currentQuestion.minWordCount) {
            const helper = document.createElement('div');
            helper.style.marginTop = '8px';
            helper.style.fontSize = '13px';
            helper.style.color = '#555';
            helper.textContent = `Please write at least ${currentQuestion.minWordCount} words.`;
            inputAreaEl.appendChild(helper);
        }
    }

    feedbackEl.textContent = '';
    submitBtn.style.display = 'inline';
    skipBtn.style.display = 'inline';
    nextBtn.style.display = 'none';
}

// Handle answer submission
function submitAnswer() {
    // Check if assessment is complete (10 questions per level)
    if (totalQuestions >= 10) {
        showCompletionMessage();
        return;
    }

    let userAnswer = '';
    const semanticQuestion = requiresSemanticGrading(currentQuestion);

    // Check if question has options (radio buttons)
    if (currentQuestion.options) {
        const selected = document.querySelector(`input[name="answer-${questionCounter}"]:checked`); // Use unique counter
        userAnswer = selected ? selected.value : '';
    } else if (currentQuestion.type === 'fill-in-the-blank') {
        // Text input without options
        const blankInput = document.getElementById('blank-input');
        if (blankInput) {
            userAnswer = blankInput.value.trim().toLowerCase();
        }
    } else if (currentQuestion.type === 'free-text') {
        const essayInput = document.getElementById('essay-input');
        if (essayInput) {
            userAnswer = essayInput.value.trim();
        }
    }

    if (!userAnswer) {
        feedbackEl.textContent = 'Please select or enter an answer!';
        feedbackEl.className = 'feedback';
        return; // Don't increment if no answer selected
    }

    let semanticEvaluation = null;
    if (semanticQuestion) {
        semanticEvaluation = evaluateFreeTextAnswer(userAnswer);
        if (semanticEvaluation.deferScoring) {
            feedbackEl.textContent = semanticEvaluation.message;
            feedbackEl.className = semanticEvaluation.feedbackClass;
            return;
        }
    }

    totalQuestions++;
    const isCorrect = semanticQuestion ? semanticEvaluation.isCorrect : checkAnswer(userAnswer);
    isAnswered = true;
    wasCorrect = isCorrect;
    if (isCorrect) {
        correctAnswers++;
    }

    if (semanticQuestion) {
        feedbackEl.textContent = semanticEvaluation.message;
        feedbackEl.className = semanticEvaluation.feedbackClass;
    } else if (isCorrect) {
        feedbackEl.textContent = '✓ Correct! Well done.';
        feedbackEl.className = 'feedback correct';
    } else {
        feedbackEl.textContent = `✗ Incorrect. The correct answer is: ${currentQuestion.answer}`;
        feedbackEl.className = 'feedback incorrect';
    }

    updateScore();
    adaptDifficulty(isCorrect);
    updatePersonalization();

    submitBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    if (isCorrect) {
        retryBtn.style.display = 'inline';
        nextBtn.style.display = 'inline';
    } else {
        retryBtn.style.display = 'none';
        nextBtn.style.display = 'inline';
    }
}

// Check if the answer is correct
function checkAnswer(userAnswer) {
    return userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();
}

// Evaluate free-text answers through the grading service and NLP pipeline
function evaluateFreeTextAnswer(userAnswer) {
    const trimmed = (userAnswer || '').trim();
    const result = {
        isCorrect: false,
        message: '',
        feedbackClass: 'feedback',
        deferScoring: false,
        status: 'pending'
    };

    if (!trimmed) {
        result.message = 'Please enter your response before submitting.';
        result.deferScoring = true;
        return result;
    }

    if (currentQuestion.minWordCount) {
        const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
        if (wordCount < currentQuestion.minWordCount) {
            result.message = `Please write at least ${currentQuestion.minWordCount} words (current count: ${wordCount}).`;
            result.deferScoring = true;
            return result;
        }
    }

    const evaluation = GradingService.evaluateResponse(trimmed, {
        promptId: currentQuestion.id || currentQuestion.question
    });

    if (evaluation.status === 'pending_manual_review') {
        const confidencePercent = (evaluation.confidence * 100).toFixed(0);
        const thresholdPercent = (evaluation.threshold * 100).toFixed(0);
        result.message = `Response flagged for manual review. Confidence ${confidencePercent}% (threshold ${thresholdPercent}%). A teacher will review it shortly.`;
        result.status = evaluation.status;
        return result;
    }

    const isPassing = evaluation.grade >= GradingService.getPassingScore();
    const confidencePercent = (evaluation.confidence * 100).toFixed(0);
    result.isCorrect = isPassing;
    result.feedbackClass = `feedback ${isPassing ? 'correct' : 'incorrect'}`;
    result.message = `Auto-graded at ${evaluation.grade}/100 with ${confidencePercent}% confidence. Feedback: ${evaluation.feedback}`;
    result.status = evaluation.status;

    return result;
}

// Update the score display
function updateScore() {
    scoreEl.textContent = `Score: ${correctAnswers}/${totalQuestions}`;
    // Update difficulty indicator
    if (difficultyEl) {
        difficultyEl.textContent = userLevel.charAt(0).toUpperCase() + userLevel.slice(1);
        difficultyEl.className = `difficulty-indicator ${userLevel}`;
    }
}

// Adapt difficulty based on performance
function adaptDifficulty(isCorrect) {
    if (totalQuestions >= 5) {
        const accuracy = correctAnswers / totalQuestions;
        if (accuracy >= 0.8 && userLevel !== 'hard') {
            userLevel = userLevel === 'easy' ? 'medium' : 'hard';
        } else if (accuracy < 0.6 && userLevel !== 'easy') {
            userLevel = userLevel === 'hard' ? 'medium' : 'easy';
        }
    }
}

// Provide AI personalization feedback
function updatePersonalization() {
    let message = '';
    if (totalQuestions === 0) {
        message = 'Welcome! Let\'s start with some easy questions.';
    } else {
        const accuracy = correctAnswers / totalQuestions;
        if (accuracy >= 0.8) {
            message = 'Great job! You\'re doing well. Let\'s try some harder questions.';
        } else if (accuracy >= 0.6) {
            message = 'Good progress! Keep practicing.';
        } else {
            message = 'You might want to review the basics. Don\'t worry, we\'ll adjust the difficulty.';
        }
    }
    personalizationEl.textContent = message;
}

// Show completion message
function showCompletionMessage() {
    questionEl.textContent = '🎉 Assessment Complete!';
    inputAreaEl.innerHTML = '';
    feedbackEl.textContent = `Congratulations! You answered ${correctAnswers} out of 10 questions correctly!`;
    feedbackEl.className = 'feedback correct';

    submitBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    personalizationEl.innerHTML = `
        <div style="margin-top: 20px; padding: 20px; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: white; border-radius: 10px; text-align: center; font-size: 18px; font-weight: 600;">
            Your Final Score: ${correctAnswers}/10
            <br><br>
            <button id="try-again-btn" style="background: white; color: #0099cc; border: 2px solid white; padding: 10px 20px; border-radius: 5px; font-weight: 600; cursor: pointer; font-size: 14px;">Try Again</button>
        </div>
    `;

    // Add event listener to Try Again button
    document.getElementById('try-again-btn').addEventListener('click', resetAssessment);
}

// Reset the assessment
function resetAssessment() {
    userLevel = 'easy';
    currentQuestion = null;
    totalQuestions = 0;
    correctAnswers = 0;
    isAnswered = false;
    wasCorrect = false;
    questionCounter = 0; // Reset question counter
    askedQuestions = {}; // Clear all asked questions

    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    personalizationEl.textContent = '';

    showDifficultySelection();
}

// Handle skip button
function skipQuestion() {
    // Check if assessment is complete (10 questions per level)
    if (totalQuestions >= 10) {
        showCompletionMessage();
        return;
    }

    totalQuestions++;
    feedbackEl.textContent = '⊘ Question skipped';
    feedbackEl.className = 'feedback';

    updateScore();
    updatePersonalization();

    submitBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    nextBtn.style.display = 'inline';
}

// Event listeners
submitBtn.addEventListener('click', submitAnswer);
skipBtn.addEventListener('click', skipQuestion);

retryBtn.addEventListener('click', () => {
    isAnswered = false;
    wasCorrect = false;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';

    // Clear radio button selections
    const radios = document.querySelectorAll(`input[name="answer-${questionCounter}"]`);
    radios.forEach(radio => radio.checked = false);

    // Clear text input if exists
    const textInput = document.getElementById('blank-input');
    if (textInput) {
        textInput.value = '';
    }

    const essayInput = document.getElementById('essay-input');
    if (essayInput) {
        essayInput.value = '';
    }

    retryBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    skipBtn.style.display = 'inline';
    submitBtn.style.display = 'inline';
});

nextBtn.addEventListener('click', () => {
    // Check if assessment is complete
    if (totalQuestions >= 10) {
        showCompletionMessage();
        return;
    }

    isAnswered = false;
    wasCorrect = false;
    generateQuestion();

    // If no question available, show completion
    if (!currentQuestion) {
        showCompletionMessage();
    }
});

// Start the assessment with difficulty selection
showDifficultySelection();
