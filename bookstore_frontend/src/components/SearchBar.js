import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = {
    root: {
        display: 'flex',
        paddingTop: '1vh',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        height: '70px',
        width: '79vw',
        paddingBottom: '0.5vh'
    },
    select: {
        width: '120px',
        marginLeft: '0.5%',
        textAlign: 'center',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                borderWidth: '2px'
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow',
            },
        },
    },
    text: {},
    search: {
        height: '1px',
        paddingLeft: '1%',
        marginRight: '1%',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                borderWidth: '2px'
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow',
            },
        },
    },
    searchIcon: {
        height: '5vh'
    }
};

const currencies = [
    {
        value: 'Title',
        label: 'Title',
    },
    {
        value: 'Author',
        label: 'Author',
    }
];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectValue: 'Title',
            inputValue: ''
        };

        this.selectChange = this.selectChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    selectChange(event) {
        this.setState({selectValue: event.target.value});
    }

    inputChange(event) {
        this.setState({
            inputValue: event.target.value
        });

        this.props.searchFunc(this.state.selectValue, event.target.value);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <TextField
                    className={classes.select}
                    InputProps={{className: classes.text}}
                    select
                    value={this.state.selectValue}
                    onChange={this.selectChange}
                    label="Searched By"
                    variant="outlined"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    className={classes.search}
                    placeholder="Search..."
                    variant="outlined"
                    fullWidth
                    onChange={this.inputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(SearchBar)