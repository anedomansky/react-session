interface Props {
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
  modalHeader?: React.ReactNode;
  text?: string;
  title?: string;
  children?: React.ReactNode;
}

const SessionModal: React.FC<Props> = ({
  children, modalBody, modalFooter, modalHeader, text, title,
}) => (
  <dialog>
    {modalHeader || (title && <h2>{title}</h2>)}
    {modalBody || (text && <div>{text}</div>)}
    {modalFooter}
    {children}
  </dialog>
);

export default SessionModal;
