"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

const Profile = () => {
  const { user, logout, token } = useAuth();
  const router = useRouter();

  // Redirect to login page if no token (user not authenticated)
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  // Loading state while user data is being fetched
  if (!user) return <CircularProgress />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        marginTop: 5,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Profile
      </Typography>

      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.push("/")}
        sx={{ marginTop: 3 }}
      >
        Home
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        sx={{ marginTop: 1 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
