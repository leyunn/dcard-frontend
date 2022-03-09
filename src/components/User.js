import './component.css';
import Loading from '../util/Loading';
import NotFound from '../util/Notfound';

//react
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

//api
import axios from 'axios';

//mui
import {Skeleton} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import StarBorderIcon from '@mui/icons-material/StarBorder';

//slice string to given length to prevent long name/sentences
const slicer = (str, len) =>{
  if(str){
    return str.length>len? `${str.slice(0,len)}...`:str;
  }else{
    return "";
  }
}


//render repo list when repo exist
const Found = ({repo_list, repo_num, setrepo_list, username}) =>{

  //fetch 10 more repos when scroll to bottom
  const fetch_more_repos = ()=>{
    console.log(repo_list.length/10+1)
    axios.get(`https://api.github.com/users/${username}/repos?per_page=10&page=${repo_list.length/10+1}`)
        .then(res => {
            console.log(res.data)
            setrepo_list([...repo_list, ...res.data.map(n=>{
              return({
                name: n.name,
                description: n.description,
                stars: n.stargazers_count
              })
            })])
        }).catch(err=>{
          console.log(err)
        });
  }

  return (
    <div className='found'>
      <InfiniteScroll
        dataLength={repo_list.length}
        next={fetch_more_repos} 
        hasMore={repo_list.length<repo_num}
        loader={
          <Skeleton
            sx={{ bgcolor: 'rgb(80, 84, 87)', margin:"auto" }}
            variant='text'
            height={150}
            width={920}
          />
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            END ({repo_num} repositories in total.)
          </p>
        }

      >
        {repo_list.map((n,i)=>
          <Link to={`/users/${username}/repos/${n.name}`} style={{ textDecoration: 'none' }} >
          <div className='repo_list_item' key={i}>
            <div className='repo_list_item_box'>
              <p className='repo_list_item_title' >{slicer(n.name, 50)}</p>
              <p className='repo_list_item_des' >{slicer(n.description, 110)}</p>
            </div>
            <div className='repo_star' >
              <StarBorderIcon color="inherit" sx={{paddingRight:"2px"}}  />
              <p>{n.stars}</p>
            </div>
          </div>
          </Link>
        )}
      </InfiniteScroll>
    </div>
  );
}

const User = () => {
  const [data_state, set_data_state] = useState(1); // 0: loading, 1: found, -1: notfound
  const { username } = useParams();
  const [repo_num, setrepo_num] = useState(30);
  const [repo_list, setrepo_list] = useState([{name:"Wordle Clone", description:"A MERN stack application that reproduce the multiplayer real-time drawing/guessing game - Gartic.io. It's a NTUEE web programming course collaborative project.", stars:0}]);

  //send api request when username/reponame changes
  useEffect(() => {
    let isMounted = true;
    set_data_state(0);
    //check is user exist and get the number of repos of this user
    axios.get(`https://api.github.com/users/${username}`) 
    .then(res => {
        if(isMounted){
          setrepo_num(res.data.public_repos)
        }
        //fetch 10 repos first
        axios.get(`https://api.github.com/users/${username}/repos?per_page=10`)
        .then(res => {
          if(isMounted){
            setrepo_list([...res.data.map(n=>{
              return({
                name: n.name,
                description: n.description,
                stars: n.stargazers_count
              })
            })])
            set_data_state(1);
        }
        }).catch(err=>{
          console.log(err)
          set_data_state(-1);
        });
    }).catch(err=>{
      console.log(err)
      set_data_state(-1);
    });
    return ()=>{isMounted=false;}

  }, [username])

  return (
    <div className='page'>
      {data_state==0?
      <Loading name={username} isUser={true} /> :
      (data_state==1?
        <Found username={username} repo_list={repo_list} setrepo_list={setrepo_list} repo_num={repo_num}/>:
        <NotFound username={username} reponame="" isUser={true}/>
      )
       }
    </div>
  );
}

export default User;