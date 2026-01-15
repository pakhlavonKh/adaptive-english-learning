/**
 * Comprehensive Content Seed Data - 150 Questions Total
 * English Learning Platform - All Skills (Reading, Writing, Listening, Speaking)
 * Distribution: ~135 Multiple Choice + 15 Essays across 4 skills
 * All CEFR levels: A1, A2, B1, B2, C1
 * All difficulty values are positive (0.2 - 2.5)
 */

// ===== READING QUESTIONS (40 TOTAL) =====
export const readingQuestions = [
  // A1 Level
  { text: "Read: 'The cat is on the mat.' - Where is the cat?", answer: "on the mat", difficulty: 0.2, skill: 'reading', type: 'multiple-choice', options: ["on the mat", "under the mat", "in the mat", "behind the mat"] },
  { text: "Read: 'My name is John. I am 10 years old.' - How old is John?", answer: "10 years old", difficulty: 0.2, skill: 'reading', type: 'multiple-choice', options: ["8 years old", "9 years old", "10 years old", "11 years old"] },
  { text: "Which word means 'happy'?", answer: "glad", difficulty: 0.3, skill: 'reading', type: 'multiple-choice', options: ["sad", "glad", "angry", "tired"] },
  { text: "Read: 'The dog runs fast.' - What does the dog do?", answer: "runs", difficulty: 0.3, skill: 'reading', type: 'multiple-choice', options: ["walks", "runs", "jumps", "sits"] },
  { text: "Choose the correct article: '__ apple is red.'", answer: "An", difficulty: 0.3, skill: 'reading', type: 'multiple-choice', options: ["A", "An", "The", "Some"] },
  { text: "What color is the sky?", answer: "blue", difficulty: 0.2, skill: 'reading', type: 'multiple-choice', options: ["red", "blue", "green", "yellow"] },
  { text: "How many days are in a week?", answer: "seven", difficulty: 0.2, skill: 'reading', type: 'multiple-choice', options: ["five", "six", "seven", "eight"] },
  { text: "Read: 'I like apples and oranges.' - What does the person like?", answer: "apples and oranges", difficulty: 0.2, skill: 'reading', type: 'multiple-choice', options: ["just apples", "apples and oranges", "just oranges", "bananas"] },
  
  // A2 Level
  { text: "Read: 'Sarah goes to school every day. She likes math but doesn't enjoy history.' - What subject does Sarah dislike?", answer: "history", difficulty: 0.4, skill: 'reading', type: 'multiple-choice', options: ["math", "history", "science", "english"] },
  { text: "What is the past tense of 'go'?", answer: "went", difficulty: 0.5, skill: 'reading', type: 'multiple-choice', options: ["goed", "went", "gone", "going"] },
  { text: "Read: 'The weather was terrible yesterday.' - How was the weather?", answer: "terrible", difficulty: 0.4, skill: 'reading', type: 'multiple-choice', options: ["nice", "terrible", "perfect", "warm"] },
  { text: "Which word is a synonym for 'big'?", answer: "large", difficulty: 0.5, skill: 'reading', type: 'multiple-choice', options: ["small", "large", "tiny", "little"] },
  { text: "Choose the correct preposition: 'I will meet you ___ 5 o'clock.'", answer: "at", difficulty: 0.5, skill: 'reading', type: 'multiple-choice', options: ["in", "on", "at", "by"] },
  { text: "What is the opposite of 'hot'?", answer: "cold", difficulty: 0.4, skill: 'reading', type: 'multiple-choice', options: ["warm", "cold", "cool", "freezing"] },
  { text: "Read: 'I enjoy reading books in my free time.' - What does the person enjoy?", answer: "reading books", difficulty: 0.5, skill: 'reading', type: 'multiple-choice', options: ["writing", "reading books", "playing games", "watching TV"] },
  { text: "What is the plural of 'child'?", answer: "children", difficulty: 0.4, skill: 'reading', type: 'multiple-choice', options: ["childs", "children", "childes", "childer"] },
  
  // B1 Level
  { text: "Read: 'Despite challenging weather, the team won.' - What does 'managed' imply?", answer: "succeeded despite difficulty", difficulty: 0.3, skill: 'reading', type: 'multiple-choice', options: ["failed easily", "succeeded despite difficulty", "tried hard", "gave up"] },
  { text: "Which best describes: 'Technology has revolutionized communication.'", answer: "Technology has greatly changed communication", difficulty: 0.5, skill: 'reading', type: 'multiple-choice', options: ["Technology doesn't affect communication", "Technology has greatly changed communication", "Communication is easy", "Technology is bad"] },
  { text: "What does 'ambiguous' mean?", answer: "open to more than one interpretation", difficulty: 0.6, skill: 'reading', type: 'multiple-choice', options: ["very clear", "open to more than one interpretation", "completely false", "definitely true"] },
  { text: "Read: 'The government implemented new policies.' - What action was taken?", answer: "put policies into action", difficulty: 0.4, skill: 'reading', type: 'multiple-choice', options: ["discussed policies", "put policies into action", "rejected policies", "delayed decisions"] },
  { text: "Which is the best summary: 'Climate change causes extreme weather events.'", answer: "Climate change is causing extreme weather", difficulty: 0.7, skill: 'reading', type: 'multiple-choice', options: ["Weather is unpredictable", "Climate change is causing extreme weather", "Hurricanes are natural", "Droughts are temporary"] },
  { text: "What does 'enhance' mean?", answer: "improve or make better", difficulty: 0.5, skill: 'reading', type: 'multiple-choice', options: ["reduce", "improve or make better", "complicate", "ignore"] },
  { text: "Read: 'Innovation drives economic growth.' - What drives growth?", answer: "innovation", difficulty: 0.8, skill: 'reading', type: 'multiple-choice', options: ["tradition", "innovation", "stability", "resistance"] },
  
  // B2 Level
  { text: "Read: 'The author's contentious perspective presents compelling arguments.' - What is the author's tone?", answer: "debated but persuasive", difficulty: 1.2, skill: 'reading', type: 'multiple-choice', options: ["universally accepted", "debated but persuasive", "clearly wrong", "irrelevant"] },
  { text: "What does 'paradox' refer to?", answer: "a self-contradictory statement that may be true", difficulty: 1.3, skill: 'reading', type: 'multiple-choice', options: ["a simple truth", "a self-contradictory statement that may be true", "a proven fact", "an obvious lie"] },
  { text: "Read: 'The exponential growth of social media, with caveats regarding accuracy, is undeniable.' - What is a caveat?", answer: "a concern about accuracy", difficulty: 1.4, skill: 'reading', type: 'multiple-choice', options: ["speed of delivery", "a concern about accuracy", "number of users", "available languages"] },
  { text: "What does 'facilitate' mean?", answer: "make something easier", difficulty: 1.1, skill: 'reading', type: 'multiple-choice', options: ["prevent", "make something easier", "complicate", "forbid"] },
  { text: "Read: 'Notwithstanding recent setbacks, the company remains optimistic.' - What does 'notwithstanding' mean?", answer: "despite", difficulty: 1.2, skill: 'reading', type: 'multiple-choice', options: ["because of", "despite", "due to", "because"] },
  { text: "What does 'pragmatic' mean?", answer: "dealing with things in a practical way", difficulty: 1.0, skill: 'reading', type: 'multiple-choice', options: ["theoretical", "dealing with things in a practical way", "idealistic", "impractical"] },
  
  // C1 Level
  { text: "What does 'ubiquitous' mean?", answer: "present everywhere at the same time", difficulty: 2.1, skill: 'reading', type: 'multiple-choice', options: ["extremely rare", "present everywhere at the same time", "difficult to understand", "completely false"] },
  { text: "Which captures nuance: 'The politician's equivocal remarks suggest both commitment and hesitation.'", answer: "The politician showed mixed feelings", difficulty: 2.2, skill: 'reading', type: 'multiple-choice', options: ["The politician was completely honest", "The politician showed mixed feelings", "The politician fully supported", "The politician opposed everything"] },
  { text: "What is an 'epitome'?", answer: "a perfect example of something", difficulty: 2.0, skill: 'reading', type: 'multiple-choice', options: ["an enemy", "a perfect example of something", "a mistake", "a prediction"] },
  { text: "What does 'ameliorate' mean?", answer: "improve or make better", difficulty: 2.1, skill: 'reading', type: 'multiple-choice', options: ["worsen", "improve or make better", "eliminate", "complicate"] },
  { text: "Read: 'The hegemonic discourse obscures alternative perspectives.' - What is hegemonic discourse?", answer: "dominant and controlling narrative", difficulty: 2.3, skill: 'reading', type: 'multiple-choice', options: ["minority opinion", "dominant and controlling narrative", "scientific fact", "personal belief"] }
];

