import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={365}
    viewBox='0 0 280 365'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <rect x='0' y='2' rx='5' ry='5' width='280' height='265' />
    <rect x='1' y='277' rx='5' ry='5' width='220' height='16' />
    <rect x='47' y='249' rx='0' ry='0' width='1' height='6' />
    <rect x='3' y='326' rx='5' ry='5' width='220' height='32' />
    <rect x='235' y='277' rx='5' ry='5' width='40' height='35' />
    <rect x='235' y='322' rx='5' ry='5' width='40' height='35' />
    <rect x='1' y='300' rx='5' ry='5' width='220' height='16' />
  </ContentLoader>
);

export default Loader;
