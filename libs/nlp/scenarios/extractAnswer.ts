import {
  OneLayerScenario,
  ScenarioAnswers,
} from '@libs/nlp/scenarios/addScenarios'

export const extractAnswer = (intent: string, answers: ScenarioAnswers) => {
  const path = intent.split('.').reverse()
  let answer: string | OneLayerScenario<string> | ScenarioAnswers | undefined =
    answers
  while (path.length) {
    const section = path.pop()
    if (section && answer[section]) {
      answer = answer[section]
    } else {
      return ''
    }
  }
  if (typeof answer !== 'string') return undefined
  return answer
}
