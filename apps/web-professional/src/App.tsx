import { Box, Container, Typography } from "@mui/material";

export function App() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h3">
          AdereSUS
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Portal profissional de acompanhamento do cuidado.
        </Typography>
      </Container>
    </Box>
  );
}
