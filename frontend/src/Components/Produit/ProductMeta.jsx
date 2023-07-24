import { Rating, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ProductMetaWrapper } from "../Produit/ProduitStyle.js";
import StarIcon from "@mui/icons-material/Star";

const ProductMeta = ({ product, matches }) => {
  const theme = useTheme();
  return (
    <>
      <ProductMetaWrapper textAlign='center'>
        <Box
          backgroundColor={theme.palette.background.alt}
          width={matches ? "10rem" : "92%"}
        >
          <Typography variant={matches ? "h6" : "h5"} lineHeight={2}>
            {product.nom.slice(0, 18)}...
          </Typography>
          <Rating
            name='text-feedback'
            value={product.rating}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
            }
          />
          <Stack direction='row' justifyContent='center'>
            <Typography
              variant='h4'
              style={{
                textDecoration: "line-through",
                color: "red",
              }}
            >
              {product.solde} $
            </Typography>
            <Typography variant='h2'>{product.prix} $</Typography>
          </Stack>
        </Box>
      </ProductMetaWrapper>
    </>
  );
};

export default ProductMeta;
