export function isValidCoordinates(input) {
  const regex = /^(\[)?(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)(\])?$/;
  const match = input.match(regex);
  if (!match) {
    return { error: "Некорректный формат координат" };
  }
  const latitude = parseFloat(match[2]);
  const longitude = parseFloat(match[4]);
  return { latitude, longitude };
}
