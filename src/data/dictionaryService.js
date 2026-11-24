
/*
  TOPICFLIX - ONLINE DICTIONARY
  Free Dictionary API + MyMemory Translation
  Common words, contractions and fallback
*/

const cache = new Map()

// Từ thông dụng có thể tra ngay, không cần Internet.
const commonWords = {
  their: ['của họ', 'Belonging to them.', 'determiner', 'Their books are here.'],
  they: ['họ', 'The people or things being referred to.', 'pronoun', 'They study English.'],
  them: ['họ, chúng', 'The object form of they.', 'pronoun', 'I talked to them.'],
  there: ['ở đó; có', 'In, at, or to that place.', 'adverb', 'The book is there.'],
  you: ['bạn', 'The person being addressed.', 'pronoun', 'You can do it.'],
  we: ['chúng ta, chúng tôi', 'The speaker and other people.', 'pronoun', 'We learn English.'],
  i: ['tôi', 'The person who is speaking.', 'pronoun', 'I am ready.'],
  our: ['của chúng ta', 'Belonging to us.', 'determiner', 'Our team is ready.'],
  your: ['của bạn', 'Belonging to you.', 'determiner', 'Your answer is correct.'],
  is: ['là, đang, ở', 'Third-person singular present form of be.', 'verb', 'Safety is important.'],
  are: ['là, đang, ở', 'Present form of be.', 'verb', 'They are ready.'],
  am: ['là, đang', 'First-person singular present form of be.', 'verb', 'I am learning.'],
  was: ['đã là, đã ở', 'Past form of be.', 'verb', 'She was here.'],
  were: ['đã là, đã ở', 'Past form of be.', 'verb', 'They were ready.'],
  has: ['có, đã', 'Third-person singular form of have.', 'verb', 'He has a helmet.'],

  // Dùng dấu nháy kép để tránh lỗi cú pháp.
  "you'll": ['bạn sẽ', 'Contraction of you will.', 'contraction', "You'll learn a lot."],
  "we'll": ['chúng ta sẽ', 'Contraction of we will.', 'contraction', "We'll start soon."],
  "i'll": ['tôi sẽ', 'Contraction of I will.', 'contraction', "I'll be there."],
  "they'll": ['họ sẽ', 'Contraction of they will.', 'contraction', "They'll arrive soon."],
  "he'll": ['anh ấy sẽ', 'Contraction of he will.', 'contraction', "He'll help us."],
  "she'll": ['cô ấy sẽ', 'Contraction of she will.', 'contraction', "She'll join us."],
  "we're": ['chúng ta là, chúng ta đang', 'Contraction of we are.', 'contraction', "We're learning English."],
  "they're": ['họ là, họ đang', 'Contraction of they are.', 'contraction', "They're here."],
  "it's": ['nó là, nó đang, nó đã', 'Contraction of it is or it has.', 'contraction', "It's important."],
  "what's": ['cái gì là', 'Contraction of what is or what has.', 'contraction', "What's next?"],
  "i've": ['tôi đã', 'Contraction of I have.', 'contraction', "I've finished."],
  "we've": ['chúng ta đã', 'Contraction of we have.', 'contraction', "We've finished."],
  "don't": ['không', 'Contraction of do not.', 'contraction', "Don't forget."],
  "doesn't": ['không', 'Contraction of does not.', 'contraction', "He doesn't know."],
  "didn't": ['đã không', 'Contraction of did not.', 'contraction', "I didn't know."],
  "can't": ['không thể', 'Contraction of cannot.', 'contraction', "You can't enter."],
  "won't": ['sẽ không', 'Contraction of will not.', 'contraction', "It won't rain."],
  "isn't": ['không phải, không đang', 'Contraction of is not.', 'contraction', "It isn't difficult."],
  "aren't": ['không phải, không đang', 'Contraction of are not.', 'contraction', "They aren't ready."],
}

