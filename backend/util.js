import jwt from "jsonwebtoken";
import mg from "mailgun-js";

export const generateToken = (utilisateur) => {
  return jwt.sign(
    {
      _id: utilisateur._id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      telephone: utilisateur.telephone,
      photoURL: utilisateur.photoURL,
      isAdmin: utilisateur.isAdmin,
      isSeller: utilisateur.isSeller,
      isSuperAdmin: utilisateur.isSuperAdmin,
      isInfluenceur: utilisateur.isInfluenceur,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// export const isAuth = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length); // Bearer XXXXX
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         res.status(401).send({ message: "Token Invalide" });
//       } else {
//         req.utilisateur = decode;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({ message: "Absence du Token" });
//   }
// };

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.utilisateur = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

export const isAdminOrSuperAdmin = (req, res, next) => {
  if (
    req.utilisateur &&
    (req.utilisateur.isAdmin || req.utilisateur.isSuperAdmin)
  ) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/SuperAdmin Token" });
  }
};
export const isSeller = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};

export const isInfluenceur = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.isInfluenceur) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Influenceur Token" });
  }
};

export const isSuperAdmin = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.isSuperAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid SuperAdmin Token" });
  }
};

export const isSellerOrAdminOrSuperAdmin = (req, res, next) => {
  if (
    req.utilisateur &&
    (req.utilisateur.isSeller ||
      req.utilisateur.isAdmin ||
      req.utilisateur.isSuperAdmin)
  ) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller/SuperAdmin Token" });
  }
};

export const IsAdminOrInfluenceurOrSuperAdmin = (req, res, next) => {
  if (
    req.utilisateur &&
    (req.utilisateur.isAdmin ||
      req.utilisateur.isSuperAdmin ||
      req.utilisateur.isInfluenceur)
  ) {
    next();
  } else {
    res
      .status(401)
      .send({ message: "Invalid Admin/Influenceur/SuperAdmin Token" });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${order.utilisateur.nom},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.nom}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.prix.toFixed(2)}</td>
    </tr>
  `
    )
    .join("\n")}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};
