import { render, screen } from "@testing-library/react";

import { App } from "./App";

describe("App", () => {
  it("apresenta a estrutura do acesso profissional", () => {
    render(<App />);

    expect(
      screen.getByRole("img", { name: "AdereSUS" }),
    ).toBeTruthy();

    expect(
      screen.getByRole("heading", { name: "Cuidado que continua." }),
    ).toBeTruthy();

    expect(
      screen.getByRole("heading", { name: "Acesso profissional" }),
    ).toBeTruthy();

    expect(
      screen.getByText(
        "Acompanhamento digital para aumentar a adesão ao cuidado após a consulta.",
      ),
    ).toBeTruthy();
  });
});
