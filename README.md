# WP Resource Center

**WP Resource Center** is a simple library running on React.js.

Sorting custom posts on multiple taxonomies in WordPress can be a real hassle using only WordPress's out-of-the box functionality. **WP Resource Center** works around this limitation by querying post type data (custom posts or otherwise) via the built-in WordPress JSON REST API and presents it on the front end paginated, with multiple filters, and ready to be styled.

## Use Case

It was becoming more and more common among my clients that they consolidate their various marketing materials into a single repository on their website. They had White Papers, Case Studies, eBooks, Infographics, etc. These resources were related to numerous products and addressed numerous distinct industries. In order to make their content more easily available to prospective customers.

## Pre-Requisites

1. [The custom post type you'd like to use this on must have "show_in_rest" set to true in its registration function.](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-rest-api-support-for-custom-content-types/)

2. [Ensure that the REST API Extension plugin is installed and enabled.](https://github.com/TheeBryanWhite/WP-RC-API-Extension)

3. Node & npm

## Installation

1. Copy the library into the appropriate folder in your WordPress theme.

2. Run npm install in that folder.

3. Update /api/wordpress.js with your post type slug and taxonomy slugs.

4. Update /constants/constants.js with your API endpoint root URL (I should probably consolidate these two steps into one file)

5. Run npm start at the terminal