import React, { useCallback } from 'react';
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

const MusicViewerBlock = styled(Box)({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

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

const MusicViewer = () => {
  const MusicAdd = useCallback((e) => {
    console.log(e.target.title);
  }, []);

  return (
    <MusicViewerBlock>
      <p>MusicViewerBlock</p>
      <TestBlock>
        <ActionArea onClick={MusicAdd} title="MusicLink">
          <div style={{ height: 250, width: 250, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image="https://w.namu.la/s/78324f93b5e26fdf201d9fff41b58577f046bda4a980f1d58be514b2d47cb8ba6aba38d47e09e98392ccd00e07483a747314135a0dfee8fd100106d0b2867943555c7d8cb90e72fe3f6f3544af21ae6931fb62f4acfe29990871d8a9a48c76310ae2585572bf66e3975081471e356843"
              alt="Contemplative Reptile"
              title="MusicLink"
              style={{ width: 'auto' }}
            />
          </div>
          <CardContent title="MusicLink">MusicName</CardContent>
        </ActionArea>
        <CardActions>
          <CardActionButton>Fix</CardActionButton>
          <CardActionButton>Edit</CardActionButton>
        </CardActions>
      </TestBlock>
    </MusicViewerBlock>
  );
};

export default MusicViewer;
