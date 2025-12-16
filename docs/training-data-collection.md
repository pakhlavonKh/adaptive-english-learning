# Training Data Collection System
## UC18: Retrain/Update AI Models - Data Lake Implementation

This system captures anonymized student interactions to build a comprehensive training dataset for future AI model improvements.

## Architecture Overview

### 1. Database Model (`server/src/models/trainingData.js`)
Stores anonymized interaction data with the following key features:
- **Anonymization**: User IDs are hashed using SHA-256
- **Interaction Types**: quiz_answer, click, page_view, module_start, module_complete, session_start, session_end
- **Rich Metadata**: Captures performance metrics, timing, and context

### 2. Data Collection Service (`server/src/services/dataCollectionService.js`)
Provides functions for:
- Recording various interaction types
- Anonymizing user data
- Exporting training data for ML
- Getting statistics and analytics
- Data retention management

### 3. API Endpoints (`server/src/index.js`)
#### Data Collection Endpoints (Authenticated):
- `POST /api/training-data/record` - Record any interaction
- `POST /api/training-data/quiz-answer` - Record quiz answer
- `POST /api/training-data/click` - Record click
- `POST /api/training-data/page-view` - Record page view
- `POST /api/training-data/module-start` - Record module start
- `POST /api/training-data/module-complete` - Record module completion
- `POST /api/training-data/session` - Record session start/end

#### Admin Endpoints (Admin Only):
- `GET /api/training-data/export` - Export training data with filters
- `GET /api/training-data/stats` - Get dataset statistics
- `GET /api/training-data/batch/:batchNumber` - Export data in batches

### 4. Client-Side Tracker (`client/src/utils/trainingDataTracker.js`)
JavaScript utility that:
- Automatically tracks sessions
- Provides easy-to-use tracking methods
- Handles authentication
- Fails silently to not interrupt UX

### 5. React Hook (`client/src/hooks/useTrainingDataTracker.js`)
React integration that:
- Auto-tracks page views
- Provides callback functions for tracking
- Measures time spent on pages

## Usage Examples

### In a Quiz Component

```javascript
import { useTrainingDataTracker } from '../hooks/useTrainingDataTracker';

function QuizComponent({ question }) {
  const { trackQuizAnswer } = useTrainingDataTracker();
  const [startTime] = useState(Date.now());

  const handleAnswer = async (answer) => {
    const responseTime = Math.floor((Date.now() - startTime) / 1000);
    const correct = answer === question.correctAnswer;
    
    await trackQuizAnswer(question._id, correct, responseTime, {
      questionDifficulty: question.difficulty,
      moduleId: currentModule._id,
      moduleLevel: currentModule.level,
      moduleSkill: currentModule.skill
    });
    
    // Continue with quiz logic...
  };

  return (
    // Quiz UI...
  );
}
```

### In a Learning Module Component

```javascript
import { useTrainingDataTracker } from '../hooks/useTrainingDataTracker';
import { useEffect, useState } from 'react';

function LearningModule({ module }) {
  const { trackModuleStart, trackModuleComplete } = useTrainingDataTracker();
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Track module start
    trackModuleStart(module._id, module.level, module.skill);

    return () => {
      // Track module completion on unmount
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackModuleComplete(module._id, module.level, module.skill, timeSpent);
    };
  }, [module]);

  return (
    // Module UI...
  );
}
```

### Manual Click Tracking

```javascript
import tracker from '../utils/trainingDataTracker';

function NavigationButton() {
  const handleClick = () => {
    tracker.trackClick('nav_next_module');
    // Navigate...
  };

  return <button onClick={handleClick}>Next Module</button>;
}
```

## Admin Data Export

Admins can export training data for ML model training:

```javascript
// Get statistics
const response = await fetch('/api/training-data/stats', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const stats = await response.json();
console.log('Total records:', stats.totalRecords);
console.log('Unique users:', stats.uniqueAnonymizedUsers);

// Export filtered data
const exportResponse = await fetch(
  '/api/training-data/export?startDate=2025-01-01&interactionType=quiz_answer&limit=5000',
  { headers: { 'Authorization': `Bearer ${token}` } }
);
const data = await exportResponse.json();

// Export in batches for large datasets
const batch0 = await fetch('/api/training-data/batch/0?batchSize=10000', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Data Structure

### Training Data Record
```javascript
{
  anonymizedUserId: "sha256_hash...",
  userLevel: 0.5,  // theta value
  userRole: "student",
  interactionType: "quiz_answer",
  questionId: ObjectId("..."),
  questionDifficulty: 0.8,
  answerCorrect: true,
  responseTime: 12,  // seconds
  moduleId: ObjectId("..."),
  moduleLevel: 2,
  moduleSkill: "reading",
  consecutiveCorrect: 3,
  sessionQuestionsAnswered: 15,
  timestamp: ISODate("2025-12-16T10:30:00Z")
}
```

## Privacy & Anonymization

- User IDs are hashed using SHA-256 before storage
- No personally identifiable information (PII) is stored
- Only behavioral and performance metrics are captured
- Data can be retained according to policy (default: 365 days)

## Future ML Training

This data lake provides the foundation for:
- IRT model parameter refinement
- Difficulty estimation improvements
- Adaptive learning path optimization
- Student behavior prediction
- Performance forecasting

## Data Retention

Clean old data using the service method:

```javascript
// Keep last 365 days of data
await dataCollectionService.clearOldTrainingData(365);
```

## Integration Checklist

- [x] Database model created
- [x] Service layer implemented
- [x] API endpoints added
- [x] Client tracker utility created
- [x] React hook for easy integration
- [ ] Add tracker to main App component
- [ ] Integrate into quiz components
- [ ] Integrate into learning path components
- [ ] Add admin dashboard for viewing stats
- [ ] Set up data retention policy

## Next Steps

1. **Integrate tracker into existing components** - Add useTrainingDataTracker to quiz and learning path components
2. **Create admin dashboard view** - Build UI to view training data statistics
3. **Set up data retention** - Configure automatic cleanup of old data
4. **ML pipeline preparation** - Design data export format for ML training tools
5. **Performance monitoring** - Ensure tracking doesn't impact app performance
