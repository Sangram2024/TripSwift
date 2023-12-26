"use client";
import React, { useState } from "react";
import { DatePicker } from "antd";
import "antd/dist/antd";
import moment, { Moment } from "moment";
import { useDispatch } from "@/Redux/store";
import { setDateRangeDetails } from "@/Redux/slices/hotelcard.slice";

const { RangePicker } = DatePicker;

type Props = {};

const DateRange: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const disabledDate = (current: Moment) => {
    return current && current < moment().startOf("day");
  };

  const [dates, setDates] = useState<string[]>();

  const handleDateChange = (values: Moment[] | null) => {
    if (values) {
      const formattedDates = values.map((date) => date.format("DD-MM-YYYY"));
      setDates(formattedDates);
      dispatch(setDateRangeDetails({ dates: formattedDates }));
      console.log(formattedDates, "++++++++++++++++");
    }
  };

  const datePickerStyle = {
    border: "none",
    focus: "none",
  };

  return (
    <div className="">
      <RangePicker
        onChange={handleDateChange}
        disabledDate={disabledDate}
        suffixIcon={<></>}
        picker="date"
        separator=" - "
        allowClear={false}
        placeholder={["Check-in Date", "Check-out Date"]}
        style={datePickerStyle}
      />
    </div>
  );
};

export default DateRange;
