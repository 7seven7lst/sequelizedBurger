import 'grommet/scss/vanilla/index';
import React, { PropTypes } from 'react';
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';

import Footer from './Footer';
import AddCustomer from './AddCustomer';
import AddBurger from './AddBurger';
import VisibleBurgerList from './VisibleBurgerList';

const App = () => (
  <div>
    <Hero background={<Image src='/assets/images/hero.png'
      fit='cover'
      full={true} />}
      backgroundColorIndex='dark'>
      <Box direction='row'
        justify='center'
        align='center'>
        <Box basis='1/2'
          align='end'
          pad='medium' />
        <Box basis='1/2'
          align='end'
          pad='medium'>
          <Heading margin='none'>
            The Burger Palace
          </Heading>
        </Box>
      </Box>
    </Hero>
    <AddCustomer />
    <AddBurger />
    <VisibleBurgerList />
    <Footer />
  </div>
);

App.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string,
  }),
};

export default App;
