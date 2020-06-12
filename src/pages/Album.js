import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MusicViewer from '../components/MusicViewer';
import { musicUploaded } from '../utils/music';

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

const SortedBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Album = () => {
  // const { loading, data } = useQuery(ALBUM_QUERY);
  const dispatch = useDispatch();
  const { isMusicUploaded } = useSelector(({ music }) => ({
    isMusicUploaded: music.uploaded,
  }));
  const { loading, data, refetch } = useQuery(ALBUM_QUERY);
  if (isMusicUploaded) {
    refetch();
    dispatch(musicUploaded());
  }
  /* const musics = data
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
  // console.log(musics); */

  if (loading) return 'Loading...';
  if (data) {
    const albumMusics = data.albums.map((albumItem) => ({
      albumId: albumItem.albumId,
      title: albumItem.title,
      tracks: albumItem.tracks.map((track) => ({
        ...track,
        musicId: track.trackId,
        audioLink: track.url,
        imageLink: albumItem.cover,
        album: albumItem.title,
        track: parseInt(track.trackNumber, 10),
      })),
    }));
    return (
      <>
        {albumMusics.length !== 0 ? (
          <SortedBox>
            {albumMusics.map((album) => (
              <MusicViewer
                key={album.albumId}
                title={album.title}
                musics={album.tracks}
              />
            ))}
          </SortedBox>
        ) : (
          <>No Musics!</>
        )}
      </>
    );
  }

  return <>No Musics!</>;
};

export default Album;
