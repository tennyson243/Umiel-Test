import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreerCompte from "../screen/CreerCompte";
import Login from "../screen/Login";
import OrderScreen from "../screen/OrderScreen";
import Panier from "../screen/Panier";
import PasserCommandeScreen from "../screen/PasserCommandeScreen";
import PayementMethode from "../screen/PayementMethode";
import ProductScreen from "../screen/ProductScreen";
import ProfilScreen from "../screen/ProfilScreen";
import SearchScreen from "../screen/SearchScreen";
import ShippingAdressScreen from "../screen/ShippingAdressScreen";
import AppBar from "./AppBar/AppBar";
import Layout from "./Dashboard/Layout";
import Footer from "./Footer/Footer";
import ShopPage from "./Shop/ShopPage";
import ListProduitsScreen from "../screen/Dashboard/ListProduitsScreen";
import Dashboard from "../screen/Dashboard/Dashboard";
import ModifierProductScreen from "../screen/Dashboard/ModifierProductScreen";
import OrderHistoryScreen from "../screen/OrderHistoryScreen";
import AdminRoute from "../Components/AdminRoute";
import SellerRoute from "../Components/SellerRoute";
import UserListScreen from "../screen/Dashboard/UserListScreen";
import UserEditScreen from "../screen/Dashboard/UserEditScreen";
import LocalisationScreen from "../screen/LocalisationScreen";
import AboutScreen from "../screen/AboutScreen";
import WishListScreen from "../screen/WishListScreen";
import SupportScreen from "../screen/SupportScreen";
import Contacter from "../screen/Contacter";
import CommandeList from "../screen/Dashboard/CommandeList";
import Home from "./Home/Home";
import HomePage from "./Blog/Home/HomePage";
import HeroScreen from "../screen/Blog/HeroScreen";
import HeroDashScreen from "../screen/Dashboard/Blog/HeroDashScreen";
import HeroEditScreen from "../screen/Dashboard/Blog/HeroEditScreen";
import PopulaireScreen from "../screen/Blog/PopulaireScreen";
import PopulaireDashScreen from "../screen/Dashboard/Blog/PopulaireDashScreen";
import PopulaireEditScreeen from "../screen/Dashboard/Blog/PopulaireEditScreeen";
import LifestyleScrenn from "../screen/Blog/LifestyleScrenn";
import LifestyleDashScreen from "../screen/Dashboard/Blog/LifestyleDashScreen";
import LifestyleEditScreen from "../screen/Dashboard/Blog/LifestyleEditScreen";
import BlogSearchScreen from "../screen/BlogSearchScreen";
import BannerListScreen from "../screen/Dashboard/BannerListScreen";
import BannerEditScreen from "../screen/Dashboard/BannerEditScreen";
import ApitherapieScreen from "../screen/Blog/ApitherapieScreen";
import ApitherapieDashScreen from "../screen/Dashboard/Blog/ApitherapieDashScreen";
import ApitherapieEditScreen from "../screen/Dashboard/Blog/ApitherapieEditScreen";
import AdmisListScreen from "../screen/Dashboard/AdmisListScreen";
import CustomerEditScreen from "../screen/CustomerEditScreen";
import Transaction from "../screen/Dashboard/Transaction";
import GeographyDash from "../screen/Dashboard/GeographyDash";
import OverVieuw from "../screen/Dashboard/OverVieuw";
import VentesScren from "../screen/Dashboard/VentesScren";
import MonthlyScreen from "../screen/Dashboard/MonthlyScreen";
import BreakdownScreen from "../screen/Dashboard/BreakdownScreen";
import ContactListScreen from "../screen/Dashboard/ContactListScreen";
import ContactEditScreen from "../screen/Dashboard/ContactEditScreen";
import TikTokListScreen from "../screen/Dashboard/TikTokListScreen";
import TikTokEditScreen from "../screen/Dashboard/TikTokEditScreen";
import GalerieListScreen from "../screen/Dashboard/Blog/GalerieListScreen";
import GalerieEditScreen from "../screen/Dashboard/Blog/GalerieEditScreen";
import LayoutUser from "./Dashboard/UserDash/LayoutUser";
import PrivateRoute from "./PrivateRoute";

