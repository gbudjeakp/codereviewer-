import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import Post from './Post/Post'
import useStyles from './styles'

function Posts ({ setCurrentId }) {
  const posts = useSelector((state) => state.posts)
  const classes = useStyles()

  return (
    <div>
      {!posts.length ? <h1>There are currently no posts feel free to add some</h1>
        : <Grid className={classes.container} container alignItems='stretch' spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
          </Grid>}
    </div>
  )
}

export default Posts
