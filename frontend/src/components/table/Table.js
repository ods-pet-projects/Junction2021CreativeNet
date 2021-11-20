import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import style from "./Table.module.css";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [el, setEl] = useState({});
  const [onSort, setOnSort] = useState(false);
  const [property, setProperty] = useState("");
  const [tableFilter, setTableFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://51.250.17.189:25000/api/get_queries")
      .then((res) => setData(res.data));
  }, []);

  const getDetails = (el) => {
    setShowCards(true);
    setEl(el);
  };

  useEffect(() => {
    if (onSort) {
      const sort = (property) => {
        const sortedData = [...data.sort((a, b) => b[property] - a[property])];
        setData(sortedData);
      };
      sort(property);
      return;
    }

    if (!onSort) {
      const sort = (property) => {
        const sortedData = [...data.sort((a, b) => a[property] - b[property])];
        setData(sortedData);
      };
      sort(property);
    }
  }, [onSort]);

  const showTable = () => setShowCards(false);

  const sort = (string) => {
    setOnSort(!onSort);
    setProperty(string);
  };

  const handleFilter = (val) =>{
    setTableFilter(val);

  }


  return (
    <div>
      <p><input value={tableFilter ||""} onChange={(e) => {handleFilter(e.target.value)}} className={style.filter_input} type="text" placeholder="Type to filter the table…"/></p>
      {showCards ? (
        <Cards el={el} showTable={showTable} />
      ) : (
        <table className={style.rwd_table}>
          <thead className={style.header}>
          <tr className={style.header_row}>
            <th className={style.main}>REPAIR ID</th>
            <th className={style.main} onClick={() => sort("sensor_quality")}>
              Sensor quality {property === "sensor_quality" ? (onSort ? '↓': '↑'  ): ''}
            </th>
            <th className={style.main} onClick={() => sort("loading")}>
              Loading {property === "loading" ? (onSort ? '↓': '↑'  ): ''}
            </th>
            <th className={style.main} onClick={() => sort("speed")}>
              Speed {property === "speed" ? (onSort ? '↓': '↑'  ): ''}
            </th>
            <th className={style.main} onClick={() => sort("probability")}>
              PRIORITY SCORE {property === "probability" ? (onSort ? '↓': '↑'  ): ''}
            </th>
            <th className={style.main}>Action</th>
            <th className={style.main}>Details</th>
          </tr>
          </thead>
          <tbody>
          
          {data.filter(d => Object.values(d).filter(v => !v.startsWith("ga")).some(c => c.includes(tableFilter))).map((el) => {
            return (
              <tr key={el.probability} className={style.onMouseEnter}>
               <td>{el.id}</td>
<td>{Number(el.sensor_quality).toFixed(2)}</td>
<td>{el.loading}</td>
<td>{el.speed}</td>
<td className={style.priority_score}>{Number(el.probability).toFixed(2)}</td>
<td>
  <button className={style.button_action}>Agree</button>
</td>
<td>
  <button
    className={style.button_details}
    onClick={() => getDetails(el)}
  >
    Details
  </button>
</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
