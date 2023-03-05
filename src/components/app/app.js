import React, { Component } from 'react';

import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 100;

    this.state = {
      todoData: [this.createTask('Drink Coffee'), this.createTask('Make Awesome App'), this.createTask('Have a lunch')],
      filter: 'All',
    };

    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onToggleCompleted = this.onToggleCompleted.bind(this);
    this.onToggleEditing = this.onToggleEditing.bind(this);
    this.select = this.select.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  createTask(label) {
    return { label, id: this.maxId++, date: new Date() };
  }

  deleteTask(id) {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      //Нельзя изменять входящий массив
      // const before = todoData.slice(0, idx);
      // const after = todoData.slice(idx + 1);
      // const newArray = [...before, ...after];
      //Проще деструктуризацией копию сделать
      let newArray = [...todoData];

      newArray.splice(idx, 1);

      return {
        todoData: newArray,
      };
    });
  }

  addTask(text) {
    const newTask = this.createTask(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  }

  toggleProperty(arr, id, className, event) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldTask = arr[idx];

    let newTask = { ...oldTask };

    let newArray = [...arr];

    if (newTask.specialStatus === null || newTask.specialStatus === undefined) {
      newTask.specialStatus = className;
    } else if (className !== 'editing') {
      newTask.specialStatus = null;
    }

    if (event !== undefined) {
      newTask.label = event.target.value;
    }

    newArray.splice(idx, 1, newTask);

    return newArray;
  }

  onToggleCompleted(id) {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  }

  onToggleEditing(id) {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      };
    });
  }

  select(event) {
    this.setState({ filter: event.target.name });
  }

  filterTodoData(todoData) {
    let newTodoData = [...todoData];

    if (this.state.filter !== 'All') {
      newTodoData = newTodoData.filter((element) => {
        if (this.state.filter === 'Active') {
          return element.specialStatus !== 'completed';
        } else {
          return element.specialStatus === 'completed';
        }
      });
    }

    return newTodoData;
  }

  onDeletedCompleted(todoData) {
    let newTodoData = [...todoData];

    newTodoData = newTodoData.filter((element) => {
      return element.specialStatus !== 'completed';
    });

    this.setState({ todoData: newTodoData });
  }

  onSave(event, id) {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, null, event),
      };
    });
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.specialStatus === 'completed').length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={this.filterTodoData(this.state.todoData)}
            onDeleted={this.deleteTask}
            onToggleEditing={this.onToggleEditing}
            onToggleCompleted={this.onToggleCompleted}
            onSave={this.onSave}
          />
          <Footer
            toDo={todoCount}
            onSelected={this.select}
            filter={this.state.filter}
            onDeletedCompleted={() => this.onDeletedCompleted(todoData)}
          />
        </section>
      </section>
    );
  }
}
