import React from "react";
import "./NovelStepper.scss";

const NovelStepper = ({ steps, current, onClickStep }) => {
  const onClickStepperHandler = (e, data) => {
    e.preventDefault();
    if (onClickStep) {
      onClickStep(data);
    }
    return;
  };
  const classContainer = (index) => {
    let cssClass = `novel-stepper__item`;
    if (current > index) return `${cssClass} step-completed`;
    else if (current === index) return `${cssClass} active`;
    else return cssClass;
  };

  if (Array.isArray(steps)) {
    return (
      <div class="novel_stepper_wrapper">
        <ol class="novel-stepper">
          {steps.map((step, index) => (
            <li className={classContainer(index)} key={index}>
              <StepperStep
                step={step}
                current={current}
                index={index}
                onClick={(e, step) =>
                  onClickStepperHandler(e, {
                    ...step,
                    current: index,
                    prev: current,
                  })
                }
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return null;
};

const StepperStep = ({ current, step, index, onClick }) => {
  const { title } = step;
  return (
    <div onClick={(e) => onClick(e, step)}>
      <div className="novel-stepper__icon">
        {current > index ? (
          <i className="fa fa-check" aria-hidden="true"></i>
        ) : (
          <>{index}</>
        )}
      </div>
      <div className="novel-stepper__title">{title}</div>
    </div>
  );
};

export { NovelStepper };
