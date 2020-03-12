import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";

import TodoItem from "./todoItem";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todo: "",
      todos: [],
      category: "daily" // remember to set the category
    };
  }

  componentDidMount() {
    fetch("https://family-chores-evolved.herokuapp.com/todos")
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <TodoItem key={todo.id} todoItem={todo} deleteItem={this.deleteItem} />
      );
    });
  };

  handleChange = event => {
    this.setState({
      todo: event.target.value
    });
    console.log(this.state.todo);
  };

  handleSubmit = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://family-chores-evolved.herokuapp.com/add-todo",
      headers: { "content-type": "application/json" },
      data: {
        title: this.state.todo,
        category: this.state.category,
        done: false
      }
    })
      .then(data => {
        this.setState({
          todos: [...this.state.todos, data.data],
          todo: ""
        });
      })
      .catch(error => console.log(error));
  };

  deleteItem = id => {
    fetch(`https://family-chores-evolved.herokuapp.com/todo/${id}`, {
      method: "DELETE"
    }).then(
      this.setState({
        todos: this.state.todos.filter(item => {
          return item.id !== id;
        })
      })
    );
  };

  render() {
    return (
      <div className="App">
        <div className="root heading">Family Chores</div>
        {/* TODO the list is currently rendering only categories of "daily". Create
            a dropdown or buttons or toggle to be able to toggle between categories */}
        <form onSubmit={this.handleSubmit} className="add-todo">
          <input
            className="todo-input"
            type="text"
            placeholder="New Chore"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <p data-tip="Add to List">
            <button className="add-btn" type="submit">
              +
            </button>
          </p>
          <ReactTooltip />
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
