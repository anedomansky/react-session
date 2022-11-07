import React from 'react';

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SessionModalButton: React.FC<Props> = ({ children, onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button onClick={handleClick} type="button">
      {children}
    </button>
  );
};

export default SessionModalButton;
