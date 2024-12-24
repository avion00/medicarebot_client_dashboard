import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const ViewProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Mock data for profile information
  const profileData = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    phoneNumber: "+1 234-567-890",
    companyName: "Doe Enterprises",
    city: "New York",
    state: "NY",
    country: "USA",
    botUsage: "Personal Use",
  };

  return (
    <Box m="20px">
      <Header title="VIEW PROFILE" subtitle="Your Profile Details" />

      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": {
            gridColumn: "span 4",
          },
        }}
      >
        {Object.entries(profileData).map(([label, value], index) => (
          <Box
            key={index}
            sx={{
              gridColumn: index < 2 ? "span 2" : "span 4",
              borderBottom: `1px solid ${colors.grey[700]}`,
              padding: "10px 0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: colors.blueAccent[500],
                fontWeight: "bold",
                mb: "5px",
              }}
            >
              {label
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.primary[100],
              }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ViewProfile;
