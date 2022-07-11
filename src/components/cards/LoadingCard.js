import React from 'react';
import Box from '@mui/material/Box';

import Skeleton from '@mui/material/Skeleton';

const LoadingCard = () => {
    return (
        <div>

            <Box sx={{ pt: 0.5 }}>
                <Skeleton variant="rectangular" width={350} height={250} />
                <Skeleton />
                <Skeleton width="60%" />
                <Skeleton variant="rectangular" width={350} height={70} />
            </Box>
        </div>
    )
}

export default LoadingCard
