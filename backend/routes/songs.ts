import { Router, request, response } from 'express';
import Song from '../models/song';

const router = Router();

// Create a song
router.post('/addsong', async (req: request, res: response) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.send(song);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create song' });
  }
});

// Read all songs
router.get('/viewsongs', async (req: request, res: response) => {
  try {
    const songs = await Song.find();
    res.send(songs);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch songs' });
  }
});

// Update a song
router.put('/updatesong/:id', async (req: request, res: response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.send(song);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update song' });
  }
});

// Delete a song
router.delete('/songs/:id', async (req: request, res: response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.send({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete song' });
  }
});

export default router;
