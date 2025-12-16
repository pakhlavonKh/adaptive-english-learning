/**
 * Comprehensive Content Seed Data
 * English Learning Platform - All Skills (Reading, Writing, Listening, Speaking)
 * 
 * This file contains realistic educational content across multiple difficulty levels
 * aligned with CEFR levels (A1, A2, B1, B2, C1)
 */

// ===== READING QUESTIONS =====
export const readingQuestions = [
  // A1 Level (Beginner) - difficulty: -2 to -1
  {
    text: "Read: 'The cat is on the mat.' - Where is the cat?",
    answer: "on the mat",
    difficulty: -2,
    skill: 'reading',
    type: 'comprehension',
    choices: ["on the mat", "under the mat", "in the mat", "behind the mat"]
  },
  {
    text: "Read: 'My name is John. I am 10 years old.' - How old is John?",
    answer: "10",
    difficulty: -1.8,
    skill: 'reading',
    type: 'comprehension',
    choices: ["8", "9", "10", "11"]
  },
  {
    text: "Which word means 'happy'?",
    answer: "glad",
    difficulty: -1.5,
    skill: 'reading',
    type: 'vocabulary',
    choices: ["sad", "glad", "angry", "tired"]
  },
  {
    text: "Read: 'The dog runs fast.' - What does the dog do?",
    answer: "runs",
    difficulty: -1.6,
    skill: 'reading',
    type: 'comprehension',
    choices: ["walks", "runs", "jumps", "sits"]
  },
  {
    text: "Choose the correct article: '__ apple is red.'",
    answer: "An",
    difficulty: -1.4,
    skill: 'reading',
    type: 'grammar',
    choices: ["A", "An", "The", "Some"]
  },

  // A2 Level (Elementary) - difficulty: -1 to 0
  {
    text: "Read: 'Sarah goes to school every day. She likes math but doesn't enjoy history.' - What subject does Sarah dislike?",
    answer: "history",
    difficulty: -0.8,
    skill: 'reading',
    type: 'comprehension',
    choices: ["math", "history", "science", "english"]
  },
  {
    text: "What is the past tense of 'go'?",
    answer: "went",
    difficulty: -0.5,
    skill: 'reading',
    type: 'grammar',
    choices: ["goed", "went", "gone", "going"]
  },
  {
    text: "Read: 'The weather was terrible yesterday. It rained all day and the wind was very strong.' - How was the weather?",
    answer: "terrible",
    difficulty: -0.6,
    skill: 'reading',
    type: 'comprehension',
    choices: ["nice", "terrible", "perfect", "warm"]
  },
  {
    text: "Which word is a synonym for 'big'?",
    answer: "large",
    difficulty: -0.3,
    skill: 'reading',
    type: 'vocabulary',
    choices: ["small", "large", "tiny", "little"]
  },
  {
    text: "Choose the correct preposition: 'I will meet you ___ 5 o'clock.'",
    answer: "at",
    difficulty: -0.4,
    skill: 'reading',
    type: 'grammar',
    choices: ["in", "on", "at", "by"]
  },

  // B1 Level (Intermediate) - difficulty: 0 to 1
  {
    text: "Read: 'Despite the challenging economic climate, the company managed to increase its profits by 15% last quarter.' - What happened to the company's profits?",
    answer: "increased",
    difficulty: 0.3,
    skill: 'reading',
    type: 'comprehension',
    choices: ["decreased", "increased", "stayed the same", "were lost"]
  },
  {
    text: "What does the idiom 'break the ice' mean?",
    answer: "start a conversation",
    difficulty: 0.5,
    skill: 'reading',
    type: 'vocabulary',
    choices: ["make someone angry", "start a conversation", "tell a lie", "break something"]
  },
  {
    text: "Choose the correct form: 'If I ___ rich, I would travel the world.'",
    answer: "were",
    difficulty: 0.6,
    skill: 'reading',
    type: 'grammar',
    choices: ["am", "was", "were", "will be"]
  },
  {
    text: "Read: 'The novel explores themes of identity and belonging through the protagonist's journey across different cultures.' - What is the main focus of the novel?",
    answer: "identity and belonging",
    difficulty: 0.7,
    skill: 'reading',
    type: 'comprehension',
    choices: ["travel adventures", "identity and belonging", "historical events", "romance"]
  },
  {
    text: "What is the meaning of 'unprecedented' in this context: 'The pandemic caused unprecedented disruption'?",
    answer: "never happened before",
    difficulty: 0.8,
    skill: 'reading',
    type: 'vocabulary',
    choices: ["expected", "never happened before", "common", "repeated"]
  },

  // B2 Level (Upper-Intermediate) - difficulty: 1 to 2
  {
    text: "Read: 'The author employs a sophisticated narrative technique, interweaving multiple perspectives to create a nuanced portrayal of contemporary society.' - What literary device is mentioned?",
    answer: "multiple perspectives",
    difficulty: 1.2,
    skill: 'reading',
    type: 'comprehension',
    choices: ["metaphor", "multiple perspectives", "alliteration", "rhyme"]
  },
  {
    text: "What does 'acquiesce' mean?",
    answer: "agree reluctantly",
    difficulty: 1.4,
    skill: 'reading',
    type: 'vocabulary',
    choices: ["refuse strongly", "agree reluctantly", "remain neutral", "protest loudly"]
  },
  {
    text: "Choose the correct form: 'Had I known about the traffic, I ___ earlier.'",
    answer: "would have left",
    difficulty: 1.5,
    skill: 'reading',
    type: 'grammar',
    choices: ["left", "would leave", "would have left", "will leave"]
  },
  {
    text: "Identify the function of the clause: 'The report, which was published yesterday, contradicts previous findings.'",
    answer: "non-defining relative clause",
    difficulty: 1.6,
    skill: 'reading',
    type: 'grammar',
    choices: ["defining relative clause", "non-defining relative clause", "noun clause", "adverb clause"]
  },
  {
    text: "What is the tone of this passage: 'While the initiative shows promise, significant obstacles remain that could undermine its effectiveness'?",
    answer: "cautiously skeptical",
    difficulty: 1.7,
    skill: 'reading',
    type: 'comprehension',
    choices: ["enthusiastic", "cautiously skeptical", "completely negative", "indifferent"]
  },

  // C1 Level (Advanced) - difficulty: 2+
  {
    text: "Analyze: 'The paradigm shift in epistemological frameworks necessitates a fundamental reconceptualization of traditional pedagogical approaches.' - What is being discussed?",
    answer: "changes in teaching methods",
    difficulty: 2.2,
    skill: 'reading',
    type: 'comprehension',
    choices: ["scientific research", "changes in teaching methods", "political theory", "economic models"]
  },
  {
    text: "What does 'obfuscate' mean?",
    answer: "make unclear or confusing",
    difficulty: 2.4,
    skill: 'reading',
    type: 'vocabulary',
    choices: ["clarify", "simplify", "make unclear or confusing", "enhance"]
  }
];

