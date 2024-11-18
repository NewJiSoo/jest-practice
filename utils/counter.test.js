import count from "./counter";

describe("counter", () => {
  let targetElement;
  beforeEach(() => {
    // 대상 필터 요소
    targetElement = document.createElement("li");
  });

  test("1개의 완료되지 않은 작업 개수를 센다", () => {
    const todos = [
      { text: "1", completed: false },
      { text: "2", completed: true },
      { text: "3", completed: true },
    ];
    // count의 반환값이 DOM 요소이므로 따로 빼줘야 한다.
    // expect(count(targetElement, { todos }).textContent).toBe("1 Item left");

    // 반환된 DOM 요소의 textCountent를 검증
    const updatedCounter = count(targetElement, { todos });
    expect(updatedCounter.textContent).toBe("1 Item left");
  });

  test("2개 이상의 완료되지 않은 작업 개수를 센다", () => {
    const todos = [
      { text: "1", completed: false },
      { text: "2", completed: false },
      { text: "3", completed: true },
    ];
    const updatedCounter = count(targetElement, { todos });

    expect(updatedCounter.textContent).toBe("2 Items left");
  });

  test("완료되지 않은 작업 개수가 없으면 '0 Items left'을 표시한다.", () => {
    const todos = [
      { text: "1", completed: true },
      { text: "2", completed: true },
      { text: "3", completed: true },
    ];
    const updatedCounter = count(targetElement, { todos });

    expect(updatedCounter.textContent).toBe("0 Items left");
  });
});
