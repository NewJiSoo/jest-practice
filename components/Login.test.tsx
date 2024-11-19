import Login from "./Login";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";

// axios를 모킹하여 네트워크 요청 없이 성공/실패 응답 시뮬레이션
jest.mock("axios");

const submitLoginForm = async (username: string, password: string) => {
  const usernameInput = screen.getByLabelText("Username");
  const passwordInput = screen.getByLabelText("Password");
  const button = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(button);

  expect(button).toHaveTextContent("Submit...");
};

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Mock 상태 초기화
    localStorage.clear(); // 로컬스토리지 초기화
  });

  it("Login컴포넌트를 렌더링 합니다", () => {
    const { unmount } = render(<Login />);
    expect(() => unmount()).not.toThrow();
  });

  it("로그인 폼 제출 시 로딩상태가 됩니다.", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "가짜토큰" },
    });

    render(<Login />);
    await submitLoginForm("testuser", "testpassword");
  });

  describe("로그인 성공 시", () => {
    beforeEach(() => {
      // mock을 이용한 가짜요청
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: { token: "짭토큰" },
      });
      render(<Login />);
    });

    it("성공 메세지를 표시합니다.", async () => {
      await submitLoginForm("testuser", "testpassword");

      // 성공 메시지가 표시될 때까지 기다림
      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Congrats! You're signed in!"
        );
      });
    });

    it("토큰을 로컬스토리에 저장합니다.", async () => {
      const fakeToken = "짭토큰";
      await submitLoginForm("testuser", "testpassword");

      await waitFor(() => {
        expect(localStorage.getItem("token")).toBe(fakeToken);
      });
    });
  });

  describe("로그인 실패 시", () => {
    beforeEach(() => {
      // mock을 이용한 가짜요청
      (axios.post as jest.Mock).mockRejectedValueOnce(new Error("에러"));
      render(<Login />);
    });

    it("에러 메시지를 표시합니다.", async () => {
      await submitLoginForm("testuser", "testpassword");

      // 에러 메시지가 표시될 때까지 기다림
      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent("에러");
      });
    });

    it("로컬스토리지에 토큰을 저장하지 않습니다.", async () => {
      await submitLoginForm("testuser", "testpassword");

      await waitFor(() => {
        expect(localStorage.getItem("token")).toBe(null);
      });
    });
  });
});
