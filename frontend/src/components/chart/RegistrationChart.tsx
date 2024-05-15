import { Chart } from "../../interfaces/interface";
import { Line } from "@ant-design/charts";

function RegistrationChart(props: { registerDate: Chart[] }) {
  const { registerDate } = props;
  const data = registerDate.map((column: Chart) => {
    return {
      day: column.day,
      amount: column.count,
    };
  });

  const config = {
    data,
    xField: "day",
    yField: "amount",
    xAxis: {
      title: {
        text: "Day",
      },
    },
    yAxis: {
      title: {
        text: "Amount",
      },
    },
  };

  return (
    <div style={{ width: '800px', height: '300px'}}>
      <Line {...config} />
    </div>
  );
}

export default RegistrationChart;
