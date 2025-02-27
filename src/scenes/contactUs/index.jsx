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
  TextField,
  Grid,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import faqData from "../../data/faqData";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const ContactUs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Box m="20px">
      <Header title="CONTACT US" subtitle="We're here to help!" />

      {/* Search Bar */}
      <Box mb="40px" width="100%" display="flex" justifyContent="center">
        <Box
          display="flex"
          maxWidth="600px"
          flexGrow={1}
          sx={{
            width: "100%",
            padding: ".25em .75em",
            borderRadius: "25px",
            backgroundColor: isFocused
              ? colors.primary[500]
              : colors.primary[400],
            border: `1px solid ${
              isFocused ? colors.blueAccent[500] : colors.grey[700]
            }`,
            color: colors.grey[100],
            transition: "all .2s ease-in-out",
            boxShadow: isFocused
              ? `0 0 10px ${colors.blueAccent[500]}`
              : "none",
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
                background: `linear-gradient(45deg, ${colors.blueAccent[500]}, ${colors.greenAccent[500]})`,
                color: "#fff",
                padding: "8px 24px",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "500",
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Contact Support Section */}
      <Grid container spacing={4} mb="40px">
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Card
            style={{
              backgroundColor: colors.primary[600],
              color: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} mb="20px">
                Contact Us
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: colors.primary[400] }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: colors.primary[400] }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  sx={{ backgroundColor: colors.primary[400] }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    background: `linear-gradient(45deg, ${colors.blueAccent[500]}, ${colors.greenAccent[500]})`,
                    color: "#fff",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    marginTop: "20px",
                  }}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card
            style={{
              backgroundColor: colors.primary[600],
              color: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} mb="20px">
                Get in Touch
              </Typography>
              <Box display="flex" alignItems="center" mb="20px">
                <EmailIcon sx={{ mr: 2, color: colors.blueAccent[500] }} />
                <Typography variant="body1">
                  Email:{" "}
                  <Link href="mailto:support@yourdomain.com" color="inherit">
                    support@yourdomain.com
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb="20px">
                <PhoneIcon sx={{ mr: 2, color: colors.blueAccent[500] }} />
                <Typography variant="body1">
                  Phone:{" "}
                  <Link href="tel:+11234567890" color="inherit">
                    +1 (123) 456-7890
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb="20px">
                <LiveHelpIcon sx={{ mr: 2, color: colors.blueAccent[500] }} />
                <Typography variant="body1">
                  Live Chat:{" "}
                  <Link href="#" color="inherit">
                    Start Chat
                  </Link>
                </Typography>
              </Box>
              <Box mt="20px">
                <Typography variant="h6" mb="10px">
                  Follow Us
                </Typography>
                <Box display="flex" gap="10px">
                  <IconButton
                    component={Link}
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <FacebookIcon sx={{ color: colors.blueAccent[500] }} />
                  </IconButton>
                  <IconButton
                    component={Link}
                    href="https://twitter.com"
                    target="_blank"
                  >
                    <TwitterIcon sx={{ color: colors.blueAccent[500] }} />
                  </IconButton>
                  <IconButton
                    component={Link}
                    href="https://linkedin.com"
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: colors.blueAccent[500] }} />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Box width="100%">
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
  );
};

export default ContactUs;