// ===== WRITING QUESTIONS =====
export const writingQuestions = [
  // A1 Level
  {
    text: "Complete the sentence: 'I ___ a student.'",
    answer: "am",
    difficulty: -2,
    skill: 'writing',
    type: 'fill-blank',
    choices: ["am", "is", "are", "be"]
  },
  {
    text: "Write the plural of 'book':",
    answer: "books",
    difficulty: -1.8,
    skill: 'writing',
    type: 'grammar',
    choices: ["books", "bookes", "book", "bookies"]
  },
  {
    text: "Correct the sentence: 'She go to school everyday.'",
    answer: "She goes to school every day.",
    difficulty: -1.5,
    skill: 'writing',
    type: 'error-correction',
    isOpenEnded: true
  },
  {
    text: "Write a simple sentence about your family (3-5 words).",
    answer: "sample: I have two sisters.",
    difficulty: -1.6,
    skill: 'writing',
    type: 'composition',
    isOpenEnded: true
  },

  // A2 Level
  {
    text: "Complete: 'Yesterday, I ___ (go) to the park.'",
    answer: "went",
    difficulty: -0.8,
    skill: 'writing',
    type: 'fill-blank',
    choices: ["go", "went", "gone", "going"]
  },
  {
    text: "Rewrite in past tense: 'I eat breakfast at 7 AM.'",
    answer: "I ate breakfast at 7 AM.",
    difficulty: -0.5,
    skill: 'writing',
    type: 'transformation',
    isOpenEnded: true
  },
  {
    text: "Write a short description of your daily routine (20-30 words).",
    answer: "sample: I wake up at 7 AM, have breakfast, and go to school. After school, I do homework and play with friends.",
    difficulty: -0.3,
    skill: 'writing',
    type: 'composition',
    isOpenEnded: true
  },
  {
    text: "Correct all errors: 'My friend live in a big citys and he have many cars.'",
    answer: "My friend lives in a big city and he has many cars.",
    difficulty: -0.6,
    skill: 'writing',
    type: 'error-correction',
    isOpenEnded: true
  },

  // B1 Level
  {
    text: "Complete with the correct form: 'If I ___ (have) more time, I would read more books.'",
    answer: "had",
    difficulty: 0.4,
    skill: 'writing',
    type: 'fill-blank',
    choices: ["have", "had", "will have", "has"]
  },
  {
    text: "Write a formal email opening to request information about a course (2-3 sentences).",
    answer: "sample: Dear Sir/Madam, I am writing to inquire about the English course advertised on your website. Could you please provide information about the course duration and fees?",
    difficulty: 0.6,
    skill: 'writing',
    type: 'composition',
    isOpenEnded: true
  },
  {
    text: "Combine these sentences using 'although': 'It was raining. We went to the beach.'",
    answer: "Although it was raining, we went to the beach.",
    difficulty: 0.7,
    skill: 'writing',
    type: 'transformation',
    isOpenEnded: true
  },
  {
    text: "Write a paragraph (50-70 words) explaining the advantages of learning English.",
    answer: "sample: Learning English offers numerous advantages. It opens doors to better job opportunities and enables communication with people worldwide. English is the language of international business, science, and technology. Additionally, it allows access to a vast amount of information and entertainment available online.",
    difficulty: 0.8,
    skill: 'writing',
    type: 'composition',
    isOpenEnded: true
  },

  // B2 Level
  {
    text: "Write an argumentative paragraph (80-100 words) discussing whether social media has a positive or negative impact on society.",
    answer: "sample: Social media has both positive and negative impacts on society. On the positive side, it facilitates global communication and enables people to stay connected regardless of distance. However, it also presents significant challenges, including the spread of misinformation and cyberbullying. Moreover, excessive use can lead to addiction and mental health issues. While social media can be a powerful tool for social change, its negative effects on privacy and interpersonal relationships cannot be ignored. Therefore, a balanced approach is necessary.",
    difficulty: 1.3,
    skill: 'writing',
    type: 'composition',
    isOpenEnded: true
  },
  {
    text: "Rewrite this sentence using passive voice: 'The committee will review the proposal next week.'",
    answer: "The proposal will be reviewed by the committee next week.",
    difficulty: 1.5,
    skill: 'writing',
    type: 'transformation',
    isOpenEnded: true
  },

  // C1 Level
  {
    text: "Write an analytical essay introduction (100-120 words) on the impact of artificial intelligence on employment.",
    answer: "sample: The rapid advancement of artificial intelligence (AI) has sparked considerable debate regarding its impact on employment across various sectors. While proponents argue that AI will create new job opportunities and enhance productivity, critics warn of widespread job displacement and growing inequality. This essay examines both perspectives, analyzing empirical evidence from recent studies and case examples from industries undergoing AI-driven transformation. It will argue that although AI presents significant challenges to traditional employment structures, strategic policy interventions and educational reforms can mitigate negative consequences while harnessing the technology's potential benefits. Understanding this complex relationship is crucial for policymakers and businesses navigating the evolving landscape of work.",
    difficulty: 2.1,
    skill: 'writing',
    type: 'composition',
    isOpenEnded: true
  }
];