const Page = () => {
  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/historiqueAchat" element={<OrderHistoryScreen />} />
          <Route path="/Shop" element={<ShopPage />} />
          <Route path="/Panier" element={<Panier />} />
          <Route path="/Panier/:id" element={<Panier />} />
          <Route path="/wishlist/:id" element={<WishListScreen />} />
          <Route path="/wishlist" element={<WishListScreen />} />
          <Route path="/produits/:id" element={<ProductScreen />} exact />
          <Route path="/shipping" element={<ShippingAdressScreen />} />
          <Route path="/Signin" element={<Login />} />
          <Route path="/Signup" element={<CreerCompte />} />
          <Route path="/payment" element={<PayementMethode />} />
          <Route path="/placeorder" element={<PasserCommandeScreen />} />
          <Route path="/orders/:id" element={<OrderScreen />} />
          <Route path="/search/nom" element={<SearchScreen />} exact></Route>
          <Route path="/map" element={<LocalisationScreen />} />
          <Route path="/apropos" element={<AboutScreen />} />
          <Route path="/nous-contacter" element={<Contacter />} />
          <Route path="/blog" element={<HomePage />} />
          <Route path="/hero/:title" element={<HeroScreen />} />
          <Route path="/populaire/:title" element={<PopulaireScreen />} />
          <Route path="/lifestyle/:title" element={<LifestyleScrenn />} />
          <Route path="/apitherapie/:title" element={<ApitherapieScreen />} />

          <Route
            path="/search/nom/:nom"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route
            path="/search/category/:category/nom/:nom"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route
            path="/search/category/:category/nom/:nom/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            element={<SearchScreen />}
            exact
          ></Route>

          <Route
            path="/search/category/all/nom/all/min/0/max/:10/rating/0/order/newest"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route
            path="/blogsearch/title/:title"
            element={<BlogSearchScreen />}
            exact
          ></Route>
          <Route
            path="/blogsearch/catgeory/:catgeory"
            element={<BlogSearchScreen />}
            exact
          ></Route>
          <Route
            path="/blogsearch/catgeory/:catgeory/title/:title"
            element={<BlogSearchScreen />}
            exact
          ></Route>
          <Route
            path="/blogsearch/catgeory/:catgeory/title/:title/pageNumber/:pageNumber"
            element={<BlogSearchScreen />}
            exact
          ></Route>

          <Route element={<LayoutUser />}>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/Historique"
              element={
                <PrivateRoute>
                  <OrderHistoryScreen />
                </PrivateRoute>
              }
            />
          </Route>

          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/Admins"
              element={
                <AdminRoute>
                  <AdmisListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Produits"
              element={
                <AdminRoute>
                  <ListProduitsScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Utilisateurs"
              element={
                <AdminRoute>
                  <CustomerEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Transactions"
              element={
                <AdminRoute>
                  <Transaction />
                </AdminRoute>
              }
            />
            <Route
              path="/Localisation"
              element={
                <AdminRoute>
                  <GeographyDash />
                </AdminRoute>
              }
            />
            <Route
              path="/Détails"
              element={
                <AdminRoute>
                  <BreakdownScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/Aperçu"
              element={
                <AdminRoute>
                  <OverVieuw />
                </AdminRoute>
              }
            />
            <Route
              path="/Journaliere"
              element={
                <AdminRoute>
                  <VentesScren />
                </AdminRoute>
              }
            />
            <Route
              path="/Mensuelle"
              element={
                <AdminRoute>
                  <MonthlyScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ListProduitsScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/produits/:id/edit"
              element={
                <AdminRoute>
                  <ModifierProductScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/commandes"
              element={
                <AdminRoute>
                  <CommandeList />
                </AdminRoute>
              }
            />
            <Route
              path="/Assistance"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Contacts"
              element={
                <AdminRoute>
                  <ContactListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <AdminRoute>
                  <ContactEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Remedes"
              element={
                <AdminRoute>
                  <HeroDashScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/heros/:id/edit"
              element={
                <AdminRoute>
                  <HeroEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Nutritions"
              element={
                <AdminRoute>
                  <PopulaireDashScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/populaire/:id/edit"
              element={
                <AdminRoute>
                  <PopulaireEditScreeen />
                </AdminRoute>
              }
            />
            <Route
              path="/Santé"
              element={
                <AdminRoute>
                  <LifestyleDashScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/lifestyles/:id/edit"
              element={
                <AdminRoute>
                  <LifestyleEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/apitherapie"
              element={
                <AdminRoute>
                  <ApitherapieDashScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/apitherapies/:id/edit"
              element={
                <AdminRoute>
                  <ApitherapieEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Baniere"
              element={
                <AdminRoute>
                  <BannerListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/TikTok"
              element={
                <AdminRoute>
                  <TikTokListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/tiktoks/:id/edit"
              element={
                <AdminRoute>
                  <TikTokEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Galerie"
              element={
                <AdminRoute>
                  <GalerieListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/galeries/:id/edit"
              element={
                <AdminRoute>
                  <GalerieEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/banners/:id/edit"
              element={
                <AdminRoute>
                  <BannerEditScreen />
                </AdminRoute>
              }
            />
          </Route>

          <Route
            path="/productlist/seller"
            element={
              <SellerRoute>
                <ListProduitsScreen />
              </SellerRoute>
            }
          />
          <Route
            path="/orderlist/seller"
            element={
              <SellerRoute>
                <CommandeList />
              </SellerRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Page;
