import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import LogIn from "./scenes/auth/logIn/index";
import Register from "./scenes/auth/register/index";
import ChangePassword from "./scenes/auth/changePassword/index";
import ForgetPassword from "./scenes/auth/forgetPassword/index";
import OTP from "./scenes/auth/otp/index";
import NewPassword from "./scenes/auth/newPassword/index";
import EditProfile from "./scenes/editProfile/index";
import ActiveBots from "./scenes/activeBots/index";
import ConfigureSettings from "./scenes/configureSettings/index";
import TestBots from "./scenes/testBots/index";
import Deactivate from "./scenes/deactivateBots/index";
import TrainBots from "./scenes/trainBots/index";
import Billing from "./scenes/billing/index";
import Reports from "./scenes/reports/index";
import AddBot from "./scenes/addBot/index";
import AddPartners from "./scenes/addPartners/index";
import ViewPartners from "./scenes/viewPartners/index";
import EditPartners from "./scenes/editPartners/index";
import AllBots from "./scenes/allBots/index";
import ContactUs from "./scenes/contactUs/index";
import CustomerSupport from "./scenes/customerSupport/index";
import ViewProfile from "./scenes/viewProfile/index";
import ChatHistory from "./scenes/chatHistory/index";
import InteractionStats from "./scenes/InteractionStats";
import HumanHandoffs from "./scenes/humanHandoffs/index";
import BotIntegration from "./scenes/botIntegration/index";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const location = useLocation();

  // Determine if the current path is for authentication
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/forgetPassword" ||
    location.pathname === "/logIn" ||
    location.pathname === "/otp" ||
    location.pathname === "/newPassword";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuthPage ? (
          <div className="auth-page" style={{}}>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/newPassword" element={<NewPassword />} />

              <Route path="*" element={<Navigate to="/logIn" />} />
            </Routes>
          </div>
        ) : (
          <div
            className="app"
            style={{
              display: "flex",
            }}
          >
            <Sidebar isSidebar={isSidebar} />
            <main
              className="content"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: isNonMobile ? "20px" : "20px 0",
                marginLeft: isNonMobile ? "0" : "80px",
                position: "relative",
                transition: "margin-left 0.3s ease",
              }}
            >
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="*" element={<Navigate to="/logIn" />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/activeBots" element={<ActiveBots />} />
                <Route
                  path="/configureSettings"
                  element={<ConfigureSettings />}
                />
                <Route path="/testBots" element={<TestBots />} />
                <Route path="/deactivateBots" element={<Deactivate />} />
                <Route path="/trainBots" element={<TrainBots />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/addBot" element={<AddBot />} />
                <Route path="/allBots" element={<AllBots />} />
                <Route path="/addPartners" element={<AddPartners />} />
                <Route path="/editPartners" element={<EditPartners />} />
                <Route path="/viewPartners" element={<ViewPartners />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/customerSupport" element={<CustomerSupport />} />
                <Route path="/viewProfile" element={<ViewProfile />} />
                <Route
                  path="/interactionStats"
                  element={<InteractionStats />}
                />
                <Route path="/chatHistory" element={<ChatHistory />} />
                <Route path="/humanHandoffs" element={<HumanHandoffs />} />
                <Route path="/botIntegration" element={<BotIntegration />} />
              </Routes>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
