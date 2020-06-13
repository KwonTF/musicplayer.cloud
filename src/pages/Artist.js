import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { musicUploaded } from '../utils/music';
import MusicViewer from '../components/MusicViewer';

const ARTIST_QUERY = gql`
  {
    artists {
      name
      albums {
        albumId
        artist
        cover
        title
        tracks {
          artist
          title
          trackId
          trackNumber
          url
        }
      }
    }
  }
`;

const SortedBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Artist = () => {
  // const { loading, data } = useQuery(ALBUM_QUERY);
  const dispatch = useDispatch();
  const { isMusicUploaded } = useSelector(({ music }) => ({
    isMusicUploaded: music.uploaded,
  }));
  const { loading, data, refetch } = useQuery(ARTIST_QUERY);
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
    const artistMusics = data.artists.map((artistItem) => ({
      name: artistItem.name,
      tracks: artistItem.albums.reduce(
        (result, albumItem) =>
          result.concat(
            albumItem.tracks.map((track) => ({
              ...track,
              musicId: track.trackId,
              audioLink: track.url,
              imageLink: albumItem.cover,
              albumId: albumItem.albumId,
              album: albumItem.title,
              albumArtist: albumItem.artist,
              track: parseInt(track.trackNumber, 10),
            })),
          ),
        [],
      ),
    }));
    return (
      <>
        {artistMusics.length !== 0 ? (
          <SortedBox>
            {artistMusics.map((artist) => {
              if (artist.tracks.length !== 0)
                return (
                  <MusicViewer
                    key={artist.name}
                    title={artist.name}
                    musics={artist.tracks}
                  />
                );
              return null;
            })}
          </SortedBox>
        ) : (
          <>No Musics!</>
        )}
      </>
    );
  }

  return <>No Musics!</>;
};

export default Artist;
