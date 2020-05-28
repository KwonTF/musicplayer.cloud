import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

const TestBlock = styled(Card)({
  backgroundColor: '#FFFFFF',
});

const ActionArea = styled(CardActionArea)({
  display: 'inline-flex',
  flexDirection: 'column',
  flexFlow: 'nowrap',
});

const CardActionButton = styled(Button)({
  fontSize: '0.8rem',
});

const MediaBox = styled(Box)({ height: 200, width: 200, overflow: 'hidden' });

const MusicCard = ({ imageLink, musicLink }) => {
  const MusicAdd = useCallback(() => {
    console.log(musicLink);
  }, [musicLink]);

  const onDelete = useCallback(() => {
    console.log('Ctrl Alt Del');
  }, []);

  const onEdit = useCallback(() => {
    console.log('Houseplan');
  }, []);

  return (
    <TestBlock>
      <ActionArea onClick={MusicAdd}>
        <MediaBox>
          <CardMedia
            component="img"
            image={imageLink}
            alt="Contemplative Reptile"
            title="MusicName"
            style={{ width: 'auto' }}
          />
        </MediaBox>
        <CardContent>MusicName</CardContent>
      </ActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardActionButton onClick={onEdit}>Fix</CardActionButton>
        <CardActionButton onClick={onDelete}>Edit</CardActionButton>
      </CardActions>
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
