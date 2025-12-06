import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HotelIcon from '@mui/icons-material/Hotel';
import KayakingIcon from '@mui/icons-material/Kayaking';
import {useNavigate} from 'react-router-dom';

/**
 * A component that displays a single package's information in a card format.
 * @param {object} props - The component props.
 * @param {object} props.pkg - The package object containing details to display.
 * @param {string} props.pkg.packageName - The name of the package.
 * @param {string} props.pkg.description - A short description of the package.
 * @param {number} props.pkg.totalPrice - The total price of the package.
 * @param {number} props.pkg.durationDays - The duration of the package in days.
 * @param {string} [props.pkg.location] - The location of the package (needs to be added by the backend).
 * @param {string[]} [props.pkg.hotelIds] - An array of hotel IDs included.
 * @param {string[]} [props.pkg.adventureIds] - An array of adventure IDs included.
 * @param {string} [props.pkg.imageUrl] - The URL for the package's image.
 */
function PackageCard({ pkg }) {
  // Use a placeholder image if the package data doesn't have one
  const imageUrl = pkg.imageUrl || `https://placehold.co/600x400/7c3aed/ffffff?text=${encodeURIComponent(pkg.packageName)}`;
  
  const navigate = useNavigate();
  const handleViewDeal = () => {
    navigate(`packages/${pkg._id}`);
  }
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={pkg.packageName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {pkg.packageName}
        </Typography>

        {/* This part assumes your backend will provide a location */}
        {pkg.location && (
            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize', mb: 1 }}>
                {pkg.location}
            </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }}/>
            <Typography variant="body2">{pkg.durationDays} Days</Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {pkg.description || 'An unforgettable travel experience awaits.'}
        </Typography>
        
        <Typography variant="h6" component="p">
          ₹{pkg.totalPrice}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
         <Button variant="contained" color="primary" fullWidth onClick={handleViewDeal}>View Package</Button>
      </Box>
    </Card>
  );
}

export default PackageCard;
