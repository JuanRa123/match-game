import React, { useContext } from "react";
import { MatchGameContext } from './MatchGame';

interface Props {
  text: string;
  onClick: () => void;
}
const Button: React.FC<Props> = ({ text, onClick }) => {
  const {
    result,
    selectedCards,
  } = useContext(MatchGameContext)!;

  const currentColor = (() => {
    switch (result) {
      case true:
        return 'green';
      case false:
        return 'red';
      default: return 'blue';
    }
  })();

  const isSelected = selectedCards.includes(text);

  return (
    <button className={`flex w-full items-center justify-between space-x-6 p-6 cursor-pointer`} style={{ backgroundColor: isSelected ? currentColor : undefined }} onClick={onClick}>
      <div className="flex-1 truncate">
        <div className="flex items-center justify-center">
          <h3 className="truncate text-sm font-medium text-gray-900">{text}</h3>
        </div>
      </div>
    </button>
  );
};

export default Button;