// ===== LISTENING QUESTIONS =====
export const listeningQuestions = [
  // A1 Level
  {
    text: "[Audio: 'Hello, my name is Tom.'] - What is the speaker's name?",
    answer: "Tom",
    difficulty: -2,
    skill: 'listening',
    type: 'comprehension',
    audioUrl: "/audio/listening/a1_name.mp3",
    choices: ["Tom", "Tim", "John", "Sam"]
  },
  {
    text: "[Audio: 'I have two cats and one dog.'] - How many pets does the speaker have?",
    answer: "three",
    difficulty: -1.7,
    skill: 'listening',
    type: 'comprehension',
    audioUrl: "/audio/listening/a1_pets.mp3",
    choices: ["one", "two", "three", "four"]
  },
  {
    text: "[Audio: 'The store closes at 6 PM.'] - What time does the store close?",
    answer: "6 PM",
    difficulty: -1.5,
    skill: 'listening',
    type: 'detail',
    audioUrl: "/audio/listening/a1_time.mp3",
    choices: ["5 PM", "6 PM", "7 PM", "8 PM"]
  },

  // A2 Level
  {
    text: "[Audio: Conversation about weekend plans] - Where does Sarah want to go this weekend?",
    answer: "the beach",
    difficulty: -0.7,
    skill: 'listening',
    type: 'comprehension',
    audioUrl: "/audio/listening/a2_weekend.mp3",
    choices: ["the mountains", "the beach", "the museum", "the cinema"]
  },
  {
    text: "[Audio: Weather forecast] - What will the weather be like tomorrow?",
    answer: "rainy",
    difficulty: -0.4,
    skill: 'listening',
    type: 'detail',
    audioUrl: "/audio/listening/a2_weather.mp3",
    choices: ["sunny", "rainy", "snowy", "cloudy"]
  },

  // B1 Level
  {
    text: "[Audio: Interview about career choice] - Why did the speaker choose their profession?",
    answer: "passion for helping people",
    difficulty: 0.5,
    skill: 'listening',
    type: 'comprehension',
    audioUrl: "/audio/listening/b1_career.mp3",
    isOpenEnded: true
  },
  {
    text: "[Audio: Lecture excerpt] - What is the main point the speaker makes?",
    answer: "climate change requires immediate action",
    difficulty: 0.8,
    skill: 'listening',
    type: 'main-idea',
    audioUrl: "/audio/listening/b1_lecture.mp3",
    isOpenEnded: true
  },

  // B2 Level
  {
    text: "[Audio: Podcast discussion] - What is the speaker's attitude toward the new policy?",
    answer: "cautiously optimistic",
    difficulty: 1.4,
    skill: 'listening',
    type: 'inference',
    audioUrl: "/audio/listening/b2_podcast.mp3",
    choices: ["completely negative", "cautiously optimistic", "enthusiastically positive", "indifferent"]
  },

  // C1 Level
  {
    text: "[Audio: Academic lecture] - Summarize the speaker's main argument regarding epistemological frameworks.",
    answer: "traditional frameworks are insufficient for contemporary challenges",
    difficulty: 2.3,
    skill: 'listening',
    type: 'comprehension',
    audioUrl: "/audio/listening/c1_academic.mp3",
    isOpenEnded: true
  }
];

