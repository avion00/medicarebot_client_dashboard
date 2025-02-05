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
import PrivateRoute from "./components/PrivateRoute";
import TestComponent from "./scenes/test/index";
import GmailChatHistory from "./scenes/gmailChatHistory/index";
import CallingPage from "./scenes/bot-call/index";

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
            {/* <Sidebar isSidebar={isSidebar} /> */}
            <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />

            <main
              className="content"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: isNonMobile ? "20px" : "20px 0",
                marginLeft: isNonMobile ? "0" : "0px",
                position: "relative",
                transition: "margin-left 0.3s ease",
              }}
            >
              <Topbar setIsSidebar={setIsSidebar} />

              <Routes>
                <Route path="*" element={<Navigate to="/logIn" />} />
                <Route
                  exact
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <PrivateRoute>
                      <Team />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contacts"
                  eelement={
                    <PrivateRoute>
                      <Contacts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/invoices"
                  element={
                    <PrivateRoute>
                      <Invoices />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/form"
                  element={
                    <PrivateRoute>
                      <Form />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bar"
                  element={
                    <PrivateRoute>
                      <Bar />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/pie"
                  element={
                    <PrivateRoute>
                      <Pie />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/line"
                  element={
                    <PrivateRoute>
                      <Line />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <PrivateRoute>
                      <FAQ />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <PrivateRoute>
                      <Calendar />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/geography"
                  element={
                    <PrivateRoute>
                      <Geography />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/changePassword"
                  element={
                    <PrivateRoute>
                      <ChangePassword />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/editProfile"
                  element={
                    <PrivateRoute>
                      <EditProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/activeBots"
                  element={
                    <PrivateRoute>
                      <ActiveBots />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/configureSettings"
                  element={
                    <PrivateRoute>
                      <ConfigureSettings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/testBots"
                  element={
                    <PrivateRoute>
                      <TestBots />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/deactivateBots"
                  element={
                    <PrivateRoute>
                      <Deactivate />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/trainBots"
                  element={
                    <PrivateRoute>
                      <TrainBots />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <PrivateRoute>
                      <Billing />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <PrivateRoute>
                      <Reports />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/addBot"
                  element={
                    <PrivateRoute>
                      <AddBot />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/allBots"
                  element={
                    <PrivateRoute>
                      <AllBots />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/addPartners"
                  element={
                    <PrivateRoute>
                      <AddPartners />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/editPartners/:id"
                  element={
                    <PrivateRoute>
                      <EditPartners />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/viewPartners"
                  element={
                    <PrivateRoute>
                      <ViewPartners />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contactUs"
                  element={
                    <PrivateRoute>
                      <ContactUs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/customerSupport"
                  element={
                    <PrivateRoute>
                      <CustomerSupport />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/viewProfile"
                  element={
                    <PrivateRoute>
                      <ViewProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/interactionStats"
                  element={
                    <PrivateRoute>
                      <InteractionStats />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chatHistory"
                  element={
                    <PrivateRoute>
                      <ChatHistory />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/humanHandoffs"
                  element={
                    <PrivateRoute>
                      <HumanHandoffs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/botIntegration"
                  element={
                    <PrivateRoute>
                      <BotIntegration />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/gmailChatHistory"
                  element={
                    <PrivateRoute>
                      <GmailChatHistory />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/testComponent"
                  element={
                    <PrivateRoute>
                      <TestComponent />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bot-call"
                  element={
                    <PrivateRoute>
                      <CallingPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
