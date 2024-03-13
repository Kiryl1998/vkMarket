import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import CartItem from '../Cards/cards';
import CartTotal from '../Total/total';

const Basket = () => {
  const { list, isLoading } = useAppSelector(({ cards }: RootState) => cards);

  return (
    <>
      {!isLoading ? (
        <>
          <div className="wrap flex__column cards">
            {list.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>

          <div className="wrap total">
            <CartTotal cartItems={list} />
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};
export default Basket;
