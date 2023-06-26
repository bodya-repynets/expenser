import { Stack } from "@mui/material"
import AddExpense from "../components/AddExpense"
import ExpensesList from "../components/ExpensesList"
import Total from "../components/Total"

const Home = () => {
  return (
    <Stack alignItems={'center'} spacing={'50px'}>
    <AddExpense/>
    <ExpensesList/>
    <Total/>
    </Stack>

  )
}
export default Home