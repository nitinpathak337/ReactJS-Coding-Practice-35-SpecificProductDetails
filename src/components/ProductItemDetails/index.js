// Write your code here
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {Component} from 'react'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAl',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, count: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  increaseCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  decreaseCount = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress, productItem: []})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(eachItem => ({
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          title: eachItem.title,
          style: eachItem.style,
          price: eachItem.price,
          description: eachItem.description,
          brand: eachItem.brand,
          totalReviews: eachItem.total_reviews,
          rating: eachItem.rating,
          availability: eachItem.availability,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        productItem: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="product-item-loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductInfo = () => {
    const {productItem, count} = this.state

    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productItem

    return (
      <>
        <div className="product-info-bg">
          <div>
            <img src={imageUrl} alt="product" className="product-image" />
          </div>
          <div className="pro-details">
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="rating-reviews-container">
              <div className="rating-container">
                <p className="rating-para">{rating}</p>
                <img
                  className="star-image"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="total-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <p className="available-text">
              Available: <span className="span-text">{availability}</span>
            </p>
            <p className="available-text">
              Brand: <span className="span-text">{brand}</span>
            </p>
            <hr className="line" />
            <div className="count-container">
              <button
                type="button"
                className="inc-dec-btn"
                onClick={this.decreaseCount}
              >
                <BsDashSquare className="icon" />
              </button>
              <p className="count-text">{count}</p>
              <button
                type="button"
                className="inc-dec-btn"
                onClick={this.increaseCount}
              >
                <BsPlusSquare className="icon" />
              </button>
            </div>
            <button type="button" className="add-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-product-container">
          <h1 className="similar-product-heading">Similar Products</h1>
          <ul className="similar-list-container">
            {productItem.similarProducts.map(eachItem => (
              <SimilarProductItem
                key={eachItem.id}
                similarProductDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.continueShopping}>
        Continue Shopping
      </button>
    </div>
  )

  displayData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderProductInfo()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-item-bg">
        <Header />
        {this.displayData()}
      </div>
    )
  }
}

export default ProductItemDetails
