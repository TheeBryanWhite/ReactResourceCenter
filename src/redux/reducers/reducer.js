import {
	FILTER_ADD,
	FILTER_REMOVE,
	GET_POSTS_STARTED,
	GET_POSTS_SUCCESS,
	GET_POSTS_FAILURE,
	GET_INDUSTRY_STARTED,
	GET_INDUSTRY_SUCCESS,
	GET_INDUSTRY_FAILURE,
	GET_RESOURCE_TYPE_STARTED,
	GET_RESOURCE_TYPE_SUCCESS,
	GET_RESOURCE_TYPE_FAILURE,
	GET_SOLUTIONS_STARTED,
	GET_SOLUTIONS_SUCCESS,
	GET_SOLUTIONS_FAILURE,
	GET_INDUSTRY_TERMS_FAILURE,
	GET_INDUSTRY_TERMS_STARTED,
	GET_INDUSTRY_TERMS_SUCCESS,
	GET_RESOURCE_TYPE_TERMS_FAILURE,
	GET_RESOURCE_TYPE_TERMS_STARTED,
	GET_RESOURCE_TYPE_TERMS_SUCCESS,
	GET_SOLUTIONS_TERMS_FAILURE,
	GET_SOLUTIONS_TERMS_STARTED,
	GET_SOLUTIONS_TERMS_SUCCESS
} from "../../constants/constants";

/**
* For each action, you're going to need to add a reducer
*
* For most of your list post and list taxonomy queries, the reducers
* for the GET_POSTS series ought to do the trick. So you can probably
* get away with copying and pasting the GET_POSTS series and updating the 
* posts property with whatever name is appropriate for the data you're 
* updating the state with
*
* Don't forget to update the constants in the import block above
**/

const initialState = {
	loading: false,
	error: null,
	posts: [],
	selectedTaxonomies: [],
	termsIndustry: [],
	termsSolution: [],
	termsResourceType: [],
	taxIndustry: [],
	taxSolutions: [],
	taxResourceType: [],
	totalPages: 0,
	totalPosts: 0
};


function rootReducer(state = initialState, action) {

	switch (action.type) {

		case FILTER_ADD:

			return  {
				...state,
				selectedTaxonomies: state.selectedTaxonomies.concat([
					{
						taxonomy: action.payload.selectedTaxonomy,
						term: action.payload.termId
					}
				])
			}

		case FILTER_REMOVE:

			return {
				...state,
				selectedTaxonomies: state.selectedTaxonomies.filter(item => item.term !== action.payload.termId)
	        }

		case GET_POSTS_FAILURE:
			
			return {
				...state,
				error: action.payload.error,
	            loading: false
	        }

		case GET_POSTS_STARTED:
			
			return {
				...state,
				loading: true
			}

		case GET_POSTS_SUCCESS:

			return {
				...state,
				loading: false,
				error: null,
				posts: action.payload.response.data,
				totalPages: action.payload.response.headers['x-wp-totalpages'],
				totalPosts: action.payload.response.headers['x-wp-total'],
	        }

	    case GET_INDUSTRY_FAILURE:
			
			return {
				...state,
				industryTaxError: action.payload.error,
	            industryTaxLoading: false
	        }

		case GET_INDUSTRY_STARTED:
			
			return {
				...state,
				industryTaxLoading: true
			}

		case GET_INDUSTRY_SUCCESS:

			return {
				...state,
				industryTaxLoading: false,
				industryTaxError: null,
				taxIndustry: action.payload
	        }

	    case GET_RESOURCE_TYPE_FAILURE:
			
			return {
				...state,
				resourceTypeTaxError: action.payload.error,
	            resourceTypeTaxLoading: false
	        }

		case GET_RESOURCE_TYPE_STARTED:
			
			return {
				...state,
				resourceTypeTaxLoading: true
			}

		case GET_RESOURCE_TYPE_SUCCESS:

			return {
				...state,
				resourceTypeTaxLoading: false,
				resourceTypeTaxError: null,
				taxResourceType: action.payload
	        }

	    case GET_SOLUTIONS_FAILURE:
			
			return {
				...state,
				solutionsTaxError: action.payload.error,
	            solutionsTaxLoading: false
	        }

		case GET_SOLUTIONS_STARTED:
			
			return {
				...state,
				solutionsTaxLoading: true
			}

		case GET_SOLUTIONS_SUCCESS:

			return {
				...state,
				solutionsTaxLoading: false,
				solutionsTaxError: null,
				taxSolutions: action.payload
	        }

	    case GET_INDUSTRY_TERMS_FAILURE:
			
			return {
				...state,
				industryTermsError: action.payload.error,
	            industryTermsLoading: false
	        }

		case GET_INDUSTRY_TERMS_STARTED:
			
			return {
				...state,
				industryTermsLoading: true
			}

		case GET_INDUSTRY_TERMS_SUCCESS:

			return {
				...state,
				industryTermsLoading: false,
				industryTermsError: null,
				termsIndustry: action.payload
	        }

	    case GET_RESOURCE_TYPE_TERMS_FAILURE:
			
			return {
				...state,
				resourceTypeTermsError: action.payload.error,
	            resourceTypeTermsLoading: false
	        }

		case GET_RESOURCE_TYPE_TERMS_STARTED:
			
			return {
				...state,
				resourceTypeTermsLoading: true
			}

		case GET_RESOURCE_TYPE_TERMS_SUCCESS:

			return {
				...state,
				resourceTypeTermsLoading: false,
				resourceTypeTermsError: null,
				termsResourceType: action.payload
	        }

	    case GET_SOLUTIONS_TERMS_FAILURE:
			
			return {
				...state,
				solutionsTermsError: action.payload.error,
	            solutionsTermsLoading: false
	        }

		case GET_SOLUTIONS_TERMS_STARTED:
			
			return {
				...state,
				solutionsTermsLoading: true
			}

		case GET_SOLUTIONS_TERMS_SUCCESS:

			return {
				...state,
				solutionsTermsLoading: false,
				solutionsTermsError: null,
				termsSolution: action.payload
	        }

		default:
			return state;
	}

}

export const filterStatus = state => state.selectedTaxonomies;

export const totalPages = state => state.totalPages;
export const totalPosts = state => state.totalPosts;

export const getPostsSuccess = state => state.posts;
export const getPostsStarted = state => state.loading;
export const getPostsFailure = state => state.error;

export const getTaxIndustrySuccess = state => state.taxIndustry;
export const getTaxIndustryStarted = state => state.loading;
export const getTaxIndustryFailure = state => state.error;

export const getTaxResourceTypeSuccess = state => state.taxResourceType;
export const getTaxResourceTypeStarted = state => state.loading;
export const getTaxResourceTypeFailure = state => state.error;

export const getTaxSolutionsSuccess = state => state.taxSolutions;
export const getTaxSolutionsStarted = state => state.loading;
export const getTaxSolutionsFailure = state => state.error;

export const getTermsIndustrySuccess = state => state.termsIndustry;
export const getTermsIndustryStarted = state => state.loading;
export const getTermsIndustryFailure = state => state.error;

export const getTermsResourceTypeSuccess = state => state.termsResourceType;
export const getTermsResourceTypeStarted = state => state.loading;
export const getTermsResourceTypeFailure = state => state.error;

export const getTermsSolutionsSuccess = state => state.termsSolution;
export const getTermsSolutionsStarted = state => state.loading;
export const getTermsSolutionsFailure = state => state.error;

export default rootReducer;