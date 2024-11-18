//https://github.com/codeit-bootcamp-frontend/FE-ADV-Practice/blob/f0acfca6ded10f33a979dcc3541fe721080f61a6/frameworkless/model/modelMock.test.js

import todo from "./model";

describe("model", () => {
  let manager;

  beforeEach(() => {
    manager = todo();
  });

  test("todos에 Item추가한다", () => {
    manager.addItem("영양제 먹기");
    const state = manager.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe("영양제 먹기");
  });

  test("todos를 업데이트한다", () => {
    manager.addItem("밥 먹기");
    manager.updateItem(0, "산책");
    const state = manager.getState();
    expect(state.todos[0].text).toBe("산책");
  });

  test("존재하는 todos의 Item가 삭제된다", () => {
    manager.addItem("밥 먹기");
    manager.deleteItem(0);
    const state = manager.getState();
    expect(state.todos).toHaveLength(0);
  });

  test("존재하지 않는 todos Item 삭제 시 기존 todos와 동일하다", () => {
    manager.addItem("밥 먹기");
    manager.deleteItem(1);
    const state = manager.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe("밥 먹기");
  });

  test("todos의 하나의 Item 완료", () => {
    manager.addItem("밥 먹기");
    manager.toggleItemCompleted(0);
    const state = manager.getState();
    expect(state.todos[0].completed).toBe(true);
  });

  test("todos 전체 완료", () => {
    manager.addItem("밥 먹기");
    manager.addItem("산책");
    manager.completeAll();
    const state = manager.getState();
    expect(state.todos.every((t) => t.completed)).toBe(true);
  });

  test("todos 전체 완료 취소", () => {
    manager.addItem("밥 먹기");
    manager.addItem("산책");
    manager.toggleItemCompleted(0);
    manager.clearCompleted();
    const state = manager.getState();
    expect(state.todos.every((t) => t.completed)).toBe(false);
  });

  test("필터 적용", () => {
    manager.changeFilter("산책");
    const state = manager.getState();
    expect(state.currentFilter).toBe("산책");
  });
});
