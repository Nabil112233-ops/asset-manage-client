import React from 'react';
import Banner from '../HeroBanner/Banner';
import About from '../About/About';
import Features from '../Features/Features';
import Testimonals from '../Testimonals/Testimonals';
import HowItWorks from '../How It Works/HowItWorks';
import Faq from '../FAQ/Faq';
import Contract from '../Contract/Contract';
import Packages from '../Packages/Packages';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
            <Features></Features>
            <Testimonals></Testimonals>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
            <Contract></Contract>
        </div>
    );
};

export default Home;