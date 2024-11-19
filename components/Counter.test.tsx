//https://github.com/codeit-bootcamp-frontend/FE-ADV-Practice/blob/28a9c6da95972ecec6b99153c53b6801fae7506a/components/Counter.test.jsx
import * as React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("컴포넌트가 렌더링 된다", () => {
    const { unmount } = render(<Counter />);
    // 컴포넌트가 정상적으로 렌더링되고 언마운트된다.
    expect(() => unmount()).not.toThrow();
  });

  it("체크박스 체크 시 document title 숫자가 1증가한다.", async () => {
    const { getByRole, getByText } = render(<Counter />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).not.toBeNull();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const incrementButton = getByText("Increment");
    fireEvent.click(incrementButton);

    await waitFor(() => {
      expect(document.title).toBe("Total number of clicks: 1");
    });
  });

  it("체크박스 해제 시 document title은 기본값이다.", async () => {
    const { getByRole } = render(<Counter />);
    const initialTitleRef = document.title;

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    await waitFor(() => {
      expect(document.title).toBe(initialTitleRef);
    });
  });

  it("Increment버튼을 클릭하면 카운트가 증가한다", () => {
    // getByText 일반적으로 사용하는 방법
    // getByTestId는 최후의 수단으로 사용해야 한다.
    const { getByText, getByTestId } = render(<Counter />);

    const incrementButton = getByText("Increment");

    const countSpan = getByTestId("count");
    expect(countSpan).toHaveTextContent("Clicked 0 times");

    fireEvent.click(incrementButton);
    expect(countSpan).toHaveTextContent("Clicked 1 time");

    fireEvent.click(incrementButton);
    expect(countSpan).toHaveTextContent("Clicked 2 times");
  });
});
