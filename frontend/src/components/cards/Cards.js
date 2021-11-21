import React from "react";
import img from "./../../images/download.png";
import style from "./Cards.module.css";
import dataImg from "./../../images/photo_2021-11-20_17-45-48.jpg";

import Button from 'react-bootstrap/Button'

import BarChart from "../plots/BarChart";
import PieChart from "../plots/PieChart";
import TraceChart from "../plots/TraceChart";

const Cards = ({ el, showTable }) => {
  return (
    <div className={style.flex}>
      <div className={style.moviCard}>
        <img className={style.moviCard__picture} src={img} alt="" />
        <div className={style.moviCard__about}>
          <p className={style.moviCard__title}>ID - {el.id}</p>
          <div className={style.moviCard__feturesBox}>
            <p className={style.moviCard__fetures}>
              <span className={style.span}>1. Action type:</span>
              <span>{el.action_type}</span>
            </p>
            <p className={style.moviCard__fetures}>
              <span className={style.span}>2. Area id:</span>
              <span>{el.area_id}</span>
            </p>
            <p className={style.moviCard__fetures}>
              <span className={style.span}>3. Loading:</span>
              <span> {el.loading}</span>
            </p>
            <p className={style.moviCard__fetures}>
              <span className={style.span}>4. Probability:</span>
              <span> {el.probability}</span>
            </p>
            <p className={style.moviCard__fetures}>
              <span className={style.span}>5. Speed:</span>
              <span> {el.speed}</span>
            </p>
            <p className={style.moviCard__fetures}>
              <span className={style.span}>6. Sensor quality:</span>
              <span>{el.sensor_quality}</span>
            </p>
          </div>

          <Button onClick={showTable} variant="primary">Go back</Button>
        </div>
      </div>
      <div className={style.cardImg} style={{display: "inline-block"}}>
       
      <h3>How was this generated?</h3>
       
        <img src={dataImg} alt="" className={style.img} />
        

       { 
      //  <TraceChart
      //   csv_file="equipment_id_train_counts.csv"
      //   plot_title="Equipment ID train counts"
      //   x_label="Equipment number (in a series)"
      //   y_label="Frequency"
      //   y_var_name="0"
      // />
       }
      <p />
    


       <h3>General stats for this dataset</h3>
     
      <TraceChart
        csv_file="completion_date_count_cases.csv"
        plot_title="Cases by completion date (temporal)"
        x_label="Completion (in a sorted series)"
        y_label="Number of cases"
        y_var_name="equipment_id"
      />

    
      <p />
      <PieChart
        plot_title="Action recommendations by category"
        csv_file="action_recommendation_category.csv"
        x_var_name="action_recommendation_category"
        y_var_name="0"
      />


      </div>


    </div>
  );
};

export default Cards;
