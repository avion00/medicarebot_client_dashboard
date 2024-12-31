import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import ProgressCircle from "../../components/ProgressCircle";
import { TopInquiriesData } from "../../data/topInquiries";
import MyResponsiveHeatMap from "../../components/CalendarComponent";
import VisualizationData from "../../data/visualizationData";

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
        {/* ROW 1 */}

        <Box
          gridColumn={isNonMobile ? "span 8" : "span 12"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="4px"
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
                  // color: "#fff",
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
                  // color: "#fff",
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
                  // color: "#fff",
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
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="4px"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`1px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            m="0 0.5em"
          >
            <Typography color={colors.grey[100]} variant="h3" fontWeight="bold">
              Bot Deployed
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              padding: "0.15em 1em",
              m: " 0 0.5em",
            }}
          >
            <Box
              sx={{
                flexGrow: "1",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                Conversation Rate
              </Typography>
              <Typography
                variant="h6"
                fontWeight="normal"
                color={colors.grey[300]}
              >
                Leads Turns into Booking
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5em",
              }}
            >
              <ProgressCircle progress="0.32" />
              <Typography
                variant="h6"
                fontWeight="normal"
                color={colors.grey[300]}
              >
                32%
              </Typography>
            </Box>
          </Box>

          <Box
            gridColumn={isNonMobile ? "span 6" : "span 12"}
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            height="330px"
            // overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              backgroundColor={colors.grey[800]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Top Inquiries
              </Typography>
              <Typography
                color={colors.grey[300]}
                variant="h6"
                fontWeight="normal"
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.5,
                      textDecoration: "underline",
                    },
                  }}
                >
                  See All Inquiries
                </Box>
              </Typography>
            </Box>
            {TopInquiriesData.map((data, i) => (
              <Box
                key={`${data.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`2px solid ${colors.primary[500]}`}
                p="1em 1.2em"
                backgroundColor={colors.grey[800]}
              >
                <Box>
                  <Typography
                    color={colors.grey[200]}
                    variant="h5"
                    fontWeight="normal"
                    px={1}
                  >
                    {data.id}. {data.inquiries}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn={isNonMobile ? "span 8" : "span 12"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="4px"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            px={3}
            py={2}
            color={colors.grey[100]}
          >
            Trends & Insights
          </Typography>
          <Box
            sx={{
              borderBottom: `2px solid ${colors.primary[500]}`,
            }}
          ></Box>

          <Box height="300px" mt="-1.5em">
            <LineChart isDashboard={true} />
          </Box>

          <Box
            sx={{
              padding: ".25em 2.5em",
            }}
          >
            <Typography
              variant="h5"
              color={colors.grey[200]}
              mb=".5em"
              fontWeight="bold"
            >
              Recomended Actions
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              fontWeight="normal"
            >
              1. Consider increasing Staff availability during peak hours
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              fontWeight="normal"
            >
              2. Add new FAQ (frequently asked topic){" "}
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              fontWeight="normal"
            >
              3. Train bot further on specific recurring inquiry
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="4px"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`1px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            m="0 0.5em"
          >
            <Typography color={colors.grey[100]} variant="h3" fontWeight="bold">
              Bot Performance
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              padding: "1em",
              backgroundColor: colors.primary[500],
              borderBottom: `2px solid ${colors.primary[400]}`,
            }}
          >
            <Box
              sx={{
                flexGrow: "1",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                Resolution Rate
              </Typography>
              <Typography
                variant="h6"
                fontWeight="normal"
                color={colors.grey[300]}
              >
                Leads resolved by Bot
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5em",
                pr: "1em",
              }}
            >
              <ProgressCircle progress="0.32" />
              <Typography
                variant="h6"
                fontWeight="normal"
                color={colors.grey[300]}
              >
                32%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              padding: "1em",
              borderBottom: `2px solid ${colors.primary[400]}`,
              backgroundColor: colors.primary[500],
            }}
          >
            <Box
              sx={{
                flexGrow: "1",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                Esclation Rate
              </Typography>
              <Typography
                variant="h6"
                fontWeight="normal"
                color={colors.grey[300]}
              >
                Leads partially resolved by Bot and than by human
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5em",
                pr: "1em",
              }}
            >
              <ProgressCircle progress="0.32" />
              <Typography
                variant="h6"
                fontWeight="normal"
                color={colors.grey[300]}
              >
                32%
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              padding: "1em",
              borderBottom: `2px solid ${colors.primary[400]}`,
              backgroundColor: colors.primary[500],
            }}
          >
            <Box
              sx={{
                flexGrow: "1",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                Average Response Time
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1em",
                  padding: " 0 1em",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  color={colors.grey[300]}
                >
                  Bot
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  color={colors.grey[300]}
                >
                  15sec
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1em",
                  padding: " 0 1em",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  color={colors.grey[300]}
                >
                  Human
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  color={colors.grey[300]}
                >
                  2min
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              padding: "1em",
              borderBottom: `2px solid ${colors.primary[400]}`,
              backgroundColor: colors.primary[500],
            }}
          >
            <Box
              sx={{
                flexGrow: "1",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                Most Used Bot
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1em",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  color={colors.grey[300]}
                >
                  Bot Name
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ROW 3 */}

        <Box
          gridColumn={isNonMobile ? "span 12" : "span 12"}
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          // gap="20px"
          backgroundColor={colors.primary[400]}
        >
          <Box
            gridColumn={isNonMobile ? "span 8" : "span 12"}
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            borderRadius="4px"
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              px={3}
              py={2}
              color={colors.grey[100]}
              sx={{
                borderBottom: `2px solid ${colors.primary[500]}`,
              }}
            >
              Trends & Insights
            </Typography>

            <Box
              sx={{
                // border: "1px solid grey",
                marginRight: "20px",
                padding: " 2em 2em 1em 1em",
                height: "360px",
                width: "100%",
              }}
            >
              <MyResponsiveHeatMap data={VisualizationData} />
            </Box>
          </Box>

          <Box
            gridColumn={isNonMobile ? "span 4" : "span 12"}
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            borderRadius="4px"
            overflow="auto"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                px={3}
                py={2}
                color={colors.grey[100]}
                sx={{
                  borderBottom: `2px solid ${colors.primary[500]}`,
                }}
              >
                Bot Performance
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "1em",
                padding: "1em",
                display: "flex",
                flexDirection: "column",
                gap: "0.75em",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: colors.redAccent[600],
                  padding: "0.8em",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "2em",
                  width: "100%",
                }}
                variant="h5"
              >
                Total Interaction
              </Typography>
              <Typography
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  padding: "0.8em",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "2em",
                  width: "80%",
                }}
                variant="h5"
              >
                Completed
              </Typography>
              <Typography
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  padding: "0.8em",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "2em",
                  width: "60%",
                }}
                variant="h5"
              >
                Esclated
              </Typography>
              <Typography
                sx={{
                  backgroundColor: colors.grey[300],
                  padding: "0.75em",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "2em",
                  width: "40%",
                }}
                variant="h5"
              >
                Outcome
              </Typography>
            </Box>

            <Box
              sx={{
                padding: ".25em 2.5em",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[200]}
                mb=".5em"
                fontWeight="bold"
              >
                Outcomes
              </Typography>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                fontWeight="normal"
              >
                1. Bookings
              </Typography>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                fontWeight="normal"
              >
                2. lead converted
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InteractionStats;
