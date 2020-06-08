import React from 'react';
import Grid from '@material-ui/core/Grid';
import './ViewingRoom.scss';

const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export default function ViewingRoom({ src, size }: { src: string, size: number[] }) {
  const [innerWidth, innerHeight] = useWindowSize();
  const [width, height] = size;
  const isLandscape: boolean = width > height;

  return (
    <Grid container className="container">
      <Grid item xs={2} sm={3} />
      <Grid container direction="column" item xs={8} sm={6}>
        <Grid item className="heightGrid" />
        <Grid container direction="column" item xs className="imageContainer">
          <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternOverlay" style={{ maxWidth: innerWidth / 4, left: 0 }} />
          <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternOverlay" style={{ maxWidth: innerWidth / 4, right: 0 }} />
          <Grid item className="crop">
            <img src={src} alt="ViewingRoomImage" id="viewing-image" />
          </Grid>
        </Grid>
        <Grid item className="heightGrid" />
      </Grid>
      <Grid item xs={2} sm={3} />
    </Grid>
  );
}
