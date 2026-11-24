
export const phraseData = {
  'experience with': {
    word: 'experience with',
    type: 'Collocation',
    ipa: '/ɪkˈspɪəriəns wɪð/',
    partOfSpeech: 'noun phrase',
    definition: 'Knowledge gained from using or doing something.',
    vietnamese: 'Kinh nghiệm với một việc hoặc công cụ nào đó',
    example: 'Students have experience with online learning.',
  },

  'take notes': {
    word: 'take notes',
    type: 'Collocation',
    ipa: '/teɪk nəʊts/',
    partOfSpeech: 'verb phrase',
    definition: 'To write down important information.',
    vietnamese: 'Ghi chép thông tin quan trọng',
    example: 'Students take notes during lessons.',
  },

  'do research': {
    word: 'do research',
    type: 'Collocation',
    ipa: '/duː rɪˈsɜːtʃ/',
    partOfSpeech: 'verb phrase',
    definition: 'To investigate a subject to learn more about it.',
    vietnamese: 'Tiến hành nghiên cứu',
    example: 'We do research for our school projects.',
  },

  'pay attention': {
    word: 'pay attention',
    type: 'Collocation',
    ipa: '/peɪ əˈtenʃən/',
    partOfSpeech: 'verb phrase',
    definition: 'To listen to or watch something carefully.',
    vietnamese: 'Chú ý, tập trung',
    example: 'Please pay attention to the teacher.',
  },

  'learn by heart': {
    word: 'learn by heart',
    type: 'Idiom',
    ipa: '/lɜːn baɪ hɑːt/',
    partOfSpeech: 'idiomatic verb phrase',
    definition: 'To memorize something completely.',
    vietnamese: 'Học thuộc lòng',
    example: 'She learned the poem by heart.',
  },

  'a piece of cake': {
    word: 'a piece of cake',
    type: 'Idiom',
    ipa: '/ə piːs əv keɪk/',
    partOfSpeech: 'idiomatic noun phrase',
    definition: 'Something that is very easy to do.',
    vietnamese: 'Một việc rất dễ dàng',
    example: 'The English test was a piece of cake.',
  },

  'hit the books': {
    word: 'hit the books',
    type: 'Idiom',
    ipa: '/hɪt ðə bʊks/',
    partOfSpeech: 'idiomatic verb phrase',
    definition: 'To begin studying seriously.',
    vietnamese: 'Bắt đầu học hành chăm chỉ',
    example: 'I need to hit the books before my exam.',
  },
}

// Tìm kiếm Collocation hoặc Idiom
export function findPhrase(text) {
  const normalized = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')

  return phraseData[normalized] || null
}
