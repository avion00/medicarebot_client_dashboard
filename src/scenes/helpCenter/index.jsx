// src/pages/HelpCenter.js
import { Box, useTheme, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import faqData from "../../data/faqData"; // Assuming you have faq data in this file

const HelpCenter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header
        title="Help Center"
        subtitle="Find answers to your questions and get support"
      />

      {/* Search Bar */}
      <Box mb="20px">
        <TextField
          label="Search for help"
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: colors.primary[500],
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
        <Button variant="contained" sx={{ marginTop: "10px" }}>
          Search
        </Button>
      </Box>

      {/* Categories Section */}
      <Box mb="40px">
        <Typography variant="h6" color={colors.greenAccent[500]} mb="10px">
          Popular Categories
        </Typography>
        <Box display="flex" gap="20px">
          <Button variant="outlined">Account & Login</Button>
          <Button variant="outlined">Billing & Payments</Button>
          <Button variant="outlined">Technical Support</Button>
          <Button variant="outlined">Product FAQs</Button>
        </Box>
      </Box>

      {/* FAQ Section */}
      <Box mb="40px">
        <Typography variant="h6" color={colors.greenAccent[500]} mb="10px">
          Frequently Asked Questions
        </Typography>

        {/* Display FAQ data dynamically */}
        {faqData.map((item, index) => (
          <Accordion key={index} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Contact Support Section */}
      <Box mb="40px">
        <Typography variant="h6" color={colors.greenAccent[500]} mb="10px">
          Need Further Assistance?
        </Typography>
        <Typography variant="body1" mb="10px">
          If you're still having trouble, our support team is here to help.
          Please reach out to us using the information below:
        </Typography>
        <Box>
          <Typography variant="body1">
            Email: <strong>support@yourdomain.com</strong>
          </Typography>
          <Typography variant="body1">
            Phone: <strong>+1 (123) 456-7890</strong>
          </Typography>
        </Box>
      </Box>

      {/* Guides and Tutorials Section */}
      <Box>
        <Typography variant="h6" color={colors.greenAccent[500]} mb="10px">
          Guides & Tutorials
        </Typography>
        <Box display="flex" gap="20px">
          <Button variant="outlined">User Guide</Button>
          <Button variant="outlined">Troubleshooting</Button>
          <Button variant="outlined">Video Tutorials</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HelpCenter;
