import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import ProgressCircle from "../../components/ProgressCircle";

const InteractionStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  return (
    <Box m="20px">
      <Box>
        <Header
          title="Interstaction Statistics"
          subtitle="You can View the statistics of the interaction between the user and the bot"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}

        <Box
          gridColumn={isNonMobile ? "span 8" : "span 12"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            px={3}
            py={2}
            color={colors.grey[100]}
          >
            Engagement Overview
          </Typography>
          <Box
            sx={{
              borderBottom: `2px groove ${colors.blueAccent[700]}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                px={3}
                py={1.25}
                pr={8}
                sx={{
                  width: "fit-content",
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "0 8px 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Total Interactions
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  352
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  // background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Today
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  33
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  // background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Weekly
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  45
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  // background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "8px 0 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Monthly
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  252
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box height="300px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h3" fontWeight="bold">
              Bot Deployed
            </Typography>
          </Box>
        </Box>

        {/* <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            Charts
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              432 Bots are deployed by the client
            </Typography>
            <Typography>43 client are joined</Typography>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default InteractionStats;
