import React from "react";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
var Highcharts = require('highcharts/highstock');
drilldown(Highcharts);
window.Highcharts = Highcharts;
require('highcharts/modules/exporting')(Highcharts);

class SalesChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <HighchartsReact highcharts={Highcharts} options={this.props.data} />;
    }
}

export default SalesChart;