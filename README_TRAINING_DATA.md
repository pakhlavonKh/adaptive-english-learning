# Training Data Collection System - Quick Start Guide

## Overview
This system implements UC18 (Retrain/Update AI Models) by capturing anonymized student interactions into a dedicated training dataset. This "Data Lake" will be used for future AI model retraining and improvements.

## What's Been Built

### 1. Backend Infrastructure
- **TrainingData Model** ([server/src/models/trainingData.js](../server/src/models/trainingData.js))
  - MongoDB schema for storing anonymized interactions
  - SHA-256 hashing for user ID anonymization
  - Supports 8 interaction types: quiz_answer, click, page_view, module_start, module_complete, path_generated, session_start, session_end

- **Data Collection Service** ([server/src/services/dataCollectionService.js](../server/src/services/dataCollectionService.js))
  - Functions for recording various interaction types
  - Data export capabilities for ML training
  - Statistics and analytics
  - Data retention management

- **API Endpoints** ([server/src/index.js](../server/src/index.js))
  - 7 authenticated endpoints for data collection
  - 3 admin-only endpoints for data export and statistics

### 2. Frontend Integration
- **Training Data Tracker** ([client/src/utils/trainingDataTracker.js](../client/src/utils/trainingDataTracker.js))
  - Singleton tracker with automatic session management
  - Easy-to-use methods for all interaction types
  - Handles authentication and fails silently

- **React Hook** ([client/src/hooks/useTrainingDataTracker.js](../client/src/hooks/useTrainingDataTracker.js))
  - `useTrainingDataTracker()` for easy component integration
  - Automatic page view tracking
  - HOC for time-on-page tracking

- **Admin Dashboard** ([client/src/pages/TrainingDataDashboard.jsx](../client/src/pages/TrainingDataDashboard.jsx))
  - View dataset statistics
  - Export training data with filters
  - Visualize interaction types and metrics

### 3. Examples & Documentation
- **Quiz Integration Example** ([client/src/examples/QuizWithTracking.jsx](../client/src/examples/QuizWithTracking.jsx))
- **Module Integration Example** ([client/src/examples/ModuleWithTracking.jsx](../client/src/examples/ModuleWithTracking.jsx))
- **Complete Documentation** ([docs/training-data-collection.md](../docs/training-data-collection.md))

## Quick Start

### Step 1: Server is Ready
The server code is already integrated. The endpoints are live when you run:
```bash
cd server
npm start
```

### Step 2: Add Tracking to Your Components

#### Option A: Use the React Hook (Recommended)
```javascript
import { useTrainingDataTracker } from './hooks/useTrainingDataTracker';

function YourComponent() {
  const { trackQuizAnswer, trackClick } = useTrainingDataTracker();
  
  // Auto-tracks page views!
  // Just use the tracking functions when needed
}
```

#### Option B: Use the Tracker Directly
```javascript
import tracker from './utils/trainingDataTracker';

// Track a quiz answer
tracker.trackQuizAnswer(questionId, correct, responseTime, additionalData);

// Track a click
tracker.trackClick('button_name');
```

### Step 3: Add Admin Dashboard Route
In your router configuration:
```javascript
import TrainingDataDashboard from './pages/TrainingDataDashboard';

// Add route (admin only)
<Route path="/admin/training-data" element={<TrainingDataDashboard />} />
```

### Step 4: Integrate into Existing Components

**For Quiz Components:**
```javascript
import { useTrainingDataTracker } from '../hooks/useTrainingDataTracker';

function Quiz({ question }) {
  const { trackQuizAnswer } = useTrainingDataTracker();
  const [startTime] = useState(Date.now());

  const handleAnswer = async (answer) => {
    const responseTime = Math.floor((Date.now() - startTime) / 1000);
    const correct = checkAnswer(answer);
    
    await trackQuizAnswer(question._id, correct, responseTime, {
      questionDifficulty: question.difficulty
    });
  };
}
```

**For Learning Modules:**
```javascript
import { useTrainingDataTracker } from '../hooks/useTrainingDataTracker';

function Module({ module }) {
  const { trackModuleStart, trackModuleComplete } = useTrainingDataTracker();
  const [startTime] = useState(Date.now());

  useEffect(() => {
    trackModuleStart(module._id, module.level, module.skill);
    
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackModuleComplete(module._id, module.level, module.skill, timeSpent);
    };
  }, [module]);
}
```

