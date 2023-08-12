import http from "http";
import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import uploadRouter from "./routes/uploadRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import path from "path";
import partenariatRouter from "./routes/partenariatRoutes.js";
import contactRouter from "./routes/contactRouter.js";
import heroRouter from "./routes/Blog/heroRouter.js";
import discoveryRouter from "./routes/Blog/discoveryRouter.js";
import populaireRouter from "./routes/Blog/populaireRoutes.js";
import tiktokRouter from "./routes/Blog/tiktokpostRoutes.js";
import galerieRouter from "./routes/Blog/galerieRoutes.js";
import populairePostRouter from "./routes/Blog/populairePostRoutes.js";
import lifestyleRouter from "./routes/Blog/lifestyleRoutes.js";
import bannerRouter from "./routes/bannerRouter.js";
import apitherapieRouter from "./routes/Blog/apitherapieRoutes.js";
import transactionsRouter from "./routes/transactionRouter.js";
import generalRouter from "./routes/generalRouter.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion a la base de donnee Reussi"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/uploads", uploadRouter);
app.use("/api/produits", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/partenariat", partenariatRouter);
app.use("/api/hero", heroRouter);
app.use("/api/discovery", discoveryRouter);
app.use("/api/populaires", populaireRouter);
app.use("/api/tiktoks", tiktokRouter);
app.use("/api/galeries", galerieRouter);
app.use("/api/pposts", populairePostRouter);
app.use("/api/lifestyles", lifestyleRouter);
app.use("/api/apitherapies", apitherapieRouter);
app.use("/api/banners", bannerRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/generals", generalRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

app.get("/api/config/maplab", (req, res) => {
  res.send(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log("Online", user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Desolee. Je ne suis pas en ligne Maintenant",
        });
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`le server est connecter au http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`le server est connecter au http://localhost:${port}`);
// });
