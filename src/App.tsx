import { useEffect, useState } from 'react'

import GridList from './components/GridList';
import Modal from './components/Modal';

function App() {

  const [errorCount, setErrorCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
        {/* <Modal/> */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <GridList elements={countriesString} numberOfElements={6}/>
        </div>
      </div>
    </>
  )
}

export default App
    