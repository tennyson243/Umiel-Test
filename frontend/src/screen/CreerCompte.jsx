import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import EnTete from "../Components/EnTete";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import * as yup from "yup";
import { pawdRegExp, phoneRegExp } from "../utils";
import TextFields from "../Components/TextFields";
import { useForm } from "react-hook-form";
import CheckboxFields from "../Components/CheckboxFields";
import SelectFields from "../Components/SelectFields";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  nom: yup.string().required("le nom est obligatoire"),
  email: yup.string().required("Email obligatoire").email(),
  telephone: yup
    .string()
    .required("Le numero obligatoire")
    .matches(phoneRegExp, "Numero Invalide"),
  country: yup.string().required("Le pays obligatoire"),
  motdepasse: yup
    .string()
    .required("Le mot de passe obligatoire")
    .matches(
      pawdRegExp,
      "Doit Containir 8 Characters, Une Majuscule, Un Miniscule, Un Chiffre"
    ),
  confirMotdepasse: yup
    .string()
    .oneOf(
      [yup.ref("motdepasse"), null],
      "Le mot de passe de confirmation est different"
    ),
  privacy: yup
    .bool()
    .oneOf(
      [true],
      "Vous devez accepter les conditions et la politique d'utilisation de Umiel"
    ),
});

const CreerCompte = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      nom: "",
      email: "",
      country: "",
      telephone: "",
      motdepasse: "",
      confirMotdepasse: "",
      privacy: false,
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const theme = useTheme();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(register(data.nom, data.email, data.telephone, data.motdepasse));
  };

  return (
    <>
      <EnTete title="Creer un Compte" />

      <Helmet>
        <title>Connectez-Vous</title>
      </Helmet>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        padding="20px"
        sx={{
          width: {
            sm: "35rem",
          },
        }}
        margin="20px auto"
        backgroundColor={theme.palette.background.alt}
        border="4px solid"
        borderColor={theme.palette.primary.main}
      >
        {loading && <Chargement />}
        {error && <MessageBox severity="error">{error}</MessageBox>}
        <Stack spacing={2}>
          <TextFields
            errors={errors}
            control={control}
            name="nom"
            label="nom"
          />
          <TextFields
            errors={errors}
            control={control}
            name="email"
            label="Email"
          />
          <TextFields
            errors={errors}
            control={control}
            name="telephone"
            label="Numero de Telephone"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
              type: "number",
            }}
          />
          <SelectFields
            errors={errors}
            control={control}
            name="country"
            label="Pays"
          />
          <TextFields
            errors={errors}
            control={control}
            name="motdepasse"
            label="Mot de Passe"
            type="Password"
          />
          <TextFields
            errors={errors}
            control={control}
            name="confirMotdepasse"
            label="Confirmer votre mot de passe"
          />
          <MessageBox severity="warning">
            <CheckboxFields errors={errors} control={control} name="privacy" />
          </MessageBox>
        </Stack>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: "20px",
            p: "10px",
            mb: "20px",
          }}
        >
          Creer un Compte
        </Button>

        <Typography>Vous Avez un Compte?</Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            navigate(`/signin?redirect=${redirect}`);
          }}
          fullWidth
        >
          Connecter-vous
        </Button>
      </Box>
    </>
  );
};

export default CreerCompte;
