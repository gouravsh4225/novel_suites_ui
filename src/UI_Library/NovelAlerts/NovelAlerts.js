import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./NovelAlerts.scss";

const createNovelNodeElement = () => {
  return new Promise((resolve, reject) => {
    if (!document.getElementById("alert-novel")) {
      const createTag = document.createElement("div");
      createTag.setAttribute("id", `alert-novel`);
      document.body.appendChild(createTag);
      return resolve(true);
    }
    return resolve(true);
  });
};

const NovelAlertsCreateElement = (type, options) => {
  createNovelNodeElement().then((res) => {
    if (!res) return alert("some error while loading");
    ReactDOM.render(
      <NovelAlertsContent type={type} options={options} />,
      document.getElementById(`alert-novel`)
    );
  });
};

const NovelAlertsContent = (props) => {
  const { options, type } = props;
  const [contentList, setContentList] = useState([]);
  const { dismissTime, autoDelete, description } = options;

  useEffect(() => {
    let listOption = {
      id: Math.floor(Math.random() * 100 + 1),
      options: options ? options : {},
      description,
      type,
    };
    setContentList([...contentList, listOption]);
  }, [props]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (autoDelete && contentList.length && contentList.length) {
          onCloseHandler(contentList[0].id);
        }
      },
      dismissTime ? dismissTime : 2000
    );

    return () => {
      clearInterval(interval);
    };
  }, [contentList, autoDelete, dismissTime]);

  const renderMessage = (contentOptions) => {
    const { message } = contentOptions;
    if (message) {
      return <div className="novel-alert-message">{message}</div>;
    }
    return null;
  };
  const onCloseHandler = (id) => {
    const listItemIndex = contentList.findIndex((e) => e.id === id);
    contentList.splice(listItemIndex, 1);
    setContentList([...contentList]);
  };
  return (
    <Fragment>
      <div className="novel-alert-root top-right">
        {contentList.map((contentItem) => (
          <div
            key={contentItem.id}
            className={`novel-alert-container bg-${contentItem.type} top-right toast`}
          >
            <div className="novel-alert-message-container">
              {renderMessage(contentItem.options)}
              <div className="novel-alert-close">
                <span
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={(e) => onCloseHandler(contentItem.id)}
                ></span>
              </div>
            </div>
            <div className="novel-alert-descr">
              {contentItem.description ? contentItem.description : ""}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const success = (options) => {
  NovelAlertsCreateElement("success", options);
};

const error = (options) => {
  NovelAlertsCreateElement("error", options);
};

const info = (options) => {
  NovelAlertsCreateElement("info", options);
};
const warning = (options) => {
  NovelAlertsCreateElement("warning", options);
};

const NovelAlerts = {};
NovelAlerts.success = success;
NovelAlerts.erorr = error;
NovelAlerts.info = info;
NovelAlerts.warning = warning;

export default NovelAlerts;
