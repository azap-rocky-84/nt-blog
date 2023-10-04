import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero';
import Articles from './container/Articles';
import Quotes from './container/Quotes';

const HomePage = () => {
  return <MainLayout>
    <Hero />
    <Articles/>
    <Quotes/>
  </MainLayout>
};

export default HomePage
