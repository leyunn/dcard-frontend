import './util.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

//error effect when api request failed (user/repo doesn't exist)

const NotFound = ({username, reponame, isUser}) =>{
    return (
      <div className='notfound'>
        <ErrorOutlineIcon fontSize='40px' sx={{paddingTop:"2px"}} />
        <div>{isUser? `User "${username}" not found.`:`Repo "${reponame}" not found for "${username}"`}</div>
      </div>
    );

  }

export default NotFound;