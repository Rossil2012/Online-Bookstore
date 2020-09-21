import React from "react";
import HeaderInfo from "../components/HeaderInfo";
import SideBar from "../components/SideBar";
import Grid from "@material-ui/core/Grid";
import BookTable from "../components/BookTable";
import BookDetail from "../components/BookDetail";
import search from "../services/search";
import {getBookData} from "../services/bookService";
import {GlobalState} from "../utils/GlobalState";

export default class BookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: [],
            searchedData: [],
            loaded: false
        };

        getBookData(GlobalState.get('url') + '/getBooksAll').then((json) => {
            console.log(json);
            let tmp = json.filter((ite) => ite.status === 1);
            this.setState({
                data: tmp,
                searchedData: tmp
            });
        }, (error) => {
            console.error('Error: ', error);
        });

        this.pullDrawer = this.pullDrawer.bind(this);
        this.ExploreView = this.ExploreView.bind(this);
        this.DetailView = this.DetailView.bind(this);
        this.searchBy = this.searchBy.bind(this);
    }

    searchBy(category, keyword) {
        if (category === 'Author') {
            let searched = search(this.state.data, 'author', keyword);
            this.setState({
                searchedData: searched
            })
        } else if (category === 'Title') {
            let searched = search(this.state.data, 'name', keyword);
            this.setState({
                searchedData: searched
            })
        }
    }

    ExploreView(data) {
        return (
            <Grid item xs={12}>
                <BookTable data={data}/>
            </Grid>
        );
    }

    DetailView(data) {
        return (
            <Grid item xs={12}>
                <BookDetail data={data}/>
            </Grid>
        )
    }

    pullDrawer(isOpen) {
        this.setState({
            open: isOpen
        })
    }

    render() {
        const isDetail = (this.props.match.params.bookID) && (this.props.match.params.bookID >= 0) && (this.props.match.params.bookID <= this.state.data.length);
        return (
            <div>
                <HeaderInfo pullFunc={this.pullDrawer} searchFunc={this.searchBy} isDetail={isDetail}/>
                <SideBar open={this.state.open} pullFunc={this.pullDrawer}/>
                <Grid container>
                    {isDetail ? this.DetailView(this.state.data.filter((item) => item.bookId.toString() === this.props.match.params.bookID)[0]) : this.ExploreView(this.state.searchedData)}
                </Grid>
            </div>
        )
    }
}