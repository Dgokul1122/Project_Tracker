import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from 'axios' ; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description:"",
        start_date:"",
        end_date:"",
        completed: false
      },
      taskList: []
    };
  }


  componentDidMount() {
    this.refreshList();
  }

 
  refreshList = () => {
    axios   
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };


  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };


  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    );
  };


  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
      
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary btn-lg"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger btn-lg"
          >
            Delete
          </button>
          
          
        </span>
      </li>
    ));
  };
  
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };


  
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };
  
  createItem = () => {
    const item = { title: "", description: "",start_date:"",end_date:"", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  
  render() {
    return (
      <center>
        <div class="fnlpj">
        <main className="content p-5 nb-2 bg-transparent">
        <h1 className="text-black text-uppercase text-center my-4">Project Tracker</h1>
        <div className="row ">
          <div className="col-md-8 col-sm-12 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary btn-lg">
                  Add Project
                    </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 mb-2 bg-transparent text-black text-center "><h3>
        Copyright 2023 &copy; All Rights Reserved
        </h3>
        
        </footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
      </div>
      </center>
    );
  }
}
export default App;
<BrowserRouter>
  <Routes>
    <Route index element={<admin />}/>
    <Route path='/admin' element={<admin />}/>
    <Route path='/admin' element={<admin />}/>
  </Routes>
</BrowserRouter>