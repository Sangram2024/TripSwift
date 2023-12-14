"use client";
import React, { useState } from "react";
import { DatePicker } from "antd";
import "antd/dist/antd";
import moment, { Moment } from "moment";

const { RangePicker } = DatePicker;

type Props = {};

const DateRange: React.FC<Props> = () => {
  const [dates, setDates] = useState<string[]>();

  const disabledDate = (current: Moment) => {
    return current && current < moment().startOf("day");
  };

  const datePickerStyle = {
    border: "none",
    focus: "none",
  };

  return (
    <div className="">
      <RangePicker
        onChange={(values) => {
          setDates(
            values.map((item) => {
              return moment(item).format("DD-MM-YYYY");
            })
          );
        }}
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
