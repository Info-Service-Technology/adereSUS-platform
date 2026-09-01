import { validateLogin } from "./login-validation";

describe("validateLogin", () => {
  it("exige todos os campos", () => {
    expect(
      validateLogin({
        organization: "",
        email: "",
        password: "",
      }),
    ).toEqual({
      organization: "Informe a organização.",
      email: "Informe o e-mail de acesso.",
      password: "Informe a senha.",
    });
  });

  it("rejeita e-mail com formato inválido", () => {
    expect(
      validateLogin({
        organization: "hospital-central",
        email: "profissional@instituicao",
        password: "senha",
      }),
    ).toEqual({
      email: "Informe um e-mail válido.",
    });
  });

  it("ignora espaços externos na organização e no e-mail", () => {
    expect(
      validateLogin({
        organization: " hospital-central ",
        email: " profissional@clinica.com.br ",
        password: "senha",
      }),
    ).toEqual({});
  });

  it("aceita credenciais preenchidas corretamente", () => {
    expect(
      validateLogin({
        organization: "hospital-central",
        email: "profissional@clinica.com.br",
        password: "senha",
      }),
    ).toEqual({});
  });
});
