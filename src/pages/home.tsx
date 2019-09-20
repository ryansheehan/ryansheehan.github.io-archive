import React from 'react';
import {SeriesList} from '../components/series-list/SeriesList';
import { LatestPosts } from '../components/latest-posts/LatestPosts';
import { ParticleField } from '../components/particle-field/ParticleField';

const Home: React.FC<{}> = () => {
  return (
    <div>
      <SeriesList></SeriesList>
      <LatestPosts></LatestPosts>
      <div style={{display: 'flex', flexFlow: 'column', alignItems:'center'}}>
        <ParticleField></ParticleField>
      </div>
    </div>
  )
}

export default Home;