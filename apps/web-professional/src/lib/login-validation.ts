export interface LoginValues {
  organization: string;
  email: string;
  password: string;
}

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.organization.trim()) {
    errors.organization = "Informe a organização.";
  }

  if (!values.email.trim()) {
    errors.email = "Informe o e-mail de acesso.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!values.password) {
    errors.password = "Informe a senha.";
  }

  return errors;
}
