import { Card, CardContent, Skeleton } from "@mui/material";

import React from "react";

const LoadingSkeleton = () => {
  return (
    <Card elevation={3} sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
      <CardContent sx={{ p: 3 }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </CardContent>
    </Card>
  );
};

LoadingSkeleton.displayName = "LoadingSkeleton";

export default LoadingSkeleton;
