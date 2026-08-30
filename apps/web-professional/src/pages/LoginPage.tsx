import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import { Brand } from "../components/Brand";

export function LoginPage() {
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
      <Stack
        spacing={4}
        sx={{
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

          <Typography component="h1" variant="h2" sx={{ fontSize: { xs: "2.75rem", sm: "3.75rem" }, lineHeight: 1.1 }}>
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
            <Typography component="h2" variant="h5">
              Acesso profissional
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.6 }}>
              Entre com suas credenciais institucionais para acessar o
              AdereSUS.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
