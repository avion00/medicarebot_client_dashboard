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
import LogIn from "./scenes/logIn/index";
import Register from "./scenes/register/index";
import ChangePassword from "./scenes/changePassword/index";
import ForgetPassword from "./scenes/forgetPassword/index";
import EditProfile from "./scenes/editProfile/index";
import ActiveBots from "./scenes/activeBots/index";
import ConfigureSettings from "./scenes/configureSettings/index";
import UpdateTraining from "./scenes/updateTraining/index";
import Deactivate from "./scenes/deactivateBots/index";
import Settings from "./scenes/settings/index";
import Interactions from "./scenes/interactions/index";
import Billing from "./scenes/billing/index";
import Reports from "./scenes/reports/index";
import AddBot from "./scenes/addBot/index";


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
    location.pathname === "/logIn";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuthPage ? (
          <div className="auth-page" style={{ height: "100vh" }}>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
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
                padding: isNonMobile ? "20px" : '20px 0',
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
                <Route path="/updateTraining" element={<UpdateTraining />} />
                <Route path="/deactivateBots" element={<Deactivate />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/interactions" element={<Interactions />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/addBot" element={<AddBot />} />
              </Routes>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
