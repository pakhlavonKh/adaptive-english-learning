/**
 * Test Script for Training Data Collection System
 * Run this to verify the data collection system is working
 * 
 * Usage:
 * 1. Make sure server is running
 * 2. Make sure you have a test user with token
 * 3. node scripts/test-training-data.js
 */

const API_BASE = 'http://localhost:4000/api';

// Replace with a valid JWT token for testing
const TEST_TOKEN = process.env.TEST_TOKEN || 'your-test-token-here';

async function testTrainingDataCollection() {
  console.log('🧪 Testing Training Data Collection System\n');

  // Test 1: Record a quiz answer
  console.log('Test 1: Recording quiz answer...');
  try {
    const response = await fetch(`${API_BASE}/training-data/quiz-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({
        questionId: '507f1f77bcf86cd799439011', // Dummy ID
        answerCorrect: true,
        responseTime: 12,
        additionalData: {
          questionDifficulty: 0.5,
          consecutiveCorrect: 3,
          sessionQuestionsAnswered: 5
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Quiz answer recorded:', data);
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 2: Record a click
  console.log('\nTest 2: Recording click...');
  try {
    const response = await fetch(`${API_BASE}/training-data/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({
        elementClicked: 'test_button',
        pageUrl: '/test-page',
        timeSpent: 5
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Click recorded:', data);
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 3: Record page view
  console.log('\nTest 3: Recording page view...');
  try {
    const response = await fetch(`${API_BASE}/training-data/page-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({
        pageUrl: '/dashboard',
        previousPage: '/login',
        timeSpent: 30
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Page view recorded:', data);
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 4: Record session
  console.log('\nTest 4: Recording session start...');
  try {
    const response = await fetch(`${API_BASE}/training-data/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({
        type: 'start',
        sessionDuration: 0
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Session recorded:', data);
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 5: Get statistics (admin only)
  console.log('\nTest 5: Fetching statistics (requires admin token)...');
  try {
    const response = await fetch(`${API_BASE}/training-data/stats`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Statistics retrieved:');
      console.log('   - Total records:', data.totalRecords);
      console.log('   - Unique users:', data.uniqueAnonymizedUsers);
      console.log('   - Interaction types:', data.interactionTypes);
    } else if (response.status === 403) {
      console.log('⚠️  Admin access required (this is expected if not admin)');
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n✨ Test complete!\n');
  console.log('Next steps:');
  console.log('1. Check MongoDB: db.trainingdatas.find().limit(5)');
  console.log('2. Verify anonymization: user IDs should be hashed');
  console.log('3. Test admin dashboard at /admin/training-data');
}

// Instructions if no token provided
if (TEST_TOKEN === 'your-test-token-here') {
  console.log('⚠️  Please set TEST_TOKEN environment variable\n');
  console.log('To get a token:');
  console.log('1. Start the server: cd server && npm start');
  console.log('2. Login via API or web interface');
  console.log('3. Copy the JWT token');
  console.log('4. Run: TEST_TOKEN="your-token" node scripts/test-training-data.js\n');
} else {
  // Run tests
  testTrainingDataCollection().catch(console.error);
}
