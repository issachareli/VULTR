import React from 'react';
var spin = require('./styles/spin.svg');
var bars = require('./styles/bars.svg');
var puff = require('./styles/puff.svg');
var dots = require('./styles/dots.svg');

if(process.env.NODE_ENV === 'production'){
  spin = `${process.env.PUBLIC_URL}/static/media/spin.svg`;
  bars = `${process.env.PUBLIC_URL}/static/media/bars.svg`;
  puff = `${process.env.PUBLIC_URL}/static/media/puff.svg`;
  dots = `${process.env.PUBLIC_URL}/static/media/dots.svg`;
}

export default function Loader({ small, type }) {
  let loaderType;

  const size = small ? 'small' : '';

  if (type === 'spin') {
    loaderType = spin;
  } else if (type === 'bars') {
    loaderType = bars;
  } else if (type === 'puff') {
    loaderType = puff;
  } else if (type === 'dots') {
    loaderType = dots;
  } else {
    loaderType = spin;
  }

  return (
    <div className={`loader ${size}`} style={{ backgroundImage: `url(${loaderType})` }}>
      Loading...
    </div>
  );
}
