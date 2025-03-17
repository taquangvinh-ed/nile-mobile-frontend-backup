import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const Payment = () => {
  const [value, setValue] = React.useState("cash-on-delivery");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Chọn phương thức thanh toán
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="cash-on-delivery"
            control={<Radio />}
            label="Cash on delivery"
          />
          <FormControlLabel value="vnpay" control={<Radio />} label="VNPAY" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Payment;
