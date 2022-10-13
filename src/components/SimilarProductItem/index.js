// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProductDetails} = props
  const {title, imageUrl, brand, price, rating} = similarProductDetails

  return (
    <li className="similar-list-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-image"
      />
      <h1 className="similar-product-title">{title}</h1>
      <p className="similar-product-brand">by {brand}</p>
      <div className="similar-price-rating-container">
        <p className="similar-price">Rs {price}/-</p>
        <div className="similar-rating-container">
          <p>{rating}</p>
          <img
            className="similar-star-image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
