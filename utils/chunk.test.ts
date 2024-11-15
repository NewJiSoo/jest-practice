import chunk from './chunk';

describe('chunk', () => {
  const array = ['a', 'b', 'c', 'd'];

  it("배열을 개별 요소로 나눠 반환한다.", () => {
    const actual = chunk(array);
    expect(actual).toEqual([['a'], ['b'], ['c'], ['d']]);
    expect(actual).not.toBe(array);
  });

  it("size가 생략되었을 때 기본값 1로 동작한다.", () => {
    expect(chunk(array)).toEqual([['a'], ['b'], ['c'], ['d']]);
  });

  it("size가 배열의 길이보다 작거나 같은 경우 동작 한다. size < length", () => {
    expect(chunk(array, 2)).toEqual([['a', 'b'], ['c', 'd']]);
    expect(chunk(array, 3)).toEqual([['a', 'b', 'c'], ['d']]);
    expect(chunk(array, 4)).toEqual([['a', 'b', 'c', 'd']]);
  });


  it.each([5, 6, 2 ** 32, Infinity])("size가 배열의 길이보다 큰 범위 내에 동작 한다. size >= length", (size) => {
    expect(chunk(array, size)).toEqual([['a', 'b', 'c', 'd']]);
  });

  it.each([0, -1, -(2 ** 32), -Infinity])("size가 1미만일 때 빈 배열을 반환한다. size < 1", (size) => {
    expect(chunk(array, size)).toEqual([]);
  });

  it("빈 배열을 입력할 경우 빈 배열을 반환한다.", () => {
    expect(chunk([], 2)).toEqual([]);
    expect(chunk([], 0)).toEqual([]);
  });

  it("배열이 null이거나 undefined일 경우 빈 배열을 반환한다.", () => {
    expect(chunk(null, 2)).toEqual([]);
    expect(chunk(undefined, 2)).toEqual([]);
  });

});