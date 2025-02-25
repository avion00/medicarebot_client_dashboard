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
        gap: "10px",
        // padding: "20px",
      }}
    >
      {/* Search Bar Skeleton */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "20px",
          paddingLeft: "20px"
        }}
      >
        <Skeleton
          variant="rectangular"
          width={220}
          height={40}
          
          sx={{ borderRadius: "25px" }}
        />
      </Box> */}

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
            width={100}
            height={30}
            sx={{ flex: 1, mx: 1}}
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
              width={100}
              height={30}
              sx={{ flex: 1, mx: 1, }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default TableSkeleton;









