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
];

describe("address extractor", () => {
  TESTS.forEach((test) => {
    it(`should pass for ${test.input}`, async () =>
      expect(await extractAddress(test.input)).toStrictEqual(test.output));
  });
});
