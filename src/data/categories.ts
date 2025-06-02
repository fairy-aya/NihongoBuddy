import { LearningCategory, Phrase, AudioVariation, ConversationExample, Dialog } from '../types';

export const sampleCategories: LearningCategory[] = [
  {
    id: 'greetings',
    name: 'Daily Greetings',
    description: 'Learn essential Japanese greetings for daily life',
    difficulty: 1,
    unlockRequirement: 0,
    phrases: [
      {
        id: 'hello',
        japanese: {
          text: 'こんにちは',
          furigana: 'こんにちは',
          romaji: 'Konnichiwa'
        },
        english: {
          translation: 'Hello',
          explanation: 'Standard greeting used during the day',
          culturalNotes: ['Used from morning to late afternoon']
        },
        audio: {
          native: '/audio/greetings/hello_native.mp3',
          variations: [
            {
              type: 'accent',
              description: 'Tokyo accent',
              audioUrl: '/audio/greetings/hello_tokyo.mp3'
            },
            {
              type: 'formality',
              description: 'Casual version',
              audioUrl: '/audio/greetings/hello_casual.mp3'
            }
          ]
        },
        context: [
          {
            situation: 'Meeting someone during the day',
            dialog: [
              {
                speaker: 'Person A',
                text: 'こんにちは',
                translation: 'Hello'
              },
              {
                speaker: 'Person B',
                text: 'こんにちは、元気ですか？',
                translation: 'Hello, how are you?'
              }
            ]
          }
        ]
      },
      // Add more phrases here
    ]
  },
  // Add more categories here
];
