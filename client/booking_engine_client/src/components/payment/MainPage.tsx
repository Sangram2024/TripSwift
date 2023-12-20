"use client";

import { useState, useEffect } from "react";
// import "./App.css";
import Head from "./Head";
import Form from "./Form";
import FormThankYou from "./FormThankyou";
function MainPage() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
    name: "",
  });
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  // code I'm proud of *** thank you stack overflow!! ***
  useEffect(() => {
    setFormattedCardNumber((prevFormat) => {
      prevFormat = formData.cardNumber
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      return prevFormat;
    });
  }, [formData.cardNumber]);

  function containsOnlyNumbers(str: string) {
    const removedSpaces = str.replace(/\s/g, "");
    return /^\d+$/.test(removedSpaces);
  }
  const validate = (values: {
    cardNumber: any;
    month: any;
    year: any;
    cvc: any;
    name: any;
  }) => {
    const errors = {};
    const regexCardNumber = containsOnlyNumbers(values.cardNumber);
    const regexMonth = containsOnlyNumbers(values.month);
    const regexYear = containsOnlyNumbers(values.year);
    const regexCvc = containsOnlyNumbers(values.cvc);
    const currentYear = new Date().getFullYear();
    const lastTwoDigitsOfYear = currentYear.toString().slice(-2);
    if (!values.name) {
      errors.name = "Name can't be blank";
    }
    if (!values.cardNumber) {
      errors.cardNumber = "Card number can't be blank";
    } else if (!regexCardNumber) {
      errors.cardNumber = "Wrong format, numbers only";
    } else if (values.cardNumber.length !== 19) {
      errors.cardNumber = "Card number length must be 16";
    }
    if (!values.month) {
      errors.month = "Can't be blank";
    } else if (!regexMonth) {
      errors.month = "Wrong format, numbers only";
    } else if (values.month > 12) {
      errors.month = "Must be less then 12";
    }
    if (!values.year) {
      errors.password = "Can't be blank";
    } else if (!regexYear) {
      errors.year = "Wrong format, numbers only";
    } else if (values.year < lastTwoDigitsOfYear) {
      errors.year = "year can't be less then current year";
    }
    if (!values.cvc) {
      errors.cvc = "Can't be blank";
    } else if (!regexCvc) {
      errors.Cvc = "Wrong format, numbers only";
    }
    return errors;
  };

  const noErrors = Object.keys(formErrors).length === 0 ? true : false;

  const handleInput = (e: { target: { value: any; name?: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setFormSubmitted(true);
  };
  return (
    <div className="App h-full  w-full flex flex-col items-center lg:flex-row ">
      <Head formattedCardNumber={formattedCardNumber} formData={formData} />
      {!noErrors || !formSubmitted ? (
        <Form
          formSubmitted={formSubmitted}
          handleSubmit={handleSubmit}
          formattedCardNumber={formattedCardNumber}
          formData={formData}
          handleInput={handleInput}
          formErrors={formErrors}
        />
      ) : (
        <FormThankYou />
      )}
    </div>
  );
}

export default MainPage;
