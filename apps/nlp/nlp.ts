import { containerBootstrap } from '@nlpjs/core'
import { Nlp } from '@nlpjs/nlp'
import { LangRu, NormalizerRu, StemmerRu, StopwordsRu } from '@nlpjs/lang-ru'
import { NLP } from './types'
import {
  addScenarios,
  addScenariosAnswers,
} from '@libs/nlp/scenarios/addScenarios'
import { scenarios, scenariosAnswer } from '@libs/nlp/scenarios/list'

export const initNLP = async () => {
  const container = (await containerBootstrap()) as NLP.Dock

  container.use(LangRu)
  container.use(NormalizerRu)
  container.use(StemmerRu)
  container.use(StopwordsRu)
  container.use(Nlp)

  // console.log(
  //   container
  //     .get('stemmer-ru')
  //     .tokenizeAndStem(
  //       'Какие существуют основания для блокировки на Портале Поставщиков',
  //     ),
  // )

  const stemmer = container.get('stemmer-ru') as NLP.Stemmer

  const nlp = container.get('nlp')
  nlp.settings.autoSave = false
  nlp.addLanguage('ru')

  const add = addScenarios(nlp, stemmer)
  add(scenarios)
  const addAnswers = addScenariosAnswers(nlp)
  addAnswers(scenariosAnswer)

  await nlp.train()
  return {
    nlp,
    stemmer,
  }
}
