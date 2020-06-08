import React from 'react';
import Grid from '@material-ui/core/Grid';
import './ViewingRoom.scss';

export default function ViewingRoom({ src, size }: { src: string, size: number[] }) {
  const [lanternWidth, setLanternWidth] = React.useState<number>(window.innerWidth / 3);
  const [width, height] = size;
  const isLandscape: boolean = width > height;

  return (
    <Grid container className="container">
      <Grid item xs={2} sm={3} />
      <Grid container direction="column" item xs={8} sm={6} className="imageContainer">
        <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternOverlay" style={{ maxWidth: window.innerWidth / 3 }} />
        <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternOverlay2" style={{ maxWidth: window.innerWidth / 3 }} />
        <div className="crop">
          <img src={src} alt="ViewingRoomImage" id="viewing-image" />
        </div>
      </Grid>
      <Grid item xs={2} sm={3} />
    </Grid>
  );
}
