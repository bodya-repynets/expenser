import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleClick = async () => {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[a-zA-Z]{4})(?=.*\d)[a-zA-Z\d]{6,}$/;
      return passwordRegex.test(password);
    }
    if (isValidEmail(email) && isValidPassword(password)) {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <Stack width={"50%"} margin={"100px auto 100px auto"} spacing={"20px"}>
      <Typography textAlign={"center"} variant="h4">
        Authorization
      </Typography>
      <TextField
        error={err}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        label={"Email"}
      />
      <TextField
        error={err}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label={"Password"}
      />
      <Button variant="contained" onClick={handleClick}>
        Log in
      </Button>
      <Typography textAlign={"center"}>
        <Link to={"/register"}>Registration</Link>
      </Typography>
    </Stack>
  );
};
export default Login;
