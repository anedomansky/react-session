import { useEffect, useRef, useState } from 'react';
import SessionExpiredModalFooter from '../session-expired-modal-footer/SessionExpiredModalFooter';
import SessionModal from '../session-modal/SessionModal';
import SessionWarnModalFooter from '../session-warn-modal-footer/SessionWarnModalFooter';

interface Props {
  duration?: number;
  expiredModal?: React.ReactNode;
  warnModal?: React.ReactNode;
}

const Session: React.FC<Props> = ({ duration = 1800, expiredModal, warnModal }) => {
  const startTime = new Date().getTime() + duration * 1000;
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
    setRemainingTime(() => startTime); // TODO: set correct start time
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

    console.log('remainingTime: ', remainingTime);
    console.log('remainingSeconds: ', remainingSeconds);

    if (remainingTime <= 0) {
      console.log('cleared interval', intervalId.current);
      clearInterval(intervalId.current);
      setShowExpiredModal(() => true);
    } else if (remainingTime < duration * 0.3) {
      setShowWarnModal(() => true);
    }
  }, [remainingTime]);

  useEffect(() => {
    checkDuration();

    intervalId.current = window.setInterval(checkDuration, 1000);
    console.log('new interval', intervalId.current);

    return () => window.clearInterval(intervalId.current);
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
        warnModal || <SessionModal cancellable show={showWarnModal} text="The session will soon expire!" title="Warning!" modalFooter={<SessionWarnModalFooter onOkClick={() => setShowWarnModal(false)} />} />
      }
      {
        expiredModal || <SessionModal cancellable={false} show={showExpiredModal} text="The session is expired!" title="" modalFooter={<SessionExpiredModalFooter onResetClick={resetSession} />} />
      }
    </>
  );
};

export default Session;
