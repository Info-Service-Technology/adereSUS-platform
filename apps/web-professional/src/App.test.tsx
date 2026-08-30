import { render, screen } from "@testing-library/react";

import { App } from "./App";

describe("App", () => {
  it("apresenta a identificação do portal profissional", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "AdereSUS" }),
    ).toBeTruthy();

    expect(
      screen.getByText("Portal profissional de acompanhamento do cuidado."),
    ).toBeTruthy();
  });
});
