import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostsFailure,
    getPostsSuccess,
    getPostsStarted
} from '../redux/reducers/reducer';
import { 
    getPosts
} from "../redux/actions/actions";

const mapStateToProps = state => ({
    postsError: getPostsFailure(state),
    postsLoading: getPostsStarted(state),
    posts: getPostsSuccess(state)
});

const mapDispatchToProps = { 
    getPosts
}

class ConnectedPosts extends Component {

    constructor(props) {
        super(props);

        this.createMarkup = this.createMarkup.bind(this);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        this.termClick = this.termClick.bind(this);
    }

    componentDidMount() {
        const { 
            getPosts
        } = this.props;

        getPosts();
    }

    shouldComponentRender() {

        const {
            postsLoading
        } = this.props;
        
        if (postsLoading === false) {
            return false;
        }

        return true;
    }

    // Some of the API data from WordPress renders as text, tags and all
    // Run that business through this function to render it as markup
    createMarkup(html) {
        return { __html: html };
    }

    termClick(event) {
        event.preventDefault();
        const { getPosts } = this.props;

        getPosts(1, "&tax_11=" + event.currentTarget.getAttribute('value'));
    }

	render() {
        const postsData = [];

        const {
            posts
         } = this.props;

        for (var key in posts) {
            postsData.push(posts[key]);
        }

        // Show a loading status if we're still waiting on a response from the API
        if (this.shouldComponentRender()) {
            return "Loading...";
        }

        // Output if there are no posts to display
        if (postsData.length === 0) {
            return "There are no posts";
        }

		return(
			<div className="resources-container">
                {postsData.map(el => (
                <div className="resource-container" key={el.id}>
                {el._embedded['wp:featuredmedia'] ? <div className="resource-img"><img src={el._embedded['wp:featuredmedia'][0].source_url} alt={el.title.rendered} /></div> : ''}
                    <div className="resource-meta">
                        {el._embedded['wp:term'].map(terms => (
                            terms.map((term, index) => (
                                (term.taxonomy === "tax_11" ? <p className="resource-type" key={index}><a href="#" onClick={this.termClick} value={term.id}>{term.name}</a></p> : '')
                            ))
                        ))}
                        <h3><strong><a href={el.link}>{el.title.rendered}</a></strong></h3>
                    </div>
                    <div className="resource-link">
                        <p className="read-more"><a href={el.link}>Read More</a></p>
                    </div>
                </div>
                ))}
            </div>
		)
	}

}

const Posts = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedPosts);

export default Posts;