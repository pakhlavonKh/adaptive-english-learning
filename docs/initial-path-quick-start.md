# Initial Path Generation - Quick Start Guide

## For New Users

### What happens when you first login:

1. **Automatic Detection**
   - System checks if you've completed any exercises
   - If you're new, the path generation wizard appears automatically

2. **Step 1: Welcome**
   - Learn about the adaptive learning features
   - Click "Get Started" to begin

3. **Step 2: Customize Your Path**
   - **Select Skills**: Choose which areas you want to focus on
     - ✅ Reading (comprehension, vocabulary)
     - ✅ Writing (grammar, composition)
     - ✅ Listening (audio comprehension)
     - ✅ Speaking (pronunciation, fluency)
   
   - **Optional: Add Diagnostic Scores**
     - Check the box if you have previous test scores
     - Use sliders to set your scores (0-100) for each skill
     - Scores help calibrate your starting level more accurately

4. **Step 3: Confirm & Generate**
   - Review your selections
   - Click "Generate My Learning Path"
   - Wait for the system to create your personalized path (takes 2-3 seconds)

5. **Start Learning**
   - Your dashboard loads with your first recommended question
   - View your full learning path anytime by clicking "View Learning Path"

## For Teachers/Admins

### Helping Students Get Started:

1. **New Student Registration**
   - Students automatically see path generator on first login
   - No manual setup required

2. **With External Scores**
   - If you have placement test results, students should check "I have previous test scores"
   - Enter scores on 0-100 scale:
     - 0-30: Beginner (A1-A2)
     - 31-60: Intermediate (B1-B2)
     - 61-100: Advanced (C1-C2)

3. **Without External Scores**
   - System starts with default ability level (theta = 0)
   - Adjusts quickly based on first few responses
   - After ~10 questions, system has accurate calibration

## Understanding the Generated Path

### Path Components:

1. **Modules**: Ordered by best fit for your level
2. **Priority Levels**:
   - 🔴 High: Start with these
   - 🟡 Medium: Next steps
   - 🟢 Low: Future content

3. **Skill Balance**: Modules alternate between skills for balanced development

4. **Recommendations**:
   - Focus Areas: Skills needing most attention
   - Estimated Duration: Time to complete path
   - Next Steps: Immediate actions to take

## Regenerating Your Path

### When to regenerate:

- ✅ After completing 5+ modules
- ✅ When performance changes significantly
- ✅ When you want to focus on different skills

### How to regenerate:

1. Go to Dashboard
2. Click "View Learning Path"
3. Look for "Regenerate Path" button (appears after activity)
4. System analyzes your recent performance (last 30 days)
5. New path generated based on current ability and progress

## Troubleshooting

### "No modules appear in my path"
- Make sure database is seeded: Visit `/api/seed` endpoint
- Check that modules exist with different skill levels
- Contact admin to add more content

### "Path doesn't match my level"
- If too easy: Complete a few modules, system will adapt
- If too hard: You can regenerate path or skip to easier content
- Consider re-entering diagnostic scores if you have them

### "I want to change my skill focus"
- Click "View Learning Path"
- Look for "Regenerate Path" option
- You can't change initial selections, but algorithm adapts to your performance

## Best Practices

### For Students:
1. ✅ Complete path generation wizard thoughtfully
2. ✅ Be honest about skill levels (if entering scores)
3. ✅ Work through high-priority modules first
4. ✅ Practice daily for 15-20 minutes
5. ✅ Review difficult content when scheduled

### For Teachers:
1. ✅ Encourage students to complete path generation on day 1
2. ✅ Help students interpret external test scores
3. ✅ Monitor student paths to ensure appropriate difficulty
4. ✅ Suggest path regeneration after major milestones
5. ✅ Use analytics to identify struggling students

## Technical Details

### Skill Level Mapping:
```
User Score → Theta → Level
0-15%      → -2.4  → Pre-A1
16-30%     → -1.8  → A1
31-45%     → -0.6  → A2
46-60%     → 0.6   → B1
61-75%     → 1.8   → B2
76-100%    → 2.4+  → C1-C2
```

### Module Selection:
- Algorithm targets difficulty slightly above current ability
- "Zone of proximal development": Current ability + 0.3
- Maximizes learning while maintaining engagement

### Adaptive Updates:
- Every question response updates ability estimate
- Every 5 modules triggers potential path refresh
- System maintains history for spaced repetition

## Support

For issues or questions:
- Contact your teacher or administrator
- Check the main documentation: `/docs/learning-path.md`
- Report bugs through the feedback system
