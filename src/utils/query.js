import { gql } from 'apollo-boost';

export const ARTISTS_QUERY = gql`
  {
    artists {
      name
      albums {
        albumId
        artist
        cover
        title
      }
    }
  }
`;

export const ALBUMS_QUERY = gql`
  {
    albums {
      albumId
      title
      artist
      cover
    }
  }
`;
export const TRACKS_QUERY = gql`
  {
    tracks {
      album
      albumId
      albumArtist
      artist
      cover
      title
      trackId
      trackNumber
      url
    }
  }
`;

export const ALBUM_QUERY = gql`
  query getAlbum($albumId: Int!) {
    album(albumId: $albumId) {
      albumId
      title
      artist
      cover
      tracks {
        artist
        title
        trackId
        trackNumber
        url
      }
    }
  }
`;

export const REMOVE_TRACK = gql`
  mutation RemoveTrack($trackId: String!) {
    removeTrack(trackId: $trackId)
  }
`;

export const REMOVE_ALBUM = gql`
  mutation RemoveAlbum($AlbumId: Int!) {
    removeAlbum(albumId: $AlbumId)
  }
`;

export const UPDATE_TRACK = gql`
  mutation UpdateTrack(
    $trackId: String!
    $album: String!
    $albumArtist: String!
    $artist: String!
    $title: String!
    $trackNumber: Int!
  ) {
    updateTrack(
      trackId: $trackId
      album: $album
      albumArtist: $albumArtist
      artist: $artist
      title: $title
      trackNumber: $trackNumber
    ) {
      trackId
    }
  }
`;

export const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($albumId: Int!, $album: String!, $albumArtist: String!) {
    updateAlbum(albumId: $albumId, artist: $albumArtist, title: $album) {
      albumId
    }
  }
`;
