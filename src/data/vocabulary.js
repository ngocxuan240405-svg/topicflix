
/*
  TOPICFLIX - VOCABULARY DATA
  Dữ liệu từ vựng cho bài học Education - B1
*/

export const vocabularyData = {
  students: {
    word: 'students',
    type: 'Vocabulary',
    ipa: '/ˈstuːdənts/',
    partOfSpeech: 'noun (plural)',
    definition: 'People who study at a school, college or university.',
    vietnamese: 'Học sinh, sinh viên',
    example: 'The students are learning English.',
  },

  experience: {
    word: 'experience',
    type: 'Vocabulary',
    ipa: '/ɪkˈspɪəriəns/',
    partOfSpeech: 'noun',
    definition: 'Knowledge or skill gained by doing something.',
    vietnamese: 'Kinh nghiệm, trải nghiệm',
    example: 'She has experience in learning languages.',
  },

  research: {
    word: 'research',
    type: 'Vocabulary',
    ipa: '/rɪˈsɜːtʃ/',
    partOfSpeech: 'noun / verb',
    definition: 'A careful study of a subject to discover information.',
    vietnamese: 'Nghiên cứu, sự nghiên cứu',
    example: 'Students research different topics.',
  },

  topic: {
    word: 'topic',
    type: 'Vocabulary',
    ipa: '/ˈtɒpɪk/',
    partOfSpeech: 'noun',
    definition: 'A subject that people discuss, study or write about.',
    vietnamese: 'Chủ đề',
    example: 'Education is an interesting topic.',
  },

  wikipedia: {
    word: 'Wikipedia',
    type: 'Vocabulary',
    ipa: '/ˌwɪkɪˈpiːdiə/',
    partOfSpeech: 'proper noun',
    definition: 'A free online encyclopedia.',
    vietnamese: 'Bách khoa toàn thư trực tuyến Wikipedia',
    example: 'Students use Wikipedia to find information.',
  },
}

// Collocations - Cụm từ thường đi cùng nhau
export const collocationsData = {
  'experience with': {
    word: 'experience with',
    type: 'Collocation',
    ipa: '/ɪkˈspɪəriəns wɪð/',
    partOfSpeech: 'noun phrase',
    definition: 'Knowledge gained from using or doing something.',
    vietnamese: 'Kinh nghiệm với một việc hoặc công cụ nào đó',
    example: 'She has experience with online learning.',
  },
}

// Idioms - Sẽ bổ sung từ bài học phù hợp
export const idiomsData = {}

// Tìm kiếm từ hoặc cụm từ trong dữ liệu
export function findVocabulary(text) {
  const key = text.toLowerCase().trim()

  return (
    vocabularyData[key] ||
    collocationsData[key] ||
    idiomsData[key] ||
    null
  )
}
