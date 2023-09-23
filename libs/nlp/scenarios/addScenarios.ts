import { NLP } from '@apps/nlp/types'

export type OneLayerScenario<T> = Record<string, T>

export type Scenario<T = OneLayerScenario<string[]>> = Record<
  string,
  string[] | T
>

export type ScenarioAnswers = Record<string, string | OneLayerScenario<string>>

export const addScenarios = (nlp: NLP.Instance, stemmer: NLP.Stemmer) =>
  function patchNLP(maps: Scenario, prefix?: string) {
    Object.entries(maps).forEach(([key, utterances]) =>
      Array.isArray(utterances)
        ? utterances.forEach(phrase =>
            nlp.addDocument(
              'ru',
              stemmer.tokenizeAndStem(phrase).join(' '),
              `${prefix ? `${prefix}.` : ''}${key}`,
            ),
          )
        : patchNLP(utterances, key),
    )
  }

export const addScenariosAnswers = (nlp: NLP.Instance) =>
  function patchNLPAnswer(maps: ScenarioAnswers, prefix?: string) {
    Object.entries(maps).forEach(([key, utterance]) =>
      typeof utterance === 'string'
        ? nlp.addAnswer('ru', `${prefix ? `${prefix}.` : ''}${key}`, utterance)
        : patchNLPAnswer(utterance, key),
    )
  }
