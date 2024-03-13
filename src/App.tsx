import { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './store/hooks';
import { fetchCards } from './store/cards/cardsSlise';
import Basket from './components/Basket/basket';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  return (
    <>
      <Basket />
    </>
  );
}

export default App;
