import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchBar from "./SearchBar";
import {Link} from "react-router-dom";
import {history} from "../utils/history";

const useStyles = {
    root: {
        display: 'flex',
        height: '70px'
    },
    title: {
        fontFamily: 'Bradley Hand, fantasy',
        fontSize: '35px',
        color: 'yellow',
        width: '180px',
        paddingLeft: '10px'
    },
    menuBtn: {},
    avatar: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    blank: {
        width: '79vw'
    }
};

class HeaderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.pullDrawer = this.pullDrawer.bind(this);
    }

    pullDrawer() {
        this.props.pullFunc(true);
    }

    render() {
        const {classes} = this.props;
        const isDetail = this.props.isDetail;
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position='sticky'>
                    <Toolbar className={classes.root}>
                        {isDetail ?
                            <IconButton
                                component={Link}
                                to={"/explore"}
                                className={classes.menuBtn}
                                edge="start"
                                color="inherit"
                                aria-label="menu">
                                <ArrowBackIosIcon/>
                            </IconButton>
                            :
                            <IconButton
                                className={classes.menuBtn}
                                edge="start"
                                color="inherit" aria-label="menu"
                                onClick={this.pullDrawer}>
                                <MenuIcon/>
                            </IconButton>}
                        <Typography className={classes.title}>Book Store</Typography>
                        {isDetail ? <span className={classes.blank}/> : <SearchBar searchFunc={this.props.searchFunc}/>}
                        <Avatar
                            edge="start"
                            className={classes.avatar}
                            onClick={() => history.push('/login')}
                        >N</Avatar>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(HeaderInfo);