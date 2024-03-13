import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../store/cards/type';

import style from './style.module.css';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../store/hooks';
import {
  detrimentQuantity,
  incrementQuantity,
  removeItemCart,
} from '../../store/cards/cardsSlise';

interface PropsCartItem {
  cartItem: Product;
}
const CartItem = ({ cartItem }: PropsCartItem) => {
  const dispatch = useAppDispatch();

 const Discounted_Price = (
    cartItem.price -
    ((cartItem.price * cartItem.quantity) / 100) * cartItem.discountPercentage
  ).toFixed(2);

  return (
    <>
      <div className={style.cart_item} id={String(cartItem.id)}>
        <div className={style.wrap_img}>
          <img
            src={cartItem.thumbnail}
            alt={cartItem.title}
            className={style.cart_item_thumbnail}
          />
        </div>

        <div className={style.cart_item_details}>
          <h3>{cartItem.title}</h3>
          <p>Price: ${cartItem.price}</p>
          <p>Total: ${cartItem.price * cartItem.quantity}</p>
          <p>Discount: {cartItem.discountPercentage}%</p>
          <p>Discounted Price: ${Discounted_Price}</p>
          <div className={style.quantity}>
            <button
              className={style.button}
              onClick={() => {
                dispatch(detrimentQuantity(cartItem));
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <p>{cartItem.quantity}</p>
            <button
              className={style.button}
              onClick={() => {
                dispatch(incrementQuantity(cartItem));
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className={style.cross}>
          <button
            className={style.button}
            type="button"
            onClick={() => {
              dispatch(removeItemCart(cartItem.id));
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
