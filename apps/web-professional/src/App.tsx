import { Box, Container, Typography } from "@mui/material";

import { Brand } from "./components/Brand";

export function App() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        <Brand />

        <Typography component="h1" variant="h3" sx={{ mt: 5 }}>
          Cuidado que continua.
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 2, maxWidth: 600, fontSize: "1.125rem" }}
        >
          Acompanhamento digital para aumentar a adesão ao cuidado após a
          consulta.
        </Typography>
      </Container>
    </Box>
  );
}
