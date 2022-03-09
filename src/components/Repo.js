import './component.css';
import Loading from '../util/Loading';
import NotFound from '../util/Notfound';

//react
import { useParams, Link } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';

//api
import axios from 'axios';

//mui
import {Button} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

//render repo info when repo exist
const Found = ({username, reponame, stars, html_url, language, description})=>{
  return(
    <div className='found'>
      <div className='repo_row0' >
        <p className='repo_title' > <Link to={`/users/${username}/repos`} className="repo_title_user" >{username}</Link> <span>/</span> {reponame}</p>
        {(language)? <p className='repo_lang' >{language}</p>:<></>}
      </div>
      <div className='repo_row1' >
          <div className='repo_star' >
              <StarBorderIcon color="inherit" sx={{paddingRight:"2px"}}  />
              <p>{stars}</p>
          </div>
        <Button variant="outlined" color="inherit" href={html_url} endIcon={
        <img style={{height:"20px", width:"20px"}} src="/GitHub-Mark/PNG/GitHub-Mark-Light-64px.png" />
        }  >GitHub Page</Button>
      </div>
      <div className='repo_description' >
        {description}
      </div>
    </div>
  )
}

const Repo = () => {
  const [data_state, set_data_state] = useState(0); // 0: loading, 1: found, -1: notfound
  const { username, reponame } = useParams();
  const [repo_info, set_repo_info] = useState({html_url: "google.com", stars: 0, description: "hi", languague: ""});

  //send api request when username/reponame changes
  useEffect(() => {
    let isMounted = true;
    set_data_state(0);
    axios.get(`https://api.github.com/repos/${username}/${reponame}`)
    .then(res => {
        if(isMounted){
          // console.log(res.data)
          console.log(res.data.language)
          set_repo_info({html_url: res.data.html_url, stars: res.data.stargazers_count, description: res.data.description, language: res.data.language})
          set_data_state(1);
        }
    }).catch(err=>{
      console.log(err);
      set_data_state(-1);
    });
    return ()=>{isMounted=false;}

  }, [reponame, username])

  return (
    <div className='page'>
      {data_state==0?
      <Loading name={reponame} isUser={false} /> :
      (data_state==1?
        <Found username={username} reponame={reponame} stars={repo_info.stars} html_url={repo_info.html_url} language={repo_info.language} description={repo_info.description} />:
        <NotFound username={username} reponame={reponame} isUser={false}/>
      )
       }
    </div>
  );
}

export default Repo;