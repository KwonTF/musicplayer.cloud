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
  const query = useQuery(ALBUM_QUERY);
  console.log(query);
  return <p>asdf</p>;
};

export default Album;
