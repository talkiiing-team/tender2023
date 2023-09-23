export declare namespace NLP {
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
    sentiment: NLP.Sentiment
    srcAnswer: string
    answer: string
    actions: NLP.Action[]
    classifications: { intent: string; score: number }[]
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
    get: (model: string) => NLP.Instance
    use: (any: any) => any
  }
}

declare const dockStart: (options?: any) => Promise<NLP.Dock>

export { dockStart }
