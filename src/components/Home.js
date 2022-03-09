import './component.css';
//react
import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';

//mui
import {TextField, IconButton } from '@mui/material';
import {InputAdornment} from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const [username, setusername] = useState('');
  const [reponame, setreponame] = useState('');
  const [input_value, setinput_value] = useState('');

  //routing
  let navigate = useNavigate();

  //update username and repo name when textfield changes
  useEffect(() => {
    for(let i = 0; i<input_value.length-1;i++){
      if(input_value[i]=='/'){
        setusername(input_value.slice(0,i))
        setreponame(input_value.slice(i+1,input_value.length))
        return;
      }
    }
    setusername(input_value)
    setreponame("")
  }, [input_value])
  
  //handle Enter keyevent for search
  const keyPress = e=>{
    if(e.key == "Enter"){
      for(let i = 0; i<input_value.length-1;i++){
        if(input_value[i]=='/'){
          navigate(`/users/${input_value.slice(0,i)}/repos/${input_value.slice(i+1,input_value.length)}`)
          return;
        }
      }
      //navigate to root for invalid format
      navigate(`/users/${input_value}/repos`)
    }
  }

  //key event listener
  useEffect(() => {
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, [keyPress])

  return (
    <div className='Home'>
        <img width={150} src="GitHub-Logos/GitHub_Logo_White.png"/>
        <TextField value={input_value}
          onChange={e=>setinput_value(e.target.value)}
          sx={{ input: { color: 'white' }, backgroundColor:"#202429", borderRadius:"5px"}}
          placeholder='Enter a Username or Username/Reponame '  variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Link to={`/users/${username}/repos/${reponame}`}>
                  <IconButton style={{paddingLeft:'25px'}}>
                    <SearchIcon color='secondary' />
                  </IconButton>
                </Link>
              </InputAdornment>
             ),
          }}
        />
    </div>
  );
}

export default Home;