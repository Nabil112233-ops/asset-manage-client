import React from 'react';
import Banner from '../HeroBanner/Banner';
import About from '../About/About';
import Features from '../Features/Features';
import Testimonals from '../Testimonals/Testimonals';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Features></Features>
            <Testimonals></Testimonals>
        </div>
    );
};

export default Home;