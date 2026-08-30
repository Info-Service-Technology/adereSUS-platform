import { render, screen } from "@testing-library/react";

import { App } from "./App";

describe("App", () => {
  it("apresenta a marca e a mensagem institucional", () => {
    render(<App />);

    expect(
      screen.getByRole("img", { name: "AdereSUS" }),
    ).toBeTruthy();

    expect(
      screen.getByRole("heading", { name: "Cuidado que continua." }),
    ).toBeTruthy();

    expect(
      screen.getByText(
        "Acompanhamento digital para aumentar a adesão ao cuidado após a consulta.",
      ),
    ).toBeTruthy();
  });
});
