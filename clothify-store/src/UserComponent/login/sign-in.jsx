import React, { useContext } from "react";
import { TextField, Button, Typography, Box, Container, Grid2 } from "@mui/material";
import { Link } from 'react-router-dom';
import { signinApi } from "../../Api/signin/signinApi";
import bcrypt from 'bcryptjs';
import { AuthContext } from "../../Config/AuthContext";

function SignIn({ onClose }) {
  const { login } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const values = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try{
      const data = await signinApi(values);
      console.log('data', data);
      const { password: hashedPassword, token } = data;  
      console.log(token);

      const isPasswordValid = bcrypt.compareSync(values.password, hashedPassword);
      if (isPasswordValid && token) {
        login(token); 
        // message.success('Successfully logged in.');
      } else {
        console.error('Invalid password');
        message.error('Invalid password');
      }

    } catch(erorr){
        console.error('Error during sign up', erorr);
    }

    onClose && onClose(); 
  };

  return (
    <Container maxWidth="xs" sx={{marginBottom: '50px'}}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          border: '2px solid #FFD23D',
          borderRadius: '8px',
          boxShadow: 6, 
        }}
      >
        <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
                textAlign: 'center',
                borderBottom: '2px solid #e0e0e0', 
                paddingBottom: '10px', 
                width: '100%', 
                display: 'inline-block',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',

            }}
        >
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            autoFocus
            margin="normal"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            margin="normal"
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            variant="outlined"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>

        <Grid2 container spacing={2} direction={{xs: 'column' , md: 'row'}} justifyContent="center" alignItems="center" marginTop={3}>
            <Grid2>
                <Typography sx={{ textAlign: 'center', fontSize: '17px', fontWeight: '50px' }}>
                    Do you have an account ?
                </Typography>
            </Grid2>
            <Grid2>
                <Typography sx={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold', color: 'blue' }}>
                    <Link to='/signup'>
                        Sign up here!
                    </Link>
                </Typography>
            </Grid2>
        </Grid2>

        </form>
      </Box>
    </Container>
  );
}

export default SignIn;
