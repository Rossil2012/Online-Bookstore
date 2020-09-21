import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LikeBtn from "./LikeBtn";
import {isLiked, like} from "../services/bookService";
import {addCartItem} from "../services/cartService";
import {history} from "../utils/history";

const useStyles = {
    root: {
        display: 'flex',
        paddingTop: '2%',
        height: '100vh',

    },
    pic: {
        width: '50vw',
        maxWidth: '70vw',
        height: '90vh',
        marginLeft: '1%'
    },
    lit: {
        fontSize: '20px',
        fontFamily: '"Times New Roman",Georgia,Serif'
    },
    intro: {
        width: '25vw',
        paddingLeft: '30px'
    },
    interface: {
        width: '25vw',
        textAlign: 'center'
    },
    btn: {
        width: '15vw',
        height: '10vh',
        fontSize: '17px'

    },
    btnDiv: {
        paddingTop: '10vh'
    }
};


class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: true
        };

        let checkLiked = (flag) => {
            this.setState({
                liked: !flag
            });
        };

        isLiked(props.data.bookId, checkLiked);

        this.addToCart = this.addToCart.bind(this);
        this.purchase = this.purchase.bind(this);
        this.like = this.like.bind(this);
    }

    addToCart() {
        let checkSucc = (flag) => {
            if (flag) {
                history.push('/cart');
            } else {
                alert("Failed to add to cart, please retry.");
            }
        };
        addCartItem(this.props.data.bookId, 0, checkSucc);
    }

    purchase() {
        history.push('/cart');
    }

    like() {
        this.setState((state) => ({
            liked: !state.liked
        }));

        like(this.props.data.bookId, this.state.liked);
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.root}>
                <CardContent className={classes.intro}>
                    <br/><h3>《{this.props.data.name}》</h3><br/>
                    <h4>Author: <span className={classes.lit}>{this.props.data.author}</span></h4><br/>
                    <h4>Category: <span className={classes.lit}>{this.props.data.type}</span></h4><br/>
                    <h4>Price: <span className={classes.lit}>¥ {this.props.data.price}</span></h4><br/>
                    <h4>Sales: <span className={classes.lit}>{this.props.data.inventory}</span></h4><br/>
                    <h4>Introduction: <span className={classes.lit}>{this.props.data.description}</span></h4>
                </CardContent>
                <Divider orientation="vertical" flexItem/>
                <CardMedia
                    className={classes.pic}
                    image={this.props.data.image}
                />
                <Divider orientation="vertical" flexItem/>
                <CardContent className={classes.interface}>
                    <div className={classes.btnDiv}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon/>}
                            onClick={this.addToCart}
                        >
                            Add to Cart
                        </Button>
                    </div>
                    <div className={classes.btnDiv}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingBasketIcon/>}
                            onClick={this.purchase}
                        >
                            Purchase
                        </Button>
                    </div>
                    <LikeBtn
                        liked={this.state.liked}
                        clickFunc={this.like}/>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(useStyles)(BookDetail);