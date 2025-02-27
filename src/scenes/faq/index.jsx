import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  InputBase,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import faqData from "../../data/faqData";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on the search query.
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Find Answers to Your Questions" />

      {/* Polished Search Box */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        sx={{
          maxWidth: "600px",
          mx: "auto",
          p: "0.5em 1em",
          borderRadius: "25px",
          background: "linear-gradient(45deg, #062994, #0E72E1)",
          boxShadow: `0px 4px 12px ${colors.grey[900]}`,
        }}
      >
        <IconButton sx={{ p: 1 }}>
          <SearchIcon sx={{ color: "#fff" }} />
        </IconButton>
        <InputBase
          placeholder="Search FAQs..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            ml: 1,
            color: "#fff",
          }}
        />
      </Box>

      {/* FAQ Accordions */}
      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((faq, index) => (
          <Accordion
            key={index}
            defaultExpanded={false}
            sx={{
              backgroundColor: colors.primary[500],
              color: colors.primary[100],
              mb: 2,
              borderRadius: "8px",
              "&:before": { display: "none" },
              boxShadow: `0px 4px 12px ${colors.grey[900]}`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0px 8px 16px ${colors.grey[900]}`,
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: colors.blueAccent[500] }} />
              }
              sx={{ padding: "0 16px" }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", color: colors.blueAccent[500] }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "16px" }}>
              <Typography variant="body1" sx={{ color: colors.primary[100] }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" sx={{ color: colors.grey[100] }}>
            No FAQs found matching your search.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FAQ;
