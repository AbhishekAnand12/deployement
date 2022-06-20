import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Item from './style';
import './styles.css';

const breakPoints = [
  { width: 99, itemsToShow: 1 },
  { width: 250, itemsToShow: 2 },
  { width: 350, itemsToShow: 3 },
];

const Caurosel = (props) => {
  const { cauroselData } = props;
  return (
    <>
      <h4 style={{ textAlign: 'center' }}>
        Good Points and Improvement Required
      </h4>
      <div style={{ marginLeft: 50 }}>
        <Typography
          variant="p"
          component="p"
          style={{
            display: 'inline-block', color: ('grey'), marginRight: 850,
          }}
        >
          <b> Good Points</b>
          {' '}
          :
          {' '}
          {cauroselData.length}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{
            display: 'inline-block', color: ('grey'), textAlign: 'right',
          }}
        >
          <b> Improvement Points</b>
          {' '}
          :
          {' '}
          {cauroselData?.length}
        </Typography>
      </div>
      <hr />
      <div className="caurosel">
        <Carousel breakPoints={breakPoints}>
          {cauroselData.map((e) => (
            <Item>{e.goodPoints}</Item>
          ))}
        </Carousel>
        <Carousel breakPoints={breakPoints}>
          {cauroselData.map((e) => (
            <Item>{e.improvementRequired}</Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

Caurosel.propTypes = {
  cauroselData: PropTypes.arrayOf(PropTypes.string),
};

Caurosel.defaultProps = {
  cauroselData: [],
};

export default Caurosel;
