import SessionModalButton from '../session-modal-button/SessionModalButton';

interface Props {
  onResetClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SessionExpiredModalFooter: React.FC<Props> = ({ onResetClick }) => <div><SessionModalButton onClick={onResetClick}>Reset</SessionModalButton></div>;

export default SessionExpiredModalFooter;
