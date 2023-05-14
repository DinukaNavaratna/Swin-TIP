import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-notifications/lib/notifications.css';
import HomeCarousel from '../HomeCarousel/homeCarousel';
import { data } from '../data';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Support from '../SupportComponents/Support';
import Carousel from '../SubComponents/carousel/Carousel';
import CardIcon from '../SubComponents/card/CardIcon';

class Home extends Component {
  components = {
    analyzer: LocalOfferIcon,
    listing: LocationCityIcon,
    assist: AssistantPhotoIcon,
    postAd: PostAddIcon,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  render() {
    const iconProducts = data.iconProducts;
    const rows = [...Array(Math.ceil(iconProducts.length / 4))];
    // chunk the products into the array of rows
    const productRows = rows.map((row, idx) =>
      iconProducts.slice(idx * 4, idx * 4 + 4)
    );
    // map the rows as div.row
    const carouselContent = productRows.map((row, idx) => (
      <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
        <div className="row g-3">
          {row.map((product, idx) => {
            const ProductImage = this.components[product.img];
            return (
              <div key={idx} className="col-md-3">
                <CardIcon
                  title={product.title}
                  text={product.text}
                  to={product.to}
                >
                  <ProductImage
                    className={product.cssClass}
                    fontSize={'large'}
                  />
                </CardIcon>
              </div>
            );
          })}
        </div>
      </div>
    ));

    return (
      <React.Fragment>
        <HomeCarousel />
        <div className="container-fluid bg-light pb-3 pt-3">
          <div className="row g-3">
            <div className="col-md-12">
              <Carousel id="elect-product-category" className="mb-3">
                {carouselContent}
              </Carousel>
              <Support />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(Home);
