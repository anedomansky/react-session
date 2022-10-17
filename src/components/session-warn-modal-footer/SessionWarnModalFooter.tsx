import SessionModalButton from '../session-modal-button/SessionModalButton';

interface Props {
  onOkClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SessionWarnModalFooter: React.FC<Props> = ({ onOkClick }) => <div><SessionModalButton onClick={onOkClick}>Ok</SessionModalButton></div>;

export default SessionWarnModalFooter;
