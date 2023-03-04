import React, { Component } from "react";

import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    //Значение не зависит от предыдущего значения, можно писать синхронный
    //код и передать просто объект, а не функцию
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onTaskAdded(this.state.label);
    this.setState({ label: "" });
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            this.onSubmit(event);
          }
        }}
        onChange={this.onLabelChange}
        value={this.state.label}
      />
    );
  }
}
