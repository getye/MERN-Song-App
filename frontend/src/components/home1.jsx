import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSongs } from '../services/songActions.ts';
import { PieChart, Pie, Cell } from 'recharts';
import styled from '@emotion/styled';

const MainContainer = styled.div`
  padding-left: 25px;
  padding-top: 5%;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
`;

const BarChartContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
  padding-bottom: 5%;
  padding-right: 4%;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`;

const PieChartContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
  padding-bottom: 5%;
  padding-right: 4%;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-bottom: 3%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const TableBox = styled.div`
  box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
`;

const ChartTitle = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;

const TableTitle = styled.h4`
  text-align: left;
  padding-bottom: 8px;
`;

const COLORS = ['#6088FE', '#800080', '#0FBB28', '#CF8042'];

export const Home = () => {
  const { songs } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const totalSongs = songs.length;
  const totalArtists = new Set(songs.map(song => song.artist)).size;
  const totalAlbums = new Set(songs.map(song => song.album)).size;
  const totalGenres = new Set(songs.map(song => song.genre)).size;

  const barGraphData = [
    { name: 'Songs', count: totalSongs },
    { name: 'Artists', count: totalArtists },
    { name: 'Albums', count: totalAlbums },
    { name: 'Genres', count: totalGenres },
  ];

  const genreCount = songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(genreCount).map((genre) => ({
    name: genre,
    value: genreCount[genre],
  }));

 // Aggregate data: number of songs and distinct albums per artist
const artistData = songs.reduce((acc, song) => {
    if (!acc[song.artist]) {
      acc[song.artist] = { songsCount: 0, albums: new Set() };
    }
    acc[song.artist].songsCount += 1;
    acc[song.artist].albums.add(song.album);
    return acc;
  }, {});
  
  // Convert the artistData object into an array for rendering
  const artistDataArray = Object.keys(artistData).map((artist) => ({
    artist,
    songsCount: artistData[artist].songsCount,
    albumsCount: artistData[artist].albums.size,
  }));
  

  return (
    <MainContainer>
      <ChartContainer>
        <BarChartContainer>
          <ResponsiveContainer width="90%" height={400}>
            <ChartTitle>Number of Songs, Artists, Albums, and Genres</ChartTitle>
            <BarChart
              data={barGraphData}
              margin={{ top: 10, right: 35, left: 20, bottom: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartContainer>
        <PieChartContainer>
          <ResponsiveContainer width="90%" height={400}>
            <ChartTitle>Number of Songs per Genre</ChartTitle>
            <PieChart>
              <Legend layout="vertical" verticalAlign="top" align="right" />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </PieChartContainer>
      </ChartContainer>
      <TableContainer>
        <TableBox>
          <TableTitle>Number of Songs and Albums of Artists</TableTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Artist</TableHeader>
                <TableHeader>Number of Songs</TableHeader>
                <TableHeader>Number of Albums</TableHeader>
              </tr>
            </thead>
            <tbody>
              {artistDataArray.map((data) => (
                <tr key={data.artist}>
                  <TableCell>{data.artist}</TableCell>
                  <TableCell>{data.songsCount}</TableCell>
                  <TableCell>{data.albumsCount}</TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableBox>
      </TableContainer>
    </MainContainer>
  );
};
