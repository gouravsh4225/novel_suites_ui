import React, { useCallback } from "react";
import NovelDialog from "../NovelDialog/NovelDialog";
import NovelSuitesButton from "../NovelSuitesButton/NovelSuitesButton";
import "./NovelConfirmModal.scss";

const NOVELCOMFIRMTYPES = ["error", "success", "info", "warning", "default"];

const NovelConfirmModal = ({ children, onClose, isOpen, type, onConfirm }) => {
  const addConfirmModalClass = useCallback(() => {
    if (type === NOVELCOMFIRMTYPES[0]) {
      return "bg-error";
    } else if (type === NOVELCOMFIRMTYPES[1]) {
      return "bg-success";
    } else if (type === NOVELCOMFIRMTYPES[2]) {
      return "bg-info";
    } else if (type === NOVELCOMFIRMTYPES[3]) {
      return "bg-warning";
    }
    return "";
  }, [type]);

  return (
    <NovelDialog
      onEscKeyClose={onClose}
      isOpen={isOpen}
      isCenter={false}
      className="novel-confirm-modal-root"
    >
      <NovelDialog.Header
        onCloseHandler={onClose}
        headerHeading="Confrim "
        className={addConfirmModalClass()}
      />
      <NovelDialog.Content>{children}</NovelDialog.Content>
      <NovelDialog.Footer>
        <div className="confirm-buttons">
          <NovelSuitesButton buttonLabel="Close" onClick={onClose} />
          <NovelSuitesButton
            buttonLabel="Confirm"
            onClick={(e) => onConfirm}
            className="bg-error"
          />
        </div>
      </NovelDialog.Footer>
    </NovelDialog>
  );
};

export default NovelConfirmModal;
