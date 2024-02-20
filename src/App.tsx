import { useState } from 'react'

import GridList from './components/GridList';
import Modal from './components/Modal';

function App() {

  const [errorCount, setErrorCount] = useState(0);
  const [gameRestarted, setGameRestarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleError = () => {
    setErrorCount((prevCount) => {
      if (prevCount === 2) {
        setIsModalOpen(true);
      }
      return prevCount + 1
    })
  }

  const countriesString = `{
  "Afghanistan": "Kabul",    
  "Albania": "Tirana",
  "Algeria": "Alger",
  "American Samoa": "Fagatogo",
  "Andorra": "Andorra la Vella",
  "Angola": "Luanda",
  "Anguilla": "The Valley",
  "Antigua and Barbuda": "Saint John's",
  "Argentina": "Buenos Aires",
  "Armenia": "Yerevan",
  "Aruba": "Oranjestad",
  "Australia": "Canberra"
  }`;

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
        <Modal isOpen={isModalOpen} message={'You got 3 errors'} closeText={'Try again'} dialogText={'You lose'} onClose={() => {
          setErrorCount(0);
          setGameRestarted(true);
          setIsModalOpen(false);
        }
        } />
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <GridList elements={countriesString} numberOfElements={6} onError={handleError} gameRestarted={gameRestarted} />
          <div className="rounded-md bg-red-50 p-4 mt-4">
            <h3 className="text-sm font-medium text-red-800">{errorCount > 0 ? `Errors: ${errorCount}` : ''}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
