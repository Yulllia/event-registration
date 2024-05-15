import { Rule } from "antd/es/form";

export const generateRules = (fieldName: string): Rule[] => {
  switch (fieldName) {
    case "fullName":
      return [
        { required: true, message: "Please input your full name!" },
        { max: 50, message: "Full name must be less than 50 characters!" },
      ];
    case "email":
      return [
        {
          type: "email",
          required: true,
          message: "Please input a valid email address!",
        },
      ];
    case "birthDate":
      return [{ required: true, message: "Please select your date of birth!" }];
    case "source":
      return [
        {
          required: true,
          message: "Please select where you heard about the event!",
        },
      ];
    default:
      return [];
  }
};
