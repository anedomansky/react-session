import { useEffect, useRef, useState } from 'react';
import SessionModal from '../session-modal/SessionModal';
import SessionModalFooter from '../session-modal-footer/SessionModalFooter';

interface Props {
  duration?: number;
  expiredModal?: React.ReactNode;
  warnModal?: React.ReactNode;
}

const Session: React.FC<Props> = ({ duration = 1800, expiredModal, warnModal }) => {
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
        SessionModalButton
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      {
        warnModal || <SessionModal cancellable show={showWarnModal} text="The session will soon expire!" title="Warning!" modalFooter={<SessionModalFooter text="OK" onClick={() => setShowWarnModal(false)} />} />
      }
      {
        expiredModal || <SessionModal cancellable={false} show={showExpiredModal} text="The session is expired!" title="Expired!" modalFooter={<SessionModalFooter text="Reset" onClick={resetSession} />} />
      }
    </>
  );
};

export default Session;
