import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from './type';

export const fetchCards = createAsyncThunk<Product[]>(
  'cards/fetchCards',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios('https://dummyjson.com/carts/1');
      return data.products;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

type cardsState = {
  list: Product[];
  isLoading: boolean;
};

const initialState: cardsState = {
  list: [],
  isLoading: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeItemCart: (state, { payload }: PayloadAction<number>) => {
      state.list = state.list.filter(({ id }) => id !== payload);
    },
    incrementQuantity: (state, { payload }: PayloadAction<Product>) => {
      state.list = state.list.map((card) =>
        card.id == payload.id
          ? { ...card, quantity: Math.min(10, card.quantity + 1) }
          : card
      );
    },
    detrimentQuantity: (state, { payload }: PayloadAction<Product>) => {
      state.list = state.list.map((card) =>
        card.id == payload.id
          ? { ...card, quantity: Math.max(1, card.quantity - 1) }
          : card
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCards.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { removeItemCart, incrementQuantity, detrimentQuantity } =
  cardsSlice.actions;
export default cardsSlice.reducer;
