import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart, RegisteredI } from "../../interfaces/interface";
import axios from "axios";
import UserCard from "../../components/userCard/UserCard";
import "./ParticipantPage.css";
import RegistrationChart from "../../components/chart/RegistrationChart";

function ParticipantPage() {
  const { eventId } = useParams();
  const [registeredUser, setRegisteredUser] = useState<RegisteredI[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showSearchContainer, setShowSearchContainer] = useState<boolean>(true);
  const [chartData, setChartData] = useState<Chart[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/register/${eventId}`,
        {
          params: {
            q: search,
          },
        }
      );
      setRegisteredUser(response.data.data);
      setChartData(response.data.chart); 
      setShowSearchContainer(response.data.count > 0); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };
  useEffect(() => {
    fetchData();
  }, [eventId]);


  return (
    <div>
      <h2 className="title">
        "Awesome Event" participants
      </h2>

      {showSearchContainer && (
        <div className="search-container">
          <Input
            placeholder="Search by full name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button type="primary" onClick={fetchData}>
            Search
          </Button>
        </div>
      )}
      <ul className="cards">
        {registeredUser.map((user: RegisteredI) => {
          return <UserCard user={user} key={user._id} />;
        })}
      </ul>
      {chartData.length > 0 && <RegistrationChart registerDate={chartData} />} 
      {!registeredUser.length && !search && (
        <h4>No registered user on this event!</h4>
      )}
      {!registeredUser.length && search && (
        <h4>No searching result. Please try again!</h4>
      )}
    </div>
  );
}

export default ParticipantPage;
