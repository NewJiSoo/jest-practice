//https://github.com/codeit-bootcamp-frontend/FE-ADV-Practice/blob/d4a4603169fe66604a846a56bc0a5e2f01aed87b/components/Login.test.jsx

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
    localStorage.removeItem("token"); // 로컬스토리지 초기화
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

  describe("로그인 성공", () => {
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

  describe("로그인 실패", async () => {
    // 실패 조건 시나리오
    beforeEach(() => {
      // 특정 조건(잘못된 아이디/비밀번호)에 따라 에러를 발생
      (axios.post as jest.Mock).mockImplementation(
        async (_url, { username, password }) => {
          if (username !== "validUser") {
            throw new Error("Invalid username");
          }
          if (password !== "validPassword") {
            throw new Error("Invalid password");
          }
          return { data: { token: "짭토큰" } };
        }
      );

      render(<Login />);
    });

    it("아이디가 잘못된 경우 에러를 표시합니다.", async () => {
      await submitLoginForm("invalidUser", "validPassword");

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent("Invalid username");
        expect(localStorage.getItem("token")).toBe(null);
      });
    });

    it("비밀번호가 잘못된 경우 에러를 표시합니다.", async () => {
      await submitLoginForm("validUser", "invalidPassword");

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent("Invalid password");
        expect(localStorage.getItem("token")).toBe(null);
      });
    });

    it("로컬스토리지에 토큰을 저장하지 않습니다.", async () => {
      await submitLoginForm("validUser", "invalidPassword");

      await waitFor(() => {
        expect(localStorage.getItem("token")).toBe(null);
      });
    });
  });

  describe("서버 에러 발생", () => {
    beforeEach(() => {
      (axios.post as jest.Mock).mockRejectedValueOnce(
        new Error("Internal Server Error")
      );
      render(<Login />);
    });

    it("서버 에러 메시지를 표시합니다.", async () => {
      await submitLoginForm("validUser", "validPassword");

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Internal Server Error"
        );
        expect(localStorage.getItem("token")).toBe(null);
      });
    });

    it("로컬스토리지에 토큰을 저장하지 않습니다.", async () => {
      await submitLoginForm("validUser", "validPassword");

      await waitFor(() => {
        expect(localStorage.getItem("token")).toBe(null);
      });
    });
  });
});
