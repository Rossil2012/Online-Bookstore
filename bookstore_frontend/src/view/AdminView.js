import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HeaderInfo from "../components/HeaderInfo";
import MaterialTable from 'material-table';
import {deleteBook, getBookData, updateBook} from "../services/bookService";
import Grid from '@material-ui/core/Grid';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckIcon from '@material-ui/icons/Check';
import SalesChart from '../components/SalesChart';

import {
    getOrderCollectionsAllUsers,
    getOrderItemsOneOrder,
    getOrdersAllUsers,
    orderColumns,
    orderDataFilter
} from "../services/orderService";
import {tableIcons} from "../services/tableService";
import {getUsersAll, permitUser, prohibitUser} from "../services/userService";
import {filterSalesAll, filterSalesDrillDown, filterUsersAll, filterUsersDrillDown} from "../services/chartService";
import DateRangeSelector from "../components/DateRangeSelector";

const useStyles = {
    root: {},
    head: {
        backgroundColor: 'grey',
    }
};

const columns = [{
    title: 'ISBN',
    field: 'isbn'
}, {
    title: 'Book',
    field: 'book'
}, {
    title: 'Author',
    field: 'author'
}, {
    title: 'Category',
    field: 'category'
}, {
    title: 'Price',
    field: 'price',
    type: 'numeric'
}, {
    title: 'Inventory',
    field: 'inventory',
    type: 'numeric'
}, {
    title: 'Purchasable',
    field: 'status'
}];

const userColumns = [{
    title: 'Username',
    field: 'username'
}, {
    title: 'Nickname',
    field: 'nickname'
}, {
    title: 'Tel',
    field: 'tel'
}, {
    title: 'Address',
    field: 'address'
}, {
    title: 'Email',
    field: 'email'
}, {
    title: 'Status',
    field: 'status'
}];

function judgeUserStatus(status) {
    if (status === 0) {
        return 'Administrator';
    } else if (status === 400) {
        return 'Prohibited';
    } else {
        return 'User';
    }
}

function dataFilter(raw) {
    let data = [];
    raw.forEach((cur) => {
        data.push({
            bookId: cur.bookId,
            isbn: cur.isbn,
            book: cur.name,
            author: cur.author,
            category: cur.type,
            price: cur.price,
            inventory: cur.inventory,
            status: cur.status
        })
    });
    return data;
}

function userDataFilter(raw) {
    return raw.map((ite) => {
        ite.status = judgeUserStatus(ite.status);
        return ite;
    });
}

