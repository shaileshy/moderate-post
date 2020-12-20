import React, { useState, useEffect, useReducer, useCallback, useMemo } from "react";
import Card from './components/card/Card'
import {moderateReducer, ACTION_TYPES} from './Reducer/moderate'

import './style/bootstrap4.css'
import './App.css';


export default function App() {
  const [posts, dispatch] = useReducer(moderateReducer, []);
  const [selectedPost, setSelectedPost] = useState({title: ''});
  const [comment, setCommment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');

  const selectPost = (id) => {
    console.log('post called', id);
    posts.map(post => {
      if(post.id === id){
        return setSelectedPost(post)
      }
      return null;
    })
    return null;
  }

  const handleComment = (e)=>{
    setCommment(e.target.value);
  };

  const handleUserName = (e)=>{
    setUserName(e.target.value);
  };

  const handleCommentSubmit = (id)=> {
    let newComment = {
      comment,
      userName,
      moderate: false
    }

    dispatch({type: ACTION_TYPES.ADD_COMMENTS, payload: newComment, id: id});


    // let updatePosts = posts.map((val) => {
    //     if(val.id === id){
    //       val.attachComment.push(newComment)
    //     }
    //   })
    //   return setPosts
  };

  const doSearch = useMemo(() => {
    // posts.filter((post) => {
    //   return post.title.toLowerCase().includes(searchQuery.toLocaleLowerCase());
    // })
  })

  
  
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then(response  => response.json())
    .then( data => dispatch({type: ACTION_TYPES.GET_POSTS, payload: data})) 
    .catch(error => console.error(error))
  }, [])

  return (
    <>
    {console.log(posts)}
    <div className="container">
      <div className="row">
        <div className='col'>
          Search By Tite:
          <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
          <button onClick={doSearch}>Submit</button>
        </div>
      </div>
      <div className="row my-5">
        <div className= "col-12 col-md-8 border">
          <div className= "row">
            <div className="col-12 col-md-7">
              <div className="">
                {
                  
                  posts.map((val) => {
                    return (
                      
                      <>
                    
                      <Card key={val.id} number={val.id} title={val.title} selectPost={selectPost} />
                      </>
                    )
                  })
                }
                
              </div>
            </div>
          <div className="col-12 col-md-5 border-left">
            <div className="box">
              {console.log(selectedPost)}
              {selectedPost.title.length 
              ? <>
                <div>{selectedPost.id})</div>
                <h3>{selectedPost.title}</h3>
                <p>{selectedPost.body}</p>
                <div className="row">
                  <div className='col'> Comments: 
                  <input type='text' onChange={(e)=> handleComment(e)} value={comment} style={{'borderTop': 'none','borderLeft': 'none', 'borderRight': 'none', }} />
                  </div>
                  <div className='col'> UserName: 
                  <input type='text' onChange={(e)=> handleUserName(e)} value={userName} style={{'borderTop': 'none','borderLeft': 'none', 'borderRight': 'none', }} />
                  </div>
                 
                </div>
                <div className="row my-2">
                <div className='col'>
                    <button className="float-right" onClick={() => handleCommentSubmit(selectedPost.id)}>Submit</button>
                  </div>
                  </div>
                <div className="row my-4">  
                    {selectedPost.attachComment.map(val => {
                      return (
                        <>
                        <div className='row'>
                          <div className='col'>
                            <strong>{val.userName}</strong>
                          </div>
                          <div className='col'>
                            {val.comment}
                          </div>
                        </div>
                        </>
                      )
                    })}
                </div>
                </> : <div></div> }
            </div>
            </div>
          
          </div>
        </div>
        
        <div className="col-12 col-md-4 h-100">
          <div className="px-2 border">
              <h3 className='bg-grey'>Moderate</h3>
              <hr/>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}