import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdminOrSuperAdmin, isAuth } from "../util.js";
import Contact from "../models/contactModel.js";

const contactRouter = express.Router();

contactRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const contact = new Contact({
      object: req.body.object,
      email: req.body.email,
      telephone: req.body.telephone,
      refcommande: req.body.refcommande,
      fichier: req.body.fichier,
      message: req.body.message,
    });
    const createdContact = await contact.save();
    res
      .status(201)
      .send({ message: "Message Envoyer", contact: createdContact });
  })
);

contactRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      contact.object = req.body.nom || contact.object;
      contact.email = req.body.email || contact.email;
      contact.telephone = req.body.telephone || contact.telephone;
      contact.refcommande = req.body.refcommande || contact.refcommande;
      contact.fichier = req.body.fichier || contact.fichier;
      contact.message = req.body.message || contact.message;
      contact.statut = Boolean(req.body.statut);
      const updatedContact = await contact.save();
      res.send({ message: "Message Mise a jour", contact: updatedContact });
    } else {
      res.status(404).send({ message: "Message No Trouver" });
    }
  })
);
contactRouter.get(
  "/list",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts);
  })
);

contactRouter.get(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      res.send(contact);
    } else {
      res.status(404).send({ message: "Message non trouvee" });
    }
  })
);

contactRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      const deleteContact = await contact.remove();
      res.send({ message: "Message Supprimer", contact: deleteContact });
    } else {
      res.status(404).send({ message: "Message non trouve" });
    }
  })
);

export default contactRouter;
