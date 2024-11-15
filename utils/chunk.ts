/**
 * 'size' 길이만큼 그룹으로 분할된 요소 배열을 만듭니다. `배열`을 균등하게 분할할 수 없는 경우 
 *  최종 청크는 나머지 요소가 됩니다.
 *
 * @param {Array} array 배열을 처리할 대상
 * @param {number} [size=1] 분할할 크기
 * @returns {Array} 새로운 배열을 반환
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */

// size가 number로 되어있는데 이때 정수가 아닌 소수가 나오는 경우도 생각해야 한다.
function chunk(array: any[] | null | undefined, size: number = 1) {
  size = Math.max(Math.floor(size), 0);
  if (array == null || array == undefined) return [];
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

export default chunk;