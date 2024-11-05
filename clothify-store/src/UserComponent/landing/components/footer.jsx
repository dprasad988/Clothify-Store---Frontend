import React from 'react';
import { Box, Typography, TextField, Button, Grid2 } from '@mui/material';
import { Facebook, Instagram, YouTube, LocationOn, Phone, Email, ShoppingBagOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Info as AboutUsIcon,
  Help as FAQIcon,
  Straighten as SizeGuideIcon,
  SwapHoriz as ExchangePolicyIcon,
  ContactMail as ContactUsIcon,
  Lock as PrivacyPolicyIcon,
  Gavel as TermsOfUseIcon,
} from '@mui/icons-material';

const Footer = () => {
  
  const links = [
    { text: 'About Us', path: '/about', icon: <AboutUsIcon sx={{color: '#1e88e5', marginRight: '10px'}}/>},
    { text: 'FAQ', path: '/faq', icon: <FAQIcon sx={{color: '#43a047', marginRight: '10px'}}/> },
    { text: 'Size Guide', path: '/size-guide', icon: <SizeGuideIcon sx={{color: '#f4511e', marginRight: '10px'}}/>},
    { text: 'Exchange Policy', path: '/exchange-policy', icon: <ExchangePolicyIcon sx={{color: '#6a1b9a', marginRight: '10px'}}/> },
    { text: 'Contact Us', path: '/contact', icon: <ContactUsIcon sx={{color: '#00897b', marginRight: '10px'}}/> },
    { text: 'Privacy Policy', path: '/privacy-policy', icon: <PrivacyPolicyIcon sx={{color: '#e53935', marginRight: '10px'}}/>},
    { text: 'Terms Of Use', path: '/terms-of-use', icon: <TermsOfUseIcon sx={{color: '#fb8c00', marginRight: '10px'}}/>},
    { text: 'Home', path: '/', icon: <HomeIcon sx={{color: '#3949ab', marginRight: '10px'}}/>},
  ];

  return (
    <Box sx={{ backgroundColor: '#7d848c', color: '#000', p: 4 }}>
      <Grid2 container spacing={4} >

        {/* Newsletter Subscription */}
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} sx={{justifyContent: 'center'}}>
          <Typography variant="h6" sx={{ mb: 2 }}>Newsletter subscription</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Sign up for Zigzag updates to receive information about new arrivals, offers & promos.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter Your email Address"
            fullWidth
            sx={{ bgcolor: '#fff', mb: 2 }}
          />
          <Button variant="contained" fullWidth>
            SUBSCRIBE!
          </Button>
        </Grid2>

        {/* Quick Links */}
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="h6" sx={{ mb: 2 }}>QUICK LINKS</Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {links.map((link, index) => (
              <Box component="li" key={index} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              {link.icon}
              <Link to={link.path} style={{ textDecoration: 'none', color: 'inherit', marginLeft: '8px' }}>
                {link.text}
              </Link>
              </Box>
            ))}
          </Box>
        </Grid2>

        {/* Social Media */}
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="h6">Follow us</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Link href="#" color="inherit">
              <Facebook fontSize="large" sx={{ color: '#4267B2' }} />
            </Link>
            <Link href="#" color="inherit">
              <Instagram fontSize="large" sx={{ color: '#C13584' }} />
            </Link>
            <Link href="#" color="inherit">
              <YouTube fontSize="large" sx={{ color: '#FF0000' }} />
            </Link>
          </Box>
        </Grid2>

        {/* Contact Us */}
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">Contact Us</Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ShoppingBagOutlined sx={{ color: '#FF9800', mr: 1 }} /> {/* Green color for location */}
              <Typography variant="body2">Clothify Store (PVT) Ltd.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ color: '#4CAF50', mr: 1 }} /> {/* Green color for location */}
              <Typography variant="body2">Location: Panadura</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ color: '#2196F3', mr: 1 }} /> {/* Blue color for phone */}
              <Typography variant="body2">Contact: +94 123 456 789</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ color: '#E91E63', mr: 1 }} /> {/* Pink color for email */}
              <Typography variant="body2">Email: clothify@sample.com</Typography>
            </Box>
          </Box>
        </Grid2>

      </Grid2>

      {/* Footer Bottom */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, borderTop: '1px solid #000', pt: 2 }}>
        <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
          Copyright © 2024, CeylonClassics.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <img src="visa.png" alt="Visa" width="40" />
          <img src="master.png" alt="MasterCard" width="40" />
          <img src="american.png" alt="American Express" width="40" />
          <img src="maestro.png" alt="Maestro" width="40" />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
