import { Box } from "@mui/material";

interface BrandProps {
  maxWidth?: number | string;
}

export function Brand({ maxWidth = 360 }: BrandProps) {
  return (
    <Box
      component="img"
      src="/brand/adere-plus-site.png"
      alt="Adere+"
      sx={{
        display: "block",
        width: "100%",
        maxWidth,
        height: "auto",
      }}
    />
  );
}
