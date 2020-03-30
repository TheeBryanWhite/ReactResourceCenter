import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostsFailure,
    getPostsSuccess,
    getPostsStarted,
    totalPages,
    totalPosts
} from '../redux/reducers/reducer';
import { 
    getPosts
} from "../redux/actions/actions";
import { postQuerySettings } from "../api/wordpress";
import ReactPaginate from 'react-paginate';

const mapStateToProps = state => ({
    postsError: getPostsFailure(state),
    postsLoading: getPostsStarted(state),
    posts: getPostsSuccess(state),
    totalPages: totalPages(state),
    totalPosts: totalPosts(state)
});

const mapDispatchToProps = { 
    getPosts
}

class ConnectedPagination extends Component {

	constructor(props) {
      super(props);
    
      this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler = event => {
        const { getPosts } = this.props;
        let selected = event.selected + 1;

        getPosts(selected);
    }

   render() {

   		const { 
   			totalPages, 
   			totalPosts 
   		} = this.props;

    	if (totalPosts <= 1 || totalPages <= 1) {
    		return false;
    	}

    	return (
    		<ReactPaginate 
                activeClassName={'active'}
                containerClassName={'pagination'}
                marginPagesDisplayed={postQuerySettings.marginDisplayed}
                onPageChange={this.clickHandler}
                pageCount={parseInt(totalPages)}
                pageRangeDisplayed={postQuerySettings.rangeDisplayed}
                subContainerClassName={'pages pagination'}
            />
    	)
    }

}

const Pagination = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedPagination);

export default Pagination;