import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
	filterStatus,
	getPostsFailure,
    getPostsSuccess,
    getPostsStarted
} from '../redux/reducers/reducer';
import { 
	filterUpdate,
	getPosts
} from "../redux/actions/actions";

const mapStateToProps = state => ({
	getFilters: filterStatus(state),
	postsError: getPostsFailure(state),
    postsLoading: getPostsStarted(state),
    posts: getPostsSuccess(state),
})

const mapDispatchToProps = dispatch => {
    return {
        filterUpdate: (params) => dispatch(filterUpdate(params)),
        getPosts: (pageNum, filters) => dispatch(getPosts(pageNum, filters))
    }
};

class ConnectedFilter extends Component {

	constructor(props) {
		super(props);
	
		this.changeHandler = this.changeHandler.bind(this);
		this.formatNewfilterquery = this.formatNewFilterQuery.bind(this);
	}

	changeHandler (event) {
		const checkedStatus = event.currentTarget.checked;
		const selectedTaxonomy = event.currentTarget.name;
    	const termId = event.currentTarget.value;

    	const paramsToSend = {
    		checkedStatus: checkedStatus,
    		selectedTaxonomy: selectedTaxonomy,
    		termId: termId
    	};

    	const filterUpdatePromise = new Promise((resolve, reject) => {
    		this.props.filterUpdate(paramsToSend); // Updates the filter statuses in state
    		resolve(true);
    	});

    	// Run the filter query string format function only after the props have updated
		filterUpdatePromise.then(() => {
			const filterQs = this.formatNewFilterQuery(); // Fires off the function to format the filter statuses
			this.props.getPosts("1", filterQs); // Submits the string created above the endpoint
		});
    }

    formatNewFilterQuery () {

    	const allFilters = this.props.getFilters;
    	let filterModel = [];
    	let filterQueryString = null;

    	// Make a new array out of the selected taxonomies
    	const selectedTaxonomies = allFilters.map(taxData => {
    		return taxData.taxonomy;
    	});

    	// Filter out the duplicates
    	const uniqueTaxonomies = [...new Set(selectedTaxonomies)];

    	// We'll ultimately make our new filter querystring out of filterModel
    	// So, let's add the unique taxonomy list to filterModel...
    	uniqueTaxonomies.map(currTax => {
    		filterModel.push({
    			'taxonomy': currTax,
    			'terms': []
    		})

    		return filterModel;
    	});

    	// ...and then loop through that and add the terms associated to each taxonomy
    	allFilters.map((currFilter, index) => {
    		filterModel.map((currModel, index) => {
    			if (currFilter.taxonomy === currModel.taxonomy) {
    				currModel.terms.push(currFilter.term);
    			}

    			return currModel;
    		});

    		return filterModel;
    	});

    	// Convert this array data to a serialized string
    	filterQueryString = filterModel.map(currData => {
    		let filters = '';
    		filters = filters += currData.taxonomy + "=" + currData.terms;

    		return filters;
    	});

    	// Turn it into something we can send to the API
    	return filterQueryString.join('&');

    }

    render() {

    	const taxData = [];
    	const termsData = [];
    	const taxonomy = this.props.taxonomy;
    	const terms = this.props.terms;

        for (var taxKey in taxonomy) {
            taxData.push(taxonomy[taxKey]);
        }

        for (var termsKey in terms) {
            termsData.push(terms[termsKey]);
        }

    	return (
    		<div className="terms-filter filter" id={taxData[1]}>
            {termsData.map((el, index) => (
                <div key={index}>
                <input type="checkbox" id={el.slug} name={taxData[1]} value={el.term_id} onChange={this.changeHandler}></input>
                <label htmlFor={el.slug} key={index}>{el.name}</label>
                </div>
            ))}
            </div>
    	)
    }

}

const Filter = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedFilter);

export default Filter;