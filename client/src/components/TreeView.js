import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import axios from 'axios'; // Import axios for API calls
import ItemDetails from './ItemDetails';

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

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>details</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function TreeView(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/'); // Change the initial pathname as needed
  const [godowns, setGodowns] = React.useState([]); // State to store fetched godown data

  // Fetch godown data from API
  const fetchGodowns = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/godowns'); // Adjust the URL as necessary
      setGodowns(response.data); // Store the fetched data
    } catch (error) {
      console.error("Error fetching godowns:", error);
    }
  };

  React.useEffect(() => {
    fetchGodowns(); // Fetch godowns when the component mounts
  }, []);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Generate navigation items from godown data
  const navigation = godowns.map(godown => ({
    segment: godown._id,
    title: godown.name,
    icon: <FolderIcon />,
    // If you have sub-locations, map them here
    children: godown.subLocations ? godown.subLocations.map(sub => ({
      segment: sub._id,
      title: sub.subLocation,
      icon: <DescriptionIcon />,
      // If sub-locations have items, map them here
      children: sub.items ? sub.items.map(item => ({
        segment: item._id,
        title: item.name,
        icon: <DescriptionIcon />,
      })) : [],
    })) : [],
  }));

  return (
    <AppProvider
      navigation={navigation} // Use the dynamically generated navigation
      router={router}
      theme={demoTheme}
      window={window !== undefined ? window() : undefined}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

TreeView.propTypes = {
  window: PropTypes.func,
};

export default TreeView;
