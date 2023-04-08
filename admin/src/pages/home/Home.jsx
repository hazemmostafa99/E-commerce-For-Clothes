import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      const res = await userRequest.get("users/stats");
      const data = res.data.sort((a, b) => a._id - b._id);
      data.map((stat) => {
        return setUserStats((prev) => [
          ...prev,
          { "Active User": stat.total, name: Months[stat._id - 1] },
        ]);
      });
    };
    getStats();
  }, [Months]);
  console.log(userStats);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats.sort((a, b) => a.name - b.name)}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
