import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login'
import { login, signup } from '../../actions/auth'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'

function Auth () {

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const history = useHistory()
   const dispatch = useDispatch()
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (e) => {
    e.preventDefault()
   if(isSignup){
    dispatch(signup(formData, history))
   }else{
    dispatch(login(formData, history))
   }
  }

  const handleChange = (e) => {
   setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }


  const googleSuccess = async (res) => {
   const result = res?.profileObj
   const token = res?.tokenId

   try{
     dispatch({ type: 'AUTH', data:{ result, token} } )
     history.push('/')
   } catch (err){
     console.log(err)
   }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            {isSignup ? 'Sign Up' : 'Login'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name='firstName' label='First Name' handleChange={handleChange} half />
                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                  </>
                )
              }
              <Input name='email' label='Email' handleChange={handleChange} type='email' />
              <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Login'}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} startIcon={<Icon />} variant='contained'>
                Sign In with Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy='single_host_origin'
            />
            <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Login' : "Don't have an account Signup"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default Auth
