import { Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useGlobalContext } from "./context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const { setExpenses, user } = useGlobalContext();
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users", user.uid, "expenses"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let expensesArr = [];
        querySnapshot.forEach((doc) => {
          expensesArr.push({ ...doc.data(), id: doc.id });
        });
        setExpenses(expensesArr);
      });
      return () => unsubscribe();
    }
  }, [user]);
  return (
    <Stack>
      <Navbar />
      <Outlet />
    </Stack>
  );
}

export default App;
