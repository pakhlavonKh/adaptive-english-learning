# Learning Path — Adaptive AI Learn (Personalized Learning Content)

This document describes a concrete, production-ready learning path design for the Adaptive AI Learn platform, aligned with the provided "Personalized Learning Content (AI-Adaptive)" requirements. It contains: an overview, phased learning-path structure, module template, adaptive rules and algorithms, assessment designs (including NLP & speech), teacher/admin workflows and recommended APIs, metrics, and implementation notes.

---

## 1. Goals and high-level approach

- Purpose: Deliver a personalized sequence of lessons and assessments across the four language skills (Reading, Writing, Listening, Speaking). Each student's path is seeded by external diagnostic scores (FR1) and continuously updated by in-platform performance (FR5, FR6, FR7, FR24).
- Key principles: micro-learning, mastery-based progression, continuous diagnostics, explainable recommendations, teacher oversight and override, multilingual content, offline-friendly delivery.
- Success criteria: measurable improvement in skill-specific mastery (theta + percent-correct), low adaptive latency (NFR5), and good UX (page load times NFR1).

---

## 2. Phases of the learning path

1. Onboarding & Diagnostic (Day 0)
   - Acquire external proficiency scores (reading, writing, listening, speaking) via configured integration (FR1). If external data is missing or incomplete, run an in-app short diagnostic per skill.
   - Map diagnostic scores to initial student model (theta across skills) and recommend an initial path.
   - Present an orientation module with goals, time estimates, and privacy consent for data/model use.

2. Foundational Phase (Weeks 1-2)
   - Focus: core sub-skills where diagnostics indicate gaps (common vocabulary, grammar, listening comprehension basics, pronunciation drills).
   - Higher density of assessments to quickly calibrate the learner's model.

3. Skill-Building Loops (Ongoing)
   - Repeating cycles of: Micro-lesson → Practice → Embedded Checks → Formative Assessment → Model update → Next recommendation.
   - Each loop is short (10–25 minutes) to maximize engagement.

4. Remediation & Enrichment
   - If mastery < threshold → schedule remedial mini-path (targeted exercises, review items with spaced repetition) (FR9).
   - If mastery > high threshold → recommend enrichment modules and optional challenge tasks (FR10).

5. Summative & Certification
   - Periodic summative assessments per skill to validate long-term retention; generate downloadable reports (FR14).

6. Ongoing Maintenance
   - The system continually retrains personalization models from anonymized consented interactions (FR118).

---

## 3. Skill breakdown and example progression

We maintain separate module tracks for the four skills (FR24) but allow cross-skill integration (e.g., reading passages with audio for both reading/listening). Each skill track is organized as levels (A1→C2 style or custom scale). Example:

- Level 0 (Onboarding/Diagnostic)
- Level 1 (Foundations)
- Level 2 (Intermediate)
- Level 3 (Upper-Intermediate)
- Level 4 (Advanced / Enrichment)

Within each level, modules are organized by topics (vocabulary sets, grammar items, listening scenarios, speaking tasks). Each module contains micro-lessons and assessments.

---

## 4. Module template (reusable)

Use this template when authoring content.

- Module ID: string
- Title: human-readable
- Skill: {reading | writing | listening | speaking}
- Level: numeric (or CEFR label)
- Estimated time: 10–30 minutes
- Objectives: 2–4 specific, measurable objectives (e.g., "Use past simple verbs in affirmative sentences with 80% accuracy").
- Prerequisites: skill + minimum theta or prior modules.
- Content pieces:
  - Micro-lesson (text/video/audio)
  - Interactive practice (cloze, multiple choice, short answer)
  - Speaking prompt (record & submit)
  - Reading passage (with comprehension questions)
- Assessment items:
  - Item pool id, difficulty metadata, discrimination parameter (for IRT)
  - Mix of objective and open-ended items
- Mastery criteria:
  - Passing threshold (e.g., 80% correct on summative or theta > threshold)
  - Repetition rule: pass 2 out of 3 spaced attempts within X days
- Remediation plan:
  - If fail: schedule 3 targeted micro-lessons + 2 practice items + spaced review
- Enrichment plan:
  - If exceed: offer 1 advanced module + project assignment
- Accessibility metadata: transcript, alt text, audio-only option
- Localization fields: language tags and translation status

---

## 5. Adaptive rules & algorithms

