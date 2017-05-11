import React, { PropTypes } from 'react';
import Card from 'grommet/components/Card';

const Burger = ({ onClick, devoured, burger_name, customer }) => (

  <Card
    thumbnail='/assets/images/hero.png'
    heading={burger_name}
    description= {burger_name + " ordered By : " + customer.customer_name}
    onClick={onClick}
    style={{
      textDecoration: devoured ? 'line-through' : 'none',
    }}
  >
    
  </Card>
);

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  devoured: PropTypes.bool.isRequired,
  burger_name: PropTypes.string.isRequired,
  customer: PropTypes.object.isRequired,
};

export default Burger;
