import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

/**
 * A component that displays a single adventure's information in a card format.
 * @param {object} props - The component props.
 * @param {object} props.adventure - The adventure object containing details to display.
 * @param {string} props.adventure.title - The title of the adventure.
 * @param {string} props.adventure.description - A short description of the adventure.
 * @param {number} props.adventure.price - The price of the adventure.
 * @param {string} props.adventure.location - The location of the adventure.
 * @param {string} props.adventure.duration - The duration of the adventure.
 * @param {string[]} [props.adventure.tags] - An array of tags/features for the adventure (e.g., 'Kayaking', 'Waterfalls').
 * @param {string} [props.adventure.image] - The URL for the adventure's image.
 */
function AdventureCard({ adventure }) {
  // Use a placeholder image if the adventure data doesn't have one
  const imageUrl = adventure.image || `https://placehold.co/600x400/0284c7/ffffff?text=${encodeURIComponent(adventure.title)}`;
  
  // Provide a default empty array for tags if it doesn't exist, preventing a crash
  const tags = adventure.tags || [];
  const navigate = useNavigate();
  const handleViewDeal = () => {
  // Use ._id (with an underscore) to get the unique ID from MongoDB
  navigate(`/adventures/${adventure._id}`); 
};

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={adventure.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {adventure.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 1 }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{adventure.location}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }}/>
            <Typography variant="body2">{adventure.duration}</Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {adventure.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {/* Display up to 3 tags as chips, similar to amenities */}
          {tags.slice(0, 3).map((tag) => (
            <Chip 
              label={tag} 
              key={tag} 
              size="small" 
              sx={{ 
                mr: 0.5, 
                mb: 0.5, 
                backgroundColor: 'info.light', // Using a different color for distinction
                color: 'white',
                textTransform: 'capitalize'
              }} 
            />
          ))}
        </Box>
        
        <Typography variant="h6" component="p">
          ₹{adventure.price}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
         <Button variant="contained" color="primary" fullWidth onClick={handleViewDeal}>View Details</Button>
      </Box>
    </Card>
  );
}

export default AdventureCard;

