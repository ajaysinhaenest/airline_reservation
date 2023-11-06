import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
    color: string
    text: string
}

const ColorKey = ({ color, text }: Props) => {
    return (
        <Box mb={2} display='flex' gap={4} alignItems='center'>
            <Box width={60} height={60} bgcolor={color}></Box>
            <Typography variant='subtitle1' color='initial'>
                {text}
            </Typography>
        </Box>
    )
}

export default ColorKey
