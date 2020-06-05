import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ALBUM_QUERY = gql`
  {
    albums {
      title
    }
  }
`;

const Album = () => {
  const { loading, data } = useQuery(ALBUM_QUERY);
  console.log(data);
  if (loading) return 'Loading...';
  return (
    <div>
      {data.albums.map((album) => (
        <p key={album.title}>{album.title}</p>
      ))}
    </div>
  );
};

export default Album;
