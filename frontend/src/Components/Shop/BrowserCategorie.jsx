import { ChevronRight } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logger from "use-reducer-logger";
import { getError } from "../../../geterro";
import Chargement from "../../Chargement/Chargement";
import MessageBox from "../../MessageBox/MessageBox";
import { listProductCategories } from "../../../actions/productActions";
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, Categories: action.payload, loading: false };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

const BrowserCategorie = () => {
  const dispatch = useDispatch();
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <>
      <Box>
        <Box>
          <Box
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.secondary.main}
            font-size='16px'
            font-weight=' normal'
            letter-spacing='1px'
            padding='15px 15px 15px 50px'
            position='relative'
            text-transform='uppercase'
            transition='all 0.3s ease 0s'
          >
            <Typography variant='h6'>Browse Categories</Typography>
          </Box>
          <Box
            border='1px solid rgba(129, 129, 129, 0.2)'
            width='100%'
            z-index='99'
            backgroundColor={theme.palette.background.alt}
          >
            <List>
              {loadingCategories ? (
                <Chargement />
              ) : errorCategories ? (
                <MessageBox variant='error'>{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <ListItem disablePadding key={c}>
                    <ListItemButton
                      onClick={() => navigate(`/search/category/${c}`)}
                    >
                      <ListItemText primary={c} />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BrowserCategorie;
