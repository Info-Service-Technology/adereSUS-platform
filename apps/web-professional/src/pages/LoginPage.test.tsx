import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

import { login } from "../lib/auth-api";
import { LoginPage } from "./LoginPage";

vi.mock("../lib/auth-api", () => ({
  login: vi.fn(),
}));

const mockedLogin = vi.mocked(login);

beforeEach(() => {
  mockedLogin.mockReset();
});

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

  it("envia credenciais válidas para autenticação", async () => {
    mockedLogin.mockResolvedValue({
      user: {
        id: "professional-1",
        fullName: "Profissional Teste",
        email: "profissional@exemplo.org",
        organizationId: "organization-1",
        organizationName: "Instituição Teste",
        organizationSlug: "instituicao-teste",
        role: "organization_admin",
      },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Organização/), {
      target: { value: "instituicao-teste" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail de acesso/), {
      target: { value: "profissional@exemplo.org" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/), {
      target: { value: "senha-segura" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar no/ }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({
        organization: "instituicao-teste",
        email: "profissional@exemplo.org",
        password: "senha-segura",
      });
    });
  });

  it("indica autenticação em andamento e bloqueia novo envio", async () => {
    let resolveLogin!: () => void;

    mockedLogin.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = () =>
            resolve({
              user: {
                id: "professional-1",
                fullName: "Profissional Teste",
                email: "profissional@exemplo.org",
                organizationId: "organization-1",
                organizationName: "Instituição Teste",
                organizationSlug: "instituicao-teste",
                role: "organization_admin",
              },
            });
        }),
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Organização/), {
      target: { value: "instituicao-teste" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail de acesso/), {
      target: { value: "profissional@exemplo.org" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/), {
      target: { value: "senha-segura" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar no/ }));

    const submittingButton = await screen.findByRole("button", {
      name: "Entrando...",
    });

    expect(submittingButton).toHaveProperty("disabled", true);

    fireEvent.click(submittingButton);

    expect(mockedLogin).toHaveBeenCalledTimes(1);

    resolveLogin();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Entrar no Adere+" }),
      ).toBeTruthy();
    });
  });

  it("apresenta erro retornado pela autenticação", async () => {
    mockedLogin.mockRejectedValue(
      new Error("Credenciais inválidas"),
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Organização/), {
      target: { value: "instituicao-teste" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail de acesso/), {
      target: { value: "profissional@exemplo.org" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/), {
      target: { value: "senha-incorreta" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar no/ }));

    expect(
      await screen.findByText("Credenciais inválidas"),
    ).toBeTruthy();
  });
});
