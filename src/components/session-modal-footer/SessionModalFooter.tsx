import SessionModalButton from '../session-modal-button/SessionModalButton';
import './SessionModalFooter.css';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

const SessionModalFooter: React.FC<Props> = ({ onClick, text }) => (
  <div className="session-modal-footer">
    <SessionModalButton onClick={onClick}>{text}</SessionModalButton>
  </div>
);

export default SessionModalFooter;
