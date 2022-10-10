import SessionExpiredModalFooter from '../session-expired-modal-footer/SessionExpiredModalFooter';
import SessionModal from '../session-modal/SessionModal';
import SessionWarnModalFooter from '../session-warn-modal-footer/SessionWarnModalFooter';

interface Props {
  expiredModal?: () => JSX.Element;
  warnModal?: () => JSX.Element;
}

const Session: React.FC<Props> = ({ expiredModal, warnModal }) => (
  <>
    <div>
      SessionModalButton
      <span>hours</span>
      <span>minutes</span>
      <span>seconds</span>
    </div>
    {
      warnModal || <SessionModal text="The session will soon expire!" title="Warning!" modalFooter={<SessionWarnModalFooter />} />
    }
    {
      expiredModal || <SessionModal text="The session is expired!" title="" modalFooter={<SessionExpiredModalFooter />} />
    }
  </>
);

export default Session;
