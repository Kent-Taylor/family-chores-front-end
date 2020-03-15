import React from "react";
import axios from "axios";

import TodoItem from "./todoItem";
import washer from "./images/washer.png";

import "./styles.css";

export default class Daily extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: "",
      todos: [],
      category: "daily", // remember to set the category
      dropCategory: "daily",
      isLoading: true
    };
  }

  componentDidMount() {
    fetch("https://family-chores-evolved.herokuapp.com/todos")
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: data,
          isLoading: false
          // category: this.state.dropCategory
        })
      );
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todoItem={todo}
          deleteItem={this.deleteItem}
          category={todo.category}
          dropCategory={this.state.dropCategory}
        />
      );
    });
  };

  getCategory = () => {
    fetch(`https://family-chores-evolved.herokuapp.com/todos`, {
      method: "get"
    }).then(response => {
      console.log("gettting", response.data);

      this.setState({
        testCategory: this.state.todos.filter(item => {
          return item.category;
        })
      });
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
      dropCategory: event.target.value
    });
  };

  // clickChange = often => {
  //   this.setState({
  //     category: often,
  //     dropCategory: often
  //   });
  // };

  render() {
    return (
      <div className="App">
        <div className="root heading">Family Chores</div>
        <form onSubmit={this.handleSubmit} className="add-todo">
          <input
            className="todo-input"
            type="text"
            placeholder="New Chore"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          {/* <div className="drop-container">
            <div className="add-to-txt"> </div>
            <select className="dropdown" onChange={this.dropChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div> */}
          <button className="add-btn" type="submit">
            <i class="fas fa-plus" />
          </button>
          <div className="page-view-wrapper">
            <button
              type="button"
              return
              false
              className={
                this.state.category === "daily" ? "page-view" : "page-view dim"
              }
              value="daily"
              onClick={this.dropChange}
            >
              daily
            </button>
            <button
              type="button"
              return
              false
              className={
                this.state.category === "weekly" ? "page-view" : "page-view dim"
              }
              value="weekly"
              onClick={this.dropChange}
            >
              weekly
            </button>{" "}
            <button
              type="button"
              return
              false
              className={
                this.state.category === "monthly"
                  ? "page-view"
                  : "page-view dim"
              }
              value="monthly"
              onClick={this.dropChange}
            >
              monthly
            </button>
          </div>
          <div className="render-view">{this.renderTodos()}</div>

          {this.state.isLoading ? (
            <div className="washing-machine">
              <div className="washer-button">O</div>
              <img src={washer} className="loader" alt="Loading..." />
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
