#!/usr/bin/env node

/**
 * Test script for Initial Path Generation endpoints
 * Run this after starting the server to verify all endpoints work
 * 
 * Usage: node test-path-generation.js
 */

const API_BASE = 'http://localhost:4000/api';

// Test data
const testUser = {
  username: `test_user_${Date.now()}`,
  password: 'testpassword123'
};

let authToken = null;
let userId = null;

// Helper functions
async function request(method, endpoint, data = null, auth = false) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (auth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  const options = {
    method,
    headers,
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(`Request failed: ${result.error || response.statusText}`);
  }
  
  return result;
}

function log(message, data = null) {
  console.log(`\n✓ ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function logError(message, error) {
  console.error(`\n✗ ${message}`);
  console.error(`  Error: ${error.message}`);
}

// Test functions
async function testRegister() {
  try {
    const result = await request('POST', '/register', testUser);
    userId = result.id;
    log('User registered successfully', { userId, username: result.username });
    return true;
  } catch (error) {
    logError('Registration failed', error);
    return false;
  }
}

async function testLogin() {
  try {
    const result = await request('POST', '/login', testUser);
    authToken = result.token;
    log('Login successful', { userId: result.user.id, theta: result.user.theta });
    return true;
  } catch (error) {
    logError('Login failed', error);
    return false;
  }
}

async function testNeedsGeneration() {
  try {
    const result = await request('GET', '/path/needs-generation', null, true);
    log('Checked path generation need', result);
    return result.needsGeneration === true; // Should be true for new user
  } catch (error) {
    logError('Check needs generation failed', error);
    return false;
  }
}

async function testGeneratePath() {
  try {
    const options = {
      externalScores: {
        reading: 60,
        writing: 55,
        listening: 65,
        speaking: 50
      },
      targetSkills: ['reading', 'writing', 'listening', 'speaking']
    };
    
    const result = await request('POST', '/path/generate', options, true);
    log('Path generated successfully', {
      userId: result.userId,
      theta: result.userTheta,
      level: result.suggestedLevel,
      modulesCount: result.modules?.length || 0,
      focusAreas: result.recommendations?.focusAreas?.length || 0
    });
    return true;
  } catch (error) {
    logError('Path generation failed', error);
    return false;
  }
}

async function testNeedsGenerationAfter() {
  try {
    const result = await request('GET', '/path/needs-generation', null, true);
    log('Checked path generation need (after generation)', result);
    return result.needsGeneration === false; // Should be false after generating
  } catch (error) {
    logError('Check needs generation (after) failed', error);
    return false;
  }
}

async function testRegeneratePath() {
  try {
    const result = await request('POST', '/path/regenerate', {}, true);
    log('Path regenerated successfully', {
      userId: result.userId,
      theta: result.userTheta,
      modulesCount: result.modules?.length || 0
    });
    return true;
  } catch (error) {
    logError('Path regeneration failed', error);
    return false;
  }
}

async function testGetLearningPath() {
  try {
    const result = await request('GET', '/learning-path', null, true);
    log('Learning path retrieved', {
      modulesCount: result.modules?.length || 0,
      suggestedLevel: result.suggestedLevel,
      theta: result.theta
    });
    return true;
  } catch (error) {
    logError('Get learning path failed', error);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('========================================');
  console.log('  Initial Path Generation API Tests');
  console.log('========================================');
  console.log(`Testing API at: ${API_BASE}`);
  console.log(`Test user: ${testUser.username}`);
  
  const tests = [
    { name: 'Register new user', fn: testRegister },
    { name: 'Login', fn: testLogin },
    { name: 'Check needs generation (before)', fn: testNeedsGeneration },
    { name: 'Generate initial path', fn: testGeneratePath },
    { name: 'Check needs generation (after)', fn: testNeedsGenerationAfter },
    { name: 'Get learning path', fn: testGetLearningPath },
    { name: 'Regenerate path', fn: testRegeneratePath }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    console.log(`\n--- Testing: ${test.name} ---`);
    const result = await test.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n========================================');
  console.log('  Test Results');
  console.log('========================================');
  console.log(`✓ Passed: ${passed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`Total: ${tests.length}`);
  console.log('========================================\n');
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Path generation system is working correctly.\n');
  } else {
    console.log('⚠️  Some tests failed. Please check the errors above.\n');
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(error => {
    console.error('\n❌ Test runner error:', error);
    process.exit(1);
  });
}

export { runTests };
