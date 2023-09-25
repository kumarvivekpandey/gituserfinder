import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
const API_URL = "https://api.github.com/users/";

const FetchUserData = () => {
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState('');
  const [result, setResult] = useState({});

  useEffect(() => {
    if (user) {

      fetch(API_URL + user)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(data => setResult(data))
        .catch(error => console.error("Error fetching data:", error));
    }

  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user state with the inputValue when the form is submitted
    setUser(inputValue);
  };

  
  return (
    <>
      <h1>Gituserfinder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}

        />
        <button type="submit">Submit</button>
      </form>



      <div className="container">
       

        {Object.keys(result).length > 0 ? (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
  sx={{
    height: 100,
    width: 100, // Set the width to 100px
    borderRadius: '50%',
  }}
  image={`https://avatars.githubusercontent.com/u/${result.id}`}
  title="User Avatar"
/>


    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {result.name} <Chip label={result.company} variant="outlined" />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {result.bio}
      </Typography>
    </CardContent>
    <CardActions>
      <Link href={result.blog} target="_blank">
        <Button variant="contained" color="success" size="small">
          Portfolio
        </Button>
      </Link>
      <Link href={result.html_url} target="_blank">
        <Button variant="contained" color="success" size="small">
          Github
        </Button>
      </Link>
    </CardActions>
  </Card>
) : (
   
<Alert severity="info" style={{ marginTop: '3%' }}>
  Please enter user or check the correct user name
</Alert>
)}



      </div>
    </>
  );
};

export default FetchUserData;
