import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = () => (
  // <ContentLoader
  //   className='pizza-block'
  //   speed={3}
  //   width={280}
  //   height={500}
  //   viewBox='0 0 280 500'
  //   backgroundColor='#f3f3f3'
  //   foregroundColor='#ecebeb'>
  //   {/* <circle cx='139' cy='136' r='125' /> */}
  //   <rect x='0' y='26' rx='10' ry='10' width='280' height='190' />
  //   <rect x='0' y='326' rx='10' ry='10' width='280' height='88' />
  //   <rect x='0' y='279' rx='10' ry='10' width='280' height='23' />
  //   <rect x='0' y='436' rx='10' ry='10' width='95' height='30' />
  //   <rect x='125' y='426' rx='24' ry='24' width='152' height='45' />
  // </ContentLoader>
  <ContentLoader
    speed={2}
    width={300}
    height={500}
    viewBox='0 0 300 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <rect x='0' y='344' rx='8' ry='8' width='300' height='78' />
    <rect x='155' y='446' rx='11' ry='11' width='143' height='45' />
    <rect x='0' y='286' rx='9' ry='9' width='300' height='34' />
    <rect x='0' y='449' rx='0' ry='0' width='95' height='43' />
    <rect x='-1' y='0' rx='24' ry='24' width='300' height='257' />
  </ContentLoader>
)

export default Skeleton
