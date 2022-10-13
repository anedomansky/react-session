import { useEffect, useState } from 'react';
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
  let interval: number;
  const [hours, setHours] = useState<string>();
  const [minutes, setMinutes] = useState<string>();
  const [seconds, setSeconds] = useState<string>();
  const [showWarnModal, setShowWarnModal] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(startTime);

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
      clearInterval(interval);
      // TODO: show expiredModal
    } else if (remainingTime < duration * 0.3) {
      // TODO: show warnModal
    }
  }, [remainingTime]);

  useEffect(() => {
    interval = window.setInterval(checkDuration, 1000);

    return () => clearInterval(interval);
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
        warnModal || <SessionModal text="The session will soon expire!" title="Warning!" modalFooter={<SessionWarnModalFooter />} />
      }
      {
        expiredModal || <SessionModal text="The session is expired!" title="" modalFooter={<SessionExpiredModalFooter />} />
      }
    </>
  );
};

export default Session;
