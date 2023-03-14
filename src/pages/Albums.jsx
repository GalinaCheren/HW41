import React, { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import InsertPhoto from '@mui/icons-material/InsertPhoto';

export const Albums = ({ toggleLoading }) => {
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function init() {
      toggleLoading();
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${id}`
      );

      if (response.ok) {
        const albumsData = await response.json();
        setAlbums(albumsData);
      } else {
        alert('Ошибка HTTP: ' + response.status);
      }
      toggleLoading();
    }
    init();
  }, []);

  return (
    <>
      <Box>
        <h2 align="center">Users albums</h2>
      </Box>
      <ImageList
        sx={{
          width: 700,
          height: 650,
          margin: 'auto',
          textAlign: 'center'
        }}
      >
        {albums.map(({ id, title }) => (
          <ImageListItem key={id}>
            <ImageListItemBar
              sx={{
                borderRadius: '10px',
                padding: '5px',
                margin: '20px',
                backgroundColor: '#d1cdce'
              }}
              color="red"
              title={title}
              actionIcon={
                <Link to={`/photos/${id}`} aria-label={`info about ${title}`}>
                  <InsertPhoto sx={{ color: '#960018' }} />
                </Link>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
