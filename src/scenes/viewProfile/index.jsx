import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import GradientButton from "../../components/GradientButton";


const ViewProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const profileData = {
    profileImage: "https://picsum.photos/seed/profile/200/200",
    coverImage: "https://picsum.photos/seed/cover/1200/300",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    phoneNumber: "+1 234-567-890",
    companyName: "Doe Enterprises",
    position: "CEO & Founder",
    bio: "Innovative entrepreneur with a passion for technology and design. Leading teams to create exceptional digital experiences and constantly pushing the boundaries of what's possible.",
    city: "New York",
    state: "NY",
    country: "USA",
    botUsage: "Enterprise Solutions",
    hobbies: "Traveling, Photography, Coding",
    education: "MBA, Harvard Business School",
    workExperience: "20 years in the tech industry",
    socialMedia: {
      twitter: "johndoe",
      linkedin: "john-doe",
      instagram: "john.doe",
    },
  };

  // Helper function to render an info row with an icon and text
  const renderInfoRow = (IconComponent, label, value) => (
    <Box display="flex" alignItems="center" mb={2}>
      <IconComponent sx={{ color: colors.blueAccent[500], mr: 2 }} />
      <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1 }}>
        {label}:
      </Typography>
      <Typography variant="body1" sx={{ color: colors.primary[100] }}>
        {value}
      </Typography>
    </Box>
  );

  const renderCard = (title, children) => (
    <Card
      sx={{
        backgroundColor: colors.primary[500],
        borderRadius: 4,
        p: 2,
        border: `1px solid ${colors.grey[700]}`,
        transition: "transform 0.4s, box-shadow 0.4s",
        "&:hover": {
          // transform: "translateY(-5px)",
          boxShadow: `0px 2px 10px ${colors.grey[900]}`,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: colors.blueAccent[500] }}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box
      m="20px"
      minHeight={"100vh"}
      // sx={{ minHeight: "100vh", backgroundColor: colors.primary[400]}}
    >
      {/* Cover Image Section */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${profileData.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
            borderRadius: 4,
          }}
        />
      </Box>

      {/* Main Profile Section */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: colors.primary[400],
          borderRadius: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="10px"
          mt={4}
        >
          <Header
            title="PROFILE OVERVIEW"
            subtitle="A snapshot of your professional profile"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <GradientButton
              text="Edit Profile"
              icon={<EditIcon />}
              // onClick={() => navigate("/addbot")}
            />
          </Box>
        </Box>

        {/* Profile Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            p: 4,
            backgroundColor: colors.primary[500],
            borderRadius: 4,
            boxShadow: `0px 4px 20px ${colors.grey[900]}`,
            mb: 4,
          }}
        >
          <Avatar
            alt="Profile Picture"
            src={profileData.profileImage}
            sx={{
              width: 150,
              height: 150,
              border: `4px solid ${colors.blueAccent[500]}`,
              boxShadow: `0px 4px 20px ${colors.grey[900]}`,
              mr: { md: 4 },
              mb: { xs: 2, md: 0 },
            }}
          />
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: colors.primary[100] }}
            >
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="h6" sx={{ color: colors.grey[300], mb: 2 }}>
              @{profileData.username}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.primary[100] }}>
              {profileData.bio}
            </Typography>
            {/* Social Media Links */}
            <Box
              mt={2}
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <IconButton
                component={Link}
                href={`https://twitter.com/${profileData.socialMedia.twitter}`}
                target="_blank"
                sx={{ color: colors.blueAccent[500] }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component={Link}
                href={`https://linkedin.com/in/${profileData.socialMedia.linkedin}`}
                target="_blank"
                sx={{ color: colors.blueAccent[500] }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component={Link}
                href={`https://instagram.com/${profileData.socialMedia.instagram}`}
                target="_blank"
                sx={{ color: colors.blueAccent[500] }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Detailed Information Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {renderCard(
              "Personal Information",
              <>
                {renderInfoRow(
                  PersonIcon,
                  "Name",
                  `${profileData.firstName} ${profileData.lastName}`
                )}
                {renderInfoRow(SchoolIcon, "Education", profileData.education)}
                {renderInfoRow(FavoriteIcon, "Hobbies", profileData.hobbies)}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderCard(
              "Contact Information",
              <>
                {renderInfoRow(EmailIcon, "Email", profileData.email)}
                {renderInfoRow(PhoneIcon, "Phone", profileData.phoneNumber)}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderCard(
              "Professional Details",
              <>
                {renderInfoRow(
                  BusinessIcon,
                  "Company",
                  profileData.companyName
                )}
                {renderInfoRow(WorkIcon, "Position", profileData.position)}
                {renderInfoRow(
                  WorkIcon,
                  "Experience",
                  profileData.workExperience
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderCard(
              "Location Information",
              <>
                {renderInfoRow(LocationOnIcon, "City", profileData.city)}
                {renderInfoRow(LocationOnIcon, "State", profileData.state)}
                {renderInfoRow(LocationOnIcon, "Country", profileData.country)}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewProfile;
