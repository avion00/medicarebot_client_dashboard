import React from "react";
import { Box, Skeleton } from "@mui/material";

const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "380px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {/* Table Header Skeleton */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            animation="wave" 
            width={100}
            height={20}
            sx={{ flex: 1, mx: 1 }}
          />
        ))}
      </Box>

      {/* Table Rows Skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              animation="wave"
              width={100}
              height={20}
              sx={{ flex: 1, mx: 1 }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default TableSkeleton;
