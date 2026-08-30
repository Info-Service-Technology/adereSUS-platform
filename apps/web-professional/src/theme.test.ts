import { adereSUSTheme } from "./theme";

describe("adereSUSTheme", () => {
  it("mantém as cores institucionais do AdereSUS", () => {
    expect(adereSUSTheme.palette.primary.main).toBe("#0056b3");
    expect(adereSUSTheme.palette.secondary.main).toBe("#198754");
    expect(adereSUSTheme.palette.error.main).toBe("#dc3545");
    expect(adereSUSTheme.palette.background.default).toBe("#f6f8fb");
  });

  it("mantém os padrões de acessibilidade dos componentes", () => {
    expect(adereSUSTheme.shape.borderRadius).toBe(12);
    expect(
      adereSUSTheme.components?.MuiButton?.defaultProps?.disableElevation,
    ).toBe(true);
    expect(
      adereSUSTheme.components?.MuiTextField?.defaultProps?.fullWidth,
    ).toBe(true);
  });
});
