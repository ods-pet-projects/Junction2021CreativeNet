import React from "react";
import img from "./../../images/download.png";
import style from "./Cards.module.css";

const Cards = ({ el, showTable }) => {
  return (
    <div class={style.moviCard}>
      <img
        class={style.moviCard__picture}
        src={img}
        alt=""
      />
      <div class={style.moviCard__about}>
        <p class={style.moviCard__title}>ID - {el.id}</p>
        <div class={style.moviCard__feturesBox}>
          <p class={style.moviCard__fetures}>
            <span className={style.span}>1. Action type:</span>
            <span>{el.action_type}</span>
          </p>
          <p class={style.moviCard__fetures}>
            <span className={style.span}>2. Area id:</span>
            <span>{el.area_id}</span>
          </p>
          <p class={style.moviCard__fetures}>
            <span className={style.span}>3. Loading:</span>
            <span> {el.loading}</span>
          </p>
          <p class={style.moviCard__fetures}>
            <span className={style.span}>4. Probability:</span>
            <span> {el.probability}</span>
          </p>
          <p class={style.moviCard__fetures}>
            <span className={style.span}>5. Speed:</span>
            <span> {el.speed}</span>
          </p>
          <p class={style.moviCard__fetures}>
            <span className={style.span}>6. Sensor quality:</span>
            <span>{el.sensor_quality}</span>
          </p>
        </div>
        <button onClick={showTable} className={style.button}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default Cards;
