import React from 'react';
import MuiNavbar from './MuiNavbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { RiMotorbikeFill } from "react-icons/ri";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const LandingPage = () => {
  return (
    <div style={{ backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MuiNavbar />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" style={{ marginTop: '80px' }}>
          <marquee> Welcome to Claim Pro <RiMotorbikeFill /></marquee>
        </Typography>
        <section id="about" style={{ marginTop: '30px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="center">
            At our Claim Pro, we prioritize efficiency, transparency, and customer satisfaction. We understand that filing an insurance claim can be a stressful experience, which is why we've developed a streamlined process to make it as smooth and hassle-free as possible.
          </Typography>
        </section>

        {/* Image Section */}
        <section id="images" style={{ marginTop: '30px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Images
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <CardMedia
                component="img"
                height="200"
                image="https://gomotors.net/blog/wp-content/uploads/2020/12/be7b3ddcc78372b2fb8ac0698f3a661f.jpg"
                alt="Image 1"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardMedia
                component="img"
                height="200"
                image="https://th.bing.com/th/id/OIP._XpZMKWdT8H8_9cY36jSzQHaE7?w=305&h=204&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                alt="Image 2"
              />
            </Grid>
            {/* Add more images as needed */}
          </Grid>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ marginTop: '30px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center">
            Have questions about filing a claim or need assistance with an existing claim? Our team is here to help. Contact us today via phone, email, or visit our office during business hours.<br/>
            <MdEmail /> xyz@claimpro.com <br />
            <MdPhone /> +1234567890 <br />
            <MdLocationOn />  123, siruseri, Chennai, India
          </Typography>
        </section>
      </Container>
    </div>
  );
};

export default LandingPage;
