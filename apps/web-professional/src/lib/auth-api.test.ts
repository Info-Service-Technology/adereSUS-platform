import { afterEach, describe, expect, it, vi } from "vitest";

import { login } from "./auth-api";

describe("login", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("envia as credenciais no contrato esperado pela API", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          user: {
            id: "professional-1",
            fullName: "Profissional Teste",
            email: "profissional@exemplo.org",
            organizationId: "organization-1",
            organizationName: "Instituição Teste",
            organizationSlug: "instituicao-teste",
            role: "organization_admin",
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await login({
      organization: "instituicao-teste",
      email: "profissional@exemplo.org",
      password: "senha-segura",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/auth/login",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizationSlug: "instituicao-teste",
          email: "profissional@exemplo.org",
          password: "senha-segura",
        }),
      }),
    );
  });

  it("retorna o usuário autenticado", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          user: {
            id: "professional-1",
            fullName: "Profissional Teste",
            email: "profissional@exemplo.org",
            organizationId: "organization-1",
            organizationName: "Instituição Teste",
            organizationSlug: "instituicao-teste",
            role: "organization_admin",
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await login({
      organization: "instituicao-teste",
      email: "profissional@exemplo.org",
      password: "senha-segura",
    });

    expect(result.user.organizationSlug).toBe("instituicao-teste");
    expect(result.user.role).toBe("organization_admin");
  });

  it("rejeita credenciais inválidas", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ detail: "Credenciais inválidas" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await expect(
      login({
        organization: "instituicao-teste",
        email: "profissional@exemplo.org",
        password: "senha-incorreta",
      }),
    ).rejects.toThrow("Credenciais inválidas");
  });
});
