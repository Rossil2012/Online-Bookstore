import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HeaderInfo from "../components/HeaderInfo";
import MaterialTable, { MTableBodyRow} from "material-table";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ShopIcon from '@material-ui/icons/Shop';
import {addCartItem, getCart, removeCartItem, submit} from "../services/cartService";
import {history} from "../utils/history";
import {tableIcons} from "../services/tableService";

const useStyles = {
    root: {}
};

const columns = [{
    title: 'Book',
    field: 'book',
    editable: 'never'
}, {
    title: 'Author',
    field: 'author',
    editable: 'never'
}, {
    title: 'Category',
    field: 'category',
    editable: 'never'
}, {
    title: 'Price',
    field: 'price',
    type: 'numeric',
    editable: 'never'
}, {
    title: 'Amount',
    field: 'amount',
    type: 'numeric'
}];

function dataFilter(raw) {
    let data = [];
    console.log(raw[0]['bookId']);
    raw.forEach((cur) => {
        data.push({
            bid: cur.bookId,
            book: cur.name,
            author: cur.author,
            category: cur.type,
            price: cur.price,
            amount: cur.amount
        })
    });
    return data;
}

class CartView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cols: columns,
            data: []
        };

        let setData = (json) => {
            console.log(json);
            this.setState({
                data: dataFilter(json)
            });
        };

        getCart(setData);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <HeaderInfo isDetail={true}/>
                <MaterialTable
                    className={classes.root}
                    icons={tableIcons}
                    title="My Cart"
                    columns={this.state.cols}
                    data={this.state.data}
                    options={{
                        selection: true,
                        headerStyle: {
                            backgroundColor: 'grey',
                            color: '#FFF'
                        }
                    }}
                    editable={{
                        isEditable: () => true,
                        onRowUpdate: (newData) => new Promise((resolve, reject) => {
                            resolve();
                            let checkSucc = (flag) => {
                                if (flag) {
                                    this.setState((prevState) => {
                                        let data = [...prevState.data];
                                        let index = data.findIndex((ite) => ite.bid === newData.bid);
                                        data[index].amount = newData.amount;
                                        return {...prevState, data};
                                    });
                                } else {
                                    alert('Edit Amount Failed.');
                                }
                            };
                            addCartItem(newData.bid, newData.amount, checkSucc);
                        }),
                        onRowDelete: oldData => new Promise((resolve) => {
                            resolve();
                            let onDelCartItem = (bid, flag) => {
                                if (flag) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        let delItem = data.filter((item) => {
                                            return item.bid === bid;
                                        });
                                        data.splice(data.indexOf(delItem[0]), 1);
                                        return {...prevState, data};
                                    });
                                } else {
                                    alert('Delete CartItem Error');
                                }
                            };
                            removeCartItem(oldData.bid, onDelCartItem);
                        })
                    }}
                    components={{
                        Row: props => {
                            const row = (
                                <MTableBodyRow
                                    {...props}
                                    onDoubleClick={(e) => {
                                        console.log(props.actions); // <---- HERE : Get all the actions
                                        props.actions[2]().onClick(e,props.data); // <---- trigger edit event
                                    }}
                                />
                            );
                            return row;
                        }
                    }}
                    actions={[
                        {
                            tooltip: 'Remove All Selected Users',
                            icon: () => <DeleteOutline/>,
                            onClick: (evt, data) =>
                                new Promise((resolve) => {
                                    resolve();
                                    let delCartItem = (bid, flag) => {
                                        if (flag) {
                                            this.setState((prevState) => {
                                                const data = [...prevState.data];
                                                let delItem = data.filter((item) => {
                                                    return item.bid === bid;
                                                });
                                                data.splice(data.indexOf(delItem[0]), 1);
                                                return {...prevState, data};
                                            });
                                        } else {
                                            alert('Book ' + bid.toString() + ' Remove Failed.');
                                        }
                                    };
                                    data.forEach((item) => {
                                        removeCartItem(item.bid, delCartItem);
                                    });
                                })
                        }, {
                            tooltip: 'Purchase the Books in Your Cart',
                            icon: () => <ShopIcon/>,
                            isFreeAction: true,
                            onClick: (event) => {
                                let checkPurchase = (flag) => {
                                    if (flag) {
                                        history.push('/orders');
                                    } else {
                                        alert("Purchase failed, please retry.");
                                    }
                                };
                                if (this.state.data.length === 0) {
                                    alert('Your Cart is Empty.');
                                } else {
                                    submit(checkPurchase);
                                }
                            }
                        }
                    ]}
                />
            </div>
        )
    }
}


export default withStyles(useStyles)(CartView)