import { Scenario, ScenarioAnswers } from '@libs/nlp/scenarios/addScenarios'

export const scenarios: Scenario = {
  new: ['найти товар', 'новая поставка'],
  ignored: {
    hello: ['здравствуйте', 'привет', 'добрый день вечер утро', 'что новое'],
  },
}

export const scenariosAnswer: ScenarioAnswers = {
  new: 'найти товар и создать закупку',
  ignored: {
    hello:
      'Приветствую! Возможно вы задали вопрос, но я не смог найти ответ на него, повторите его еще раз, пожалуйста',
  },
}