This section defines concrete decision rules the Recommendation Engine will apply (maps to FR5, FR6, FR9, FR10, FR118).

A. Student model
- Represent each skill by a real-valued ability parameter theta_skill.
- Maintain item metadata: difficulty (b), discrimination (a), guess (c optional).
- Maintain per-item student response history (correct, response time, timestamp, nextReview).

B. Item selection (per micro-lesson/assessment)
- Use 2PL or 3PL IRT for probability correctness: P(correct|theta) = c + (1-c) * sigmoid(a*(theta-b)).
- Target items with expected correctness around 60–75% to keep challenge (maximize learning signal).
- For formative ease: prefer items where |difficulty - theta| <= 0.5; for stretch: difficulty in (theta+0.5..theta+1.2).

C. Difficulty adjustment & sequencing
- After each response, update theta via an online update (Elo-like or Bayesian update):
  - delta = k * (observed - expected), where expected = P(correct|theta).
  - k can decay with exposure count.
- Re-rank next items by mismatch between content difficulty and theta; prefer items with high discrimination.

D. Spaced repetition / scheduling
- For each item consolidate an SM2-like or simplified scheduler:
  - If correct: nextInterval = baseInterval * (1 + retentionFactor * (1 + (theta - difficulty))).
  - If incorrect: nextInterval = minInterval (1 day) and schedule remediation.
- BaseInterval defaults: 1 day after first correct, 3 days after second, 7 days after third, then exponential growth.
- Keep scheduling decisions and nextReview timestamp in `Response` records (FR6).

E. Mastery thresholds & remediation triggers
- For a module: Mastery if theta_skill >= module.masteryTheta OR consistent item performance > 80% across last N items.
- If mastery not achieved after 2 attempts with spaced intervals → trigger remedial path: targeted micro-lessons + lower-difficulty items until improvement.
- If theta exceeds enrichment threshold (e.g., theta >= levelThreshold + 1.0) → recommend enrichment modules.

F. Cold start & insufficient data
- If insufficient data (< 5 scored responses), fall back to diagnostic score or default beginner path (UC3 extension).

G. Human-in-the-loop
- If model confidence < threshold (e.g., prediction entropy high or inconsistent responses) or if teacher flagged, queue items for manual review or teacher assignment (FR11, FR15).

H. Continuous retraining
- Periodic batch retraining from anonymized/consented interaction logs to update item parameters and ML models (FR118). Keep online adaptation for immediate updates.

---

## 6. Assessments, NLP & speech handling

A. Assessment architecture
- Item bank: store item metadata (skill, difficulty, discrimination, item type).
- Test generation: dynamic (item selection via IRT & constraints) or static (teacher-created sets).
- Scoring: automatic for objective items; automated + human review for open responses.

B. NLP for free-text responses (FR8)
- Pipeline:
  1. Preprocessing: normalization, tokenization, language detection, spell-correction suggestions.
  2. Feature extraction: grammar errors, semantic similarity to model answers, content coverage, cohesion and organization metrics.
  3. Scoring: ensemble of rubric-based classifiers + transformer-based semantic evaluator; output: grammarScore, contentScore, coherenceScore, overall rubric score (0–100) and feedback snippets.
  4. Confidence: if model confidence low, flag for teacher review.

- Feedback: actionable suggestions (e.g., grammar fix with explanation, vocabulary alternatives, linking phrases).

C. Speech (speaking) evaluation (FR25)
- Pipeline:
  1. Audio capture with short recording (mobile-friendly) + pre-check for signal/noise.
  2. Automatic speech recognition (ASR) to transcribe.
  3. Prosody/fluency analysis: speech rate, pause distribution, syllable stress, pronunciation scoring (compare phonetic output to reference).
  4. Semantic match: compare ASR transcript to expected content.
  5. Output scores: pronunciationScore, fluencyScore, contentMatchScore, overall.
  6. If ASR confidence low or privacy concerns, provide teacher review queue.

D. Manual review & rubrics
- Provide teachers with a queue of low-confidence or high-stakes responses; UI for annotation, override, and feedback.

E. Performance SLAs (NFR6, NFR5)
- Auto-grade objective items near-instant (<= 2s typical).
- NLP/speech feedback should return within a configured SLA (<= 4–10s where feasible), else defer to asynchronous processing with notification.

