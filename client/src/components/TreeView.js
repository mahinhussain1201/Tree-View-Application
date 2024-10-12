import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import axios from "axios";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function TreeView({ onSelectGodown }) {
  const [godowns, setGodowns] = React.useState([]);

  const fetchGodowns = async () => {
    try {
      const response = await axios.get("https://tree-view-application.onrender.com/api/godowns");
      setGodowns(response.data);
    } catch (error) {
      console.error("Error fetching godowns:", error);
    }
  };

  React.useEffect(() => {
    fetchGodowns();
  }, []);

  const handleGodownSelect = (godownId, godownName) => {
    if (onSelectGodown && typeof onSelectGodown === "function") {
      onSelectGodown(godownId, godownName);
    } else {
      console.error("onSelectGodown is not a function");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const buildNavigationTree = (godowns) => {
    const parentGodowns = godowns.filter((g) => g.parent_godown === null);

    const findChildren = (parentId) => {
      return godowns
        .filter((g) => g.parent_godown === parentId)
        .map((godown) => ({
          segment: godown.id,
          title: (
            <Typography
              sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
              onClick={() => handleGodownSelect(godown.id, godown.name)}
            >
              {godown.name}
            </Typography>
          ),
          icon: <ShoppingCartIcon />,
          children: findChildren(godown.id),
        }));
    };

    return parentGodowns.map((godown) => ({
      segment: godown.id,
      title: (
        <Typography
          sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
          onClick={() => handleGodownSelect(godown.id, godown.name)}
        >
          {godown.name}
        </Typography>
      ),
      icon: <StorefrontIcon />,
      children: findChildren(godown.id),
    }));
  };

  const navigation = buildNavigationTree(godowns);

  const router = React.useMemo(() => {
    return {
      pathname: "/",
      searchParams: new URLSearchParams(),
      navigate: (path) => console.log(`Navigating to: ${path}`),
    };
  }, []);

  return (
    <>
      <Box sx={{ position: "fixed", top: 12, right: 16, zIndex: 9999 }}>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <AppProvider navigation={navigation} router={router} theme={demoTheme}>
        <DashboardLayout></DashboardLayout>
      </AppProvider>
    </>
  );
}

TreeView.propTypes = {
  onSelectGodown: PropTypes.func.isRequired,
};

export default TreeView;
