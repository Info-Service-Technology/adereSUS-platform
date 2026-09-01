import type { LoginValues } from "./login-validation";

export interface AuthenticatedUser {
  id: string;
  fullName: string;
  email: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  role: string;
}

export interface SessionResponse {
  user: AuthenticatedUser;
}

interface ApiErrorResponse {
  detail?: string;
}

export async function login(
  values: LoginValues,
): Promise<SessionResponse> {
  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      organizationSlug: values.organization.trim(),
      email: values.email.trim(),
      password: values.password,
    }),
  });

  if (!response.ok) {
    let message = "Não foi possível realizar o acesso.";

    try {
      const error = (await response.json()) as ApiErrorResponse;

      if (error.detail) {
        message = error.detail;
      }
    } catch {
      // Mantém a mensagem genérica quando a API não retorna JSON válido.
    }

    throw new Error(message);
  }

  return response.json() as Promise<SessionResponse>;
}
