import React from 'react'
import '../build/index.scss';

class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profession: '',
      gender:'',
      isNotRobot: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox'? target.checked : target.value;
    const name = target.name ;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('User registered ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
          <input type = "text" name = "name" value = {this.state.name} onChange={this.handleChange} />
          <br></br>
        <label>Profession:</label>
          <select type = "text" name = "profession" value={this.state.profession} onChange={this.handleChange} >
            <option value = "student">Student</option>
            <option value = "private">Private</option>
            <option value = "government">Government</option>
          </select>
          <br></br>
        <label>Gender:</label>
          <input type = "radio" name = "gender" value ={this.state.gender} onChange = {this.handleChange} />Male
          <input type = "radio" name = "gender" value ={this.state.gender} onChange = {this.handleChange} />Female
          <br></br>
        <label>Check if not robot:</label>
          <input type = "checkbox" name = "isNotRobot" checked = {this.state.isNotRobot} onChange={this.handleChange} />
          <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default FormExample;
