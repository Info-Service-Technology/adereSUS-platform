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
      organization: "Informe a instituição.",
      email: "Informe o e-mail institucional.",
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
      email: "Informe um e-mail institucional válido.",
    });
  });

  it("ignora espaços externos na instituição e no e-mail", () => {
    expect(
      validateLogin({
        organization: " hospital-central ",
        email: " profissional@instituicao.gov.br ",
        password: "senha",
      }),
    ).toEqual({});
  });

  it("aceita credenciais preenchidas corretamente", () => {
    expect(
      validateLogin({
        organization: "hospital-central",
        email: "profissional@instituicao.gov.br",
        password: "senha",
      }),
    ).toEqual({});
  });
});
