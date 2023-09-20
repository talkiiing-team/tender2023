import { describe, expect, it } from "vitest";
import { extractAddress } from "./address";

const TESTS = [
  {
    input:
      "Хочу отправить посылочку в г. Новосибирск ул. Новогодняя д. 32/4 кв. 176",
    output: [
      { value: "Новосибирск", type: "город" },
      { value: "Новогодняя", type: "улица" },
      { value: "32/4", type: "дом" },
      { value: "176", type: "квартира" },
    ],
  },

  {
    input: "Привет! Хочу оставить заявочку",
    output: null,
  },

  {
    input: "Хочу отправить посылочку в г. Новосибирск ул. Новогодняя д. 32/4",
    output: [
      { value: "Новосибирск", type: "город" },
      { value: "Новогодняя", type: "улица" },
      { value: "32/4", type: "дом" },
    ],
  },

  {
    input: "Хочу отправить письмо на ул. Цветочная, д. 10, кв. 5",
    output: [
      { value: "Цветочная", type: "улица" },
      { value: "10", type: "дом" },
      { value: "5", type: "квартира" },
    ],
  },

  {
    input: "Мой адрес: г. Москва, ул. Кремлевская, д. 1",
    output: [
      { value: "Москва", type: "город" },
      { value: "Кремлевская", type: "улица" },
      { value: "1", type: "дом" },
    ],
  },

  {
    input: "Я проживаю в с. Солнечное, ул. Школьная, д. 2",
    output: [
      { value: "Солнечное", type: "село" },
      { value: "Школьная", type: "улица" },
      { value: "2", type: "дом" },
    ],
  },

  {
    input: "Моя посылка должна быть доставлена на ул. Пушкина, д. 23, кв. 10",
    output: [
      { value: "Пушкина", type: "улица" },
      { value: "23", type: "дом" },
      { value: "10", type: "квартира" },
    ],
  },

  {
    input: "Я проживаю в г. Санкт-Петербург, ул. Невская, д. 5",
    output: [
      { value: "Санкт-Петербург", type: "город" },
      { value: "Невская", type: "улица" },
      { value: "5", type: "дом" },
    ],
  },

  {
    input: "Хочу оформить заказ с доставкой на ул. Гагарина, д. 12/2",
    output: [
      { value: "Гагарина", type: "улица" },
      { value: "12/2", type: "дом" },
    ],
  },

  {
    input:
      "Мне необходимо отправить посылку по адресу: д. 7, кв. 15, ул. Садовая",
    output: [
      { value: "7", type: "дом" },
      { value: "15", type: "квартира" },
      { value: "Садовая", type: "улица" },
    ],
  },

  {
    input:
      "Отправьте мне письмо с подтверждением на 630017 г. Новосибирск, ул. Бориса Богаткова, д. 10, кв 8272",
    output: [
      { value: "630017", type: "индекс" },
      { value: "Новосибирск", type: "город" },
      { value: "Бориса Богаткова", type: "улица" },
      { value: "10", type: "дом" },
      { value: "8272", type: "квартира" },
    ],
  },
];

describe("address extractor", () => {
  TESTS.forEach((test) => {
    it(`should pass for ${test.input}`, async () =>
      expect(await extractAddress(test.input)).toStrictEqual(test.output));
  });
});
