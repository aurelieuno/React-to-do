var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
import _ from "lodash"

class SearchBar extends React.Component {

  render() {
    return (
      <div className = "searchbar">
      <form className ="form-inline" onSubmit={this.props.handleSubmit}>
        <input className = "form-control mr-sm-2"
        type="text"
        name="todovalue"
        placeholder="Add todo"
        value={this.props.state.task.todovalue}
        onChange={this.props.handleChange} />

        <button
        type="submit"
        className="btn btn-info">
        Add Todo
        </button>
      </form>
      </div>
    )
  }
}

class SelectBar extends React.Component {

  render() {
    return (
      <div className="selectbar">
      <form className ="form-inline" onSubmit={this.props.handleSubmit2}>
        <label>Show : </label>
          <select className = "form-control" value={this.props.state.selectedtask} onChange={this.props.handleChange2}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

        <button
        type="submit"
        className="btn btn-success">
        Submit
        </button>
      </form>
      </div>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedtask: "",
      tasks2: ""
    };
    this.handleChange2=this.handleChange2.bind(this);
    this.handleSubmit2=this.handleSubmit2.bind(this);
  }

    handleSubmit2(event){
      event.preventDefault();
       this.setState({
       tasks2: this.state.selectedtask ==="all"? this.props.tasks : _.filter(this.props.tasks, (e)=>e.status===this.state.selectedtask)
       })
     }

     handleChange2(event){
         this.setState({
         selectedtask: event.target.value
         })
       }

  render() {

    var tasks = "";
    this.state.tasks2? tasks = this.state.tasks2 : tasks = this.props.tasks;
    console.log(tasks)

    return (
      <div>
      <table className = "table table-bordered table-hover">
      <thead>
      <th>Task</th>
      <th>Status</th>
      </thead>
      <tbody>
      {tasks.map((e,i) =>

        <tr key = {i} onClick={this.props.handleClick.bind(null,i)}>
        <td >{e.status ==="active" ? e.todovalue : <span style={{color: 'red'}}> {e.todovalue} </span>}</td>
        <td >{e.status ==="active" ? e.status : <span style={{color: 'red'}}> {e.status} </span>}</td>

        </tr>
      )}
      </tbody>
      </table>
      <SelectBar state={this.state} handleChange2={this.handleChange2} handleSubmit2={this.handleSubmit2}/>
      </div>
    )
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task : {
      todovalue:"",
      status:"active"
      },
      alltasks : []
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  handleChange(event){
    this.setState({
      task : {todovalue : event.target.value,
              status: "active"}
      });
  }

    handleSubmit(event){
       event.preventDefault();
/*       this.setState(function () {
         return this.state.alltasks.push(this.state.task);
       })*/
       this.setState({
       alltasks: this.state.alltasks.concat([this.state.task])
       })
     }

     handleClick(i){
/*       let arr = this.state.alltasks[i];
       arr.status = "completed";*/
       let arr = this.state.alltasks.slice(i,1);
       arr.todovalue = this.state.alltasks[i].todovalue;
       arr.status = "completed";
       this.state.alltasks[i]=arr;
       console.log(arr)

     }

       //console.log(event)
       //Proxy {dispatchConfig: Object, _targetInst: Object, isDefaultPrevented: function, isPropagationStopped: function, _dispatchListeners: function…}

  render() {


    return (
      <div className = "container">
      <SearchBar state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      <List tasks = {this.state.alltasks} handleClick={this.handleClick}/>
      </div>
    )
  }
}



ReactDOM.render(
  <Todo />,
  document.getElementById('app')
);