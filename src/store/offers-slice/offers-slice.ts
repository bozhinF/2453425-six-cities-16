import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, NameSpace, RequestStatus, SortType } from '../../const';
import {
  CityName,
  Comments,
  Offer,
  OfferDetails,
  Offers,
} from '../../types/types';
import {
  fetchAllOffers,
  fetchFavoriteOffers,
  postReview,
  fetchNearOffers,
  fetchOfferDetails,
  fetchOfferReviews,
} from './thunks';

type OffersState = {
  allOffersStatus: RequestStatus;
  allOffers: Offers;
  favoriteOffersStatus: RequestStatus;
  favoriteOffers: Offers;
  currentCityName: CityName;
  currentSort: SortType;
  offerDetailsStatus: RequestStatus;
  offerDetails: OfferDetails | null;
  reviewsStatus: RequestStatus;
  reviews: Comments;
  nearOffersStatus: RequestStatus;
  nearOffers: Offers;
  postReviewStatus: RequestStatus;
  selectedOffer: Offer | null;
};

const initialState: OffersState = {
  allOffersStatus: RequestStatus.Idle,
  allOffers: [],
  favoriteOffersStatus: RequestStatus.Idle,
  favoriteOffers: [],
  currentCityName: CITIES[0],
  currentSort: SortType.Popular,
  offerDetailsStatus: RequestStatus.Idle,
  offerDetails: null,
  reviewsStatus: RequestStatus.Idle,
  reviews: [],
  nearOffersStatus: RequestStatus.Idle,
  nearOffers: [],
  postReviewStatus: RequestStatus.Idle,
  selectedOffer: null,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.allOffersStatus = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.allOffersStatus = RequestStatus.Success;
        state.allOffers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.allOffersStatus = RequestStatus.Failed;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.favoriteOffersStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffersStatus = RequestStatus.Success;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.favoriteOffersStatus = RequestStatus.Failed;
      })
      .addCase(fetchOfferDetails.pending, (state) => {
        state.offerDetailsStatus = RequestStatus.Loading;
      })
      .addCase(fetchOfferDetails.fulfilled, (state, action) => {
        state.offerDetailsStatus = RequestStatus.Success;
        state.offerDetails = action.payload;
      })
      .addCase(fetchOfferDetails.rejected, (state) => {
        state.offerDetailsStatus = RequestStatus.Failed;
      })
      .addCase(fetchOfferReviews.pending, (state) => {
        state.reviewsStatus = RequestStatus.Loading;
      })
      .addCase(fetchOfferReviews.fulfilled, (state, action) => {
        state.reviewsStatus = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchOfferReviews.rejected, (state) => {
        state.reviewsStatus = RequestStatus.Failed;
      })
      .addCase(fetchNearOffers.pending, (state) => {
        state.nearOffersStatus = RequestStatus.Loading;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        state.nearOffersStatus = RequestStatus.Success;
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOffers.rejected, (state) => {
        state.nearOffersStatus = RequestStatus.Failed;
      })
      .addCase(postReview.rejected, (state) => {
        state.postReviewStatus = RequestStatus.Failed;
      })
      .addCase(postReview.pending, (state) => {
        state.postReviewStatus = RequestStatus.Loading;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.postReviewStatus = RequestStatus.Success;
        state.reviews = [...state.reviews, action.payload];
      }),
  reducers: {
    setCurrentCityName(state, action: PayloadAction<CityName>) {
      const city = action.payload;
      state.currentCityName = city;
    },
    setCurrentSort(state, action: PayloadAction<SortType>) {
      state.currentSort = action.payload;
    },
    setOfferFavorite(state, action: PayloadAction<Offer>) {
      const updatedOffer = action.payload;

      const oldOffer = state.allOffers.find(
        (offer) => offer.id === updatedOffer.id
      );
      if (oldOffer) {
        oldOffer.isFavorite = updatedOffer.isFavorite;
      }

      if (state.favoriteOffersStatus !== RequestStatus.Success) {
        return;
      }

      if (updatedOffer.isFavorite) {
        state.favoriteOffers = [...state.favoriteOffers, updatedOffer];
        return;
      }
      state.favoriteOffers = state.favoriteOffers.filter(
        (offer) => offer.id !== updatedOffer.id
      );
    },
    setDetailedOfferFavorite(state, action: PayloadAction<Offer>) {
      const updatedOffer = action.payload;
      if (state.offerDetails) {
        state.offerDetails.isFavorite = updatedOffer.isFavorite;
      }
      const oldNearOffer = state.nearOffers.find(
        (nearOffer) => nearOffer.id === updatedOffer.id
      );
      if (oldNearOffer) {
        oldNearOffer.isFavorite = updatedOffer.isFavorite;
      }
    },
    resetPostReviewStatus(state) {
      state.postReviewStatus = RequestStatus.Idle;
    },
  },
});

export const {
  setCurrentCityName,
  setOfferFavorite,
  setDetailedOfferFavorite,
  resetPostReviewStatus,
  setCurrentSort,
} = offersSlice.actions;
