let root = ReactDOM.createRoot(document.getElementById("root"));

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.clearItems = this.clearItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      items: ["task 1", "task 2"],
    };
  }

  clearItems() {
    this.setState({
      items: [],
    });
  }

  deleteItem(item) {
    // console.log(item);
    this.setState((prevState) => {
      const arr = prevState.items.filter((i) => {
        return item != i;
      });
      //  console.log(arr+ " :trt9");
      return { items: arr };
    });
  }

  addItem(item) {
    if (!item) {
      return "Enter the element you want to add.";
    } else if (this.state.items.indexOf(item) > -1) {
      return "The element you want to add already exists.";
    }
    this.setState((prevState) => {
      return {
        items: prevState.items.concat(item),
      };

      // console.log(prevState);
    });

    // console.log(item);
  }

  render() {
    const data = {
      title: "Todo App",
      description: "iyi telefonveff",
    };
    return (
      <div className="container my-2">
        <div className="card">
          <div className="card-header">
            <Header 
              title={data.title}
              // description={data.description}
              // gthh="hhgjgkj 1"
            />
          </div>

          <div className="card-body">
            <TodoList
              tasks={this.state.items}
              clear={this.clearItems}
              deleteItem={this.deleteItem}
            />
          </div>
          <div className="card-footer">
            <NewItem addItem={this.addItem} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("component didmount oldu");

    const json_obj = localStorage.getItem("items");
    const items = JSON.parse(json_obj);

    if (items) {
      this.setState({
        items: items,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items.length != this.state.items.length) {
      const json_str = JSON.stringify(this.state.items);
      localStorage.setItem("items", json_str);
    }

    // const json_str = JSON.stringify(this.state.items);
    // console.log(json_str);
    //   localStorage.setItem("items",json_str);
    console.log("TodoApp component güncellendi.");
  }
}

const Header = (props) => {
  return (
    <div>
      <h1 className="h3">{props.title}</h1>
      {/* <p>{props.description}</p>
      <p>{props.gthh}</p> */}
    </div>
  );
};

const TodoList = (props) => {
  return (
    <div>
      <ul className="list-group">
        {props.tasks.map((task, index) => (
          <TodoItem key={index} task={task} deleteItem={props.deleteItem} />
        ))}
      </ul>
      <p>
       
       {
        props.tasks.length > 0 ? 
        <button
        className="btn btn-outline-danger mt-2 float-end"
        onClick={props.clear}
      >
        Clear
      </button>
      :
      <div className="alert alert-warning">Pls, add a task </div>
       }
       
       
      </p>
    </div>
  );
};

const TodoItem = (props) => {
  // console.log("Todoıtem");
  return (
    <li className="list-group-item">
      {props.task}
      <button
        className="btn btn-danger btn-sm float-end"
        onClick={() => {
          props.deleteItem(props.task);
        }}
      >
        x
      </button>
    </li>
  );
};

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      error: "",
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    const item = e.target.form.txtItem.value;
    e.target.form.txtItem.value = "";
    const error = this.props.addItem(item);
    this.setState({
      error: error,
    });
  }

  render() {
    return (
      <div>
        {/* <p>{this.state.error} nhvbn</p> */}
        {this.state.error && <p>{this.state.error}</p>}
        <form>
          <div className="input-group">
            <input  className="form-control" type="text"  name="txtItem"></input>

            <button className="btn btn-primary" type="submit" onClick={this.onFormSubmit}>
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

root.render(<TodoApp />);
