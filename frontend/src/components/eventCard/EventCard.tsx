import { EventItem } from "../../interfaces/interface";
import { Card } from "antd";
import "./EventCard.css";
import moment from "moment";
import { Link } from "react-router-dom";

function EventCard(props: { eventItem: EventItem }) {
  const { eventItem } = props;

  return (
    <li className="card-item">
      <Card
        hoverable
        style={{ width: 270 }}
        title={eventItem.title}
        bordered={true}
      >
        <div className="card-container">
          <p className="card-description">{eventItem.description}</p>
          <p className="card-text">
            <span className="card-title">Date: </span>
            {moment(eventItem.eventDate).format("DD/MM/YYYY")}
          </p>
          <div className="card-text">
            <span className="card-title">Organizer:</span> {eventItem.organizer}
          </div>
        </div>
        <div className="link-container">
          <Link to={`/register/${eventItem._id}`}>Register</Link>
          <Link to={`/participants/${eventItem._id}`}>View</Link>
        </div>
      </Card>
    </li>
  );
}

export default EventCard;
