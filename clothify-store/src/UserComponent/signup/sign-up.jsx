import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid2 } from '@mui/material';
import {Link } from 'react-router-dom'
import { signupApi } from '../../Api/signup/signupApi';
import bcrypt from 'bcryptjs';

function SignUp() {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
    };

    const hashedPassword = bcrypt.hashSync(formData.password, 10);
    formData.password = hashedPassword;

    try{
        const data = await signupApi(formData);
        console.log('data', data);
    } catch(erorr){
        console.error('Error during sign up', erorr);
    }
  };

  return (
    <Container maxWidth="sm" sx={{marginBottom: '50px'}}>
        <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '2px solid #FFD23D',
            borderRadius: '8px',
            padding: 3,
            boxShadow: 6, 
        }}
        >
        <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
                textAlign: 'center', 
                borderBottom: '2px solid #e0e0e0', 
                paddingBottom: '10px', 
                width: '100%', 
                display: 'inline-block',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
            }}
        >
            Sign Up
        </Typography>

        {/* First Name */}
        <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            required
            fullWidth
        />

        {/* Last Name */}
        <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            required
            fullWidth
        />

        {/* Email */}
        <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            required
            fullWidth
        />

        {/* Password */}
        <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            required
            fullWidth
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
        </Button>

        <Grid2 container spacing={2} direction={{xs: 'column' , md: 'row'}} justifyContent="center" alignItems="center">
            <Grid2>
                <Typography sx={{ textAlign: 'center', fontSize: '17px', fontWeight: '50px' }}>
                    Already have an account ?
                </Typography>
            </Grid2>
            <Grid2>
                <Typography sx={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold', color: 'blue' }}>
                    <Link to='/login'>
                        Sign in here!
                    </Link>
                </Typography>
            </Grid2>
        </Grid2>
        </Box>


    </Container>
  );
}

export default SignUp;
