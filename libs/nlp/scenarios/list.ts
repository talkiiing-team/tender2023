import {
  Scenario,
  ScenarioActions,
  ScenarioAnswers,
} from '@libs/nlp/scenarios/addScenarios'
import { readFileSync } from 'fs'
import { InlineKeyboard } from 'grammy'
import * as path from 'path'

export const readAnswerText = (q: number) => {
  return readFileSync(
    path.resolve(__dirname, `./answerDataset/${q}.txt`),
  ).toString()
}

export const extractLaw = (lawNumber: number) => {
  return [
    `что такое ${lawNumber}-фз`,
    `определение ${lawNumber}-фз`,
    `что такое ${lawNumber} фз`,
    `определение ${lawNumber} фз`,
    `что такое ${lawNumber}фз`,
    `определение ${lawNumber}фз`,
  ]
}

export const scenarios: Scenario = {
  new: ['найти товар', 'новая поставка'],
  ignored: {
    hello: ['здравствуйте', 'привет', 'добрый день вечер утро', 'что новое'],
  },
  pretrain: {
    1: [
      'Какие существуют основания для блокировки на Портале Поставщиков',
      'почему заблокировали на портале поставщиков',
      'основания блокировки на портале',
    ],
    2: [
      'Как обжаловать блокировку на Портале поставщиков',
      'убрать разблокировать аккаунт на портале поставщиков',
      'разблокировка аккаунта',
    ],
    3: [
      'Кто может являться заказчиком на Портале поставщиков',
      'заказчики на портале поставщиков',
    ],
    4: ['Что такое прямая закупка'],
    5: [
      'Что такое единый реестр закупок, как принять участие в закупках из раздела «Закупки по 44-фз и 223-фз»',
    ],
    6: [
      'Роль Портала поставщиков при проведении региональной закупки',
      'Какую роль играет портал поставщиков при проведении региональной закупки',
    ],
    7: [
      'Возможно ли участие поставщика в закупочной процедуре другого региона',
    ],
    8: ['Добавление и блокировка пользователей организации'],
    9: ['Описание общего процесса функционирования портала'],
    10: ['Страница закупки по потребностям'],
    11: ['Определение победителя в котировочной сессии'],
    12: [
      'В каких случаях право может перейти следующему за победителем участнику котировочной сессии',
    ],
    13: ['Кто может принять участие в котировочных сессиях'],
    14: [
      'Какие последствия в случае неподписания поставщиком оферты по итогам котировочной сессии и контракта',
    ],
    15: [
      'Что делать, если оферты подписаны, но проект контракта не поступает в личный кабинет поставщику',
    ],
    16: [
      'Может ли поставщик посмотреть данные о других участниках котировочной сессии',
    ],
    17: ['Почему победа по котировочной сессии перешла другому участнику'],
    18: [
      'Что делать московскому заказчику, если в ЕАИСТ котировочная сессия отменена, а на Портале поставщиков активна',
    ],
    19: ['Как подписать массово все оферты по итогам котировочных сессий'],
    20: [
      'Может ли поставщик посмотреть данные о других участниках котировочной сессии',
      'Может ли поставщик просмотреть участников котировочной сессии',
    ],
    21: ['Реестровый номер оферты не присвоен'],
    22: ['Как изменить единицу измерения в оферте'],
    23: ['Удаление оферты'],
    24: ['Каналы обращения при отклонении СТЕ'],
    25: ['Как изменить/продлить срок действия оферты'],
    26: ['Подача ценового предложения'],
    27: ['Какой срок рассмотрения заявки на создание новой СТЕ'],
    28: ['Поиск СТЕ'],
    29: ['Статусы заявок на СТЕ'],
    30: ['Как скопировать оферту'],
    31: [
      'Как проверить статус заявки на регистрацию/изменение данных компании на Портале поставщиков',
    ],
    32: ['Как проверить, заблокирована ли компания на Портале поставщиков'],
    33: ['Как произвести настройку уведомлений'],
    34: ['При входе по ЭП ошибка "Сертификат не зарегистрирован"'],
    35: [
      'При подаче заявки на регистрацию компании возникает ошибка "Некорректное значение ОКАТО или ОКТМО"',
    ],
    36: ['Где можно найти виджеты Портала поставщиков'],
    37: ['Как создать нового пользователя'],
    38: [
      'Как пользователю пройти регистрацию на Портале поставщиков в качестве заказчика',
    ],
    39: ['Как изменить сведения о компании'],
    40: ['Регистрация поставщика'],
    41: ['Как при формировании УПД изменить наименование товара'],
    42: [
      'Как в Исполнении контрактов, электронно актируемых через ЕИС, вручную заполнить сведения о лекарственном препарате',
    ],
    43: [
      `Что делать по Исполнениям контрактов, электронно актируемых через ЕИС, если контракт сформирован ошибочно
    или нарушен процесс обмена данным об УПД между ЕИС и Порталом поставщиков`,
    ],
    44: [
      `Контракт сформирован ошибочно или нарушен процесс обмена данным об УПД между ЕИС и Порталом поставщиков`,
    ],
    45: ['Как перевести УПД в статус редактирования'],
    46: ['Как при формировании УПД изменить наименование товара'],
    47: ['Как при формировании УПД изменить наименование услуги / работы'],
    48: ['Как удалить УПД', 'удаление упд'],
    49: ['Ошибка при обновлении УПД'],
    50: [
      'Что делать если при работе с Исполнением контракта, электронно актируемым через ЕИС, СТП ЕИС запрашивает 2 xml или ИдТрПакет',
    ],
    51: [
      'что такое еис',
      'что такое единая информационая система',
      'определение еис',
    ],
    52: [
      'что такое инн',
      'что такое индивидуальный номер налогоплательщика',
      'определение инн',
    ],
    53: ['что такое исполнение', 'определение исполнение'],
    54: ['что такое кпп', 'определение кпп'],
    55: ['что такое лк', 'определение лк'],
    56: ['что такое лкп', 'определение лкп'],
    57: ['что такое ндс', 'определение ндс'],
    58: [
      'что такое подсистема "портал поставщиков"',
      'что такое портал',
      'что такое подсистема',
      'что такое пп',
      'определение подсистема "портал поставщиков"',
      'определение портала',
      'определение подсистема',
      'определение пп',
    ],
    59: [
      'что такое сте',
      'определение сте',
      'что такое стандартная товарная единица',
      'определение стандартная товарная единица',
    ],
    60: ['что такое стп', 'определение стп'],
    61: extractLaw(44),
    62: extractLaw(223),
    63: extractLaw(46),
    64: extractLaw(94),
    65: ['что такое укд', 'определение укд'],
    66: [
      'что такое исправительный укд',
      'определение исправительного укд',
      'что такое уди',
      'определение уди',
    ],
    67: ['что такое упд', 'определение упд'],
    68: [
      'что такое исправительный упд',
      'определение исправительный упд',
      'что такое упади',
      'определение упади',
    ],
    69: ['что такое эдо', 'определение эдо'],
    70: ['что такое эи', 'определение эи'],
    71: ['что такое арм', 'определение арм'],
    72: ['что такое виджет', 'определение виджета'],
    73: ['что такое до', 'определение до'],
    74: ['что такое еаист', 'определение еаист'],
    75: ['что такое зпп', 'определение зпп'],
    76: ['что такое исир', 'определение исир'],
    77: [
      'что такое котировочная сессия',
      'определение котировочной сессии',
      'что такое кс',
      'определение кс',
    ],
    78: ['что такое кпгз', 'определение кпгз'],
    79: ['что такое ктс', 'определение ктс'],
    80: ['что такое маф', 'определение маф'],
    81: ['что такое нмцк', 'определение нмцк'],
    82: ['что такое огрн', 'определение огрн'],
    83: ['что такое окпд2', 'определение окпд2'],
    84: ['что такое октмо', 'определение октмо'],
    85: ['что такое опо', 'определение опо'],
    86: ['что такое рпн еис', 'определение рпн еис'],
    87: ['что такое судир', 'определение судир'],
    88: ['что такое уаис бу', 'определение уаис бу'],
    89: ['что такое ЭМ МО ЕАСУЗ', 'определение ЭМ МО ЕАСУЗ'],
  },
}

