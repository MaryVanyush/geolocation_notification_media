import { isValidCoordinates } from "../isValidCoordinates";

test("checking isValidCoordinates", () => {
  const input = "[51.50851, 0.12572]";
  const received = isValidCoordinates(input);
  const expected = { latitude: 51.50851, longitude: 0.12572 };
  expect(received).toEqual(expected);
});

test("checking isValidCoordinates with error", () => {
  const input = "51.50851,-0.12572,123";
  const received = isValidCoordinates(input);
  const expected = { error: "Некорректный формат координат" };
  expect(received).toEqual(expected);
});
