import { SyntheticEvent } from 'react';
import './SessionModal.css';

interface Props {
  cancellable?: boolean;
  children?: React.ReactNode;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
  modalHeader?: React.ReactNode;
  text?: string;
  title?: string;
}

const SessionModal: React.FC<Props> = ({
  cancellable, children, modalBody, modalFooter, modalHeader, text, title,
}) => {
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
    if (cancellable) {
      event.preventDefault();
    }
  };

  return (
    <dialog className="session-modal" onCancel={handleCancel}>
      {modalHeader || (title && <h2 className="session-modal__header">{title}</h2>)}
      {modalBody || (text && <div className="session-modal__body">{text}</div>)}
      {modalFooter}
      {children}
    </dialog>
  );
};

export default SessionModal;
