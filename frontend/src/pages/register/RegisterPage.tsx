import { Button, Form, Input, DatePicker, Radio, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "./RegisterPage.css";
import { UserD, UserI } from "../../interfaces/interface";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generateRules } from "../../utils/utils";

function RegisterPage() {
  const { eventId } = useParams();
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };
  const saveUser = async (user: UserD) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/register/${eventId}`,
        { user }
      );
      if (response.status === 201) {
        message.open({
          type: "success",
          content: "User register successfully",
        });
      }
    } catch (error) {
      console.error(error);
    } 
  };

  const onFinish = (values: UserI) => {
    const user = { ...values, birthDate: (values.birthDate).toDate() };
    saveUser(user);
    form.resetFields();
  };

  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    return current.isAfter(dayjs().endOf("day"));
  };

  return (
    <div className="register-container">
      <h2 className="title register">Event registration</h2>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item
          name={"fullName"}
          label={<span className="label">Full name</span>}
          rules={generateRules("fullName")}
        >
          <Input placeholder="Type Full Name"/>
        </Form.Item>
        <Form.Item
          name={"email"}
          label={<span className="label">Email</span>}
          rules={generateRules("email")}
        >
          <Input placeholder="Type Email"/>
        </Form.Item>
        <Form.Item
          name={"birthDate"}
          label={<span className="label">Date of birth</span>}
          rules={generateRules("birthDate")}
        >
          <DatePicker disabledDate={disabledDate} className="date-picker" />
        </Form.Item>
        <label className="form-item-label">
          Where did you hear about this event?
        </label>
        <Form.Item name={"source"} rules={generateRules("source")}>
          <Radio.Group>
            <Radio value="social media">Social Media</Radio>
            <Radio value="friends">Friends</Radio>
            <Radio value="found myself">Found myself</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
