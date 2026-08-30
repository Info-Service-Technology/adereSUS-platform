import { fireEvent, render, screen } from "@testing-library/react";

import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("apresenta os campos institucionais de acesso", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/Instituição/)).toBeTruthy();
    expect(screen.getByLabelText(/E-mail institucional/)).toBeTruthy();
    expect(screen.getByLabelText(/Senha/)).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Entrar no AdereSUS" }),
    ).toBeTruthy();
  });

  it("permite mostrar e ocultar a senha", () => {
    render(<LoginPage />);

    const password = screen.getByLabelText(/Senha/) as HTMLInputElement;

    expect(password.type).toBe("password");

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar senha" }),
    );

    expect(password.type).toBe("text");

    fireEvent.click(
      screen.getByRole("button", { name: "Ocultar senha" }),
    );

    expect(password.type).toBe("password");
  });

  it("mantém o formulário local enquanto a autenticação não está integrada", () => {
    render(<LoginPage />);

    const form = screen.getByRole("form", { name: "Acesso profissional" });
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form.dispatchEvent(submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
