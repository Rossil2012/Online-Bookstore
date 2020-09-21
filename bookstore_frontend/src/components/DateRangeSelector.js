import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {makeStyles} from '@material-ui/core/styles';
import DatePicker from "react-date-picker";

const useStyles = {
    root:{}
};

class DateRangeSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={9} />
                    <Grid item xs={1.5}>
                        <DatePicker value={this.state.startDate} onChange={(date) => {
                            this.setState({
                                startDate: date
                            });
                            console.log(date);
                            this.props.startFunc(date);
                        }}/>
                    </Grid>
                    <Grid item xs={1.5}>
                        <DatePicker value={this.state.endDate} onChange={(date) => {
                            this.setState({
                                endDate: date
                            });
                            this.props.endFunc(date);
                        }}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(DateRangeSelector);