import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from "@material-ui/core/Drawer";
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import {history} from "../utils/history"
import {GlobalState} from "../utils/GlobalState";

const useStyles = {
    root: {},
    list: {
        width: '14vw',
        height: '50vh'
    },
    btn: {
        height: '12.5vh',
    },
    adminList: {
        marginTop: '0px',
        width: '14vw',
        height: '62.5vh'
    },
};

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.closeDrawer = this.closeDrawer.bind(this);
    }

    closeDrawer() {
        this.props.pullFunc(false);
    }

    render() {
        const {classes} = this.props;
        const isAdmin = GlobalState.get('isAdmin');
        return (
            <div>
                <Drawer
                    classes={{paper: classes.root}}
                    open={this.props.open}
                    onClose={this.closeDrawer}>
                    <List component='nav' className={isAdmin ? classes.adminList : classes.list}>
                        <ListItem
                            className={classes.btn}
                            onClick={() => {
                                history.push('/explore')
                            }}
                            button>
                            <ListItemIcon classes={{root: classes.icon}}>
                                <ImportContactsTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText classes={{primary: classes.text}}>
                                Books
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                        <ListItem
                            className={classes.btn}
                            onClick={() => {
                                history.push('/cart')
                            }}
                            button>
                            <ListItemIcon>
                                <ShoppingCartTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText classes={{primary: classes.text}}>
                                My Cart
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                        <ListItem
                            className={classes.btn}
                            onClick={() => {
                                history.push('/orders')
                            }}
                            button>
                            <ListItemIcon>
                                <AccountBalanceWalletTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText classes={{primary: classes.text}}>
                                My Orders
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                        {isAdmin ?
                            <ListItem
                                className={classes.btn}
                                onClick={() => {
                                    history.push('/admin')
                                }}
                                button>
                                <ListItemIcon>
                                    <SupervisorAccountIcon/>
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.text}}>
                                    Workbench
                                </ListItemText>
                            </ListItem> : null
                        }
                        {isAdmin ? <Divider/> : null}
                    </List>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(useStyles)(SideBar);