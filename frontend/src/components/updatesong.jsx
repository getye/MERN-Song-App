import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { updateSong } from '../services/songActions';

const Box = styled.div`
  margin-top: 5px;
  width: 30%;
  margin-left:30%;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 80%;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 85%;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 80px;
  margin-left:30%;
`;

// ... (Your other styled components)

export const UpdateSongForm = ({ song, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: song.title,
    artist: song.artist,
    album: song.album,
    genre: song.genre,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateSong(song.id, formData));
    onClose(); // Close the modal after submitting
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}/>
          <Label htmlFor="artist">Artist:</Label>
        <Input 
          type="text" 
          id="artist" 
          name="artist" 
          required 
          value={formData.artist} 
          onChange={handleChange} />
    
          <Label htmlFor="album">Album:</Label>
          <Input 
            type="text" 
            id="album" 
            name="album" 
            required 
            value={formData.album} 
            onChange={handleChange} />
     
          <Label htmlFor="genre">Genre:</Label>
          <Select 
            id="genre" 
            name="genre" 
            required 
            value={formData.genre} 
            onChange={handleChange}>
            <option value="">Select Genre</option>
            {['Tizeta', 'Ambasel', 'Bati', 'Anchihoye'].map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Select>
      </div>
      <Button type="submit">Update Song</Button>
    </FormContainer>
  );
};

