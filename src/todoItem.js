import React from "react";

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.todoItem.done,
      category: props.category,
      dropCategory: props.dropCategory
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

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      category: props.category,
      dropCategory: props.dropCategory
    });
  }

  render() {
    return (
      <div
        className={
          this.state.category === this.state.dropCategory
            ? "todo-item-wrapper"
            : "hide"
        }
      >
        <div
          onClick={this.toggleDone}
          type="checkbox"
          defaultChecked={this.state.done}
          className={
            this.state.dropCategory === this.state.category
              ? "todo-item"
              : "hide"
          }
        >
          <div data-tip="Delete">
            <i
              className="delete-btn"
              onClick={() => this.props.deleteItem(this.props.todoItem.id)}
              class="far fa-trash-alt"
            />
          </div>

          {this.state.category === this.state.pageView
            ? this.show(this.state.pageView)
            : null}
          <div className="todo-text-container">
            <p className={this.state.done ? "done" : null}>
              {this.props.todoItem.category === "monthly"
                ? this.props.todoItem.title
                : this.props.todoItem.category === "weekly"
                ? this.props.todoItem.title
                : this.props.todoItem.category === "daily"
                ? this.props.todoItem.title
                : null}
            </p>
          </div>
          <i
            class={
              this.state.done
                ? "fas fa-check done-check"
                : "fas fa-check not-done-check"
            }
          />
        </div>
      </div>
    );
  }
}
