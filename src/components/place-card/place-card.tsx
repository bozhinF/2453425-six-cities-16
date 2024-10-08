import { Link } from 'react-router-dom';
import StarsRating from '../stars-rating/stars-rating';
import PremiumMark from '../premium-mark/premium-mark';
import FavoritesMarkButton from '../favorites-mark-button/favorites-mark-button';
import Price from '../price/price';
import { AppRoute } from '../../const';
import { capitalize } from '../../util';
import { Offer } from '../../types/types';

type PlaceCardProps = {
  offer: Offer;
  options?: {
    classNamePrefix?: string;
    imageWidth?: number;
    imageHeight?: number;
  };
  onPointedOfferChange?: React.Dispatch<React.SetStateAction<string | null>>;
};

function PlaceCard({
  offer,
  options = {},
  onPointedOfferChange,
}: PlaceCardProps): JSX.Element {
  const {
    classNamePrefix = 'cities',
    imageWidth = 260,
    imageHeight = 200,
  } = options;

  return (
    <article
      className={`${classNamePrefix}__card place-card`}
      onMouseEnter={() => onPointedOfferChange && onPointedOfferChange(offer.id)}
      onMouseLeave={() => onPointedOfferChange && onPointedOfferChange(null)}
    >
      {offer.isPremium && <PremiumMark />}

      <div
        className={`${classNamePrefix}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={`${AppRoute.Offer.replace(':id', offer.id)}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>

      <div className={`${classNamePrefix}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <Price price={offer.price} />
          <FavoritesMarkButton id={offer.id} isActive={offer.isFavorite} />
        </div>
        <StarsRating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer.replace(':id', offer.id)}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
