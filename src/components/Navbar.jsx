import { Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useGlobalContext();
  const handleLogOut = async () => {
    await signOut(auth);
  };
  return (
    <Stack
      height={"80px"}
      alignItems={"center"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      {user && (
        <>
          <Typography variant="h5">{user.email}</Typography>
          <Stack direction={"row"} spacing={"20px"}>
            <Link onClick={handleLogOut} to={"/login"}>
              <Typography variant="h5">Log out</Typography>
            </Link>
          </Stack>
        </>
      )}
    </Stack>
  );
};
export default Navbar;
