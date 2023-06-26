import { createContext, useContext, useEffect, useState } from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";
import { auth } from "./firebase";

export const useGlobalContext = () => useContext(GlobalContext);
const GlobalContext = createContext();

const AppContext = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const money = expenses.reduce((total, curr) => {
      return total + parseInt(curr.sum);
    }, 0);
    setTotal(money);
  }, [expenses]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  return (
    <GlobalContext.Provider
      value={{ expenses, total, setUser, user, setExpenses }}
    >
      <BrowserRouter>
        {!loading && (
          <Routes>
            <Route path="./" element={<App />}>
              <Route element={<Protected />}>
                <Route path="./home" element={<Home />} />
              </Route>
              <Route path="./login" element={<Login />} />
              <Route path="./register" element={<Register />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default AppContext;
