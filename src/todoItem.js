import React from "react";
import ReactTooltip from "react-tooltip";

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.todoItem.done,
      category: props.todoItem.category
    };
  }

  toggleDone = () => {
    fetch(
      `https://family-chores-evolved.herokuapp.com/todo/${
        this.props.todoItem.id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.props.todoItem.title,
          done: !this.state.done,
          category: this.state.category
        })
      }
    )
      .then(
        this.setState({
          done: !this.state.done
        })
      )
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="todo-item-wrapper">
        <div
          onClick={this.toggleDone}
          type="checkbox"
          defaultChecked={this.state.done}
          className={
            this.state.category ===
            "daily" /*this.state.category instead of "daily"*/
              ? "todo-item"
              : "hide"
          }
        >
          <ReactTooltip />
          <div data-tip="Delete">
            <i
              className="delete-btn"
              onClick={() => this.props.deleteItem(this.props.todoItem.id)}
              class="far fa-trash-alt"
            />
          </div>

          <p className={this.state.done ? "done" : null}>
            {this.state.category === "daily" ? this.props.todoItem.title : null}
          </p>
        </div>
      </div>
    );
  }
}
