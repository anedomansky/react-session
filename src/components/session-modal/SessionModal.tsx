import { SyntheticEvent } from 'react';
import './SessionModal.css';

interface Props {
  cancellable?: boolean;
  children?: React.ReactNode;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
  modalHeader?: React.ReactNode;
  show?: boolean;
  text?: string;
  title?: string;
}

const SessionModal: React.FC<Props> = ({
  cancellable, children, modalBody, modalFooter, modalHeader, show, text, title,
}) => {
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
    if (cancellable) {
      event.preventDefault();
    }
  };

  return (
    <dialog className="session-modal" onCancel={handleCancel} open={show}>
      {modalHeader || (title && <h2 className="session-modal__header">{title}</h2>)}
      {modalBody || (text && <div className="session-modal__body">{text}</div>)}
      {modalFooter}
      {children}
    </dialog>
  );
};

export default SessionModal;
