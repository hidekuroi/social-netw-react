import { Box } from '@mui/material';
import React from 'react';
import classes from './Post.module.css';

type PropsType = {
  userPhoto: string | null,
  message: string,
  id: number
}

const Post = (inf: PropsType) => {
  let spot = 'https://vk.com/sticker/1-64142-512';
    return(
          <div className={classes.item}>
            <Box component="span" 
                sx={{
                    display: 'block',
                    p: 1,
                    m: 1,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                  }}>
            <img src={inf.userPhoto ? inf.userPhoto : spot} alt="profile avatar"/>
            {inf.message}
            </Box>
          </div>
    );
}

export default Post;