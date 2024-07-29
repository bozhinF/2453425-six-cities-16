import React, { useState } from 'react';
import ReviewRatingStars from '../review-rating-stars/review-rating-stars';

type ReviewsFormState = {
  rating: null | number;
  review: string;
};
const INITIAL_REVIEWS_FORM_STATE: ReviewsFormState = {
  rating: null,
  review: '',
};

function ReviewsForm(): JSX.Element {
  const [formState, setFormState] = useState(INITIAL_REVIEWS_FORM_STATE);

  function handleTextChange(event: React.ChangeEvent<HTMLFormElement>) {
    const { name, value } = event.target;

    switch (name) {
      case 'rating':
        setFormState({ ...formState, rating: +value });
        return;
      case 'review':
        setFormState({ ...formState, review: String(value) });
    }
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onChange={handleTextChange}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <ReviewRatingStars />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;