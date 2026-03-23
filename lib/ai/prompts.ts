export const PROMPTS = {
  PARSE_RESUME: (text: string) => `
Parse the following resume text and extract structured information.
Return ONLY valid JSON, no markdown, no explanation.

Resume text:
${text.slice(0, 6000)}

Return this exact JSON structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number or null",
  "location": "city, country or null",
  "headline": "professional headline (infer from experience)",
  "skills": [
    { "skill": "React", "proficiency": "advanced", "yearsOfExp": 3 }
  ],
  "experience": [
    { "title": "Job Title", "company": "Company", "startDate": "Jan 2022", "endDate": "Present", "current": true, "description": "brief description" }
  ],
  "education": [
    { "degree": "B.Tech Computer Science", "institution": "IIT Bombay", "year": "2022", "field": "Computer Science" }
  ],
  "projects": [
    { "name": "Project", "description": "description", "techStack": ["React", "Node.js"] }
  ],
  "githubUrl": null,
  "portfolioUrl": null,
  "linkedinUrl": null,
  "improvementTips": [
    "Add quantified achievements to your work experience",
    "Include links to your GitHub or portfolio projects",
    "Expand descriptions to highlight impact and scope"
  ]
}`,

  DECOMPOSE_JD: (jdText: string) => `
Analyze this job description and decompose it into a structured entity.
Return ONLY valid JSON, no markdown, no explanation.

Job Description:
${jdText.slice(0, 4000)}

Return this exact JSON structure:
{
  "title": "normalized job title",
  "requiredSkills": [
    { "skill": "Node.js", "weight": 3, "type": "technical" },
    { "skill": "Communication", "weight": 1, "type": "soft" }
  ],
  "experienceRange": { "min": 2, "max": 5 },
  "roleLevel": "mid",
  "cultureTags": ["remote-first", "fast-paced"],
  "salaryRange": { "min": 0, "max": 0, "currency": "INR" },
  "location": "Bangalore, India or Remote",
  "workType": "hybrid"
}

Rules:
- weight 3 = must-have, weight 2 = important, weight 1 = nice-to-have
- roleLevel must be one of: junior, mid, senior, lead, principal
- Normalize skill names (ReactJS → React, NodeJS → Node.js)
- workType must be: remote, hybrid, or onsite`,

  SCORE_MATCH: (candidateProfile: object, jobEntity: object) => `
Score this candidate's compatibility with the job.
Return ONLY valid JSON, no markdown, no explanation.

Candidate Profile:
${JSON.stringify(candidateProfile, null, 2).slice(0, 2000)}

Job Requirements:
${JSON.stringify(jobEntity, null, 2).slice(0, 2000)}

Return this exact JSON structure:
{
  "overall": 78,
  "skillsMatch": 85,
  "experienceMatch": 70,
  "explanation": "2-3 sentence explanation of why this score. Be specific about what they have and what they're missing.",
  "breakdown": [
    { "skill": "Node.js", "required": true, "candidateHas": true, "weight": 3, "match": "full" },
    { "skill": "Kubernetes", "required": true, "candidateHas": false, "weight": 2, "match": "none" }
  ]
}

Rules:
- overall is a weighted average: skillsMatch*0.6 + experienceMatch*0.4
- For each required skill in the job, include it in breakdown
- match: "full" = candidate clearly has it, "partial" = adjacent/related skill, "none" = missing`,

  INTERVIEW_START: (jobTitle: string, skills: string[]) => `
You are a senior technical interviewer for a ${jobTitle} position.
Required skills for this role: ${skills.slice(0, 8).join(', ')}.
Ask your first interview question. Make it specific to the role and challenging but fair.
Ask ONE question only. No preamble or introduction.`,

  INTERVIEW_RESPOND: (jobTitle: string, history: Array<{role: string, content: string}>, newAnswer: string) => `
You are a senior technical interviewer for a ${jobTitle} position.

Conversation history:
${history.map(m => `${m.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${m.content}`).join('\n')}
Candidate: ${newAnswer}

First, evaluate the candidate's latest answer, then ask the next question.
Return ONLY valid JSON:
{
  "evaluation": {
    "score": 7,
    "feedback": "Good understanding of concepts but missed mention of X"
  },
  "nextQuestion": "Your next question here, or null if this was the 5th question",
  "isComplete": false
}

isComplete should be true only after the 5th question has been answered.`,

  INTERVIEW_REPORT: (jobTitle: string, messages: Array<{role: string, content: string, score?: number}>) => `
Generate a feedback report for this interview session for a ${jobTitle} role.
Return ONLY valid JSON, no markdown.

Interview transcript:
${messages.map(m => `${m.role}: ${m.content} ${m.score ? `[Score: ${m.score}/10]` : ''}`).join('\n').slice(0, 3000)}

Return:
{
  "overallScore": 72,
  "strongestAnswer": "The answer about X demonstrated deep understanding because...",
  "weakestAnswer": "The answer about Y was weak because...",
  "improvementTips": [
    "Specific tip 1",
    "Specific tip 2",
    "Specific tip 3"
  ],
  "summary": "2-3 sentence overall assessment"
}`,

  SKILL_GAP_PATH: (skill: string) => `
Generate a 2-3 week learning path for: ${skill}
Use only FREE resources. Include real, specific URLs that actually exist.
Return ONLY valid JSON:
{
  "skill": "${skill}",
  "weeklyPlan": [
    "Week 1: Fundamentals — core concepts",
    "Week 2: Practice — build projects",
    "Week 3: Advanced — edge cases"
  ],
  "resources": [
    { "title": "Exact resource title", "url": "https://actual-url.com/path", "type": "video" },
    { "title": "Exact resource title", "url": "https://actual-url.com/path", "type": "article" },
    { "title": "Exact resource title", "url": "https://actual-url.com/path", "type": "course" },
    { "title": "Exact resource title", "url": "https://actual-url.com/path", "type": "docs" }
  ]
}

Rules:
- type must be one of: video, article, course, docs, practice
- Prefer: YouTube tutorials, official docs, MDN, freeCodeCamp.org, roadmap.sh, dev.to, Coursera free audit
- Use real known URLs (e.g. https://www.youtube.com/..., https://developer.mozilla.org/..., https://www.freecodecamp.org/...)
- Include 3-5 resources total, mix of types
- Do NOT invent fake URLs`,

  EXPLAIN_MATCH: (score: number, breakdown: object[], candidateName: string, jobTitle: string) => `
Explain in 3 clear sentences why ${candidateName} scored ${score}% for the ${jobTitle} role.
Skill breakdown: ${JSON.stringify(breakdown).slice(0, 500)}
Be specific. Mention exact skills that matched and exact skills that are missing.
Return only the explanation text, no JSON.`,
}
