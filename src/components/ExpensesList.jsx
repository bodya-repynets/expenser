import { Button, Stack, Typography } from "@mui/material";
import { useGlobalContext } from "../context";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = () => {
  const { expenses } = useGlobalContext();
  return (
    <Stack width={'60%'} spacing={'30px'}>
        <Typography textAlign={'center'} variant="h5">List of your expenses:</Typography>
      {expenses.map((item) => {
        return (
          <ExpenseItem key={item.id} item={item}/>
        );
      })}
    </Stack>
  );
};
export default ExpensesList;
