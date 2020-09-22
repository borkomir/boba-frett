export function shuffleArray(arr) {
  const arrCopy = [].concat(arr);
  for (let i = arrCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const t = arrCopy[i];
    arrCopy[i] = arrCopy[j];
    arrCopy[j] = t;
  }
  return arrCopy;
}

export function getCommonElementsCount(arrA, arrB) {
  return arrA.filter((v) => arrB.includes(v)).length;
}