## API Endpoints Reference

### Data Collection (Authenticated Users)
```
POST /api/training-data/record           - Generic interaction recording
POST /api/training-data/quiz-answer      - Record quiz answer
POST /api/training-data/click            - Record click event
POST /api/training-data/page-view        - Record page navigation
POST /api/training-data/module-start     - Record module start
POST /api/training-data/module-complete  - Record module completion
POST /api/training-data/session          - Record session start/end
```

### Admin Only
```
GET /api/training-data/export            - Export data with filters
GET /api/training-data/stats             - Get dataset statistics
GET /api/training-data/batch/:number     - Export data in batches
```

## Testing the System

### 1. Test Basic Tracking
```javascript
// In browser console (when logged in)
import tracker from './utils/trainingDataTracker';

// Track a click
tracker.trackClick('test_button', 5);

// Track a page view
tracker.trackPageView('/dashboard');
```

### 2. Verify Data is Being Stored
- Log in as admin
- Navigate to `/admin/training-data`
- Check statistics dashboard
- Export sample data

### 3. Check MongoDB
```bash
# Connect to MongoDB
mongosh

# Switch to your database
use your_database_name

# Check training data collection
db.trainingdatas.countDocuments()
db.trainingdatas.find().limit(5)
```

## Data Structure Example

```javascript
{
  _id: ObjectId("..."),
  anonymizedUserId: "a8b4c2d1e3f4...",  // SHA-256 hash
  userLevel: 0.5,
  userRole: "student",
  interactionType: "quiz_answer",
  questionId: ObjectId("..."),
  questionDifficulty: 0.8,
  answerCorrect: true,
  responseTime: 12,
  consecutiveCorrect: 3,
  sessionQuestionsAnswered: 15,
  timestamp: ISODate("2025-12-16T10:30:00.000Z"),
  createdAt: ISODate("2025-12-16T10:30:00.000Z"),
  updatedAt: ISODate("2025-12-16T10:30:00.000Z")
}
```

## Privacy & Security

✅ **User IDs are anonymized** - SHA-256 hashed before storage  
✅ **No PII stored** - Only behavioral and performance metrics  
✅ **Admin-only access** - Data export restricted to admin role  
✅ **Silent failures** - Tracking errors don't interrupt user experience  
✅ **Data retention** - Can configure automatic cleanup of old data  

## Next Steps for Full Integration

1. **Add to existing quiz components** - Integrate `trackQuizAnswer` calls
2. **Add to learning path components** - Integrate module tracking
3. **Add to navigation** - Link to admin dashboard for admins
4. **Test with real users** - Verify data collection is working
5. **Set up data retention policy** - Configure automatic cleanup
6. **Prepare ML pipeline** - Design data export format for training

## Troubleshooting

**Issue: Tracking not working**
- Check that user is logged in (token in localStorage)
- Check browser console for errors
- Verify server is running on localhost:4000

**Issue: Admin endpoints returning 403**
- Verify user has admin role in database
- Check JWT token is valid

**Issue: No data showing in dashboard**
- Wait a few seconds after interactions
- Check MongoDB connection
- Verify data is being saved: `db.trainingdatas.countDocuments()`

## Architecture Diagram

```
┌─────────────────┐
│  React Client   │
│                 │
│ ┌─────────────┐ │
│ │  Tracker    │ │──┐
│ │   Hook      │ │  │
│ └─────────────┘ │  │
└─────────────────┘  │
                     │ POST /api/training-data/*
                     ▼
        ┌────────────────────────┐
        │   Express Server       │
        │                        │
        │ ┌────────────────────┐ │
        │ │  Data Collection   │ │
        │ │     Service        │ │
        │ └────────────────────┘ │
        └────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │      MongoDB           │
        │                        │
        │  trainingdatas         │
        │  (anonymized data)     │
        └────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   Future ML Training   │
        │   Pipeline (UC18)      │
        └────────────────────────┘
```

## Questions?

Refer to the [complete documentation](../docs/training-data-collection.md) for detailed examples and advanced usage.
