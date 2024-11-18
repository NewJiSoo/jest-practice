// https://github.com/codeit-bootcamp-frontend/FE-ADV-Practice/blob/1d35618a8ff6bb8546e7fb89edd1507c94bb68a6/components/UpperInput.test.jsx
import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UpperInput from "./UpperInput";

describe("UpperInput", () => {
  test("초기 렌더링 시 input값은 빈 문자열이다.", async () => {
    render(<UpperInput />);
    const inputElement = screen.getByLabelText(/upper/i);
    // 초기값이 빈 문자열인지 확인
    expect(inputElement).toHaveValue("");
  });

  test("입력 값이 대문자로 변환된다", async () => {
    render(<UpperInput />);
    const inputElement = screen.getByLabelText(/upper/i);

    // 소문자 입력
    fireEvent.change(inputElement, { target: { value: "stuff" } });

    // 대문자로 변환되었는지 확인
    expect(inputElement).toHaveValue("STUFF");
  });
});
