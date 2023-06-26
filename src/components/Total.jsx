import { Stack, Typography } from "@mui/material";
import { useGlobalContext } from "../context";

const Total = () => {
  const { total } = useGlobalContext();
  return (
    <Stack>
      <Typography variant="h5" textAlign={'center'}> Total expense: $ {total}</Typography>
    </Stack>
  );
};
export default Total;
