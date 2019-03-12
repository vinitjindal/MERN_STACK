import React,{ Component } from 'react';

class Addinfo extends Component{
  state={
       Name:"  ",
        Birthday:" ",
        AboutMe:"  "
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.addinfo(this.state);
  }
  handleChange=(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  render(){
    return(
      <div>
        <form onSubmit = { this.handleSubmit }>
          Name :<input type="text" id="Name" onChange = { this.handleChange }/>
          Birthday :<input type="text" id="Birthday" onChange = { this.handleChange }/>
          AboutMe :<input type="text" id="AboutMe" onChange = { this.handleChange }/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default Addinfo;
