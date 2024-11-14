import React from 'react'
import { Grid2, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

function OurBranches() {
  return (
    <div className='m-3 py-4'style={{backgroundColor: '#FBE9E7'}}>
        <div className='mb-3' >
        <Typography variant="h4" align="center" className='mt-2' data-aos="fade-right" 
            style={{fontSize: '50px', fontWeight: 'bolder'}}
        >
                OUR BRANCHES
        </Typography>
        <p className='text-center'>See the latest arrivals at a store near you!</p>
        </div>
    
        <Grid2 container spacing={2} sx={{ marginLeft: '10px', marginRight: '10px'}}>

        {/* Row 1 */}
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-right">
            <div style={{backgroundColor: '#FF9800', padding: '8px', textAlign: 'center', display: 'flex', justifyContent: 'center', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <StorefrontIcon sx={{ color: 'white', marginRight: '8px' }} />
                <div>
                    Clothify - Colombo
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',  textAlign: 'center', lineHeight: '0.9'}}>
                <span className='mt-2'>No. 12, Main Street, Colombo</span><br/>
                <span>0711007023</span><br/>
                <span>8.00 AM - 9.00 PM</span>
            </div>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-right">
            <div style={{backgroundColor: '#FF9800', padding: '8px', textAlign: 'center', display: 'flex', justifyContent: 'center', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <StorefrontIcon sx={{ color: 'white', marginRight: '8px' }} />
                <div>
                    Clothify - Galle
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',  textAlign: 'center', lineHeight: '0.9'}}>
                <span className='mt-2'>15 Lighthouse Avenue, Galle</span><br/>
                <span>0711007025</span><br/>
                <span>10:00 AM - 7:00 PM</span>
            </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-right">
            <div style={{backgroundColor: '#FF9800', padding: '8px', textAlign: 'center', display: 'flex', justifyContent: 'center', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <StorefrontIcon sx={{ color: 'white', marginRight: '8px' }} />
                <div>
                    Clothify - Negombo
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',  textAlign: 'center', lineHeight: '0.9'}}>
                <span className='mt-2'>23 Sea Road, Negombo</span><br/>
                <span>0711007026</span><br/>
                <span> 9:30 AM - 8:30 PM</span>
            </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-right">
            <div style={{backgroundColor: '#FF9800', padding: '8px', textAlign: 'center', display: 'flex', justifyContent: 'center', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <StorefrontIcon sx={{ color: 'white', marginRight: '8px' }} />
                <div>
                    Clothify - Jaffna
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',  textAlign: 'center', lineHeight: '0.9'}}>
                <span className='mt-2'>45 Market Street, Jaffna</span><br/>
                <span>0711007027</span><br/>
                <span> 8:00 AM - 9:00 PM</span>
            </div>
        </Grid2>

      </Grid2>

    </div>
  )
}

export default OurBranches