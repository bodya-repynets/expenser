import { Button, Stack, Typography } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

const ExpenseItem = ({ item }) => {
  const deleteExpense = async (id, userId) => {
    await deleteDoc(doc(db, "users", userId, "expenses", id));
  };
  return (
    <Stack >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Typography fontSize={'12px'} color={'grey'} >{moment(new Date(item.time.seconds*1000)).format('HH:mm')}</Typography>
      <Typography fontSize={'12px'} color={'grey'}>{moment(new Date(item.time.seconds*1000)).format('DD.MM.YYYY')}</Typography>
      </Stack>
      <Stack sx={{flexDirection:{'xs': 'column', 'sm':'row'}}} justifyContent={'space-between'} alignItems={'center'} padding={'20px 0'} borderBottom={'2px solid silver'} spacing={'10px'}>
        <Typography color={'#3f51b5'} textAlign={'center'} width={'200px'} fontSize={'18px'} textTransform={'capitalize'}>{item.name}</Typography>
        <Typography color={'#689f38'} fontSize={'18px'}>$ {item.sum}</Typography>
        <Button sx={{fontSize: '18px', color: '#b71c1c'}} onClick={() => deleteExpense(item.id, item.userId)}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};
export default ExpenseItem;
