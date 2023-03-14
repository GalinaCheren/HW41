import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, ImageList, ImageListItem } from '@mui/material';

export const Photos = ({ toggleLoading }) => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function init() {
      toggleLoading();
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
      );

      if (response.ok) {
        const photosData = await response.json();
        setPhotos(photosData);
      } else {
        alert('Ошибка HTTP: ' + response.status);
      }
      toggleLoading();
    }
    init();
  }, []);
  console.log(photos);
  return (
    <>
      <Box>
        <h2 align="center">Users photo</h2>
      </Box>
      <ImageList sx={{ width: 1000, margin: 'auto' }} cols={6} rowHeight={164}>
        {photos.map(({ id, title, url }) => (
          <ImageListItem key={id}>
            <img
              src={`${url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
