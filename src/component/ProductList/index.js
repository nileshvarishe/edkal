import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getAllProducts } from "./Action";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import IconButton from "@material-ui/core/IconButton";
import RestaurantIcon from "@material-ui/icons/Restaurant";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      productList: [],
      oneProduct: null,
      cart: 0,
    };
  }

  componentDidMount = () => {
    this.props.getAllProducts();
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps?.productList) {
      this.setState({
        productList: this.getFormattedData(newProps.productList),
      });
    }
  };

  getProductById(id) {
    this.setState({ isModalOpen: true });
    const oneProduct = this.state.productList.filter((product) => {
      return product.itemId === id;
    });
    this.setState({ oneProduct: oneProduct[0] }, () => {
      console.log("oneProduct", oneProduct);
    });
  }
  getFormattedData(items) {
    let filteredItems = [];
    if (!items.isArray) {
      filteredItems = Object.entries(items)
        .map(function (value) {
          return (items[value[0]] = value[1]);
        })
        .filter((value) => {
          return value.itemId !== undefined;
        });
    }
    return filteredItems;
  }

  addToCart() {
    const { cart } = this.state;
    this.setState({
      cart: cart + 1,
    });
  }

  render() {
    const { productList, isModalOpen, oneProduct } = this.state;
    return (
      <div className="mainBox">
        <Container className="mainContainer">
          <Typography gutterBottom variant="h4">
            Hibachi
          </Typography>
          {productList.map((product) => {
            return (
              <Paper
                style={{ marginBottom: 10, cursor: "pointer" }}
                onClick={() => this.getProductById(product.itemId)}
              >
                <Grid item container xs={12}>
                  <Grid item lg={2} xs={6}>
                    <img
                      alt={product.itemId}
                      src={product.imageUrl}
                      className="image"
                    />
                  </Grid>
                  <Grid item lg={8} xs={6}>
                    <div className="desc">
                      <Typography gutterBottom variant="h6">
                        {product.name}
                      </Typography>
                      <Typography gutterBottom>{product.category}</Typography>
                      <Typography gutterBottom variant="h6">
                        ${product.price}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}

          {isModalOpen ? (
            <Dialog
              open={isModalOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => {
                this.setState({ isModalOpen: false });
              }}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Add to your meal  "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Paper
                    style={{ marginBottom: 10}}
                    onClick={() => {
                      this.setState({ isModalOpen: true });
                    }}
                  >
                    <Grid item container xs={12}>
                      <Grid item lg={12} xs={12}>
                        <img
                          alt={oneProduct.itemId}
                          src={oneProduct.imageUrl}
                          className="bannerImage"
                        />
                      </Grid>
                      <Grid item>
                        <div className="desc">
                          <Typography gutterBottom variant="h6">
                            {oneProduct.name}
                          </Typography>
                          <Typography gutterBottom>
                            {oneProduct.category}
                          </Typography>
                          <Typography gutterBottom variant="h6">
                            ${oneProduct.price}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => this.setState({ isModalOpen: false })}
                  color="primary"
                >
                  CANCEL
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.addToCart();
                  }}
                  color="secondary"
                >
                  ADD TO CART
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            ""
          )}
          <Grid item lg={12} xs={12}>
            <div className="mealButtonStyle">
              <Button
                variant="contained"
                className="fixedbutton"
                color="primary"
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Pages"
                  className="Logo"
                >
                  <RestaurantIcon />
                </IconButton>{" "}
                MY MEAL ( {this.state.cart} ITEMS)
              </Button>
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("productListReducer", state.productListReducer);
  return {
    productList: state.productListReducer.productList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      getAllProducts,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
