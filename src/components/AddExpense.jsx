import {
  Button,
  TextField,
  Stack,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useGlobalContext } from "../context";

const AddExpense = () => {
  const { user } = useGlobalContext();
  const [name, setName] = useState("");
  const [sum, setSum] = useState("");
  const [err, setErr] = useState(false);

  const handleClick = async () => {
    if (name !== "" && !isNaN(sum) && sum !== "") {
      try {
        await addDoc(collection(db, "users", user.uid, "expenses"), {
          name: name,
          sum: sum,
          author: user.email,
          userId: user.uid,
          time: new Date(),
        });
      } catch (err) {
        console.error(err);
      }
      setName("");
      setSum("");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <Stack width={"60%"} spacing={"20px"} padding={"20px 0"}>
      <TextField
        error={err}
        value={name}
        onChange={(e) => setName(e.target.value)}
        label={err ? "Invalid data" : "Name"}
      />
      <FormControl onChange={(e) => setSum(e.target.value)}>
        <OutlinedInput
          error={err}
          value={sum}
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <Button variant="contained" onClick={handleClick}>
        Add expense
      </Button>
    </Stack>
  );
};
export default AddExpense;