function normalizeWord(word) {
  return String(word ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')
}

// Tìm thêm dạng gốc khi từ điển không có kết quả.
function candidatesFor(word) {
  const options = [word]

  const irregular = {
    went: 'go',
    gone: 'go',
    better: 'good',
    best: 'good',
    children: 'child',
    people: 'person',
    feet: 'foot',
    teeth: 'tooth',
    mice: 'mouse',
  }

  if (irregular[word]) {
    options.push(irregular[word])
  }

  if (word.endsWith('ies') && word.length > 4) {
    options.push(word.slice(0, -3) + 'y')
  }

  if (word.endsWith('ing') && word.length > 5) {
    const stem = word.slice(0, -3)
    options.push(stem, stem + 'e')

    if (
      stem.length > 1 &&
      stem.at(-1) === stem.at(-2)
    ) {
      options.push(stem.slice(0, -1))
    }
  }

  if (word.endsWith('ed') && word.length > 4) {
    options.push(word.slice(0, -2))
    options.push(word.slice(0, -1))
  }

  if (word.endsWith('es') && word.length > 4) {
    options.push(word.slice(0, -2))
  }

  if (word.endsWith('s') && word.length > 3) {
    options.push(word.slice(0, -1))
  }

  return [...new Set(options)].slice(0, 5)
}

// Tra từ điển tiếng Anh.
async function getDictionary(word) {
  try {
    const url =
      'https://api.dictionaryapi.dev/api/v2/entries/en/' +
      encodeURIComponent(word)

    const response = await fetch(url)

    if (!response.ok) return null

    const entries = await response.json()

    if (!Array.isArray(entries) || !entries.length) {
      return null
    }

    const entry = entries[0]

    const meaning = entry.meanings?.find(
      (item) => item.definitions?.length
    )

    const first = meaning?.definitions?.[0]

    return {
      word: entry.word || word,
      type: 'Vocabulary',
      ipa:
        entry.phonetic ||
        entry.phonetics?.find((item) => item.text)?.text ||
        '',
      partOfSpeech:
        meaning?.partOfSpeech || 'Not available',
      definition:
        first?.definition || 'Not available',
      vietnamese: 'Vietnamese translation unavailable',
      example:
        first?.example || 'No example available',
    }
  } catch {
    return null
  }
}

// Dịch sang tiếng Việt.
async function translateToVietnamese(word) {
  try {
    const url =
      'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(word) +
      '&langpair=en%7Cvi'

    const response = await fetch(url)

    if (!response.ok) return null

    const data = await response.json()

    const value = data.responseData?.translatedText

    if (
      Number(data.responseStatus) !== 200 ||
      typeof value !== 'string' ||
      !value.trim()
    ) {
      return null
    }

    if (/MYMEMORY WARNING|PLEASE SELECT/i.test(value)) {
      return null
    }

    return value.trim()
  } catch {
    return null
  }
}

// Hàm tra từ chính được VideoLearning sử dụng.
export async function lookupWord(word) {
  const cleanWord = normalizeWord(word)

  if (!cleanWord) {
    throw new Error('Please select a valid word.')
  }

  if (cache.has(cleanWord)) {
    return cache.get(cleanWord)
  }

  const local = commonWords[cleanWord]

  // Ưu tiên từ có sẵn.
  if (local) {
    const result = {
      word: cleanWord,
      type: 'Vocabulary',
      ipa: '',
      partOfSpeech: local[2],
      definition: local[1],
      vietnamese: local[0],
      example: local[3],
    }

    cache.set(cleanWord, result)
    return result
  }

  // Tra Free Dictionary API.
  let entry = null

  for (const candidate of candidatesFor(cleanWord)) {
    entry = await getDictionary(candidate)

    if (entry) break
  }

  // Vẫn thử dịch kể cả khi từ điển tiếng Anh không có.
  const translation =
    await translateToVietnamese(cleanWord)

  if (!entry && !translation) {
    throw new Error(
      'Unable to find this word. Check your connection and try again.'
    )
  }

  const result = entry
    ? {
        ...entry,
        word: cleanWord,
        vietnamese:
          translation || entry.vietnamese,
      }
    : {
        word: cleanWord,
        type: 'Vocabulary',
        ipa: '',
        partOfSpeech: 'Not available',
        definition: 'English definition unavailable.',
        vietnamese: translation,
        example: 'No example available',
      }

  cache.set(cleanWord, result)

  return result
}
