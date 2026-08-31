import { Box } from "@mui/material";

export function CampaignPanel() {
  return (
    <Box
      sx={{
        display: { xs: "none", lg: "grid" },
        placeItems: "center",
        minWidth: 0,
        px: { lg: 3, xl: 5 },
        py: 5,
      }}
    >
      <Box
        component="img"
        src="/brand/aderesus-campaign-transparent.webp"
        alt="Visão do acompanhamento digital AdereSUS"
        sx={{
          display: "block",
          width: "100%",
          maxWidth: 980,
          height: "auto",
          objectFit: "contain",
          transform: "translateX(48px)",
        }}
      />
    </Box>
  );
}