// ===== SPEAKING QUESTIONS =====
export const speakingQuestions = [
  // A1 Level
  {
    text: "Introduce yourself: Say your name and age.",
    answer: "sample: My name is [Name] and I am [age] years old.",
    difficulty: -2,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },
  {
    text: "Describe your favorite color.",
    answer: "sample: My favorite color is blue.",
    difficulty: -1.6,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },

  // A2 Level
  {
    text: "Talk about your daily routine (30 seconds).",
    answer: "sample: I wake up at 7 AM, eat breakfast, go to school, come home, do homework, and go to bed at 10 PM.",
    difficulty: -0.6,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },
  {
    text: "Describe your hometown.",
    answer: "sample: My hometown is a small city with beautiful parks and friendly people. It has a river and many shops.",
    difficulty: -0.3,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },

  // B1 Level
  {
    text: "Explain why learning English is important (1 minute).",
    answer: "sample: Learning English is important because it's an international language used in business, education, and travel. It helps you communicate with people from different countries and access more information online.",
    difficulty: 0.6,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },
  {
    text: "Describe a memorable experience from your childhood.",
    answer: "sample: When I was eight, my family went to the beach for the first time. I learned to swim and built sandcastles. It was wonderful because we spent quality time together.",
    difficulty: 0.7,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },

  // B2 Level
  {
    text: "Present arguments for and against social media (2 minutes).",
    answer: "sample: Social media connects people globally and enables information sharing. However, it can spread misinformation and affect mental health. Balance is key.",
    difficulty: 1.4,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  },

  // C1 Level
  {
    text: "Discuss the implications of artificial intelligence on society (3 minutes).",
    answer: "sample: AI presents transformative potential across sectors, yet raises ethical concerns regarding employment, privacy, and decision-making autonomy. Regulatory frameworks must balance innovation with societal protection.",
    difficulty: 2.2,
    skill: 'speaking',
    type: 'production',
    isOpenEnded: true,
    recordingRequired: true
  }
];

