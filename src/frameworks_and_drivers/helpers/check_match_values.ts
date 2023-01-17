// Revisa si un valor o valores existen en un array
function checkValuesArray (
  valuesArray: string[],
  arrayToCheck: string[],
  matchAll = false
) {
  if (matchAll) {
    return valuesArray.every((i) => arrayToCheck.includes(i));
  } else {
    return valuesArray.some((i) => arrayToCheck.includes(i));
  }
}

export { checkValuesArray };