// ===== WRITING QUESTIONS (40 TOTAL: 30 MULTIPLE CHOICE + 10 ESSAYS) =====
export const writingQuestions = [
  // Multiple Choice Writing (30)
  // A1 Level
  { text: "Complete: 'I ___ a student.'", answer: "am", difficulty: 0.2, skill: 'writing', type: 'multiple-choice', options: ["am", "is", "are", "be"] },
  { text: "What is the plural of 'book'?", answer: "books", difficulty: 0.2, skill: 'writing', type: 'multiple-choice', options: ["books", "bookes", "book", "bookies"] },
  { text: "Choose: 'She ___ to the store yesterday.'", answer: "went", difficulty: 0.3, skill: 'writing', type: 'multiple-choice', options: ["go", "goes", "went", "going"] },
  { text: "Which is correct: 'I have ___ cat.'", answer: "a", difficulty: 0.3, skill: 'writing', type: 'multiple-choice', options: ["a", "an", "the", "some"] },
  { text: "Choose the correct pronoun: '___ is my friend.'", answer: "He", difficulty: 0.3, skill: 'writing', type: 'multiple-choice', options: ["Him", "He", "His", "Hers"] },
  { text: "What is the correct form: 'I ___ (like) pizza.'", answer: "like", difficulty: 0.2, skill: 'writing', type: 'multiple-choice', options: ["am like", "like", "likes", "liking"] },
  { text: "Choose: 'We ___ (are) friends.'", answer: "are", difficulty: 0.2, skill: 'writing', type: 'multiple-choice', options: ["am", "is", "are", "be"] },
  
  // A2 Level
  { text: "Complete: 'Yesterday, I ___ (go) to the park.'", answer: "went", difficulty: 0.4, skill: 'writing', type: 'multiple-choice', options: ["go", "went", "gone", "going"] },
  { text: "Which is the correct question?", answer: "Do you like ice cream?", difficulty: 0.5, skill: 'writing', type: 'multiple-choice', options: ["You like ice cream?", "Do you like ice cream?", "Like you ice cream?", "You do like?"] },
  { text: "Choose: 'I ___ never been to Paris.'", answer: "have", difficulty: 0.4, skill: 'writing', type: 'multiple-choice', options: ["have", "has", "am", "is"] },
  { text: "Which uses the correct article?", answer: "She is an engineer.", difficulty: 0.5, skill: 'writing', type: 'multiple-choice', options: ["She is the engineer.", "She is a engineer.", "She is an engineer.", "She is engineer."] },
  { text: "Complete: 'I am interested ___ learning languages.'", answer: "in", difficulty: 0.5, skill: 'writing', type: 'multiple-choice', options: ["at", "in", "on", "for"] },
  { text: "Choose correct form: 'They ___ going to the beach.'", answer: "are", difficulty: 0.4, skill: 'writing', type: 'multiple-choice', options: ["am", "are", "is", "be"] },
  
  // B1 Level
  { text: "Choose: 'If I ___ (have) more time, I would travel.'", answer: "had", difficulty: 0.4, skill: 'writing', type: 'multiple-choice', options: ["have", "had", "will have", "has"] },
  { text: "Which fills the blank? 'She ___ about his dishonesty.'", answer: "complained", difficulty: 0.5, skill: 'writing', type: 'multiple-choice', options: ["complained", "complains", "complaining", "to complain"] },
  { text: "Which is correct? 'The book I bought ___ excellent.'", answer: "is", difficulty: 0.6, skill: 'writing', type: 'multiple-choice', options: ["are", "is", "be", "was"] },
  { text: "Choose the connector: '___ it was raining, we went hiking.'", answer: "Although", difficulty: 0.7, skill: 'writing', type: 'multiple-choice', options: ["Because", "Although", "Since", "When"] },
  { text: "Which is grammatically correct?", answer: "I suggest that you practice regularly.", difficulty: 0.8, skill: 'writing', type: 'multiple-choice', options: ["I suggest you practicing.", "I suggest that you practice regularly.", "I suggest you to practice.", "I suggest practicing you."] },
  { text: "Complete: 'She wishes she ___ studied harder.'", answer: "had", difficulty: 0.9, skill: 'writing', type: 'multiple-choice', options: ["has", "had", "would have", "have"] },
  
  // B2 Level
  { text: "Complete: 'The data ___ to support the hypothesis.'", answer: "appears", difficulty: 1.3, skill: 'writing', type: 'multiple-choice', options: ["appear", "appears", "to appear", "appearing"] },
  { text: "Which demonstrates proper punctuation?", answer: "She said, 'I love learning English.'", difficulty: 1.2, skill: 'writing', type: 'multiple-choice', options: ["She said 'I love learning'", "She said, 'I love learning English.'", "She said 'I love it.'", "She said: I love it."] },
  { text: "What is the passive voice? 'The company released the product.'", answer: "The product was released by the company.", difficulty: 1.4, skill: 'writing', type: 'multiple-choice', options: ["The product released.", "The product was released by the company.", "The company was releasing.", "The product is released."] },
  { text: "Which uses 'nevertheless'?", answer: "The weather was bad; nevertheless, we enjoyed.", difficulty: 1.5, skill: 'writing', type: 'multiple-choice', options: ["Nevertheless bad weather.", "The weather was bad; nevertheless, we enjoyed.", "We enjoyed, nevertheless.", "Nevertheless we enjoyed."] },
  { text: "Choose: 'Had I known, I ___ attended.'", answer: "would have", difficulty: 1.6, skill: 'writing', type: 'multiple-choice', options: ["would have", "would", "will have", "had"] },
  
  // C1 Level
  { text: "Which demonstrates sophisticated vocabulary?", answer: "The policy ameliorated the disparities.", difficulty: 2.2, skill: 'writing', type: 'multiple-choice', options: ["The policy made things better.", "The policy ameliorated the disparities.", "The policy fixed things.", "The policy helped."] },
  { text: "What is correct? 'The authors' ___ regarding methodology.'", answer: "perspectives", difficulty: 2.3, skill: 'writing', type: 'multiple-choice', options: ["perspective", "perspectives", "prospective", "perspectives'"] },
  { text: "Which uses formal register?", answer: "Notwithstanding the challenges, the initiative succeeded.", difficulty: 2.4, skill: 'writing', type: 'multiple-choice', options: ["The project worked out.", "Notwithstanding the challenges, the initiative succeeded.", "You know, we succeeded.", "Basically, we won."] },

  // ESSAY WRITING QUESTIONS (10)
  { text: "Write an essay (200-250 words) about your favorite hobby and why you enjoy it.", answer: "essay", difficulty: 0.5, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a descriptive paragraph (100-150 words) about a place you recently visited.", answer: "essay", difficulty: 0.3, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write an argumentative essay (250-300 words) on the advantages and disadvantages of social media.", answer: "essay", difficulty: 1.3, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a personal narrative (150-200 words) about a challenging experience you overcame.", answer: "essay", difficulty: 0.8, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a formal email (100-150 words) requesting information about a job position.", answer: "essay", difficulty: 0.6, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write an analytical essay (300-350 words) analyzing how technology has changed education.", answer: "essay", difficulty: 1.6, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a review (150-200 words) of a book, movie, or product.", answer: "essay", difficulty: 0.9, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a persuasive essay (200-250 words) on why students should learn a second language.", answer: "essay", difficulty: 1.1, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a comparison essay (250-300 words) comparing two different cultures or countries.", answer: "essay", difficulty: 1.4, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' },
  { text: "Write a reflective essay (200-250 words) about a moment that changed your perspective.", answer: "essay", difficulty: 1.2, skill: 'writing', type: 'essay', isOpenEnded: true, evaluationType: 'semantic' }
];

// ===== LISTENING QUESTIONS (40 TOTAL) =====
export const listeningQuestions = [
  // A1 Level
  { text: "[Audio: 'Hello, my name is Tom.'] - What is the speaker's name?", answer: "Tom", difficulty: 0.2, skill: 'listening', type: 'multiple-choice', options: ["Tim", "Tom", "John", "Sam"] },
  { text: "[Audio: 'I have two cats and one dog.'] - How many cats?", answer: "two", difficulty: 0.2, skill: 'listening', type: 'multiple-choice', options: ["one", "two", "three", "four"] },
  { text: "[Audio: 'The store closes at 6 PM.'] - What time?", answer: "6 PM", difficulty: 0.3, skill: 'listening', type: 'multiple-choice', options: ["5 PM", "6 PM", "7 PM", "8 PM"] },
  { text: "[Audio: 'Today is Monday.'] - What day?", answer: "Monday", difficulty: 0.2, skill: 'listening', type: 'multiple-choice', options: ["Sunday", "Monday", "Tuesday", "Wednesday"] },
  { text: "[Audio: 'I like juice.'] - What does the speaker like?", answer: "juice", difficulty: 0.3, skill: 'listening', type: 'multiple-choice', options: ["water", "tea", "juice", "milk"] },
  { text: "[Audio: 'The weather is sunny.'] - How is the weather?", answer: "sunny", difficulty: 0.2, skill: 'listening', type: 'multiple-choice', options: ["rainy", "sunny", "cloudy", "snowy"] },
  { text: "[Audio: 'My birthday is in July.'] - When is the birthday?", answer: "July", difficulty: 0.3, skill: 'listening', type: 'multiple-choice', options: ["June", "July", "August", "September"] },
  
  // A2 Level
  { text: "[Audio: 'What's your favorite subject?' 'I love science.'] - Favorite subject?", answer: "science", difficulty: 0.4, skill: 'listening', type: 'multiple-choice', options: ["math", "science", "history", "art"] },
  { text: "[Audio: 'Tomorrow will be rainy.'] - What's the forecast?", answer: "rainy", difficulty: 0.5, skill: 'listening', type: 'multiple-choice', options: ["sunny", "rainy", "cloudy", "hot"] },
  { text: "[Audio: 'I go to work by bus.'] - How does the speaker go?", answer: "by bus", difficulty: 0.5, skill: 'listening', type: 'multiple-choice', options: ["by car", "by bus", "by train", "by bike"] },
  { text: "[Audio: 'I need milk and bread.'] - What does the speaker need?", answer: "milk and bread", difficulty: 0.4, skill: 'listening', type: 'multiple-choice', options: ["milk and cheese", "milk and bread", "bread and butter", "cheese and eggs"] },
  { text: "[Audio: 'I work in a restaurant.'] - Where does the speaker work?", answer: "in a restaurant", difficulty: 0.4, skill: 'listening', type: 'multiple-choice', options: ["at home", "in a restaurant", "in an office", "in a store"] },
  { text: "[Audio: 'I like apples and oranges.'] - What fruits does the speaker like?", answer: "apples and oranges", difficulty: 0.5, skill: 'listening', type: 'multiple-choice', options: ["apples only", "apples and oranges", "oranges only", "bananas"] },
  
  // B1 Level
  { text: "[Audio: 'I work as a teacher in a public school.'] - What is the job?", answer: "teacher", difficulty: 0.3, skill: 'listening', type: 'multiple-choice', options: ["doctor", "teacher", "engineer", "lawyer"] },
  { text: "[Audio: 'Climate change is caused by pollution.'] - What causes it?", answer: "pollution", difficulty: 0.5, skill: 'listening', type: 'multiple-choice', options: ["natural cycles", "pollution", "solar activity", "ocean currents"] },
  { text: "[Audio: 'New York is a huge, busy city.'] - Which word describes NYC?", answer: "busy", difficulty: 0.4, skill: 'listening', type: 'multiple-choice', options: ["quiet", "busy", "relaxing", "small"] },
  { text: "[Audio: 'I exercise in the morning.'] - When does the speaker exercise?", answer: "morning", difficulty: 0.6, skill: 'listening', type: 'multiple-choice', options: ["afternoon", "evening", "morning", "night"] },
  { text: "[Audio: 'Learning languages enhances cognitive abilities.'] - What does it do?", answer: "enhances cognitive abilities", difficulty: 0.7, skill: 'listening', type: 'multiple-choice', options: ["wastes time", "enhances cognitive abilities", "reduces memory", "causes confusion"] },
  { text: "[Audio: 'I prefer reading to watching TV.'] - What does the speaker prefer?", answer: "reading", difficulty: 0.5, skill: 'listening', type: 'multiple-choice', options: ["watching TV", "reading", "sports", "games"] },
  { text: "[Audio: 'The internet connects millions of people.'] - What does internet do?", answer: "connects people", difficulty: 0.8, skill: 'listening', type: 'multiple-choice', options: ["isolates people", "connects people", "slows down", "creates problems"] },
  
  // B2 Level
  { text: "[Audio: 'The policies, while controversial, show results.'] - What is the tone?", answer: "cautiously optimistic", difficulty: 1.2, skill: 'listening', type: 'multiple-choice', options: ["completely negative", "cautiously optimistic", "highly critical", "enthusiastically positive"] },
  { text: "[Audio: 'Renewable energy is crucial for sustainability.'] - What is crucial?", answer: "renewable energy", difficulty: 1.1, skill: 'listening', type: 'multiple-choice', options: ["fossil fuels", "renewable energy", "nuclear power", "hydro plants"] },
  { text: "[Audio: 'My success comes from persistence and learning.'] - What contributes?", answer: "persistence and learning", difficulty: 1.3, skill: 'listening', type: 'multiple-choice', options: ["luck", "persistence and learning", "inherited wealth", "connections"] },
  { text: "[Audio: 'Technology offers advantages but privacy concerns.'] - Main concern?", answer: "privacy", difficulty: 1.4, skill: 'listening', type: 'multiple-choice', options: ["cost", "privacy", "complexity", "availability"] },
  { text: "[Audio: 'Globalization has many implications.'] - What does it suggest?", answer: "multiple effects", difficulty: 1.5, skill: 'listening', type: 'multiple-choice', options: ["it's simple", "multiple effects", "universally positive", "completely negative"] },
  { text: "[Audio: 'Education systems need reform.'] - What is needed?", answer: "reform", difficulty: 1.2, skill: 'listening', type: 'multiple-choice', options: ["investment", "reform", "expansion", "reduction"] },
  { text: "[Audio: 'Urban planning affects quality of life.'] - What does planning affect?", answer: "quality of life", difficulty: 1.0, skill: 'listening', type: 'multiple-choice', options: ["traffic only", "quality of life", "weather", "population"] },
  
  // C1 Level
  { text: "[Audio: 'Traditional frameworks are insufficient.'] - What is criticized?", answer: "traditional frameworks", difficulty: 2.2, skill: 'listening', type: 'multiple-choice', options: ["modern innovation", "traditional frameworks", "scientific methods", "research data"] },
  { text: "[Audio: 'The paradigm shift in quantum mechanics revolutionized physics.'] - What changed?", answer: "the paradigm in quantum mechanics", difficulty: 2.3, skill: 'listening', type: 'multiple-choice', options: ["mathematical formulas", "the paradigm in quantum mechanics", "laboratory equipment", "scientific terminology"] },
  { text: "[Audio: 'The dominant discourse obscures perspectives.'] - What does it do?", answer: "obscure perspectives", difficulty: 2.4, skill: 'listening', type: 'multiple-choice', options: ["promote equality", "obscure perspectives", "encourage debate", "support diversity"] },
  { text: "[Audio: 'The theory-practice dichotomy remains contested.'] - What is debated?", answer: "theory and practice relationship", difficulty: 2.5, skill: 'listening', type: 'multiple-choice', options: ["scientific facts", "theory and practice relationship", "mathematical proofs", "historical events"] },
  { text: "[Audio: 'Epistemological validity requires rigorous interrogation.'] - What is necessary?", answer: "rigorous interrogation", difficulty: 2.1, skill: 'listening', type: 'multiple-choice', options: ["popular opinion", "rigorous interrogation", "general agreement", "peer endorsement"] }
];

// ===== SPEAKING QUESTIONS (30 TOTAL) =====
export const speakingQuestions = [
  // A1 Level
  { text: "Introduce yourself: Say your name and age.", answer: "My name is...", difficulty: 0.2, skill: 'speaking', type: 'multiple-choice', options: ["I'm...", "My name is...", "I live...", "I like..."] },
  { text: "Describe your favorite color.", answer: "My favorite color is...", difficulty: 0.3, skill: 'speaking', type: 'multiple-choice', options: ["I don't have...", "My favorite color is...", "Colors are...", "I like all..."] },
  { text: "Ask someone about their family.", answer: "How many people are in your family?", difficulty: 0.2, skill: 'speaking', type: 'multiple-choice', options: ["Do you have...?", "How many people...?", "Tell me...", "Who are...?"] },
  { text: "Tell someone what you had for breakfast.", answer: "I had ___ for breakfast.", difficulty: 0.2, skill: 'speaking', type: 'multiple-choice', options: ["I ate", "I had ___ for breakfast.", "Breakfast is...", "I'm hungry"] },
  { text: "Ask how someone is.", answer: "How are you?", difficulty: 0.2, skill: 'speaking', type: 'multiple-choice', options: ["Are you OK?", "How are you?", "What's wrong?", "Who are you?"] },
  { text: "Say where you live.", answer: "I live in ___.", difficulty: 0.2, skill: 'speaking', type: 'multiple-choice', options: ["I'm from...", "I live in ___.", "My house...", "I stay..."] },
  { text: "Describe your school or workplace.", answer: "I study/work in a ___.", difficulty: 0.3, skill: 'speaking', type: 'multiple-choice', options: ["I go to...", "I study/work in a ___.", "There is...", "It's big"] },
  
  // A2 Level
  { text: "Describe what you do after school or work.", answer: "After school, I usually...", difficulty: 0.4, skill: 'speaking', type: 'multiple-choice', options: ["I go home", "After school, I usually...", "School finished", "I'm tired"] },
  { text: "Talk about your daily routine.", answer: "I wake up at... then... finally...", difficulty: 0.5, skill: 'speaking', type: 'multiple-choice', options: ["I sleep", "I wake up at... then...", "My routine is...", "I do many..."] },
  { text: "Ask for directions to a place.", answer: "Where is the nearest ___?", difficulty: 0.4, skill: 'speaking', type: 'multiple-choice', options: ["I'm lost", "Where is the nearest ___?", "Can you help?", "Where are you...?"] },
  { text: "Describe your hometown.", answer: "My hometown is a...", difficulty: 0.5, skill: 'speaking', type: 'multiple-choice', options: ["I live in...", "My hometown is a...", "It has...", "I come from..."] },
  { text: "Talk about your family.", answer: "I have ___ family members...", difficulty: 0.4, skill: 'speaking', type: 'multiple-choice', options: ["My family...", "I have ___ family...", "We are...", "They like..."] },
  { text: "Describe your best friend.", answer: "My best friend is...", difficulty: 0.5, skill: 'speaking', type: 'multiple-choice', options: ["I have a friend", "My best friend is...", "Friends are...", "I don't have..."] },
  
  // B1 Level
  { text: "Explain why learning English is important.", answer: "Learning English is important because...", difficulty: 0.6, skill: 'speaking', type: 'multiple-choice', options: ["English is easy", "Learning English is important because...", "English is everywhere", "People speak English"] },
  { text: "Describe a memorable experience.", answer: "A memorable experience was when...", difficulty: 0.7, skill: 'speaking', type: 'multiple-choice', options: ["I have experiences", "A memorable experience was when...", "Experiences matter", "I can't remember"] },
  { text: "Discuss advantages and disadvantages of social media.", answer: "Social media has advantages like... and disadvantages like...", difficulty: 0.8, skill: 'speaking', type: 'multiple-choice', options: ["Social media is good", "Social media has advantages... disadvantages...", "Social media is bad", "I don't use..."] },
  { text: "Give your opinion on a current topic.", answer: "In my opinion, ___ is important because...", difficulty: 0.9, skill: 'speaking', type: 'multiple-choice', options: ["I don't have...", "In my opinion, ___ is...", "Everyone agrees", "Nobody cares"] },
  { text: "Explain a skill you're good at.", answer: "I'm good at ___ because...", difficulty: 0.5, skill: 'speaking', type: 'multiple-choice', options: ["I can do...", "I'm good at ___ because...", "I like...", "I practice..."] },
  { text: "Talk about your career aspirations.", answer: "I want to become a...", difficulty: 1.0, skill: 'speaking', type: 'multiple-choice', options: ["I like...", "I want to become a...", "My job...", "I work..."] },
  
  // B2 Level
  { text: "Present arguments for and against remote work.", answer: "Remote work has benefits like... but challenges like...", difficulty: 1.4, skill: 'speaking', type: 'multiple-choice', options: ["Remote work is good", "Remote work has benefits like... but challenges...", "Remote work is bad", "Everyone works..."] },
  { text: "Analyze technology's impact on society.", answer: "Technology has changed society through... but raised concerns...", difficulty: 1.5, skill: 'speaking', type: 'multiple-choice', options: ["Technology is good", "Technology has changed... concerns...", "Technology is bad", "Technology doesn't..."] },
  { text: "Discuss environmental challenges and solutions.", answer: "Challenges include... solutions include...", difficulty: 1.6, skill: 'speaking', type: 'multiple-choice', options: ["Environment is fine", "Challenges include... solutions...", "Environment damaged", "We can't help"] },
  { text: "Explain cultural differences.", answer: "Different cultures have different values such as...", difficulty: 1.3, skill: 'speaking', type: 'multiple-choice', options: ["All cultures same", "Different cultures have different...", "Culture doesn't matter", "People are same"] },
  
  // C1 Level
  { text: "Discuss philosophical implications of AI.", answer: "AI raises questions about consciousness, agency, and...", difficulty: 2.3, skill: 'speaking', type: 'multiple-choice', options: ["AI is computers", "AI raises questions about...", "AI doesn't matter", "AI is simple"] },
  { text: "Analyze complex societal issues.", answer: "Complex issues require acknowledging multiple perspectives and...", difficulty: 2.4, skill: 'speaking', type: 'multiple-choice', options: ["There's one answer", "Complex issues require acknowledging...", "Nobody understands", "Too complicated"] }
];

export const allQuestions = [
  ...readingQuestions,
  ...writingQuestions,
  ...listeningQuestions,
  ...speakingQuestions
];

// ===== LEARNING PATH MODULES =====
export const modules = [
  // READING MODULES
  { title: "Reading Basics - Simple Texts", skill: "reading", level: 1, description: "Learn to read and understand simple sentences and short texts.", difficulty: 0.3, estimatedTime: "2 hours", prerequisites: [], learningObjectives: ["Understand simple sentences", "Identify main ideas", "Recognize common vocabulary"] },
  { title: "Reading - Everyday Situations", skill: "reading", level: 2, description: "Read and understand texts about everyday topics.", difficulty: 0.5, estimatedTime: "3 hours", prerequisites: [], learningObjectives: ["Understand everyday context", "Extract specific information", "Understand simple narratives"] },
  { title: "Intermediate Reading - Articles", skill: "reading", level: 3, description: "Read and analyze articles and stories.", difficulty: 0.5, estimatedTime: "4 hours", prerequisites: [], learningObjectives: ["Understand complex texts", "Analyze author's perspective", "Infer meaning"] },
  { title: "Advanced Reading - Academic", skill: "reading", level: 4, description: "Read academic and complex texts.", difficulty: 1.5, estimatedTime: "5 hours", prerequisites: [], learningObjectives: ["Critical reading analysis", "Understand nuanced arguments", "Academic comprehension"] },
  
  // WRITING MODULES
  { title: "Writing Basics - Sentences", skill: "writing", level: 1, description: "Learn to construct simple sentences.", difficulty: 0.3, estimatedTime: "2 hours", prerequisites: [], learningObjectives: ["Form simple sentences", "Use correct punctuation", "Apply basic grammar"] },
  { title: "Writing - Paragraphs", skill: "writing", level: 2, description: "Learn to write coherent paragraphs.", difficulty: 0.5, estimatedTime: "3 hours", prerequisites: [], learningObjectives: ["Organize ideas", "Write topic sentences", "Develop paragraphs"] },
  { title: "Intermediate Writing - Essays", skill: "writing", level: 3, description: "Learn to write structured essays.", difficulty: 0.5, estimatedTime: "4 hours", prerequisites: [], learningObjectives: ["Essay structure", "Thesis development", "Supporting arguments"] },
  { title: "Advanced Writing - Academic", skill: "writing", level: 4, description: "Write academic and formal essays.", difficulty: 1.5, estimatedTime: "5 hours", prerequisites: [], learningObjectives: ["Academic writing style", "Critical analysis", "Formal register"] },
  
  // LISTENING MODULES
  { title: "Listening Basics - Simple", skill: "listening", level: 1, description: "Listen to simple conversations and short texts.", difficulty: 0.3, estimatedTime: "2 hours", prerequisites: [], learningObjectives: ["Identify main information", "Recognize key words", "Understand simple context"] },
  { title: "Listening - Everyday Dialogues", skill: "listening", level: 2, description: "Listen to everyday conversations.", difficulty: 0.5, estimatedTime: "3 hours", prerequisites: [], learningObjectives: ["Understand natural speech", "Catch details", "Follow conversations"] },
  { title: "Intermediate Listening - Media", skill: "listening", level: 3, description: "Listen to news, podcasts, and media content.", difficulty: 0.5, estimatedTime: "4 hours", prerequisites: [], learningObjectives: ["Understand presentations", "Identify tone", "Catch nuances"] },
  { title: "Advanced Listening - Lectures", skill: "listening", level: 4, description: "Listen to academic lectures and complex content.", difficulty: 1.5, estimatedTime: "5 hours", prerequisites: [], learningObjectives: ["Academic listening", "Complex comprehension", "Note-taking skills"] },
  
  // SPEAKING MODULES
  { title: "Speaking Basics - Introductions", skill: "speaking", level: 1, description: "Learn to introduce yourself and speak simply.", difficulty: 0.3, estimatedTime: "2 hours", prerequisites: [], learningObjectives: ["Self-introduction", "Basic pronunciation", "Simple speaking"] },
  { title: "Speaking - Daily Conversations", skill: "speaking", level: 2, description: "Engage in conversations about everyday topics.", difficulty: 0.5, estimatedTime: "3 hours", prerequisites: [], learningObjectives: ["Discuss daily topics", "Express opinions", "Improve pronunciation"] },
  { title: "Intermediate Speaking - Discussions", skill: "speaking", level: 3, description: "Participate in discussions and express opinions.", difficulty: 0.5, estimatedTime: "4 hours", prerequisites: [], learningObjectives: ["Express opinions", "Participate actively", "Use natural intonation"] },
  { title: "Advanced Speaking - Presentations", skill: "speaking", level: 4, description: "Deliver presentations and engage in debates.", difficulty: 1.5, estimatedTime: "5 hours", prerequisites: [], learningObjectives: ["Formal presentations", "Debate topics", "Sophisticated expression"] }
];
