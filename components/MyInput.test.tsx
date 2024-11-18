import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MyInput from "./MyInput";

describe("MyInput", () => {
  it("should render correctly", () => {
    // MyInput 컴포넌트를 렌더링합니다.
    // wrapper.unmount() 함수를 호출해도 에러가 발생하지 않는지 확인합니다.
    const { unmount } = render(<MyInput />);
    unmount();
  });

  it("should clear the value and onClear is triggered", async () => {
    // 필요하다면 jest mock 함수나 ref를 생성합니다.
    // MyInput 컴포넌트를 렌더링합니다.
    // clearButton을 클릭합니다.
    // input 요소의 값이 ""인지 확인합니다.
    // onClear 함수가 한 번 호출되었는지 확인합니다.
    const onClearMock = jest.fn();
    render(<MyInput isClearable onClear={onClearMock} />);

    // input은 role="textbox"로 간주된다.
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "test" } });

    const clearButton = await waitFor(() =>
      screen.getByRole("button", { name: /clear input/i })
    );
    fireEvent.click(clearButton);

    // waitFor 테스트에서 비동기적인 상태나 이벤트가 발생하는 것을 기다릴 때 사용
    await waitFor(() => {
      expect(inputElement).toHaveValue("");
    });
    await waitFor(() => {
      expect(onClearMock).toHaveBeenCalledTimes(1);
    });
  });
});
