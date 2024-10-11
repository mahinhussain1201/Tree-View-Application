import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button'; // Import Button for logout

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
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

  // Fetch godowns from the API
  const fetchGodowns = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/godowns');
      setGodowns(response.data);
    } catch (error) {
      console.error('Error fetching godowns:', error);
    }
  };

  React.useEffect(() => {
    fetchGodowns();
  }, []);

  // Handle godown selection
  const handleGodownSelect = (godownId, godownName) => {
    if (onSelectGodown && typeof onSelectGodown === 'function') {
      onSelectGodown(godownId, godownName);
    } else {
      console.error("onSelectGodown is not a function");
    }
  };

  // Logout function to clear localStorage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from local storage
    window.location.href = "/login"; // Redirect to login page
  };

  // Helper function to build the navigation tree
  const buildNavigationTree = (godowns) => {
    const parentGodowns = godowns.filter(g => g.parent_godown === null);

    const findChildren = (parentId) => {
      return godowns
        .filter(g => g.parent_godown === parentId)
        .map(godown => ({
          segment: godown.id,
          title: (
            <Typography
              sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
              onClick={() => handleGodownSelect(godown.id, godown.name)} // Handle click to select godown
            >
              {godown.name}
            </Typography>
          ),
          icon: <ShoppingCartIcon />,
          children: findChildren(godown.id),
        }));
    };

    return parentGodowns.map(godown => ({
      segment: godown.id,
      title: (
        <Typography
          sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
          onClick={() => handleGodownSelect(godown.id, godown.name)} // Handle click to select godown
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
      pathname: '/',
      searchParams: new URLSearchParams(),
      navigate: (path) => console.log(`Navigating to: ${path}`),
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
  <Box sx={{ position: 'fixed', top: 12, right: 16, zIndex: 9999 }}>
    {/* Logout Button */}
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  </Box>

  <AppProvider
    navigation={navigation}
    router={router}
    theme={demoTheme}
  >
    <DashboardLayout>
      {/* Your content here */}
    </DashboardLayout>
  </AppProvider>
</div>

  );
}

TreeView.propTypes = {
  onSelectGodown: PropTypes.func.isRequired, // Ensure onSelectGodown is passed and is a function
};

export default TreeView;
