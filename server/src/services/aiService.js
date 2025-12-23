/**
 * AI Service using Google Gemini API
 * Provides intelligent features for the English learning platform
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Generate personalized feedback for a student's answer
   */
  async generateFeedback(question, userAnswer, correctAnswer, isCorrect) {
    const prompt = `You are an English learning assistant. A student answered a question.

Question: "${question}"
Student's Answer: "${userAnswer}"
Correct Answer: "${correctAnswer}"
Result: ${isCorrect ? 'Correct' : 'Incorrect'}

Provide encouraging, constructive feedback in 2-3 sentences. If incorrect, explain why and give a helpful tip. Keep it friendly and motivating.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Feedback Error:', error);
      return isCorrect 
        ? 'Great job! Keep up the good work!' 
        : 'Not quite right. Review the material and try again!';
    }
  }

  /**
   * Generate an explanation for a grammar concept
   */
  async explainConcept(concept, userLevel = 'intermediate') {
    const prompt = `You are an English teacher. Explain the following English concept to a ${userLevel} level student in simple, clear terms with examples:

Concept: ${concept}

Provide:
1. A brief explanation (2-3 sentences)
2. Two example sentences
3. One quick tip to remember it

Keep it concise and easy to understand.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Explanation Error:', error);
      return 'Unable to generate explanation at this time. Please try again later.';
    }
  }

  /**
   * Generate adaptive practice questions based on user's level
   */
  async generateQuestion(topic, difficulty, skillType = 'vocabulary') {
    const prompt = `Generate a ${difficulty} level English ${skillType} question about "${topic}".

Return ONLY a JSON object with this exact format (no markdown, no extra text):
{
  "text": "The question text",
  "answer": "The correct answer",
  "difficulty": ${difficulty === 'beginner' ? 0 : difficulty === 'intermediate' ? 1 : 2},
  "options": ["option1", "option2", "option3", "correct answer"],
  "explanation": "Brief explanation of the answer"
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('AI Question Generation Error:', error);
      // Return a fallback question
      return {
        text: `Practice ${topic} - ${skillType}`,
        answer: 'practice',
        difficulty: 1,
        options: [],
        explanation: 'This is a practice question.'
      };
    }
  }

  /**
   * Analyze user's learning patterns and suggest improvements
   */
  async analyzeLearningPattern(responses, userTheta) {
    const correctCount = responses.filter(r => r.correct).length;
    const totalCount = responses.length;
    const accuracy = totalCount > 0 ? (correctCount / totalCount * 100).toFixed(1) : 0;

    const prompt = `You are an English learning coach. Analyze this student's performance:

- Total Questions Attempted: ${totalCount}
- Correct Answers: ${correctCount}
- Accuracy: ${accuracy}%
- Current Proficiency Level (theta): ${userTheta.toFixed(2)}

Provide:
1. A brief assessment (2 sentences)
2. Two specific recommendations to improve
3. One encouraging message

Keep it constructive and motivating.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return 'Keep practicing! Consistency is key to language learning success.';
    }
  }

  /**
   * Generate a conversation scenario for practice
   */
  async generateConversation(topic, level = 'intermediate') {
    const prompt = `Create a realistic English conversation scenario for ${level} level students about "${topic}".

Include:
- Setting/context (1 sentence)
- A dialogue between 2 people (4-6 exchanges)
- 3 vocabulary words to focus on
- 1 grammar point highlighted in the conversation

Format it clearly and make it practical for learning.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Conversation Error:', error);
      return 'Unable to generate conversation at this time.';
    }
  }

  /**
   * Provide writing assistance and corrections
   */
  async correctWriting(text, focusArea = 'general') {
    const prompt = `You are an English writing tutor. Review this text and provide corrections focusing on ${focusArea}:

"${text}"

Provide:
1. Corrected version (if needed)
2. Main issues found (grammar, vocabulary, structure)
3. One suggestion for improvement

Be encouraging and constructive.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Writing Correction Error:', error);
      return 'Unable to review writing at this time.';
    }
  }
}

export default new AIService();
