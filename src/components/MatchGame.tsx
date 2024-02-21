import { createContext, useEffect, useMemo, useState } from "react";
import Modal from './Modal';
import Button from "./Button";
type EnsuredObject = Record<string, string>;

// This is the input that our component received
type Data = string | EnsuredObject;

// Three possible states of our game
export type Result = null | true | false;

interface Props {
  data: Data;
  limit: number;
}

const shuffleArray = (array: string[]) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const convertStringDataIntoElements = (object: EnsuredObject) => {
  return shuffleArray(Object.entries(object).flatMap<string>(([key, value]) => [key, value as string]));
};

export type ContextValue = {
  result: Result,
  selectedCards: string[],
  gameEnded: boolean,
  errorCount: number,
};

export const MatchGameContext = createContext<ContextValue | null>(null);

export default function MatchGame({ data, limit }: Props) {
  const parsedData = useMemo(() => typeof data === 'string' ? JSON.parse(data) : data, [data]);
  const elements = useMemo(() => convertStringDataIntoElements(parsedData), [parsedData]);

  const [errorCount, setErrorCount] = useState(0);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const result = useMemo<Result>(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      return (Object.prototype.hasOwnProperty.call(parsedData, first) && parsedData[first] === second
        || Object.prototype.hasOwnProperty.call(parsedData, second) && parsedData[second] === first);
    }

    return null;
  }, [selectedCards, parsedData])


  useEffect(() => {
    if (result === false) {
      setErrorCount((prev) => prev + 1);
    }
  }, [result]);


  const handleClick = (card: string) => {
    if (selectedCards.length === 0 || selectedCards.length === 2) {                  
      setSelectedCards([card]);
    } else {      
      if (!selectedCards.includes(card)) {
        setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
      } else {             
        setSelectedCards([]);
      }
    }
  };
  
  const gameEnded = errorCount === limit

  const resetGame = () => {
    setErrorCount(0);
    setSelectedCards([]);
  };

  const contextValue = {
    result,
    selectedCards,
    gameEnded,
    errorCount,
  };

  return (
    <MatchGameContext.Provider value={contextValue}>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {elements.map((element, index) => (
          <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <Button text={element} onClick={() => handleClick(element)} />
          </li>
        ))}
      </ul>
      <div className="rounded-md bg-red-50 p-4 mt-4">
        <h3 className="text-sm font-medium text-red-800">{errorCount > 0 ? `Errors: ${errorCount}` : ''}</h3>
      </div>
      <Modal message={`You got ${limit} errors`} closeText={'Try again'} dialogText={'You lose'} onClose={resetGame} />
    </MatchGameContext.Provider>
  );
}