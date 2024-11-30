import { useState } from "react";
import { notification } from "antd";
// import nodemailer from "nodemailer";


import emailjs from "emailjs-com";

interface IValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: IValues = {
  name: "",
  email: "",
  message: "",
};




interface IFormValues {
  [key: string]: string; // Add an index signature
  name: string;
  email: string;
  message: string;
}


export const useForm = (validate: { (values: IValues): IValues }) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: IValues;
  }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);

  
    setFormState((prevState) => ({ ...prevState, errors }));

    const hasErrors = Object.values(errors).some((error) => error !== "");
    
    if(hasErrors){
      return false
    }

    const url = ""; // Fill in your API URL here

    let serviceID='service_2lgr16a'
    let templateID='template_sszcbhf'
let aa:IFormValues={
  
  from_email: values.email,
    to_email: "emilshiju10@gmail.com",
  name:values.name,
  email: values.email,
  message: "hi",
  reply_to: values.email


}

try{

    const response = await emailjs.send(
      serviceID,
      templateID,
      aa,
      'gM7n7-bH2tz9zCuT5'
    );
    return true
  }catch(error){
    return false
    console.log("error",error)
  }




    // try {
    //   if (Object.values(errors).every((error) => error === "")) {
    //     const response = await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values),
    //     });

    //     if (!response.ok) {
    //       notification["error"]({
    //         message: "Error",
    //         description:
    //           "There was an error sending your message, please try again later.",
    //       });
    //     } else {
    //       event.target.reset();
    //       setFormState(() => ({
    //         values: { ...initialValues },
    //         errors: { ...initialValues },
    //       }));

    //       notification["success"]({
    //         message: "Success",
    //         description: "Your message has been sent!",
    //       });
    //     }
    //   }
    // } catch (error) {
    //   notification["error"]({
    //     message: "Error",
    //     description: "Failed to submit form. Please try again later.",
    //   });
    // }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values: formState.values,
    errors: formState.errors,
  };
};
