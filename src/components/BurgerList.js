import React, { PropTypes } from 'react';
import Burger from './Burger';

const BurgerList = ({ burgers, onBurgerClick }) => (
  <ul>
    {burgers.map(burger =>
      <Burger
        key={burger.id}
        {...burger}
        onClick={() => onBurgerClick(burger.id)}
      />
    )}
  </ul>
);

BurgerList.propTypes = {
  burgers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    devoured: PropTypes.bool.isRequired,
    burger_name: PropTypes.string.isRequired,
    customer: PropTypes.object.isRequired,
  }).isRequired).isRequired,
  onBurgerClick: PropTypes.func.isRequired,
};

export default BurgerList;
