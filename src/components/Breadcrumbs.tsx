import React from "react";
import { useMemo } from "react";

import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

import { Breadcrumbs } from "@mui/material";
import { Link as MaterialLink } from "@mui/material";
import { Typography } from "@mui/material";

export const Breadcrums = () => {
  const location = useLocation();

  const params = Object.values(useParams());
  const paths = location.pathname.split("/").filter((value) => value !== ""); // Exclude empty paths

  const filteredPaths = useMemo(() => {
    return paths.filter((path) => !params.includes(path));
  }, [params, paths]);

  return (
    <Breadcrumbs>
      <MaterialLink underline="hover" color="inherit" component={Link} to="/">
        <Typography>Home</Typography>
      </MaterialLink>
      {filteredPaths.map((path, index, array) => {
        const lastElement = index === array.length - 1;

        return (
          <MaterialLink
            key={index}
            underline="hover"
            color={lastElement ? "text.primary" : "inherit"}
            component={Link}
            to={`/`}
          >
            {`${path.charAt(0).toUpperCase()}${path.substring(1)}`}
          </MaterialLink>
        );
      })}
    </Breadcrumbs>
  );
};
