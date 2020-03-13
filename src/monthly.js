import React from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";

// import Logo from "./images/chores-logo.png";

import TodoItem from "./todoItem";
import Navbar from "./navbar";

import "./styles.css";

export default class Monthly extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: "",
      todos: [],
      category: "weekly", // remember to set the category
      pageView: "weekly"
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

  dropChange = event => {
    this.setState({
      category: event.target.value,
      pageView: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <Logo /> */}
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
            <select onChange={this.dropChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button className="add-btn" type="submit">
              <i class="far fa-plus-square" />
            </button>
          </p>
          <ReactTooltip />
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
