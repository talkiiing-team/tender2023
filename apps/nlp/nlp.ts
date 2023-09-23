import { containerBootstrap } from '@nlpjs/core'
import { Nlp } from '@nlpjs/nlp'
import { LangRu, NormalizerRu } from '@nlpjs/lang-ru'
import { NLP } from './types'
import {
  addScenarios,
  addScenariosAnswers,
} from '@libs/nlp/scenarios/addScenarios'
import { scenarios, scenariosAnswer } from '@libs/nlp/scenarios/list'

export const initNLP = async () => {
  const container = (await containerBootstrap()) as NLP.Dock
  container.use(NormalizerRu)
  container.use(Nlp)
  container.use(LangRu)
  const nlp = container.get('nlp')
  nlp.settings.autoSave = false
  nlp.addLanguage('ru')

  const add = addScenarios(nlp)
  add(scenarios)
  const addAnswers = addScenariosAnswers(nlp)
  addAnswers(scenariosAnswer)

  await nlp.train()
  return nlp
}