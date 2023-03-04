import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  render() {
    const { label, date, onDeleted, onToggleEditing, onToggleCompleted, specialStatus } = this.props;

    let completed = false;

    if (specialStatus === 'completed') {
      completed = true;
    }

    return (
      <span>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onToggleCompleted} />
          <label>
            <span className="description">{label}</span>
            {/* <span className="created">created 5 minutes ago </span> */}
            <span className="created">created {formatDistanceToNow(date)} ago</span>
            {/* <span className="created">created {String(date)} ago</span> */}
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue={label}></input>
      </span>
    );
  }
}

Task.defaultProps = {
  label: 'Default label',
  date: new Date('01.01.1970'),
  onDeleted: () => {},
  onToggleEditing: () => {},
  onToggleCompleted: () => {},
  specialStatus: undefined,
};

Task.propTypes = {
  label: PropTypes.string,
  date: PropTypes.object,
  onDeleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  specialStatus: undefined || PropTypes.string,
};
