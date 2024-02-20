import { useEffect, useState } from "react";
import Button from "./Button";

interface Props {
  onError: () => void;
  numberOfElements: number;
  elements: string | Record<string, any>;
  gameRestarted: boolean;
}

export default function GridList({ elements, numberOfElements, onError, gameRestarted }: Props) {
  const [matched, setMatched] = useState([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [shuffledElements, setShuffledElements] = useState<string[]>([]);

  let parsedElements: Record<string, any> = {};

  try {
    parsedElements = typeof elements === 'string' ? JSON.parse(elements) : elements;
  } catch (error) {
    console.error("Error parsing elements:", error);
  }

  useEffect(() => {
    const elementsArray = numberOfElements ? Object.entries(parsedElements).slice(0, numberOfElements).flatMap(([key, value]) => [key, value]) : Object.entries(parsedElements).flatMap(([key, value]) => [key, value]);
    setShuffledElements(shuffleArray(elementsArray));
  }, [elements, numberOfElements]);

  useEffect(() => {
    
    if (selectedCards.length === 2) {

      const [first, second] = selectedCards;

      if (parsedElements.hasOwnProperty(first) && parsedElements[first] === second || parsedElements.hasOwnProperty(second) && parsedElements[second] === first) {
        setMatched([first, second]);
      }else {
        onError(); 
      }

    }
  }, [selectedCards])


  const handleClick = (card: string) => {
    if (selectedCards.length === 0 || selectedCards.length === 2) {                  
      setSelectedCards([card]);
      setMatched([]);           
    } else {      
      if (!selectedCards.includes(card)) {
        setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
      } else {             
        setSelectedCards([]);
      }
    }
  };

  const shuffleArray = (array: string[]) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {shuffledElements.map((element, index) => (
        <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <Button text={element} onClick={() => handleClick(element)} selectedCards={selectedCards} matched={matched} gameRestarted={gameRestarted} />
        </li>
      ))}
    </ul>
  );
}