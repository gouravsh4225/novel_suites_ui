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

const NovelAlertsCreateElement = (type, message, options) => {
  createNovelNodeElement().then((res) => {
    if (!res) return alert("some error while loading");
    ReactDOM.render(
      <NovelAlertsContent type={type} options={options} message={message} />,
      document.getElementById(`alert-novel`)
    );
  });
};

const getDefaultAndPropsOptions = (options = {}) => {
  return {
    dismissTime: 3000,
    autoDelete: true,
    description: "",
    toastPos: "top-right",
    ...options,
  };
};

const NovelAlertsContent = (props) => {
  const { options, type, message } = props;
  const [contentList, setContentList] = useState([]);
  const { dismissTime, autoDelete, description, toastPos } =
    getDefaultAndPropsOptions(options);

  useEffect(() => {
    let listOption = {
      id: Math.floor(Math.random() * 100 + 1),
      options: options ? options : {},
      description,
      type,
      message,
    };
    setContentList([...contentList, listOption]);
  }, [props]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && contentList.length && contentList.length) {
        onCloseHandler(contentList[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, [contentList]);

  const renderMessage = (renderMessageText) => {
    if (renderMessageText) {
      return <div className="novel-alert-message">{renderMessageText}</div>;
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
      <div className={`novel-alert-root ${toastPos}`}>
        {contentList.map((contentItem) => (
          <div
            key={contentItem.id}
            className={`novel-alert-container bg-${contentItem.type} ${toastPos} toast`}
          >
            <div className="novel-alert-message-container">
              {renderMessage(contentItem.message)}
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

const success = (message = " ", options) => {
  NovelAlertsCreateElement("success", message, options);
};

const error = (message = " ", options) => {
  NovelAlertsCreateElement("error", message, options);
};

const info = (message = " ", options) => {
  NovelAlertsCreateElement("info", message, options);
};
const warning = (message = " ", options) => {
  NovelAlertsCreateElement("warning", message, options);
};

const NovelAlerts = {};
NovelAlerts.success = success;
NovelAlerts.error = error;
NovelAlerts.info = info;
NovelAlerts.warning = warning;

export { NovelAlerts };
