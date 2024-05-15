import { SetStateAction, useEffect, useState } from "react";
import { EventItem } from "../../interfaces/interface";
import axios from "axios";
import { Pagination, Switch } from "antd";
import EventCard from "../../components/eventCard/EventCard";
import "./EventList.css";
import SortOptions from "../../components/sort/SortOptions";

function EventList() {
  const [eventList, setEventList] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [isPaginationActive, setIsPaginationActive] = useState<boolean>(true);

  const limit = 12;
  
  const sortOptions = [
    { label: "Sort by Title", value: "title" },
    { label: "Sort by Date", value: "eventDate" },
    { label: "Sort by Organizer", value: "organizer" },
  ];

  const fetchData = async (page: SetStateAction<number>, resetData: boolean) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/events?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      setEventList(resetData ? [...response.data.data] : [...eventList ,...response.data.data]);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, true);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + Math.ceil(document.documentElement.scrollTop) !==
          document.documentElement.offsetHeight ||
        isLoading || isPaginationActive
      ) {
        return;
      }
      if (currentPage !== totalPages) {
        fetchData(currentPage + 1, false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages, isLoading, isPaginationActive]);

  const handleChangePage = (page: number) => {
    fetchData(page, true);
  };

  const handleSort = (selectedSortBy: string) => {
    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(selectedSortBy);
      setSortOrder("asc");
    }
  };

  const onChange = (checked: boolean) => {
    setIsPaginationActive(checked);
    if (checked) {
      fetchData(1, true);
    } else {
      fetchData(1, true);
    }
  };

  return (
    <div>
      <h2 className="title">Events</h2>
      <div className="sort-options">
        <SortOptions sortOptions={sortOptions} handleSort={handleSort} />
      </div>
      <div className="switch-wrapper">
        <div className="switch-wrapper-text">switch to {isPaginationActive ? 'scroll' : 'pagination'}</div>
        <Switch defaultChecked onChange={onChange} />
        </div>
       <ul className="cards">
        {eventList?.map((card: EventItem) => {
          return <EventCard eventItem={card} key={card._id} />;
        })}
      </ul>

      {isPaginationActive ? <Pagination
        current={currentPage}
        total={totalPages * limit}
        onChange={handleChangePage}
        pageSize={limit}
        showSizeChanger={false}
        disabled={isLoading}
      /> : null}
    </div>
  );
}

export default EventList;
