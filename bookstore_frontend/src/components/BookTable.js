import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


export default class BookTable extends React.Component {
    render() {
        return this.props.data.length ? (
            <div className={useStyles.root}>
                <GridList cellHeight={300} cols={5} className={useStyles.gridList}>
                    {this.props.data.map((tile, idx) => (
                        <GridListTile key={tile.bookId}>
                            <img src={tile.image} alt={tile.name}/>
                            <GridListTileBar
                                title={tile.name}
                                subtitle={<span>By: {tile.author}</span>}
                                actionIcon={
                                    <IconButton
                                        className={useStyles.icon}
                                        component={Link}
                                        to={"/explore/" + (this.props.data[idx].bookId)}
                                        aria-label={`info about ${tile.name}`}>
                                        <InfoIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        ) : null;
    }
}