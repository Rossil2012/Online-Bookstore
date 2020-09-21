import React from "react";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = {
    btn: {
        width: '15vw',
        height: '10vh',
        fontSize: '17px'

    },
    btnDiv: {
        paddingTop: '10vh'
    }
};


class LikeBtn extends React.Component {
    render() {
        if (this.props.liked) {
            return (
                <div className={this.props.classes.btnDiv}>
                    <Button
                        className={this.props.classes.btn}
                        onClick={this.props.clickFunc}
                        variant="contained"
                        color="primary"
                        startIcon={<FavoriteBorderIcon/>}
                    >
                        Like
                    </Button>
                </div>
            )
        } else {
            return (
                <div className={this.props.classes.btnDiv}>
                    <Button
                        className={this.props.classes.btn}
                        classes={{startIcon: this.props.classes.btnIcon}}
                        onClick={this.props.clickFunc}
                        variant="contained"
                        color="secondary"
                        startIcon={<FavoriteIcon/>}
                    >
                        Liked
                    </Button>
                </div>
            )
        }
    }
}

export default withStyles(useStyles)(LikeBtn);