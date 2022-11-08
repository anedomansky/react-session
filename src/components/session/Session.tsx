import { useEffect, useRef, useState } from 'react';
import SessionModal from '../session-modal/SessionModal';
import SessionModalFooter from '../session-modal-footer/SessionModalFooter';

interface Props {
  /**
   * Space separated CSS classes for the &lt;dialog&gt;.
   */
  additionalExpiredModalClasses?: string;
  /**
   * Space separated CSS classes for the &lt;dialog&gt;.
   */
  additionalWarnModalClasses?: string;
  /**
   * The duration of the session in seconds.
   * @default 1800
   */
  duration?: number;
  /**
   * The expired modal button text.
   * @default 'Reset'
   */
  expiredModalBtnText?: string;
  /**
   * The expired modal text.
   * @default 'The session is expired!'
   */
  expiredModalText?: string;
  /**
   * The expired modal title.
   * @default 'Expired!'
   */
  expiredModalTitle?: string;
  /**
   * The text that is shown above the session timer.
   * @default 'Session'
   */
  sessionInfoText?: string;
  /**
   * Callback, triggered when the expired modal button is clicked.
   */
  onExpiredModalBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback, triggered when the warn modal button is clicked.
   */
  onWarnModalBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * The warn modal button text.
   * @default 'OK'
   */
  warnModalBtnText?: string;
  /**
   * The warn modal text.
   * @default 'The session will soon expire!'
   */
  warnModalText?: string;
  /**
   * The warn modal title.
   * @default 'Warning!'
   */
  warnModalTitle?: string;
}

const Session: React.FC<Props> = ({
  additionalExpiredModalClasses,
  additionalWarnModalClasses,
  duration = 1800,
  expiredModalBtnText = 'Reset',
  expiredModalText = 'The session is expired!',
  expiredModalTitle = 'Expired!',
  sessionInfoText = 'Session',
  onExpiredModalBtnClick,
  onWarnModalBtnClick,
  warnModalBtnText = 'OK',
  warnModalText = 'The session will soon expire!',
  warnModalTitle = 'Warning!',
}) => {
  let startTime = new Date().getTime() + duration * 1000;
  const intervalId = useRef<number>(0);
  const [hours, setHours] = useState<string>();
  const [minutes, setMinutes] = useState<string>();
  const [seconds, setSeconds] = useState<string>();
  const [remainingTime, setRemainingTime] = useState<number>(startTime);
  const [showWarnModal, setShowWarnModal] = useState<boolean>(false);
  const [showExpiredModal, setShowExpiredModal] = useState<boolean>(false);

  const checkDuration = () => {
    const now = new Date().getTime();
    const distance = startTime - now; // ms
    setRemainingTime(() => Math.floor(distance / 1000));
  };

  const getRemainingTimeFractionString = (timeFraction: number) => {
    if (timeFraction < 10) {
      return `0${timeFraction}`;
    }

    return `${timeFraction}`;
  };

  const resetSession = () => {
    startTime = new Date().getTime() + duration * 1000;
    checkDuration();
    intervalId.current = window.setInterval(checkDuration, 1000);
    setShowExpiredModal(() => false);
  };

  const handleWarnModalClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowWarnModal(() => false);

    if (onWarnModalBtnClick) {
      onWarnModalBtnClick(event);
    }
  };

  const handleExpiredModalClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    resetSession();

    if (onExpiredModalBtnClick) {
      onExpiredModalBtnClick(event);
    }
  };

  useEffect(() => {
    let tmp = remainingTime;
    const remainingHours = Math.floor(tmp / 3600);
    tmp -= remainingHours * 3600;
    const remainingMinutes = Math.floor(tmp / 60);
    const remainingSeconds = tmp - remainingMinutes * 60;

    setHours(() => getRemainingTimeFractionString(remainingHours));
    setMinutes(() => getRemainingTimeFractionString(remainingMinutes));
    setSeconds(() => getRemainingTimeFractionString(remainingSeconds));

    if (remainingTime <= 0) {
      clearInterval(intervalId.current);
      setShowWarnModal(() => false);
      setShowExpiredModal(() => true);
    } else if (remainingTime < duration * 0.3) {
      setShowWarnModal(() => true);
    }
  }, [remainingTime]);

  useEffect(() => {
    checkDuration();

    intervalId.current = window.setInterval(checkDuration, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <>
      <div>
        <span>{sessionInfoText}</span>
        <br />
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <SessionModal
        additionalClasses={additionalWarnModalClasses}
        cancellable
        show={showWarnModal}
        text={warnModalText}
        title={warnModalTitle}
      >
        <SessionModalFooter
          text={warnModalBtnText}
          onClick={handleWarnModalClick}
        />
      </SessionModal>
      <SessionModal
        additionalClasses={additionalExpiredModalClasses}
        cancellable={false}
        show={showExpiredModal}
        text={expiredModalText}
        title={expiredModalTitle}
      >
        <SessionModalFooter
          text={expiredModalBtnText}
          onClick={handleExpiredModalClick}
        />
      </SessionModal>
    </>
  );
};

export default Session;
