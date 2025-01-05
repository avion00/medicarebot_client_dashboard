import React from "react";
import {
  Box,
  useTheme,
  Button,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputBase,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import faqData from "../../data/faqData";

const ContactUs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Box m="20px">
      <Header title="CONTACT US" subtitle="Contact our support team for help" />
      <Box>
        {/* Search Bar */}
        <Box mb="40px" width="100%" display="flex" justifyContent="center">
          <Box
            display="flex"
            maxWidth="600px"
            flexGrow={1}
            sx={{
              width: "220px",
              padding: ".25em .75em",
              borderRadius: "25px",
              margin: ".5em .5em .5em 3em",
              backgroundColor: isFocused
                ? colors.primary[500]
                : colors.primary[400],
              border: `1px solid ${
                isFocused ? colors.grey[500] : colors.grey[700]
              }`,
              color: colors.grey[100],
              transition: "all .2s ease-in-out",
            }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search for help..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Categories Section */}
        <Box mb="40px" width="100%">
          <Typography
            variant="h4"
            fontWeight={600}
            color={colors.grey[100]}
            mb="20px"
          >
            Popular Categories
          </Typography>
          <Box display="flex" flexWrap="wrap" gap="20px">
            {[
              "Account & Login",
              "Billing & Payments",
              "Technical Support",
              "Product FAQs",
            ].map((category) => (
              <Button
                key={category}
                variant="contained"
                style={{
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  padding: "8px 24px",
                  borderRadius: "4px",
                  textTransform: "none",
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Contact Support Section */}
        <Card
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: colors.primary[600],
            color: "#fff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "40px",
          }}
        >
          <CardContent>
            <Typography variant="h6" mb="10px">
              Need Further Assistance?
            </Typography>
            <Typography variant="body1" mb="20px">
              If you're still having trouble, our support team is here to help.
              Please reach out to us using the information below:
            </Typography>
            <Typography variant="body1">
              Email: <strong>support@yourdomain.com</strong>
            </Typography>
            <Typography variant="body1">
              Phone: <strong>+1 (123) 456-7890</strong>
            </Typography>
          </CardContent>
        </Card>

        {/* Guides and Tutorials Section */}
        <Box mb="40px" width="100%">
          <Typography
            variant="h4"
            fontWeight={600}
            color={colors.grey[100]}
            mb="20px"
          >
            Guides & Tutorials
          </Typography>
          <Box display="flex" flexWrap="wrap" gap="20px">
            {["User Guide", "Troubleshooting", "Video Tutorials"].map(
              (guide) => (
                <Button
                  key={guide}
                  variant="contained"
                  style={{
                    background: "linear-gradient(45deg, #062994, #0E72E1)",
                    color: "#fff",
                    padding: "8px 24px",
                    borderRadius: "4px",
                    textTransform: "none",
                  }}
                >
                  {guide}
                </Button>
              )
            )}
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box width="100%" maxWidth="70%">
          <Typography
            variant="h4"
            fontWeight={600}
            color={colors.grey[100]}
            mb="20px"
          >
            Frequently Asked Questions
          </Typography>
          {faqData.map((item, index) => (
            <Accordion key={index} style={{ marginBottom: "10px" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h5"
                  fontSize={15}
                  style={{
                    color: colors.blueAccent[500],
                    fontWeight: "500",
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
