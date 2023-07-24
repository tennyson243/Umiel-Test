import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { populaireSearch } from "../../actions/Blog/populaireAction";

const SearchBlogScreen = () => {
  const { title = "all", catgeory = "all", pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const populaireListSearch = useSelector((state) => state.populaireListSearch);
  const { loading, error, populaires } = populaireListSearch;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      populaireSearch({
        pageNumber,
        title: title !== "all" ? title : "",
        catgeory: catgeory !== "all" ? catgeory : "",
      })
    );
  }, [dispatch, catgeory, title, pageNumber]);

  console.log(populaires);

  return <div>SearchBlogScreen</div>;
};

export default SearchBlogScreen;
