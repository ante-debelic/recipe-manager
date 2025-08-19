import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import modalClasses from "./Modal.module.css";
import Button from "./Button";

export default function Modal({
  children,
  onClose,
  onDelete,
  onCancel,
  open,
  deleteModal,
  className = "",
}) {
  const dialog = useRef();

  useEffect(() => {
    const modalEl = dialog.current;
    if (!modalEl) return;
    if (open) {
      modalEl.showModal();
    }
    return () => modalEl.close();
  }, [open]);

  let modalContent = (
    <Button className={modalClasses.modal_save_button} onClick={onClose}>
      Close
    </Button>
  );

  if (deleteModal) {
    modalContent = (
      <div className={modalClasses.delete_modal}>
        <Button className={modalClasses.modal_button1} onClick={onDelete}>
          Delete
        </Button>
        <Button className={modalClasses.modal_button2} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    );
  }

  return createPortal(
    <dialog
      ref={dialog}
      className={`${modalClasses.modal} 
       ${className}`}
    >
      {open ? children : null}
      <form method="dialog">{modalContent}</form>
    </dialog>,
    document.getElementById("modal")
  );
}

