import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useParams, useLocation, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function TopBar() {
  const params = useParams();
  const location = useLocation();

  const MyName = "Nguyễn Anh Tuấn - B22DCCN758";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let contextInfo = "Photo Sharing App";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `http://localhost:8081/api/user/list`;
        const users = await fetchModel(url);

        if (Array.isArray(users) && params.userId) {
          const foundUser = users.find((u) => u._id === params.userId);
          if (foundUser) {
            setUser(foundUser);
          }
        }

        setLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [params.userId]);

  if (loading || error) {
    return (
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            {MyName}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  if (user) {
    if (location.pathname.includes("/photos/")) {
      contextInfo = `Photos of ${user.first_name} ${user.last_name}`;
    } else if (location.pathname.includes("/users/")) {
      contextInfo = `${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          <Typography variant="h5" color="inherit">
            {MyName}
          </Typography>
        </Box>
        <Box
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          <Typography variant="h6" color="inherit">
            {contextInfo}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
