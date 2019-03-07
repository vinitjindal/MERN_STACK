import React,{ Component } from 'react';
import axios from 'axios';



class Post extends Component{
  /*componentDidMount(){
    console.log(this.props);
  }*/
  /*state = {
    posts:[]
  }
  componentDidMount(){
    let id = this.props.match.params.id;
    console.log(id);
    axios.get('https://jsonplaceholder.typicode.com/posts')
     .then(res=>{
      console.log(this.state);
      this.setState({
        posts: res.data[id-1]
      })
      console.log(this.state);
    })
  }*/
  render(){
    {/*const { posts } = this.state;
    const postList = posts.map(post=>{
      return(
        <div className='post card' key={ post.id }>
          <div className='card-item'>
            <span className='card-title'>{ post.title }</span>
            <p>{ post.body }</p>
          </div>
        </div>
      )
    });*/}
    return(
      <div className = 'container center'>
        <h3>hello</h3>
        <p>vinit jindal</p>
      </div>
    )
  }
}

export default Post;
