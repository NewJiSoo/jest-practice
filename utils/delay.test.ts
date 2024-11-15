//github.com/codeit-bootcamp-frontend/FE-ADV-Practice/blob/2e7afe721332eaa213782a912af499e1ca5f9d21/utils/delay.test.ts

import delay from "./delay";

describe("delay 함수 테스트", () => {
  const testFn = jest.fn();
  const wait = 1000;
  test(`delay 함수가 ${wait}ms 후에 호출되는지 테스트`, (done) => {
    jest.useFakeTimers(); // Fake timer 사용

    delay(testFn, wait, "later"); // delay 함수 호출

    jest.advanceTimersByTime(wait); // 1000ms 앞으로 이동하여 타이머 트리거

    try {
      expect(testFn).toHaveBeenCalled(); // 함수가 호출되었는지 확인
      expect(testFn).toHaveBeenCalledWith("later"); // 'later' 인수로 호출되었는지 확인
      done();
    } catch (error) {
      done(error);
    } finally {
      jest.useRealTimers(); // 타이머 복구
    }
  });
});
