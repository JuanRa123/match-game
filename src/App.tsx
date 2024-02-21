import MatchGame from './components/MatchGame';

function App() {
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
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <MatchGame limit={3} data={countriesString} />
        </div>
      </div>
    </>
  )
}

export default App
