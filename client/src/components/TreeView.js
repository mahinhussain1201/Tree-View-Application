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
  const handleGodownSelect = (godownId,godownName) => {
    if (onSelectGodown && typeof onSelectGodown === 'function') {
      onSelectGodown(godownId,godownName);
    } else {
      console.error("onSelectGodown is not a function");
    }
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
              onClick={() => handleGodownSelect(godown.id,godown.name)} // Handle click to select godown
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
          onClick={() => handleGodownSelect(godown.id)} // Handle click to select godown
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
    <AppProvider
      navigation={navigation}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {/* <Box sx={{ p: 2 }}>
          <h2>Welcome to the Godown Management System</h2>
          <p>Select a godown or sub-godown from the navigation to view details.</p>
        </Box> */}
      </DashboardLayout>
    </AppProvider>
  );
}

TreeView.propTypes = {
  onSelectGodown: PropTypes.func.isRequired, // Ensure onSelectGodown is passed and is a function
};

export default TreeView;
