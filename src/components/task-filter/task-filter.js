import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

export default class TaskFilter extends Component {
  render() {
    const { onSelected, filter } = this.props;

    let allClassName;
    let activeClassName;
    let completedClassName;

    if (filter === 'Active') {
      activeClassName = 'selected';
    } else if (filter === 'Completed') {
      completedClassName = 'selected';
    } else {
      allClassName = 'selected';
    }

    return (
      <ul className="filters">
        <li>
          <button className={allClassName} onClick={onSelected} name="All">
            All
          </button>
        </li>
        <li>
          <button className={activeClassName} onClick={onSelected} name="Active">
            Active
          </button>
        </li>
        <li>
          <button className={completedClassName} onClick={onSelected} name="Completed">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TaskFilter.defaultProps = {
  onSelected: () => {},
  filter: 'All',
};

TaskFilter.propTypes = {
  onSelected: PropTypes.func,
  filter: PropTypes.string,
};
