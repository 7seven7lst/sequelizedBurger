import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleBurgers, getErrorMessage, getIsFetching, getAllCustomers } from '../reducers';
import BurgerList from './BurgerList';
import FetchError from './FetchError';

class VisibleBurgerList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchBurgers } = this.props;
    fetchBurgers(filter);
  }

  render() {
    const { isFetching, errorMessage, toggleBurger, burgers } = this.props;
    if (isFetching && !burgers.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !burgers.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return (
      <BurgerList
        burgers={burgers}
        onBurgerClick={toggleBurger}
      />
    );
  }
}

VisibleBurgerList.propTypes = {
  filter: PropTypes.oneOf(['all', 'available', 'devoured']).isRequired,
  errorMessage: PropTypes.string,
  burgers: PropTypes.array.isRequired,
  customers: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchBurgers: PropTypes.func.isRequired,
  toggleBurger: PropTypes.func.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    burgers: getVisibleBurgers(state, filter),
    customers: getAllCustomers(state, filter),
    filter,
  };
};

VisibleBurgerList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleBurgerList));

export default VisibleBurgerList;
