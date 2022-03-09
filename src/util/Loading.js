import './util.css';
import {LinearProgress} from '@mui/material';

//loading effect when sending api request

const Loading = ({name, isUser}) =>{
    return (
      <div className='loading'>
        <div>Looking for {isUser? "user":"repo"} "{name}"...</div>
        <LinearProgress sx={{ width: '100%', margin:'auto'}} color="inherit" />
      </div>
    );
}

export default Loading;