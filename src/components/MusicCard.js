import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const TestBlock = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  position: 'static',
  width: '200px',
  height: '245px',
});

const ActionArea = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'column',
});

const CardActionButton = styled(IconButton)({
  position: 'absolute',
  zIndex: '1',
  alignSelf: 'flex-end',
  padding: 0,
  backgroundColor: '#FFFFFF44',
  justifyContent: 'center',
  '&:hover': {
    background: '#EEEEEE',
  },
});

const MusicNameArea = styled(CardContent)({
  display: 'flex',
  padding: 0,
  height: 45,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const MusicCard = ({ imageLink, musicLink }) => {
  const MusicAdd = useCallback(() => {
    console.log(musicLink);
  }, [musicLink]);
  const showDetail = useCallback(() => {
    console.log('Houseplan');
  }, []);

  return (
    <TestBlock>
      <CardActionButton onClick={showDetail}>
        <AddCircleOutlineIcon />
      </CardActionButton>
      <ActionArea onClick={MusicAdd}>
        <CardMedia
          component="img"
          image={imageLink}
          alt="Contemplative Reptile"
          title="MusicName"
          height={200}
          style={{ width: 200 }}
        />
        <MusicNameArea>
          <Typography>MusicName</Typography>
        </MusicNameArea>
      </ActionArea>
    </TestBlock>
  );
};

MusicCard.propTypes = {
  imageLink: PropTypes.string,
  musicLink: PropTypes.string,
};

MusicCard.defaultProps = {
  imageLink:
    'https://w.namu.la/s/2b00f887323e43bff3a8fc205696d6ea47b635a8b311988ebbd959ebb19491ee33a4cbd966724fb008bce7b1d0df861a9bc9047c4564d0833ff68e7225bed47904299de824e55070a009c101ab6abb6f539c49bf1afbd21937cb607388a5fc3d',
  musicLink: 'NanNan',
};
export default MusicCard;