---

## 7. Teacher / Admin workflows & APIs

A. Teacher features
- Class dashboard with mastery distributions, at-risk flags, recommended remediation, and quick assign/override controls (FR11).
- Manual override button per student to assign alternate path (UC17) and log reason (audit) (FR15, FR19).
- Review queue for open responses and speaking items.
- Export reports (PDF/CSV) per class/student (FR14).

B. Admin features
- RBAC management UI (create roles, map permissions) (FR19).
- Model retraining controls for ML Ops, validate new models before rollout (UC18).
- Audit log viewer (FR15).

C. Suggested API endpoints (REST-like)
- POST /api/register -> registers user and triggers external data sync (FR1)
- POST /api/oauth/callback -> handle third-party login (FR22)
- GET /api/learning-path -> returns personalized path (module list + priorities) (FR5)
- GET /api/module/:id -> load module content
- GET /api/next-item -> recommendation engine returns next item (IRT-based) (FR6)
- POST /api/submit -> submit response (objective/open/speech) (FR7, FR25)
- GET /api/dashboard/class/:id -> teacher dashboard data (FR11)
- POST /api/override -> teacher override recommendation
- GET /api/export/report -> generate PDF/CSV (FR14)
- GET /api/health/model -> model metrics and last retrain timestamp (FR118)

D. Webhooks & notifications
- When a student is flagged at-risk, optionally webhook teacher or send in-app/email alerts (FR17).

---

## 8. Metrics & monitoring

- Individual-level metrics: theta per skill, item accuracy, response times, retention (repeat-correct rate), session length.
- Class-level metrics: mastery distribution, at-risk percentage, average time-on-task.
- Model-level metrics: prediction calibration (Brier score), AUC for item correctness prediction, fairness checks (error rates by demographic when permitted).
- Operational: API latencies, queue lengths for NLP/speech, retraining job durations (NFR1-NFR7).

---

## 9. Example learner journey (concrete)

1. Alice registers; external system returns diagnostics: Reading: 45/100, Writing: 60/100, Listening: 30/100, Speaking: 35/100 -> map to theta values.
2. System generates path: Prioritize Listening foundational modules and Reading grammar refreshers.
3. Alice completes two micro-lessons and 6 formative items (mix). The Recommendation Engine selects items around her theta to maximize learning signal.
4. On mistake on pronunciation tasks, the system schedules remedial speaking micro-lessons and two short pronunciation drills with immediate ASR feedback.
5. After 10 interactions, her theta for Listening improves; the engine recommends an intermediate listening passage with comprehension checks.
6. Teacher sees Alice flagged as "progressing" and approves enrichment task for Reading.

---

## 10. Privacy, consent, and data handling

- Obtain explicit consent for model usage and analytics during onboarding (UC1). Allow export/delete of personal data (FR21).
- Use anonymized/consented data for model retraining, logging only necessary metadata for analytics (FR118).
- All data encrypted in transit and at rest (NFR4). Use environment-stored secrets for OAuth keys and model credentials.

---

## 11. Offline & low-bandwidth strategy (FR20)

- Allow lesson content download (micro-lessons + media) and local progress caching.
- Queue responses for upload when connection restores; run lightweight local checks where possible.
- Provide low-res media alternatives and transcript-first mode.

---

## 12. Implementation notes & next steps

- Authoring tools: content authors should supply item metadata (difficulty/discrimination) and translations (FR12).
- Model choices:
  - IRT 2PL/3PL for item/itembank modeling and online updates/Elo for instant adaptation.
  - Transformer-based models for NLP scoring and ASR + phonetic scoring for speech.
- Start with a small item bank and expand via content author workflows and analytics.
- Build teacher UI early to collect human labels for NLP scoring and low-confidence samples.

Deliverables I created for you now:
- This `docs/learning-path.md` in the repo (path: `docs/learning-path.md`).

Suggested immediate next steps (I can do any for you):
- Generate a JSON schema for `Module` and `Item` matching the module template above.
- Produce an example module + 8-12 sample items (objective + free text + speech prompt) to seed the bank.
- Implement `GET /api/learning-path` and `POST /api/submit` prototypes connecting to the current server.
- Sketch UI wireframes for teacher dashboard and student progress screen.

Which next step would you like me to take now? (generate schema, create seed items, implement endpoints, or wireframes)