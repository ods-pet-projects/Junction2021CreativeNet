import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import style from "./Table.module.css";
import { ClassNames } from "@emotion/react";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [el, setEl] = useState({});
  const [onRow, setOnRow] = useState(false);

  useEffect(() => {
    axios
      .get("http://51.250.17.189:25000/api/get_queries")
      .then((res) => setData(res.data));
  }, []);

  const getDetails = (el) => {
    setShowCards(true);
    setEl(el);
  };

  const showTable = () => setShowCards(false);

  const sort = (property) => {
    const sortedData = data.sort((a, b) => b[property] - a[property]);
    console.log(sortedData);
    setData(sortedData);
  };

  return (
    <div>
      {showCards ? (
        <Cards el={el} showTable={showTable} />
      ) : (
        <table class="rwd-table">
          <tr>
            <th className={style.main}>ID</th>
            <th className={style.main} onClick={() => sort("probability")}>
              Probability
            </th>
            <th className={style.main}>Sensor quality</th>
            <th className={style.main}>Loading</th>
            <th className={style.main}>Speed</th>
            <th className={style.main}>Action</th>
            <th className={style.main}>Details</th>
          </tr>
          {data.map((el) => {
            return (
              <tr key={el.probability} className={style.onMouseEnter}>
                <th>{el.id}</th>
                <th>{Number(el.probability).toFixed(2)}</th>
                <th>{Number(el.sensor_quality).toFixed(2)}</th>
                <th>{el.loading}</th>
                <th>{el.speed}</th>
                <th>
                  <button className={style.button}>Agree</button>
                </th>
                <th>
                  <button
                    className={style.button}
                    onClick={() => getDetails(el)}
                  >
                    Details
                  </button>
                </th>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default TableComponent;
