import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useGlobalContext } from "../context";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState(false);
  const handleClick = async () => {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[a-zA-Z]{4})(?=.*\d)[a-zA-Z\d]{6,}$/;
      return passwordRegex.test(password);
    }
    if (
      isValidEmail(email) &&
      isValidPassword(password1) &&
      password1 === password2
    ) {
      const resp = await createUserWithEmailAndPassword(auth, email, password1);
      await setDoc(doc(db, "users", resp.user.uid), {
        email: resp.user.email,
      });

      setEmail("");
      setPassword1("");
      setPassword2("");
      navigate("/");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);
  return (
    <Stack width={"50%"} margin={"100px auto 100px auto"} spacing={"20px"}>
      <Typography textAlign={"center"} variant="h4">
        Registration
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
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        type="password"
        label={"Password"}
      />
      <TextField
        error={err}
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        type="password"
        label={"Confirm Password"}
      />
      <Button variant="contained" onClick={handleClick}>
        Sign up
      </Button>
      <Typography textAlign={"center"}>
        <Link to={"/login"}>Log in</Link>
      </Typography>
    </Stack>
  );
};
export default Register;
