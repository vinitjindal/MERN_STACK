import React,{ Component } from 'react';
class Addtodo extends Component{
 state = {
    item:null ,
 }
 handleChange=(e)=>{
   this.setState({
     item: e.target.value,
   })
 }
 handleSubmit=(e)=>{
   e.preventDefault();
   this.props.add(this.state);
 }
  render(){
    return(
      <div key = { this.state.id }>
        <form onSubmit = { this.handleSubmit }>
          <input type="text" id = "item" onChange ={ this.handleChange }/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Addtodo;
