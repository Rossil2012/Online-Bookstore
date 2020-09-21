import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HeaderInfo from "../components/HeaderInfo";
import MaterialTable from 'material-table';
import {
    getOrdersOneUser,
    getOrderItemsOneOrder,
    orderColumns,
    orderDataFilter,
    getOrderCollectionsOneUser
} from "../services/orderService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import {tableIcons} from "../services/tableService";
import {filterSalesAll, filterSalesDrillDown} from "../services/chartService";
import SalesChart from "../components/SalesChart";
import DateRangeSelector from "../components/DateRangeSelector";

const useStyles = {
    head: {
        backgroundColor: 'grey',
    }
};


class OrderView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cols: orderColumns,
            data: [],
            detailData: null,
            salesData: [],
            startDate: null,
            endDate: null
        };

        let setData = (json) => {
            console.log(json);
            this.setState({
                data: orderDataFilter(json),
                detailData: new Array(json.length)
            });
        };

        this.getOrderItems_callback = this.getOrderItems_callback.bind(this);
        this.salesRefresh = this.salesRefresh.bind(this);
        this.getUserChartData = this.getUserChartData.bind(this);
        this.dateFilter = this.dateFilter.bind(this);

        getOrdersOneUser(setData);
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

    salesRefresh() {
        let setData = (json) => {
            console.log(json);
            this.setState({
                salesData: [json]
            });
        };

        getOrderCollectionsOneUser(setData);
    }

    getUserChartData() {
        return {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Purchase Statistics'
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

    getOrderItems_callback(index, json) {
        if (json.opt !== '0') {
            this.state.detailData[index] = json;
            this.setState({
                detailData: this.state.detailData.map((item, _index) => _index === index ? json : item)
            });
        } else {
            console.log('Order Detail Fetch Error');
        }
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
                <SalesChart data={this.getUserChartData()} />
                <MaterialTable
                    className={classes.root}
                    icons={tableIcons}
                    title="My Orders"
                    columns={this.state.cols}
                    data={this.state.data}
                    options={{
                        headerStyle: {
                            backgroundColor: 'grey',
                            color: '#FFF'
                        }
                    }}
                    detailPanel={rowData => {
                        let index = this.state.data.findIndex((ite) => ite.oid === rowData.oid);
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
                                        {this.state.detailData[index] == null ?
                                            getOrderItemsOneOrder(rowData.oid, index, this.getOrderItems_callback):
                                            this.state.detailData[index].map((ite, idx) => (
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
            </div>
        )
    }
}


export default withStyles(useStyles)(OrderView)