export const formAnswersPretrain = (count: number) => {
  const obj = {}
  for (let i = 1; i <= count; i++) obj[i] = readAnswerText(i)
  return obj
}

export const scenariosAnswer: ScenarioAnswers = {
  new: 'найти товар и создать закупку',
  ignored: {
    hello:
      'Приветствую! Возможно вы задали вопрос, но я не смог найти ответ на него, повторите его еще раз, пожалуйста',
  },
  pretrain: formAnswersPretrain(90),
}

export const scenarioActions: ScenarioActions = {
  'pretrain.61': (nlp, dialog) =>
    new InlineKeyboard([
      [
        {
          text: 'Полный текст 44-ФЗ',
          url: 'https://www.consultant.ru/document/cons_doc_LAW_144624/',
        },
      ],
      [
        {
          text: 'Узнать о 223-ФЗ',
          callback_data: 'pretrain.62',
        },
      ],
      [
        {
          text: 'Узнать о 46-ФЗ',
          callback_data: 'pretrain.63',
        },
      ],
      [
        {
          text: 'Узнать о 94-ФЗ',
          callback_data: 'pretrain.64',
        },
      ],
    ]),
  'pretrain.62': (nlp, dialog) =>
    new InlineKeyboard([
      [
        {
          text: 'Полный текст 223-ФЗ',
          url: 'https://www.consultant.ru/document/cons_doc_LAW_116964/',
        },
      ],
      [
        {
          text: 'Узнать о 44-ФЗ',
          callback_data: 'pretrain.61',
        },
      ],
      [
        {
          text: 'Узнать о 46-ФЗ',
          callback_data: 'pretrain.63',
        },
      ],
      [
        {
          text: 'Узнать о 94-ФЗ',
          callback_data: 'pretrain.64',
        },
      ],
    ]),
  'pretrain.63': (nlp, dialog) =>
    new InlineKeyboard([
      [
        {
          text: 'Полный текст 46-ФЗ',
          url: 'https://www.consultant.ru/document/cons_doc_LAW_411095/',
        },
      ],
      [
        {
          text: 'Узнать о 44-ФЗ',
          callback_data: 'pretrain.61',
        },
      ],
      [
        {
          text: 'Узнать о 223-ФЗ',
          callback_data: 'pretrain.62',
        },
      ],
      [
        {
          text: 'Узнать о 94-ФЗ',
          callback_data: 'pretrain.64',
        },
      ],
    ]),
  'pretrain.64': (nlp, dialog) =>
    new InlineKeyboard([
      [
        {
          text: 'Полный текст 94-ФЗ',
          url: 'https://www.consultant.ru/document/cons_doc_LAW_54598/',
        },
      ],
      [
        {
          text: 'Узнать о 44-ФЗ',
          callback_data: 'pretrain.61',
        },
      ],
      [
        {
          text: 'Узнать о 223-ФЗ',
          callback_data: 'pretrain.62',
        },
      ],
      [
        {
          text: 'Узнать о 46-ФЗ',
          callback_data: 'pretrain.63',
        },
      ],
    ]),
}
