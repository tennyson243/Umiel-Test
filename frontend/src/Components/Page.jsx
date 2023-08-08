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
import LayoutSuperAdmin from "./Dashboard/SuperAdminDash/LayoutSuperAdmin";
import SuperAdminRouter from "./SuperAdminRouter";
import AdminProductScreen from "../screen/Dashboard/AdminDashScreen/AdminProductScreen";
import AdminModifierProductScreen from "../screen/Dashboard/AdminDashScreen/AdminModifierProductScreen";
import AdminContactListScreen from "../screen/Dashboard/AdminDashScreen/AdminContactListScreen";
import AdminModifierContactScreen from "../screen/Dashboard/AdminDashScreen/AdminModifierContactScreen";
import AdminRemedesList from "../screen/Dashboard/AdminDashScreen/AdminRemedesList";
import AdminModifierRemede from "../screen/Dashboard/AdminDashScreen/AdminModifierRemede";
import AdminNutritionList from "../screen/Dashboard/AdminDashScreen/AdminNutritionList";
import AdminModifierNutrition from "../screen/Dashboard/AdminDashScreen/AdminModifierNutrition";
import AdminSanteList from "../screen/Dashboard/AdminDashScreen/AdminSanteList";
import AdminModifierSante from "../screen/Dashboard/AdminDashScreen/AdminModifierSante";
import AdminApitherapieList from "../screen/Dashboard/AdminDashScreen/AdminApitherapieList";
import AdminModifierApitherapie from "../screen/Dashboard/AdminDashScreen/AdminModifierApitherapie";
import AdminBaniereList from "../screen/Dashboard/AdminDashScreen/AdminBaniereList";
import AdmainModifierBanner from "../screen/Dashboard/AdminDashScreen/AdmainModifierBanner";
import AdminTikTokList from "../screen/Dashboard/AdminDashScreen/AdminTikTokList";
import AdminModifierTiktok from "../screen/Dashboard/AdminDashScreen/AdminModifierTiktok";
import AdminGalerieList from "../screen/Dashboard/AdminDashScreen/AdminGalerieList";
import AdminModifierGalerie from "../screen/Dashboard/AdminDashScreen/AdminModifierGalerie";

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

          {/* Daheboard Utilisateurs */}
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
          {/* DashboardAdmin */}
          <Route element={<Layout />}>
            <Route
              path="/dashboards"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/Produit"
              element={
                <AdminRoute>
                  <ListProduitsScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Transaction"
              element={
                <AdminRoute>
                  <Transaction />
                </AdminRoute>
              }
            />
            <Route
              path="/Localisations"
              element={
                <AdminRoute>
                  <GeographyDash />
                </AdminRoute>
              }
            />
            <Route
              path="/Détail"
              element={
                <AdminRoute>
                  <BreakdownScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/Aperçus"
              element={
                <AdminRoute>
                  <OverVieuw />
                </AdminRoute>
              }
            />
            <Route
              path="/Journalieres"
              element={
                <AdminRoute>
                  <VentesScren />
                </AdminRoute>
              }
            />
            <Route
              path="/Mensuelles"
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
                  <AdminProductScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/product/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierProductScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/commande"
              element={
                <AdminRoute>
                  <CommandeList />
                </AdminRoute>
              }
            />
            <Route
              path="/Assistances"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/Contact"
              element={
                <AdminRoute>
                  <AdminContactListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/contact/:id"
              element={
                <AdminRoute>
                  <AdminModifierContactScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/Remedes"
              element={
                <AdminRoute>
                  <AdminRemedesList />
                </AdminRoute>
              }
            />
            <Route
              path="/remedes/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierRemede />
                </AdminRoute>
              }
            />
            <Route
              path="/Nutrition"
              element={
                <AdminRoute>
                  <AdminNutritionList />
                </AdminRoute>
              }
            />
            <Route
              path="/nutritions/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierNutrition />
                </AdminRoute>
              }
            />
            <Route
              path="/Santés"
              element={
                <AdminRoute>
                  <AdminSanteList />
                </AdminRoute>
              }
            />
            <Route
              path="/Santés/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierSante />
                </AdminRoute>
              }
            />
            <Route
              path="/apitherapie"
              element={
                <AdminRoute>
                  <AdminApitherapieList />
                </AdminRoute>
              }
            />
            <Route
              path="/apitherapie/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierApitherapie />
                </AdminRoute>
              }
            />
            <Route
              path="/Banieres"
              element={
                <AdminRoute>
                  <AdminBaniereList />
                </AdminRoute>
              }
            />
            <Route
              path="/TikToks"
              element={
                <AdminRoute>
                  <AdminTikTokList />
                </AdminRoute>
              }
            />
            <Route
              path="/tiktoks/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierTiktok />
                </AdminRoute>
              }
            />
            <Route
              path="/Galeries"
              element={
                <AdminRoute>
                  <AdminGalerieList />
                </AdminRoute>
              }
            />
            <Route
              path="/galeries/:id/edit"
              element={
                <AdminRoute>
                  <AdminModifierGalerie />
                </AdminRoute>
              }
            />
            <Route
              path="/banieres/:id/edit"
              element={
                <AdminRoute>
                  <AdmainModifierBanner />
                </AdminRoute>
              }
            />
          </Route>
          {/* Dashboard SuperAdmin */}
          <Route element={<LayoutSuperAdmin />}>
            <Route
              path="/dashboard"
              element={
                <SuperAdminRouter>
                  <Dashboard />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Admins"
              element={
                <SuperAdminRouter>
                  <AdmisListScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Produits"
              element={
                <SuperAdminRouter>
                  <ListProduitsScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Utilisateurs"
              element={
                <SuperAdminRouter>
                  <CustomerEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Transactions"
              element={
                <SuperAdminRouter>
                  <Transaction />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Localisation"
              element={
                <SuperAdminRouter>
                  <GeographyDash />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Détails"
              element={
                <SuperAdminRouter>
                  <BreakdownScreen />
                </SuperAdminRouter>
              }
            />

            <Route
              path="/Aperçu"
              element={
                <SuperAdminRouter>
                  <OverVieuw />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Journaliere"
              element={
                <SuperAdminRouter>
                  <VentesScren />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Mensuelle"
              element={
                <SuperAdminRouter>
                  <MonthlyScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/productlist"
              element={
                <SuperAdminRouter>
                  <ListProduitsScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/produits/:id/edit"
              element={
                <SuperAdminRouter>
                  <ModifierProductScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/commandes"
              element={
                <SuperAdminRouter>
                  <CommandeList />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Assistance"
              element={
                <SuperAdminRouter>
                  <SupportScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Contacts"
              element={
                <SuperAdminRouter>
                  <ContactListScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <SuperAdminRouter>
                  <ContactEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/userlist"
              element={
                <SuperAdminRouter>
                  <UserListScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <SuperAdminRouter>
                  <UserEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Remedes"
              element={
                <SuperAdminRouter>
                  <HeroDashScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/heros/:id/edit"
              element={
                <SuperAdminRouter>
                  <HeroEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Nutritions"
              element={
                <SuperAdminRouter>
                  <PopulaireDashScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/populaire/:id/edit"
              element={
                <SuperAdminRouter>
                  <PopulaireEditScreeen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Santé"
              element={
                <SuperAdminRouter>
                  <LifestyleDashScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/lifestyles/:id/edit"
              element={
                <SuperAdminRouter>
                  <LifestyleEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/apitherapie"
              element={
                <SuperAdminRouter>
                  <ApitherapieDashScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/apitherapies/:id/edit"
              element={
                <SuperAdminRouter>
                  <ApitherapieEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Baniere"
              element={
                <SuperAdminRouter>
                  <BannerListScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/TikTok"
              element={
                <SuperAdminRouter>
                  <TikTokListScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/tiktoks/:id/edit"
              element={
                <SuperAdminRouter>
                  <TikTokEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/Galerie"
              element={
                <SuperAdminRouter>
                  <GalerieListScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/galeries/:id/edit"
              element={
                <SuperAdminRouter>
                  <GalerieEditScreen />
                </SuperAdminRouter>
              }
            />
            <Route
              path="/banners/:id/edit"
              element={
                <SuperAdminRouter>
                  <BannerEditScreen />
                </SuperAdminRouter>
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
