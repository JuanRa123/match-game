import { useEffect, useState } from "react";
import Button from "./Button";

interface Props {
  elements: string | Record<string, any>;
  numberOfElements: number;
}

export default function GridList({ elements, numberOfElements }: Props) {
  const [matched, setMatched] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [shuffledElements, setShuffledElements] = useState<string[]>([]);

  let parsedElements: Record<string, any> = {};
  useEffect(() => {
    try {
      parsedElements = typeof elements === 'string' ? JSON.parse(elements) : elements;
    } catch (error) {
      console.error("Error parsing elements:", error);
    }

    const elementsArray = numberOfElements ? Object.entries(parsedElements).slice(0, numberOfElements).flatMap(([key, value]) => [key, value]) : Object.entries(parsedElements).flatMap(([key, value]) => [key, value]);
    
    setShuffledElements(shuffleArray(elementsArray));
  }, [elements, numberOfElements]);

  const handleClick = (card: string) => {
    if (selectedCards.length === 0 || selectedCards.length === 2) {
      setSelectedCards([card]);
    } else {
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
      if (selectedCards.length === 1) {
        const [firstCard] = selectedCards;
        if (parsedElements[firstCard] === card) {
          setMatched(true);
        } else {
          setMatched(false);
        }
      }
    }
  };

  const shuffleArray = (array: any[]) => {
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
          <Button text={element} onClick={() => handleClick(element)} matched={matched && selectedCards.includes(element)}/>
        </li>
      ))}
    </ul>
  );
}