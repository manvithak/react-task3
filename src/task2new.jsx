import React from 'react';
import PropTypes from 'prop-types';
class DisplayList extends React.Component{
  constructor(props){
    super(props);
    this.handleListDelete = this.handleListDelete.bind(this);
    this.handleListEdit = this.handleListEdit.bind(this);
  }
  handleListDelete(e){
    e.preventDefault();
    const id = e.target.id;
    this.props.toDelete(id);
  }
  handleListEdit(e){
    e.preventDefault();
    const id = e.target.id;
    this.props.toEdit(id);
  }
  render(){
    return(
      <div>
        {this.props.values.map((value,index) => {
          return(
            <div>
              <li key = {index}> {value} </li>
              <button id = {index} onClick = {this.handleListDelete}>delete</button>
              <button id = {index} onClick = {this.handleListEdit}>edit</button>
            </div>
          )
        })}
      </div>
    )
  }
}


class TodoList extends React.Component{
  constructor(){
    super();
    this.state={
      values:[],
      element:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e){
    if(this.state.element){
      let p = this.state.values.slice();
      p.push(this.state.element);
      this.setState({values: p,element:''});
    }else{
      alert('enter element to be added');
    }
    e.preventDefault();
  }
  handleDelete(id){
    let p = this.state.values.slice();
    p.splice(id,1);
    this.setState({
      values:p
    })
  }
  handleEdit(id){
    this.setState({
      element:this.state.values[id]
    })
    this.handleDelete(id);
  }
  handleChange(e){
    this.setState({
      element:e.target.value
    })
  }
  render(){
    const values = this.state.values;
    const element = this.state.element;
    return(
      <div>
        <input type="text" value = {element} onChange = {this.handleChange} />
        <button onClick = {this.handleSubmit}>Add</button>
        <DisplayList values={values}
         toDelete = {this.handleDelete}
         toEdit = {this.handleEdit}
       />
      </div>
    )
  }
}
DisplayList.propTypes = {
  values: PropTypes.array,
  toDelete:PropTypes.func,
  toEdit:PropTypes.func
};
export default TodoList;
