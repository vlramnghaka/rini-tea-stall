import React from 'react';

type ButtonGroupProps = {
  buttons: string[];
  onClick: (value: string) => void;
  selected: string;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, onClick, selected }) => {
  return (
    <div className="button-group">
      {buttons.map((button, index) => (
        <button 
          key={index} 
          className={`btn ${selected === button ? 'active' : ''}`}
          onClick={() => onClick(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;