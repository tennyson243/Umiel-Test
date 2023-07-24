import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { useLocation, useNavigate } from "react-router-dom";
import EnTete from "../Components/EnTete";
import { Stack } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";

const Login = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, motdepasse));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <EnTete title='Connexion' />
      <Container className='small-container'>
        <Helmet>
          <title>Connectez-Vous</title>
        </Helmet>

        <Grid>
          <form onSubmit={submitHandler}>
            <Box
              padding='20px'
              height='70vh'
              width='300px'
              margin='20px auto'
              backgroundColor={theme.palette.background.alt}
              border='4px solid'
              borderColor={theme.palette.primary.main}
            >
              <Grid align='center'>
                <Avatar style={avatarStyle}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
                <h2>Connexion</h2>
              </Grid>
              {loading && <Chargement />}
              {error && <MessageBox variant='error'>{error}</MessageBox>}
              <Stack spacing={2}>
                <TextField
                  label='Email'
                  placeholder='Entrer votre Email'
                  fullWidth
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label='Mot de passe'
                  placeholder='Entrer votre mot de passe'
                  type='password'
                  fullWidth
                  required
                  onChange={(e) => setMotdepasse(e.target.value)}
                />
              </Stack>

              <FormControlLabel
                control={<Checkbox name='checkedB' color='primary' />}
                label='Se rappeler de moi'
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={btnstyle}
                fullWidth
              >
                Connexion
              </Button>
              <Typography color={theme.palette.secondary.main}>
                Mot de passe oublier?
              </Typography>
              <Typography>
                {" "}
                Nouveau Utilisateur?{" "}
                <Button
                  variant='Text'
                  onClick={() => navigate(`/signup?redirect=${redirect}`)}
                  fullWidth
                >
                  Creer un Compte
                </Button>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
