import React from 'react';
import {SeriesList} from '../components/series-list/SeriesList';
import { LatestPosts } from '../components/latest-posts/LatestPosts';

const Home: React.FC<{}> = () => {
  return (
    <div>
      <SeriesList></SeriesList>
      <LatestPosts></LatestPosts>
    </div>
  )
}

export default Home;