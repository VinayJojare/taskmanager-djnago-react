import React, { Component } from 'react';
import './App.css';
import CustomModal from './components/Modal';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  };

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  // create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
  this.toggle();

  if (item.id) {
    axios
      .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
      .then(res => this.refreshList())
  }
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList())
 

};


  

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList())
      .catch(error => {
        console.error('Error deleting completed task:', error);
      })
  };

  createItem = () => {
    const item = { title: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = activeItem => {
    this.setState({ activeItem: activeItem, modal: !this.state.modal })
 }
 
  
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTablist = () => {
    return (
      <div className='my-5 tab-list'>
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>
        <span onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    )
  }

  // # rendering items in list completed or not
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
        title={item.title}
      >
        {item.title}
      </span>
      <span>
      <button className='btn btn-info mr-2' onClick={() => this.editItem(item)}>
               Edit
        </button>
        <button className='btn btn-danger mr-2' onClick={() => this.handleDelete(item)}>
          Delete
        </button>
      </span>
    </li>
    ));
  };

  render() {
    return (
      <main className="content p-4 mb-4 bg-secondary">
  <h1 className='text-dark text-uppercase text-center my-4'> Task Manager </h1>
  <div className='row' >
    <div className='col-md-6 col-sm-10 mx-auto'>
      <div className='card p-4 shadow'>
        <div>
          <button className='btn btn-secondary'  onClick={this.createItem}>
            Add Tasks
          </button>
        </div>
        {this.renderTablist()}
        <ul className='list-group list-group-flush mt-3'>
          {this.renderItems()}
        </ul>
      </div>
    </div>
  </div>
  <div className="wrapper d-flex flex-column min-vh-100">
  
  <footer className='mt-auto bg-dark text-white text-center p-2'>
    &copy; 2024 Task Manager
  </footer>
</div>

  {this.state.modal ? (
    <CustomModal ActiveItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
  ) : null}
</main>
    );
  };
}

export default App;
