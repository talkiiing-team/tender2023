export type IntentOption = { intent: string; score: number }

export declare namespace NLP {
  interface Stemmer {
    tokenizeAndStem(text: string): Array<string>
  }

  interface Instance {
    addLanguage: (language: string) => void
    addDocument: (language: string, utterance: string, intent: string) => void
    addAnswer: (language: string, intent: string, answer: string) => void
    train: () => void
    process: (language: string, utterance: string) => Promise<NLP.Result>
    settings: any
  }

  interface Result {
    locale: string
    utterance: string
    languageGuessed: boolean
    localeIso2: string
    language: string
    domain: string
    intent: string
    score: number
    answers: string[]
    entities: NLP.Entity[]
    // sentiment: NLP.Sentiment
    srcAnswer: string
    answer: string
    // actions: NLP.Action[]
    classifications: IntentOption[]
  }

  interface Entity {
    start: number
    end: number
    len: number
    accuracy: number
    entity: string
    type: string
  }

  interface Dock {
    get(model: 'nlp'): NLP.Instance
    get(model: 'stemmer-ru'): NLP.Stemmer
    use: (any: any) => any
  }
}

declare const dockStart: (options?: any) => Promise<NLP.Dock>

export { dockStart }
