import './App.css';
import User from './components/User';
import Repo from './components/Repo';
import Home from './components/Home';

//react
import { Link , useNavigate} from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import {Route, Routes, useLocation } from 'react-router-dom';

//mui
import {AppBar, Toolbar, Box, IconButton, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function App() {
  const [usertitle, setusertitle] = useState('');
  const [repotitle, setrepotitle] = useState('');
  //routing
  const location = useLocation();
  const navigate = useNavigate();

  const slicer = (str, len) =>{
    return str.length>len? `${str.slice(0,len)}...`:str;
  }
  
  useEffect(() => {
    const path = location.pathname.split("/");
    if(path[1]=="users" && path[3]=='repos'){ //valid route
      setusertitle(path[2])
      if(path.length>4){
        setrepotitle(path[4])
      }else{
        setrepotitle("")
      }
    }else if(location.pathname=="/"){ //home
      setusertitle("")
      setrepotitle("")
    }else{
      //invalid url,redirect to home page 
      navigate('/')
    }
  }, [location])


  
  

  return (
    <div className='App'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#161b22' }} position="static">
        <Toolbar >
        <a href='https://github.com' target='_blank'>
          <img id='github_mark' width={32} src= "/GitHub-Mark/PNG/GitHub-Mark-Light-64px.png"/>      
        </a>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', color:'white'}} >
            {slicer(usertitle,40)} {(repotitle!="")?<Typography variant="h6" component="span" sx={{borderRadius: "6px", backgroundColor: "#414141", padding:"3px", paddingLeft:"8px", paddingRight:"8px", marginLeft:"10px"}} >{slicer(repotitle,70)}</Typography>:<></>}
        </Typography>
          <Link to="/">
            <IconButton>
              <HomeIcon color='secondary' />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
      <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/users/:username/repos" exact element={<User/>} />
      <Route path="/users/:username/repos/:reponame" exact element={<Repo/>} />
    </Routes>
    </div>
  );
}



export default App;
