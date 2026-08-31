import { fireEvent, render, screen } from "@testing-library/react";

import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("apresenta os campos de acesso da organização", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/Organização/)).toBeTruthy();
    expect(screen.getByLabelText(/E-mail de acesso/)).toBeTruthy();
    expect(screen.getByLabelText(/Senha/)).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Entrar no/ }),
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

  it("apresenta os erros ao enviar campos vazios", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /Entrar no/ }));

    expect(screen.getByText("Informe a organização.")).toBeTruthy();
    expect(screen.getByText("Informe o e-mail de acesso.")).toBeTruthy();
    expect(screen.getByText("Informe a senha.")).toBeTruthy();
  });

  it("apresenta erro para e-mail inválido", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Organização/), {
      target: { value: "clinica-central" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail de acesso/), {
      target: { value: "profissional@dominio" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/), {
      target: { value: "senha-segura" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar no/ }));

    expect(screen.getByText("Informe um e-mail válido.")).toBeTruthy();
  });

  it("remove o erro de um campo quando ele é corrigido", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /Entrar no/ }));
    expect(screen.getByText("Informe a organização.")).toBeTruthy();

    fireEvent.change(screen.getByLabelText(/Organização/), {
      target: { value: "consultorio-particular" },
    });

    expect(screen.queryByText("Informe a organização.")).toBeNull();
  });
});
