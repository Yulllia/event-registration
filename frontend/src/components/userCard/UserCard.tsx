import { Card } from "antd";
import { RegisteredI } from "../../interfaces/interface";

function UserCard(props: { user: RegisteredI }) {
  const { user } = props;

  return (
    <li className="card-item">
      <Card hoverable style={{ width: 275, padding: "12px" }}>
        <div className="card-container">
          <p className="card-text">{user.fullName}</p>
          <p className="card-text">{user.email}</p>
        </div>
      </Card>
    </li>
  );
}

export default UserCard;