class AdminView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cols: columns,
            orderCols: orderColumns,
            userCols: userColumns,
            data: [],
            orderData: [],
            orderDetailData: null,
            userData: [],
            tableIdx: 0,
            salesData: [],
            startDate: null,
            endDate: null
        };

        this.bookUpdate = this.bookUpdate.bind(this);
        this.booksRefresh = this.booksRefresh.bind(this);
        this.ordersRefresh = this.ordersRefresh.bind(this);
        this.usersRefresh = this.usersRefresh.bind(this);
        this.salesRefresh = this.salesRefresh.bind(this);
        this.getOrderItems_callback = this.getOrderItems_callback.bind(this);
        this.prohibitUser_callback = this.prohibitUser_callback.bind(this);
        this.permitUser_callback = this.permitUser_callback.bind(this);
        this.getSalesChartData = this.getSalesChartData.bind(this);
        this.getUsersChartData = this.getUsersChartData.bind(this);
        this.dateFilter = this.dateFilter.bind(this);

        this.booksRefresh();
        this.ordersRefresh();
        this.usersRefresh();
        this.salesRefresh();
    }

    dateFilter(date) {
        if (!this.state.startDate || !this.state.endDate) {
            return true;
        }

        if (this.state.startDate > this.state.endDate) {
            return false;
        }

        let curDate = new Date(date);
        curDate -= curDate.getTimezoneOffset();

        return curDate >= this.state.startDate && curDate <= this.state.endDate;
    }

    booksRefresh() {
        getBookData('http://localhost:8080/getBooksAll').then((json) => {
            this.setState({
                data: dataFilter(json)
            });
        }, (error) => {
            console.error('Error: ', error);
        });
    }

    salesRefresh() {
        let setData = (json) => {
            console.log(json);
            this.setState({
                salesData: json
            });
        };

        getOrderCollectionsAllUsers(setData);
    }

    getUsersChartData() {
        return {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Users Statistics'
            },
            series: [{
                type: 'pie',
                name: 'Users',
                colorByPoint: true,
                data: filterUsersAll(this.state.salesData, this.dateFilter)
            }],
            drilldown: {
                series: filterUsersDrillDown(this.state.salesData, this.dateFilter)
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: ¥{point.y:.1f}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px;font-weight:bold;">Details</span><br>',
                pointFormat: 'Sales: <b>{point.sales}</b><br/>Total: <b>¥{point.y:.1f}<br/>Percentage: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            }
        };
    }

    getSalesChartData() {
        return {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Sales Statistics'
            },
            series: [{
                type: 'pie',
                name: 'Sales',
                colorByPoint: true,
                data: filterSalesAll(this.state.salesData, this.dateFilter)
            }],
            drilldown: {
                series: filterSalesDrillDown(this.state.salesData, this.dateFilter)
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: ¥{point.y:.1f}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px;font-weight:bold;">Details</span><br>',
                pointFormat: 'Sales: <b>{point.sales}</b><br/>Total: <b>¥{point.y:.1f}<br/>Percentage: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            }
        };
    }

    ordersRefresh() {
        let setData = (json) => {
            console.log(json);
            this.setState({
                orderData: orderDataFilter(json),
                orderDetailData: new Array(json.length)
            });
        };

        getOrdersAllUsers(setData);
    }

    usersRefresh() {
        let setData = (json) => {
            console.log(json);
            this.setState({
                userData: userDataFilter(json)
            });
        };

        getUsersAll(setData);
    }

    getOrderItems_callback(index, json) {
        if (json.opt !== '0') {
            this.state.orderDetailData[index] = json;
            this.setState({
                orderDetailData: this.state.orderDetailData.map((item, _index) => _index === index ? json : item)
            });
        } else {
            console.log('Order Detail Fetch Error');
        }
    }

    prohibitUser_callback(flag) {
        if (flag) {
            this.usersRefresh();
        } else {
            alert('Prohibit User Failed.');
        }
    }

    permitUser_callback(flag) {
        if (flag) {
            this.usersRefresh();
        } else {
            alert('Permit User Failed.');
        }
    }

    bookUpdate(newData, oldData) {
        return new Promise((resolve, reject) => {
            console.log(newData);
            if (oldData == null && (newData.book == null || newData.price == null || newData.inventory == null || newData.status == null)) {
                alert('Name, Price, Inventory and Available Should not be Empty.');
                reject();
                return;
            }
            setTimeout(() => {
                console.log(newData);
                resolve();
                let data = {};
                data.isbn = newData.isbn;
                data.name = newData.book;
                data.author = newData.author;
                data.type = newData.category;
                data.price = newData.price;
                data.inventory = newData.inventory;
                data.status = newData.status;
                if (oldData) {
                    data.bid = oldData.bookId;
                }
                let updBook = (flag) => {
                    console.log(flag);
                    if (flag) {
                        this.booksRefresh();
                    } else {
                        alert('Book Update Failed.');
                    }
                };
                updateBook(data, updBook);
            }, 300);
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <HeaderInfo isDetail={true}/>
                <DateRangeSelector
                    startFunc={(date) => this.setState({startDate: date})}
                    endFunc={(date) => this.setState({endDate: date})}
                />
                <Grid container>
                    <Grid item xs={6}>
                        <SalesChart data={this.getSalesChartData()} />
                    </Grid>
                    <Grid item xs={6}>
                        <SalesChart data={this.getUsersChartData()} />
                    </Grid>
                </Grid>
                <MaterialTable
                    className={classes.root}
                    icons={tableIcons}
                    title="Book Workbench"
                    columns={this.state.cols}
                    data={this.state.data}
                    options={{
                        exportButton: true,
                        selection: true,
                        exportAllData: true,
                        headerStyle: {
                            backgroundColor: 'grey',
                            color: '#FFF'
                        }
                    }}
                    editable={{
                        onRowAdd: newData => this.bookUpdate(newData, null),
                        onRowUpdate: (newData, oldData) => this.bookUpdate(newData, oldData),
                    }}
                    actions={[
                        {
                            tooltip: 'Remove All Selected Books',
                            icon: () => <DeleteOutline/>,
                            onClick: (evt, data) =>
                                new Promise((resolve) => {
                                    resolve();
                                    let delBook = (bid, flag) => {
                                        if (flag) {
                                            this.booksRefresh();
                                        } else {
                                            alert('Book Delete Failed.');
                                        }
                                    };
                                    data.forEach((item) => {
                                        deleteBook(item.bookId, delBook);
                                    });
                                })
                        }, {
                            isFreeAction: true,
                            icon: () => <DeleteOutline/>
                        }
                    ]}
                />
                <MaterialTable
                    className={classes.root}
                    icons={tableIcons}
                    title="Order Workbench"
                    columns={this.state.orderCols}
                    data={this.state.orderData}
                    options={{
                        headerStyle: {
                            backgroundColor: 'grey',
                            color: '#FFF'
                        }
                    }}
                    detailPanel={rowData => {
                        let index = this.state.orderData.findIndex((ite) => ite.oid === rowData.oid);
                        return (
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead className={classes.head}>
                                        <TableRow>
                                            <TableCell>Book</TableCell>
                                            <TableCell align="left">ISBN</TableCell>
                                            <TableCell align="left">Price</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.orderDetailData[index] == null ?
                                            getOrderItemsOneOrder(rowData.oid, index, this.getOrderItems_callback):
                                            this.state.orderDetailData[index].map((ite, idx) => (
                                                <TableRow key={index + idx + ''}>
                                                    <TableCell>{ite.name}</TableCell>
                                                    <TableCell align="left">{ite.isbn}</TableCell>
                                                    <TableCell align="left">{ite.price}</TableCell>
                                                    <TableCell align="right">{ite.amount}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
                <MaterialTable
                    className={classes.root}
                    icons={tableIcons}
                    title="User Workbench"
                    columns={this.state.userCols}
                    data={this.state.userData}
                    options={{
                        headerStyle: {
                            backgroundColor: 'grey',
                            color: '#FFF'
                        }
                    }}
                    actions={[
                        {
                            icon: () => <CheckIcon />,
                            tooltip: 'Permit User',
                            onClick: (event, rowData) => permitUser(rowData.uid, this.permitUser_callback)
                        },
                        {
                            icon: () => <NotInterestedIcon />,
                            tooltip: 'Prohibit User',
                            onClick: (event, rowData) => prohibitUser(rowData.uid, this.prohibitUser_callback)
                        }
                    ]}
                />
            </div>
        )
    }
}


export default withStyles(useStyles)(AdminView)