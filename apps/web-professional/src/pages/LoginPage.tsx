import { FormEvent, useState } from "react";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Brand } from "../components/Brand";
import { CampaignPanel } from "../components/CampaignPanel";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function preventSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(0, 1.1fr) minmax(420px, 0.9fr)",
        },
        gridTemplateRows: { xs: "auto auto", md: "1fr" },
        alignContent: { xs: "start", md: "stretch" },
        backgroundColor: "background.default",
        backgroundImage:
          "radial-gradient(circle at 92% 5%, rgba(25,135,84,.15), transparent 30%), radial-gradient(circle at 5% 95%, rgba(0,86,179,.10), transparent 35%)",
      }}
    >
      <CampaignPanel />

      <Stack
        spacing={4}
        sx={{
          display: { xs: "flex", lg: "none" },
          justifyContent: "center",
          px: { xs: 3, sm: 6, lg: 10 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Brand maxWidth={390} />

        <Box sx={{ maxWidth: 620 }}>
          <Chip
            label="Portal profissional"
            color="primary"
            variant="outlined"
            sx={{ mb: 3, fontWeight: 700 }}
          />

          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontSize: { xs: "2.75rem", sm: "3.75rem" },
              lineHeight: 1.1,
            }}
          >
            Cuidado que continua.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2, fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            Acompanhamento digital para aumentar a adesão ao cuidado após a
            consulta.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          px: { xs: 2, sm: 5 },
          py: { xs: 4, md: 8 },
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 460 }}>
          <CardContent
            sx={{
              p: { xs: 3, sm: 5 },
              "&:last-child": { pb: { xs: 3, sm: 5 } },
            }}
          >
            <Stack
              component="form"
              aria-label="Acesso profissional"
              spacing={2.5}
              noValidate
              onSubmit={preventSubmit}
            >
              <Box>
                <Typography component="h2" variant="h5">
                  Acesso profissional
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1.5, lineHeight: 1.6 }}
                >
                  Entre com suas credenciais de acesso para acessar o
                  AdereSUS.
                </Typography>
              </Box>

              <TextField
                id="login-organization"
                label="Organização"
                required
                autoComplete="organization"
                placeholder="Código da organização"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessRoundedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="login-email"
                label="E-mail de acesso"
                type="email"
                required
                autoComplete="username"
                placeholder="nome@exemplo.com.br"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineRoundedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="login-password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Digite sua senha"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          edge="end"
                          aria-label={
                            showPassword ? "Ocultar senha" : "Mostrar senha"
                          }
                          onClick={() =>
                            setShowPassword((currentValue) => !currentValue)
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button type="submit" variant="contained" size="large">
                Entrar no AdereSUS
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Precisa de acesso? Solicite o cadastro ao administrador responsável pela sua
                organização.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
