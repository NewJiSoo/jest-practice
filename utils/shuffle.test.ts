// .not 수식어를 이용해 유닛 테스트 작성하기
import shuffle from "./shuffle";

describe('shuffle', () => {
  const array = [1, 2, 3, 4, 5];

  it("새로운 배열을 반환한다", () => {
    expect(shuffle(array)).not.toBe(array);
  });

  it("빈 배열은 빈 배열을 반환한다", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("반환된 배열과 기존 배열은 동일한 속성을 가진다", () => {
    expect(shuffle(array).sort()).toEqual(array);
  });
})