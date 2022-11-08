import { SyntheticEvent, useEffect, useRef } from 'react';
import './SessionModal.css';

interface Props {
  additionalClasses?: string;
  cancellable?: boolean;
  children?: React.ReactNode;
  show?: boolean;
  text?: string;
  title?: string;
}

const SessionModal: React.FC<Props> = ({
  additionalClasses,
  cancellable,
  children,
  show,
  text,
  title,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
    if (!cancellable) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (!dialogNode) {
      return;
    }

    if (show) {
      dialogNode.showModal();
    } else {
      dialogNode.close();
    }
  }, [show]);

  return (
    <dialog
      className={`session-modal ${additionalClasses || ''}`}
      onCancel={handleCancel}
      ref={dialogRef}
    >
      {title && <h2 className="session-modal__header">{title}</h2>}
      {text && <div className="session-modal__body">{text}</div>}
      {children}
    </dialog>
  );
};

export default SessionModal;
