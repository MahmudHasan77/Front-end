import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ProductRating = ({ rating, className }) => {
  return (
    <Stack spacing={1}>
      <Rating
        name="size-small"
        sx={{ className }}
        value={rating}
        size="small"
        readOnly
      />
    </Stack>
  );
};

export default ProductRating;