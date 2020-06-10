import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import MusicViewer from '../components/MusicViewer';

const ALBUM_QUERY = gql`
  {
    albums {
      albumId
      title
      artist
      cover
      tracks {
        trackId
        title
        trackNumber
        artist
        url
      }
    }
  }
`;

const Album = () => {
  const { loading, data } = useQuery(ALBUM_QUERY);

  const musics = data
    ? data.albums
        .map((album) =>
          album.tracks.map((track) => ({
            musicId: track.trackId,
            title: track.title,
            artist: track.artist,
            album: album.title,
            imageLink: album.cover,
            audioLink: track.url,
          })),
        )
        .reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue),
          [],
        )
    : [];
  console.log(musics);

  if (loading) return 'Loading...';
  return <MusicViewer musics={musics} />;
};

export default Album;
