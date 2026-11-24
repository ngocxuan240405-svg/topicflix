
/*
  TOPICFLIX - VIDEO LISTENING ASSESSMENTS
  Questions based on the actual video transcript.
  Correct answer is stored as an option index (0-3).
*/

export const videoAssessments = {
  'Daily Conversations': {
    title: 'Factory Safety – Ivan and Gideon',
    description:
      'Test your understanding of the conversation about PPE, hazards and workplace risk assessment.',
    questions: [
      // B1 - Information stated directly in the dialogue
      {
        id: 'fs01',
        level: 'B1',
        time: '1:23',
        question: 'What does PPE stand for?',
        options: [
          'Personal Protective Equipment',
          'Public Protection Education',
          'Professional Production Equipment',
          'Personal Prevention Exercise',
        ],
        answer: 0,
        explanation:
          'Ivan introduces PPE as Personal Protective Equipment when explaining workplace safety.',
      },
      {
        id: 'fs02',
        level: 'B1',
        time: '1:36',
        question: 'What do safety helmets protect workers from?',
        options: [
          'Chemical smells',
          'Falling objects',
          'Loud conversations',
          'Electrical bills',
        ],
        answer: 1,
        explanation:
          'Ivan explains that helmets protect the head from falling objects.',
      },
      {
        id: 'fs03',
        level: 'B1',
        time: '2:29',
        question: 'What should workers do with torn or worn-out gloves?',
        options: [
          'Wash and reuse them',
          'Keep using them for light tasks',
          'Replace them immediately',
          'Remove them during work',
        ],
        answer: 2,
        explanation:
          'Ivan says gloves should cover the wrists and must be replaced immediately if damaged.',
      },
      {
        id: 'fs04',
        level: 'B1',
        time: '2:06',
        question: 'What can safety goggles protect the eyes from?',
        options: [
          'Cold weather only',
          'Noise from machines',
          'Heavy objects falling on the feet',
          'Dust, sparks and chemical splashes',
        ],
        answer: 3,
        explanation:
          'Ivan mentions dust, sparks and chemical splashes as hazards that goggles protect against.',
      },
      {
        id: 'fs05',
        level: 'B1',
        time: '4:42',
        question: 'Which three types of hazards does Ivan mention?',
        options: [
          'Chemical, mechanical and electrical',
          'Physical, financial and social',
          'Medical, biological and digital',
          'Weather, traffic and noise',
        ],
        answer: 0,
        explanation:
          'Ivan identifies chemical, mechanical and electrical hazards as the three main types in the factory.',
      },

      // B2 - Apply and connect information
      {
        id: 'fs06',
        level: 'B2',
        time: '2:15',
        question:
          'A worker has a helmet, but it moves around when they bend down. What should they do?',
        options: [
          'Carry the helmet instead of wearing it',
          'Adjust the fit and strap so it stays in place',
          'Wear goggles instead of the helmet',
          'Ignore the problem because the helmet is present',
        ],
        answer: 1,
        explanation:
          'Ivan says a helmet must fit snugly, with the strap adjusted so it stays in place during movement.',
      },
      {
        id: 'fs07',
        level: 'B2',
        time: '4:58',
        question:
          'A worker needs to handle paint. Which protection best matches Ivan’s advice?',
        options: [
          'A helmet only',
          'Ordinary shoes only',
          'Gloves and a mask',
          'Goggles without other protection',
        ],
        answer: 2,
        explanation:
          'Ivan identifies paint as a chemical hazard and specifically advises using gloves and a mask.',
      },
      {
        id: 'fs08',
        level: 'B2',
        time: '5:47',
        question:
          'When assessing a hazard, which two factors should a worker consider?',
        options: [
          'How expensive the equipment is and who bought it',
          'How quickly workers finish their shifts',
          'How often the manager visits',
          'How likely harm is and how severe it could be',
        ],
        answer: 3,
        explanation:
          'Ivan describes assessing risk in terms of the likelihood of harm and its possible severity.',
      },
      {
        id: 'fs09',
        level: 'B2',
        time: '6:29',
        question:
          'Why should workers report even seemingly small hazards?',
        options: [
          'Small problems may develop into serious ones',
          'Reports automatically replace all safety equipment',
          'Every small problem means the factory must close',
          'Only large hazards require attention',
        ],
        answer: 0,
        explanation:
          'Ivan warns that small issues can snowball into big problems and should be reported immediately.',
      },
      {
        id: 'fs10',
        level: 'B2',
        time: '5:13',
        question:
          'Why is water near exposed electrical equipment especially dangerous?',
        options: [
          'It makes equipment more expensive',
          'It may increase the risk of electrical shock',
          'It makes safety goggles uncomfortable',
          'It prevents workers from seeing chemical labels',
        ],
        answer: 1,
        explanation:
          'Ivan warns about faulty wires, exposed circuits and wet surfaces near outlets because they can cause shocks.',
      },

      // C1 - Deeper reasoning supported by the dialogue
      {
        id: 'fs11',
        level: 'C1',
        time: '5:30',
        question:
          'Which sequence best represents Ivan’s overall approach to preventing accidents?',
        options: [
          'Wait for an accident, then purchase PPE',
          'Choose a solution before identifying the problem',
          'Observe hazards, assess risks, then apply preventive measures',
          'Focus only on risks that have already injured someone',
        ],
        answer: 2,
        explanation:
          'Ivan explains a three-step process: observe unsafe conditions, evaluate likelihood and severity, then decide on preventive measures.',
      },
      {
        id: 'fs12',
        level: 'C1',
        time: '6:13',
        question:
          'Why are lockout/tagout procedures especially relevant during machine maintenance?',
        options: [
          'They help workers finish maintenance without training',
          'They make protective gloves unnecessary',
          'They protect machines from dust and scratches',
          'They help prevent machines from being started unexpectedly',
        ],
        answer: 3,
        explanation:
          'Ivan recommends lockout/tagout during maintenance, and the video later defines it as keeping machines off and preventing accidental startup.',
      },
      {
        id: 'fs13',
        level: 'C1',
        time: '6:05',
        question:
          'Which statement best reflects Ivan’s approach to controlling mechanical hazards?',
        options: [
          'PPE alone is not a substitute for machine guards and safe maintenance procedures',
          'Safety guards are unnecessary whenever workers wear helmets',
          'Reporting hazards is useful only after machinery breaks',
          'Workers should prioritize speed over safety procedures',
        ],
        answer: 0,
        explanation:
          'Ivan combines protective equipment with machine guards and lockout/tagout procedures, indicating that safety requires several preventive actions.',
      },
      {
        id: 'fs14',
        level: 'C1',
        time: '3:02',
        question:
          'What is the most defensible interpretation of Ivan’s emergency advice?',
        options: [
          'PPE guarantees that every emergency is harmless',
          'PPE can provide protection while people evacuate or assist, but does not remove the emergency',
          'Workers should remain near a fire as long as they wear gloves',
          'Chemical spills never require evacuation',
        ],
        answer: 1,
        explanation:
          'Ivan says gloves and goggles help protect workers while they evacuate or assist during spills or fires. He does not suggest that PPE eliminates the hazard.',
      },
      {
        id: 'fs15',
        level: 'C1',
        time: '2:37',
        question:
          'Why could poorly maintained goggles create a safety problem even when a worker wears them?',
        options: [
          'They make helmets fit too tightly',
          'They prevent all types of communication',
          'Dust and scratches can reduce visibility during hazardous tasks',
          'They automatically damage electrical circuits',
        ],
        answer: 2,
        explanation:
          'Ivan warns that dirty or scratched goggles can obstruct vision, which can create additional risk while working.',
      },
    ],
  },
}

export function getVideoAssessment(topic) {
  return videoAssessments[topic] || null
}
