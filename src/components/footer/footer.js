import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import ItemStatusFilter from '../task-filter';

export default class Footer extends Component {
  render() {
    const { toDo, onSelected, filter, onDeletedCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <ItemStatusFilter onSelected={onSelected} filter={filter} />
        <button className="clear-completed" onClick={onDeletedCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  toDo: 0,
  onSelected: () => {},
  filter: 'All',
  onDeletedCompleted: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number,
  onSelected: PropTypes.func,
  filter: PropTypes.string,
  onDeletedCompleted: PropTypes.func,
};
