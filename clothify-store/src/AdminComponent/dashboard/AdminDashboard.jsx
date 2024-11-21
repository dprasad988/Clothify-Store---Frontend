import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ProductsTab from '../tabs/products-tab';
import InventoryIcon from '@mui/icons-material/Inventory';
import OrderTable from '../orders/OrderTable';
import Dashboard from './dashboard';
import Badge from 'antd/lib/badge';

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
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AdminDashboard(props) {
  const { window } = props;
  const [orderCount, setOrderCount] = React.useState(5);

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const NAVIGATION = [
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'orders',
      title: 'Orders',
      icon: (
        <Badge count={orderCount} offset={[2, 0]}>
          <ShoppingCartIcon />
        </Badge>
      ),
    },
    {
      segment: 'products',
      title: 'Products',
      icon: <InventoryIcon />,
    },
    {
      segment: 'reports',
      title: 'Reports',
      icon: <BarChartIcon />,
    },
  ];

    // Define the content to render based on the current route
    const renderContent = () => {
        switch (pathname) {
          case '/products':
            return <ProductsTab />
          case '/orders' : 
            return <OrderTable/>
          case '/dashboard' :
            return <Dashboard/>
            
          default:
            return <DemoPageContent pathname={pathname} />;
        }
    };

  return (
    <AppProvider
        branding={{
            logo: '',  
            title: (
                <Typography variant="h5" style={{ color: '#FF9800', fontWeight: 'bold' }}> 
                  Clothify Store
                </Typography>
            ),
        }}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
    >
      <DashboardLayout defaultSidebarCollapsed>
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}

export default AdminDashboard;
