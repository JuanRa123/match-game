import React, { useState, useEffect } from "react";

interface Props {
  text: string;
  onClick: () => void;
  selected?: boolean;
  matched?: boolean;
}
const Button: React.FC<Props> = ({ text, onClick, selected=false, matched=false }) => {

  const [color, setColor] = useState<string>("");

  const [clicked, setClicked] = useState<boolean>(selected);

  useEffect(() => {
    if (matched) {
      setColor("green");
    } else if (clicked) {
      setColor("blue");
    } else {
      setColor("");
    }
  }, [selected, matched, clicked]);

  const handleClick = () => {
    setClicked(true);
    onClick();
}

  return (

    <div className={`flex w-full items-center justify-between space-x-6 p-6 cursor-pointer bg-${color}`} onClick={handleClick}>
            <div className="flex-1 truncate">
                <div className="flex items-center justify-center">
                    <h3 className="truncate text-sm font-medium text-gray-900">{text}</h3>
                </div>
            </div>
        </div>
    /* <button
      onClick={handleClick}
      
      className="button"
    >
      {text}
    </button> */
  );
};

export default Button;