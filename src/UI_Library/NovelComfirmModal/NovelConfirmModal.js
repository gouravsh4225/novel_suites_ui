import React, { useCallback } from "react";
import { Button, Modal } from "../UI_Library";
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
    <Modal
      onEscKeyClose={onClose}
      isOpen={isOpen}
      isCenter={false}
      className="novel-confirm-modal-root"
    >
      <Modal.Header
        onCloseHandler={onClose}
        headerHeading="Confrim "
        className={addConfirmModalClass()}
      />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <div className="confirm-buttons">
          <Button buttonLabel="Close" onClick={onClose} />
          <Button
            buttonLabel="Confirm"
            onClick={(e) => onConfirm}
            className="bg-error"
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export { NovelConfirmModal };
