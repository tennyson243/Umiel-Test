import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser, listUsers } from "../../actions/userActions";
import Chargement from "../../Components/Chargement";
import EnTete from "../../Components/EnTete";
import FlexBetween from "../../Components/FlexBetween";
import MessageBox from "../../Components/MessageBox";
import { USER_DETAILS_RESET } from "../../constants/userConstants";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>,
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const UserListScreen = () => {
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const theme = useTheme();
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (utilisateur) => {
    dispatch(deleteUser(utilisateur));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Liste d'Utilisateurs</title>
      </Helmet>
      <EnTete title='Liste des Utilisateurs' />
      <Box width='90%' m='100px auto'>
        {loadingDelete && <Chargement />}
        {errorDelete && (
          <>
            <MessageBox severity='error'>{errorDelete}</MessageBox>
            {toast.error(errorDelete)}
          </>
        )}
        {successDelete && (
          <>
            <MessageBox severity='success'>
              Utilisateur Supprimer avec Success
            </MessageBox>
            {toast.info(" Utilisateur Supprimer avec Success")}
          </>
        )}
        {loading ? (
          <Chargement />
        ) : error ? (
          <>
            <MessageBox variant='error'>{error}</MessageBox>
            {toast.error(error)}
          </>
        ) : (
          <Box>
            <TableContainer overflowX='auto' minHeight='0.01%'>
              <Table
                background='#fff none repeat scroll 0 0'
                borderColor='#c1c1c1'
                borderRadius='0'
                borderStyle='solid'
                borderWidth='1px 0 0 1px'
                margin=' 0 0 50px'
                textAlign='center'
                width='100%'
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderTop: "medium none",
                        fontWeight: "bold",
                        padding: "20px 10px",
                        textAlign: " center",
                        textTransform: "uppercase",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #c1c1c1",
                        borderRight: " 1px solid #c1c1c1",
                        background: `${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <TableCell>ID</TableCell>
                    <TableCell>NOM</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>C'EST UN VANDEUR?</TableCell>
                    <TableCell>C'EST UN ADMIN?</TableCell>
                    <TableCell>C'EST UN INFLUENCEUR?</TableCell>
                    <TableCell>C'EST UN MEMBRE?</TableCell>
                    <TableCell>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((utilisateur) => (
                    <TableRow key={utilisateur._id}>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>{utilisateur._id}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>{utilisateur.nom}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {utilisateur.email}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {utilisateur.isSeller ? "OUI" : " NO"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {utilisateur.isAdmin ? "OUI" : "NO"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {utilisateur.isInfluenceur ? "OUI" : "NO"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {utilisateur.isMembreEquipe ? "OUI" : "NO"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        width='180px'
                        font-size='20px'
                        letter-spacing='6px'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Box>
                          <FlexBetween>
                            <Button
                              variant='contained'
                              color='success'
                              onClick={() =>
                                navigate(`/user/${utilisateur._id}/edit`)
                              }
                            >
                              Details
                            </Button>

                            <Button
                              variant='contained'
                              color='error'
                              onClick={handleClickOpen}
                            >
                              Supprimer
                            </Button>
                          </FlexBetween>

                          <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby='alert-dialog-slide-description'
                          >
                            <DialogTitle>
                              <Typography variant='h4'>
                                Confirmation de Suppression
                              </Typography>
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id='alert-dialog-slide-description'>
                                Vous etes sure de vouloir supprimer cette
                                commande???
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                variant='contained'
                                color='success'
                                onClick={handleClose}
                              >
                                Non
                              </Button>
                              <Button
                                variant='contained'
                                color='error'
                                onClick={() => deleteHandler(utilisateur._id)}
                              >
                                Oui
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserListScreen;