// ===== MODULE DEFINITIONS =====
export const modules = [
  // READING MODULES
  {
    title: "Reading Basics - Simple Texts",
    skill: "reading",
    level: 1,
    description: "Learn to read and understand simple sentences and short texts about familiar topics.",
    difficulty: -1.5,
    estimatedTime: "2 hours",
    prerequisites: [],
    learningObjectives: [
      "Understand simple sentences",
      "Identify main ideas in short texts",
      "Recognize common vocabulary"
    ]
  },
  {
    title: "Reading - Everyday Situations",
    skill: "reading",
    level: 2,
    description: "Read and understand texts about everyday situations, personal information, and simple descriptions.",
    difficulty: -0.5,
    estimatedTime: "3 hours",
    prerequisites: ["Reading Basics - Simple Texts"],
    learningObjectives: [
      "Understand personal letters and emails",
      "Read simple instructions",
      "Comprehend short narratives"
    ]
  },
  {
    title: "Intermediate Reading - Articles & Stories",
    skill: "reading",
    level: 3,
    description: "Read articles, stories, and longer texts with more complex vocabulary and structures.",
    difficulty: 0.5,
    estimatedTime: "4 hours",
    prerequisites: ["Reading - Everyday Situations"],
    learningObjectives: [
      "Understand main ideas in complex texts",
      "Identify supporting details",
      "Infer meaning from context"
    ]
  },
  {
    title: "Advanced Reading - Academic Texts",
    skill: "reading",
    level: 4,
    description: "Analyze academic articles, research papers, and complex literary texts.",
    difficulty: 1.5,
    estimatedTime: "5 hours",
    prerequisites: ["Intermediate Reading - Articles & Stories"],
    learningObjectives: [
      "Analyze argument structure",
      "Evaluate evidence and claims",
      "Understand sophisticated vocabulary"
    ]
  },

  // WRITING MODULES
  {
    title: "Writing Basics - Sentences",
    skill: "writing",
    level: 1,
    description: "Learn to write simple sentences correctly using basic grammar and vocabulary.",
    difficulty: -1.5,
    estimatedTime: "2 hours",
    prerequisites: [],
    learningObjectives: [
      "Form simple sentences",
      "Use basic punctuation",
      "Write short messages"
    ]
  },
  {
    title: "Writing - Paragraphs",
    skill: "writing",
    level: 2,
    description: "Write coherent paragraphs about familiar topics with clear structure.",
    difficulty: -0.5,
    estimatedTime: "3 hours",
    prerequisites: ["Writing Basics - Sentences"],
    learningObjectives: [
      "Structure paragraphs with topic sentences",
      "Use connecting words",
      "Write personal descriptions"
    ]
  },
  {
    title: "Intermediate Writing - Essays",
    skill: "writing",
    level: 3,
    description: "Write structured essays with clear introduction, body, and conclusion.",
    difficulty: 0.5,
    estimatedTime: "4 hours",
    prerequisites: ["Writing - Paragraphs"],
    learningObjectives: [
      "Write multi-paragraph essays",
      "Develop and support arguments",
      "Use varied sentence structures"
    ]
  },
  {
    title: "Advanced Writing - Academic",
    skill: "writing",
    level: 4,
    description: "Produce academic writing with sophisticated arguments and formal style.",
    difficulty: 1.5,
    estimatedTime: "5 hours",
    prerequisites: ["Intermediate Writing - Essays"],
    learningObjectives: [
      "Write research papers",
      "Cite sources properly",
      "Employ academic style"
    ]
  },

  // LISTENING MODULES
  {
    title: "Listening Basics - Simple Conversations",
    skill: "listening",
    level: 1,
    description: "Understand simple spoken English in everyday conversations.",
    difficulty: -1.5,
    estimatedTime: "2 hours",
    prerequisites: [],
    learningObjectives: [
      "Understand greetings and introductions",
      "Follow simple instructions",
      "Comprehend basic questions"
    ]
  },
  {
    title: "Listening - Everyday Dialogues",
    skill: "listening",
    level: 2,
    description: "Understand conversations about familiar topics and routine matters.",
    difficulty: -0.5,
    estimatedTime: "3 hours",
    prerequisites: ["Listening Basics - Simple Conversations"],
    learningObjectives: [
      "Follow longer conversations",
      "Understand main points",
      "Identify specific information"
    ]
  },
  {
    title: "Intermediate Listening - News & Media",
    skill: "listening",
    level: 3,
    description: "Understand news reports, interviews, and discussions on familiar topics.",
    difficulty: 0.5,
    estimatedTime: "4 hours",
    prerequisites: ["Listening - Everyday Dialogues"],
    learningObjectives: [
      "Comprehend news broadcasts",
      "Follow debates and discussions",
      "Understand different accents"
    ]
  },
  {
    title: "Advanced Listening - Lectures & Presentations",
    skill: "listening",
    level: 4,
    description: "Understand complex academic lectures and professional presentations.",
    difficulty: 1.5,
    estimatedTime: "5 hours",
    prerequisites: ["Intermediate Listening - News & Media"],
    learningObjectives: [
      "Follow academic lectures",
      "Understand implicit meaning",
      "Take effective notes"
    ]
  },

  // SPEAKING MODULES
  {
    title: "Speaking Basics - Introductions",
    skill: "speaking",
    level: 1,
    description: "Learn to introduce yourself and have simple conversations.",
    difficulty: -1.5,
    estimatedTime: "2 hours",
    prerequisites: [],
    learningObjectives: [
      "Introduce yourself clearly",
      "Ask and answer simple questions",
      "Use basic pronunciation"
    ]
  },
  {
    title: "Speaking - Daily Conversations",
    skill: "speaking",
    level: 2,
    description: "Engage in conversations about everyday topics and personal experiences.",
    difficulty: -0.5,
    estimatedTime: "3 hours",
    prerequisites: ["Speaking Basics - Introductions"],
    learningObjectives: [
      "Discuss daily routines",
      "Express opinions simply",
      "Improve pronunciation"
    ]
  },
  {
    title: "Intermediate Speaking - Discussions",
    skill: "speaking",
    level: 3,
    description: "Participate in discussions and express opinions on various topics.",
    difficulty: 0.5,
    estimatedTime: "4 hours",
    prerequisites: ["Speaking - Daily Conversations"],
    learningObjectives: [
      "Express opinions with reasons",
      "Participate in group discussions",
      "Use natural intonation"
    ]
  },
  {
    title: "Advanced Speaking - Presentations",
    skill: "speaking",
    level: 4,
    description: "Deliver presentations and engage in complex discussions.",
    difficulty: 1.5,
    estimatedTime: "5 hours",
    prerequisites: ["Intermediate Speaking - Discussions"],
    learningObjectives: [
      "Give formal presentations",
      "Debate complex topics",
      "Use sophisticated expressions"
    ]
  }
];

export const allQuestions = [
  ...readingQuestions,
  ...writingQuestions,
  ...listeningQuestions,
  ...speakingQuestions
];
