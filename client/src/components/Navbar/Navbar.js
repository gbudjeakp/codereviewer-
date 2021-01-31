import React, {useState, useEffect} from 'react'
import { AppBar, Avatar, Typography, Button, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import useStyles from './styles'
import logo from '../../images/logo.png'

function Navbar () {
  const classes = useStyles()
  const  [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  
  const logout = () =>{
    dispatch({type: 'LOGOUT'})

    history.push('/')

    setUser(null)
  }

  useEffect(()=>{
    const token = user?.token
     setUser(JSON.parse(localStorage.getItem('profile')))
    //JWT for manual signup
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout()
      }
    }
  }, [location])
   
  return (
    <div>
       <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Experience</Typography>
        <img className={classes.image} src={logo} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">login</Button>
        )}
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Navbar
