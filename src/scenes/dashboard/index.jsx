import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { BotPerformanceData } from "../../data/botPerformData";
import { RecentActivityData } from "../../data/RecentActivityData";
import useMediaQuery from "@mui/material/useMediaQuery";
import StatBoxSkeleton from "../../components/skeleton/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LayersIcon from "@mui/icons-material/Layers";
import GradientButton from "../../components/GradientButton";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const isMobile = useMediaQuery("(min-width:521px)");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonTheme
      baseColor={theme.palette.mode === "dark" ? "#333" : "#e0e0e0"}
      highlightColor={theme.palette.mode === "dark" ? "#444" : "#f5f5f5"}
    >
      <Box m="20px">
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="10px"
        >
          <Header
            title="DASHBOARD"
            subtitle="Welcome to your Medicare Bot dashboard"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: isNonMobile ? "auto" : "100%",
            }}
          >
            <GradientButton
              text="Download Reports"
              icon={<DownloadOutlinedIcon />}
            />
          </Box>
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
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"
            }
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            {loading ? (
              <StatBoxSkeleton />
            ) : (
              <StatBox
                title="121"
                subtitle="Active Bots"
                progress="0.5"
                increase="+14%"
                icon={
                  <SmartToyIcon
                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>

          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"
            }
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            {loading ? (
              <StatBoxSkeleton />
            ) : (
              <StatBox
                title="431,225"
                subtitle="Total Interactions"
                progress="0.750"
                increase="+21%"
                icon={
                  <LayersIcon
                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 12" : "span 12"
            }
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            {loading ? (
              <StatBoxSkeleton />
            ) : (
              <StatBox
                title="32,441"
                subtitle="Customer Satisfaction"
                progress="0.90"
                increase="+90%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>

          {/* ROW 2 */}

          <Box
            gridColumn={isNonMobile ? "span 6" : "span 12"}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            {/* Header row */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              {loading ? (
                // Skeleton for "Recent Activity Feed" header
                <Skeleton variant="text" width={180} height={20} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Activity Feed
                </Typography>
              )}

              {loading ? (
                // Skeleton for "View All Activity" text on the right
                <Skeleton variant="text" width={140} height={15} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h6"
                  fontWeight="600"
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
                    View All Activity
                  </Box>
                </Typography>
              )}
            </Box>

            {/* Content rows */}
            {loading
              ? // Show a few skeleton rows if data is still loading
                [...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`2px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Skeleton variant="text" width={120} height={15} />
                      <Skeleton variant="text" width={80} height={10} />
                    </Box>
                  </Box>
                ))
              : // Once loading is finished, map through your real data
                RecentActivityData.map((data, i) => (
                  <Box
                    key={`${data.txId}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`2px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography
                        color={colors.blueAccent[400]}
                        variant="h5"
                        fontWeight="500"
                      >
                        {data.txId} : {data.botName}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="400"
                        color={colors.grey[300]}
                      >
                        {data.date} {data.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
          </Box>

          <Box
            gridColumn={isNonMobile ? "span 6" : "span 12"}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            {/* Header row */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              {loading ? (
                // Skeleton for "Recent Activity Feed" header
                <Skeleton variant="text" width={180} height={20} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Bot Performance Summary
                </Typography>
              )}

              {loading ? (
                // Skeleton for "View All Activity" text on the right
                <Skeleton variant="text" width={140} height={15} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h6"
                  fontWeight="600"
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
                    View Detailed Report
                  </Box>
                </Typography>
              )}
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              p="15px"
            >
              {loading ? (
                <Skeleton variant="text" width={140} height={15} />
              ) : (
                <Box textAlign="left" flex={1}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontWeight="500"
                  >
                    Bot Name
                  </Typography>
                </Box>
              )}
              {loading ? (
                <Skeleton variant="text" width={140} height={15} />
              ) : (
                <Box
                  fontWeight="500"
                  fontSize="16px"
                  textAlign="center"
                  flex={1}
                  color={colors.grey[100]}
                >
                  Interactions
                </Box>
              )}
              {loading ? (
                <Skeleton variant="text" width={140} height={15} />
              ) : (
                <Box
                  textAlign="center"
                  fontWeight="500"
                  fontSize="16px"
                  flex={1}
                  borderRadius="4px"
                >
                  Usage
                </Box>
              )}
            </Box>

            {/* Content rows */}
            {loading
              ? // Show a few skeleton rows if data is still loading
                [...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`2px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Skeleton variant="text" width={120} height={10} />
                    <Skeleton variant="text" width={80} height={10} />
                    <Skeleton variant="text" width={80} height={10} />
                  </Box>
                ))
              : // Once loading is finished, map through your real data
                BotPerformanceData.map((data, i) => (
                  <Box
                    key={`${data.botName}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`2px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box textAlign="left" flex={1}>
                      <Typography
                        color={colors.blueAccent[400]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {data.botName}
                      </Typography>
                    </Box>
                    <Box textAlign="center" flex={1} color={colors.grey[100]}>
                      {data.interactions}
                    </Box>
                    <Box textAlign="center" flex={1}>
                      {data.usage}
                    </Box>
                  </Box>
                ))}
          </Box>

          {/* ROW 3 */}

          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"
            }
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              {loading ? (
                <Skeleton variant="h5" width={160} height={20} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Plan Usage Overview
                </Typography>
              )}
              {loading ? (
                <Skeleton variant="h6" width={80} height={8} />
              ) : (
                <Typography
                  color={colors.grey[400]}
                  variant="h6"
                  fontWeight="600"
                >
                  Conversation
                </Typography>
              )}
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
                sx={{
                  "& > :first-child": {
                    mb: "1em",
                  },
                }}
              >
                {/* Dynamic Progress Circle */}
                {loading ? (
                  <Skeleton height={124} width={124} circle />
                ) : (
                  <Box
                    sx={{
                      background: `radial-gradient(${
                        colors.primary[400]
                      } 55%, transparent 56%),
                        conic-gradient(transparent 0deg ${
                          (3500 / 5000) * 360
                        }deg, ${"#ccc"} ${(3500 / 5000) * 360}deg 360deg),
                        ${colors.blueAccent[400]}`,
                      borderRadius: "50%",
                      width: "125px",
                      height: "125px",
                    }}
                  />
                )}

                {loading ? (
                  <Skeleton width={180} height={15} />
                ) : (
                  <Typography variant="h5" color={colors.blueAccent[500]}>
                    3,500/5,000
                  </Typography>
                )}

                {loading ? (
                  <Skeleton width={200} height={8} />
                ) : (
                  <Typography variant="h6" color={colors.grey[300]}>
                    Conversation Circular Progress Meter
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"
            }
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              {loading ? (
                <Skeleton variant="h5" width={160} height={20} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Plan Usage Overview
                </Typography>
              )}
              {loading ? (
                <Skeleton variant="h6" width={80} height={8} />
              ) : (
                <Typography
                  color={colors.grey[400]}
                  variant="h6"
                  fontWeight="600"
                >
                  Time Remaining
                </Typography>
              )}
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
                sx={{
                  "& > :first-child": {
                    mb: "1em",
                  },
                }}
              >
                {/* Dynamic Progress Circle */}
                {loading ? (
                  <Skeleton height={124} width={124} circle />
                ) : (
                  <Box
                    sx={{
                      background: `radial-gradient(${
                        colors.primary[400]
                      } 55%, transparent 56%),
              conic-gradient(transparent 0deg ${
                (12 / 30) * 360
              }deg, ${"#ccc"} ${(12 / 30) * 360}deg 360deg),
              ${colors.blueAccent[400]}`,
                      borderRadius: "50%",
                      width: "125px",
                      height: "125px",
                    }}
                  />
                )}

                {loading ? (
                  <Skeleton width={180} height={15} />
                ) : (
                  <Typography variant="h5" color={colors.blueAccent[500]}>
                    12/30 days
                  </Typography>
                )}

                {loading ? (
                  <Skeleton width={200} height={8} />
                ) : (
                  <Typography variant="h6" color={colors.grey[300]}>
                    Time Remaining Circular Progress Meter
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 12" : "span 12"
            }
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="  24px 15px"
            >
              {loading ? (
                <Skeleton variant="h5" width={160} height={20} />
              ) : (
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Quick Actions
                </Typography>
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px"
            >
              <Box>
                {loading ? (
                  <Skeleton variant="h5" width={80} height={15} />
                ) : (
                  <Typography
                    color={colors.blueAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                          opacity: 0.5,
                        },
                      }}
                    >
                      Add Bot
                    </Box>
                  </Typography>
                )}
              </Box>

              {loading ? (
                <Skeleton variant="h5" width={80} height={15} />
              ) : (
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                      opacity: 0.5,
                    },
                  }}
                >
                  View Reports
                </Box>
              )}

              {loading ? (
                <Skeleton variant="h5" width={80} height={15} />
              ) : (
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                      opacity: 0.5,
                    },
                  }}
                >
                  Contact Support
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </SkeletonTheme>
  );
};

export default Dashboard;
