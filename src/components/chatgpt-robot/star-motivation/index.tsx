import React from "react";

import styles from "./index.module.scss";

const StarMotivation = (props) => {
  const {
    text = `您好~ 如果您喜欢 <b>ChatGPT 插件</b>，请给 Higress 一颗星！ <br /> 您的支持是我们最大的动力～`,
    link = "https://github.com/alibaba/higress",
    img = "https://postcat.com/zh/assets/images/heart.png",
  } = props.data || {};

  return (
    <div className={`${styles["star-motivation"]}`}>
      <p
        className={styles["star-motivation-text"]}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></p>
      <a className={styles["favor-image-link"]} href={link} target="_blank">
        <img className={styles["favor-image"]} loading="lazy" src={img} />
      </a>
    </div>
  );
};

export default StarMotivation;
