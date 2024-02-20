import React, { useState, useEffect } from "react";

interface Props {
  text: string;
  matched?: string[];
  onClick: () => void;
  selectedCards: string[];
  gameRestarted: boolean;
}
const Button: React.FC<Props> = ({ text, onClick, matched, selectedCards, gameRestarted }) => {

  const [color, setColor] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCards.length === 1) {
      setColor("blue");
    } else if (matched?.includes(text)) {
      setColor("green");
    } else {
      setColor("red");
    }
    if (!selectedCards.includes(text)) {
      setColor("");
    }
  }, [selectedCards, matched, clicked]);

    useEffect(() => {
    if (gameRestarted) {
      setColor("");
    }
  }, [gameRestarted]);

  const handleClick = () => {
    setClicked(true);
    onClick();
  }

  return (
    <div className={`flex w-full items-center justify-between space-x-6 p-6 cursor-pointer ${color != "" ? `bg-${color}-100` : ''}`} style={{ backgroundColor: color }} onClick={handleClick}>
      <div className="flex-1 truncate">
        <div className="flex items-center justify-center">
          <h3 className="truncate text-sm font-medium text-gray-900">{text}</h3>
        </div>
      </div>
    </div>
  );
};

export default Button;