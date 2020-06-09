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

export default function ViewingRoom({ src }: { src: string }) {
  const [imgDimension, setImgDimension] = React.useState<number[]>([]);
  const [containerDimension, setContainerDimension] = React.useState<number[]>([]);
  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgDimension([img.width, img.height, img.width / img.height]);
    };
    img.src = src;
  }, [src]);

  React.useEffect(() => {
    console.log(containerDimension);
  }, [containerDimension]);

  React.useEffect(() => {
    if (innerWidth >= 600) {
      setContainerDimension([innerWidth * 0.5, innerHeight * 0.6,
        (innerWidth / innerHeight) * (0.5 / 0.6)]);
    } else {
      setContainerDimension([innerWidth * (2 / 3), innerHeight * 0.6,
        (innerWidth / innerHeight) * (10 / 9)]);
    }
  }, [innerWidth, innerHeight]);

  return (
    <Grid container className="container">
      <Grid item xs={2} sm={3} />
      <Grid container direction="column" item xs={8} sm={6} id="max-height">
        <Grid item className="heightGrid" />
        <Grid container item xs className="widthContainer">
          {imgDimension[0] > imgDimension[1]
            ? (
              <>
                <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternLandscape" style={{ maxWidth: innerWidth / 4, left: 0 }} />
                <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternLandscape" style={{ maxWidth: innerWidth / 4, right: 0 }} />
              </>
            ) : (
              <img src={`${process.env.PUBLIC_URL}/lantern.png`} alt="lantern" className="lanternPortrait" style={{ maxWidth: innerWidth / 4 }} />
            )}
          <div className="imageContainer">
            {containerDimension[2] > imgDimension[2]
              ? (
                <img
                  src={src}
                  alt="ViewingRoomImage"
                  style={{ height: containerDimension[1] }}
                  className="image"
                />
              ) : (
                <img
                  src={src}
                  alt="ViewingRoomImage"
                  style={{ width: containerDimension[0] }}
                  className="image"
                />
              )}
          </div>
        </Grid>
        <Grid item className="heightGrid" />
      </Grid>
      <Grid item xs={2} sm={3} />
    </Grid>
  );
}
