import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleEditing, onToggleCompleted } = this.props;

    const elements = todos.map((item) => {
      // const { id, ...rest } = item;
      const { id, ...itemProps } = item;

      return (
        <li key={id} className={itemProps.specialStatus}>
          <Task
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleEditing={() => onToggleEditing(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

//Сначала срабатывает defaultProps, потом propTypes
TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleEditing: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  // onDeleted: (props, propName, componentName) => {
  //   const value = props[propName];

  //   if (typeof value === "function") {
  //     return null;
  //   }

  //   return new TypeError(`${componentName}: ${propName} must be function`);
  // },
  onDeleted: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};
