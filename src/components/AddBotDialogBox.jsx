import {
  Dialog,
  DialogContent,
  DialogActions,
  useTheme,
  Box,
  Typography,
  Button,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddBotDialogBox = ({ successBox, handleSetSuccessBoxClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Dialog
      open={successBox}
      onClose={handleSetSuccessBoxClose}
      sx={{
        zIndex: 1300,
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "420px",
          width: "100%",
          backgroundColor: colors.primary[500],
        },
      }}
    >
      <DialogContent
        sx={{
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: "80px",
            height: "80px",
            margin: "0 auto",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #062994, #0E72E1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RocketLaunchIcon
            sx={{
              fontSize: "46px",
            }}
          />
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginTop: "16px",
            color: colors.grey[100],
          }}
        >
          Congratulations!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "12px",
            color: colors.grey[200],
          }}
        >
          Your Bot Has Been Created Successfully
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginTop: "12px",
            color: colors.grey[200],
          }}
        >
          Now let’s <strong>integrate</strong> this bot into
          <strong> your website or platform</strong>
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <Button
          onClick={() => {
            handleSetSuccessBoxClose();
            navigate("/botIntegration");
          }}
          variant="contained"
          color="primary"
          startIcon={<AccountTreeIcon />}
          sx={{
            background: "linear-gradient(45deg, #062994, #0E72E1)",
            textTransform: "capitalize",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginBottom: isNonMobile ? "0" : "1em",
            transition: "all 0.5s ease",
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          Let’s Integrate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBotDialogBox;
