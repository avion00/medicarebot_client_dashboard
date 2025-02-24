import React from "react";
import { Box, Skeleton } from "@mui/material";

const StatBoxSkeleton = () => {
  return (
    <Box width="100%" m="0 30px">
      {/* Top row: icon + title, and progress circle */}
      <Box display="flex" justifyContent="space-between">
        <Box>
          {/* Icon placeholder */}
          <Skeleton variant="circular" width={40} height={40} />
          {/* Title placeholder */}
          <Skeleton variant="text" width={80} height={28} />
        </Box>
        {/* Progress circle placeholder */}
        <Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>

      {/* Bottom row: subtitle + increase */}
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Skeleton variant="text" width={100} height={24} />
        <Skeleton variant="text" width={60} height={24} />
      </Box>
    </Box>
  );
};

export default StatBoxSkeleton;
