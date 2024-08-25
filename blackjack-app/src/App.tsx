import Play from './components/Play';

function App() {
  let headings = ['Player', 'Dealer'];
  return <Play heading={headings} isPlayer={true} />;
}

export default App;
