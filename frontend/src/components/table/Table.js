import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import style from "./Table.module.css";

import ReactTooltip from "react-tooltip";

import Button from "react-bootstrap/Button";

//import ClickModal from "../ClickModal";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [el, setEl] = useState({});
  const [onSort, setOnSort] = useState(false);
  const [property, setProperty] = useState("");
  const [tableFilter, setTableFilter] = useState("");

  const [modalEnabled, setModalEnabled] = useState(false);

  useEffect(() => {
    axios.get("http://51.250.17.189:25000/api/get_queries").then((res) => {
      setData(res.data);
    });
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

  const handleFilter = (val) => {
    setTableFilter(val);
  };

  const handleModalClose = () => {
    setModalEnabled(false);
  };

  const handleModalOpen = React.useCallback(() => {
    if(modalEnabled === false) { setModalEnabled(true) }
   }, [modalEnabled]);


  return (
    <div>
      <ReactTooltip />
      <p>
        <input
          value={tableFilter || ""}
          onChange={(e) => {
            handleFilter(e.target.value);
          }}
          className={style.filter_input}
          type="text"
          placeholder="Type to filter the table…"
        />
      </p>

      {showCards ? (
        <Cards el={el} showTable={showTable} />
      ) : (
        <table className={style.rwd_table}>
          <thead className={style.header}>
            <tr className={style.header_row}>
              <th className={style.main}>REPAIR TASK ID</th>
              <th
                data-tip="Our estimation of sensor quality calculated as positive feedback divided by total feedback. A higher sensor quality score is better."
                className={style.main}
                onClick={() => sort("sensor_quality")}
              >
                Sensor quality{" "}
                {property === "sensor_quality" ? (onSort ? "↓" : "↑") : ""}
              </th>
              <th
                data-tip="Load category - the higher the load category, the heavier the load that the lift can carry."
                className={style.main}
                onClick={() => sort("loading")}
              >
                Load category{" "}
                {property === "loading" ? (onSort ? "↓" : "↑") : ""}
              </th>
              <th
                data-tip="Speed category - the higher the speed category, the faster the lift can go."
                className={style.main}
                onClick={() => sort("speed")}
              >
                Speed category{" "}
                {property === "speed" ? (onSort ? "↓" : "↑") : ""}
              </th>
              <th
                data-tip="The probability of positive feedback from our ML model (the higher it is, the higher the suggested priority)."
                className={style.main}
                onClick={() => sort("probability")}
              >
                POSITIVE FEEDBACK{" "}
                {property === "probability" ? (onSort ? "↓" : "↑") : ""}
              </th>
              <th className={style.main}>Action</th>
              <th className={style.main}></th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((d) =>
                Object.values(d)
                  .filter((v) =>
                    typeof v === "string" ? !v.startsWith("ga") : true
                  )
                  .some((c) => c.includes(tableFilter))
              )
              .map((el, i) => {
                return (
                  <tr
                    key={el.probability+Math.random()}
                    className={style.onMouseEnter}
                    style={{ background: i % 2 !== 0 ? "#f5f3e6" : "white" }}
                  >
                    <td>{el.id}</td>
                    <td>{Number(el.sensor_quality).toFixed(2)}</td>
                    <td>{el.loading}</td>
                    <td>{el.speed}</td>
                    <td className={style.priority_score}>
                      {Number(el.probability).toFixed(2)}
                    </td>
                    <td>
                      {
                        /*
                      <ClickModal
                        enabled={modalEnabled}
                        handleClose={handleModalClose}
                      />
                      */
              }
                      <Button
                        variant="success"
                      //  onClick={() => handleModalOpen}
                      >
                        Accept
                      </Button>{" "}
                      <Button
                        variant="warning"
                       // onClick={() => handleModalOpen}
                      >
                        Cancel
                      </Button>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => getDetails(el)}>
                        Get details
                      </Button>
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
