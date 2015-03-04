/**
 * The software is licensed under The MIT License (MIT)
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2012 Hezhiqiang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the"Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * XML-RPC WordPress API
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API
 *
 *
 * @param string
 *            url
 * @param string
 *            username
 * @param string
 *            password
 * @returns {WordPress}
 */

function WordPress(url, username, password) {
	this.url = url;
	this.username = username;
	this.password = password;
	this.request = new XmlRpcRequest(this.url);
}


WordPress.prototype.send = function(cbProcessResult){
	var self = this;
	this.request.send( function( resp ){
		self.request.clearParams();
		var result = resp.parseXML();
		if (cbProcessResult) cbProcessResult( result );
	});
};

/**
 * === XML-RPC WordPress API/Posts ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts
 *
 */
/**
 * Retrieve a post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPost
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 * @param array
 *            bields
 *
 * @returns object
 */
WordPress.prototype.getPost = function(blog_id, post_id, fields, cbProcessResult) {

	this.request.methodName = "wp.getPost";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(post_id);
	this.request.addParam(fields);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of posts of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPosts
 *
 * @param int
 *            blog_id
 * @param object
 *            filter
 * @param array fields
 *
 * @returns object
 */
WordPress.prototype.getPosts = function(blog_id, filter, fields, cbProcessResult) {

	this.request.methodName = "wp.getPosts";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(filter);
	this.request.addParam(fields);
	this.send( cbProcessResult );
};

/**
 * Create a new post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.newPost
 *
 * @param int
 *            blog_id
 * @param object
 *            content
 *
 * @returns post_id int
 */
WordPress.prototype.newPost = function(blog_id, content, cbProcessResult) {

	this.request.methodName = "wp.newPost";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(content);
	this.send( cbProcessResult );
};

/**
 * Edit an existing post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.editPost
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 * @param object
 *            content
 *
 * @returns boolean
 */
WordPress.prototype.editPost = function(blog_id, post_id, content, cbProcessResult) {
	this.request.methodName = "wp.editPost";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(post_id);
	this.request.addParam(content);
	this.send( cbProcessResult );
};

/**
 * Delete an existing post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.deletePost
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 *
 * @returns boolean
 */
WordPress.prototype.deletePost = function(blog_id, post_id, cbProcessResult) {
	this.request.methodName = "wp.deletePost";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(post_id);

	this.send( cbProcessResult );
	/*
	 * TODO:: Exceptions handling 无权限 401: If the user does not have permission
	 * to delete the post. 不存在 404: If no post with that post_id exists.
	 *
	 */
};

/**
 * Retrieve a registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostType
 *
 * @param int
 *            blog_id
 * @param string
 *            post_type_name
 * @param array
 *            fields
 *
 * @returns object
 */
WordPress.prototype.getPostType = function(blog_id, post_type_name, fields, cbProcessResult) {
	this.request.methodName = "wp.getPostType";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(post_type_name);
	this.request.addParam(fields);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of registered post types.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostTypes
 *
 * @param int
 *            blog_id
 * @param array
 *            filter
 * @param array
 *            fields
 *
 * @returns object
 */
WordPress.prototype.getPostTypes = function(blog_id, filter, fields, cbProcessResult) {
	this.request.methodName = "wp.getPostTypes";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(filter);
	this.request.addParam(fields);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of post formats.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostFormats
 *
 * @param int
 *            blog_id
 * @param array
 *            filter
 *
 * @returns object
 */
WordPress.prototype.getPostFormats = function(blog_id, filter, cbProcessResult) {
	this.request.methodName = "wp.getPostFormats";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(filter);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of supported values for post_status field on posts.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostStatusList
 *
 * @param int
 *            blog_id
 *
 * @returns object
 */
WordPress.prototype.getPostStatusList = function(blog_id, cbProcessResult) {
	this.request.methodName = "wp.getPostStatusList";
	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.send( cbProcessResult );
};

/**
 * === XML-RPC WordPress API/Taxonomies ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies
 *
 * These XML-RPC methods are for interacting with taxonomies and terms.
 * Taxonomies (for categories, tags, and custom taxonomies) - Added in WordPress
 * 3.4
 */

/**
 * Retrieve information about a taxonomy.
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTaxonomy
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 *
 * @returns object
 */
WordPress.prototype.getTaxonomy = function(blog_id, taxonomy, cbProcessResult) {
	this.request.methodName = "wp.getTaxonomy";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(taxonomy);
	this.send( cbProcessResult );
};

/**
 * Retrieve a list of taxonomies.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTaxonomies
 *
 * @param int
 *            blog_id
 *
 * @returns object
 */
WordPress.prototype.getTaxonomies = function(blog_id, cbProcessResult) {
	this.request.methodName = "wp.getTaxonomies";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.send( cbProcessResult );
};

/**
 * Retrieve a taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTerm
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 * @param term_id
 *
 * @returns object
 */
WordPress.prototype.getTerm = function(blog_id, taxonomy, term_id, cbProcessResult) {
	this.request.methodName = "wp.getTerm";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(taxonomy);
	this.request.addParam(term_id);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of terms in a taxonomy.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTerms
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 * @param object
 *            filter
 *
 * @returns array
 *
 */
WordPress.prototype.getTerms = function(blog_id, taxonomy, filter, cbProcessResult) {
	this.request.methodName = "wp.getTerms";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(taxonomy);
	this.request.addParam(filter);
	this.send( cbProcessResult );
};

/**
 * Create a new taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.newTerm
 *
 * @param int
 *            blog_id
 * @param object
 *            content
 *
 * @returns int term_id
 *
 */
WordPress.prototype.newTerm = function(blog_id, content, cbProcessResult) {
	this.request.methodName = "wp.newTerm";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(content);
	this.send( cbProcessResult );
};

/**
 * Edit an existing taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.editTerm
 *
 * @param int
 *            blog_id
 * @param int
 *            term_id
 * @param object
 *            content
 *
 * @returns boolean
 */
WordPress.prototype.editTerm = function(blog_id, term_id, content, cbProcessResult) {
	this.request.methodName = "wp.editTerm";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(term_id);
	this.request.addParam(content);
	this.send( cbProcessResult );
};

/**
 * Delete an existing taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.deleteTerm
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 * @param int
 *            term_id
 *
 * @returns boolean
 */
WordPress.prototype.deleteTerm = function(blog_id, taxonomy, term_id, cbProcessResult) {
	this.request.methodName = "wp.deleteTerm";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(taxonomy);
	this.request.addParam(term_id);
	this.send( cbProcessResult );
};

/**
 * XML-RPC WordPress API/Media
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media
 *
 */

/**
 * Retrieve a media item (i.e, attachment).
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media#wp.getMediaItem
 *
 * @param int
 *            blog_id
 * @param int
 *            attachment_id
 *
 * @returns object
 */
WordPress.prototype.getMediaItem = function(blog_id, attachment_id, cbProcessResult) {
	this.request.methodName = "wp.getMediaItem";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(attachment_id);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of media items.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media#wp.getMediaLibrary
 *
 * @param int
 *            blog_id
 * @param object
 *            filter
 *
 * @returns array
 */
WordPress.prototype.getMediaLibrary = function(blog_id, filter, cbProcessResult) {
	this.request.methodName = "wp.getMediaLibrary";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(filter);
	this.send( cbProcessResult );
};

/**
 * Upload a media file.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media#wp.uploadFile
 *
 * @param int
 *            blog_id
 * @param object
 *            data
 *
 * @returns object
 */
WordPress.prototype.uploadFile = function(blog_id, data, cbProcessResult) {
	this.request.methodName = "wp.uploadFile";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(data);
	this.send( cbProcessResult );
};

/**
 * === XML-RPC WordPress API/Comments ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments
 */

/**
 * Retrieve comment count for a specific post.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getCommentCount
 *
 * @param int
 *            blog_id
 * @param string
 *            post_id
 *
 * @returns array
 *
 */
WordPress.prototype.getCommentCount = function(blog_id, post_id, cbProcessResult) {
	this.request.methodName = "wp.getCommentCount";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(post_id);
	this.send( cbProcessResult );
};

/**
 * Retrieve a comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getComment
 *
 * @param int
 *            blog_id
 * @param int
 *            comment_id
 *
 * @returns object
 */
WordPress.prototype.getComment = function(blog_id, comment_id, cbProcessResult) {
	this.request.methodName = "wp.getComment";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(comment_id);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of comments.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getComments
 *
 * @param int
 *            blog_id
 * @param object
 *            filter
 *
 * @return array
 */
WordPress.prototype.getComments = function(blog_id, filter, cbProcessResult) {
	this.request.methodName = "wp.getComments";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(filter);
	this.send( cbProcessResult );
};

/**
 * Create a new comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.newComment
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 * @param object
 *            comment
 *
 * @returns int comment_id
 */
WordPress.prototype.newComment = function(blog_id, post_id, content, cbProcessResult) {
	this.request.methodName = "wp.newComment";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(post_id);
	this.request.addParam(content);
	this.send( cbProcessResult );
};

/**
 * Edit an existing comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.editComment
 *
 * @param int
 *            blog_id
 * @param int
 *            comment_id
 * @param object
 *            comment
 *
 * @returns boolean
 */
WordPress.prototype.editComment = function(blog_id, comment_id, comment, cbProcessResult) {
	this.request.methodName = "wp.editComment";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(comment_id);
	this.request.addParam(comment);
	this.send( cbProcessResult );
};

/**
 * Remove an existing comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.deleteComment
 *
 * @param int
 *            blog_id
 * @param int
 *            comment_id
 *
 * @return boolean
 */
WordPress.prototype.deleteComment = function(blog_id, comment_id, cbProcessResult) {
	this.request.methodName = "wp.deleteComment";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(comment_id);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of comment statuses.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getCommentStatusList
 *
 * @param int
 *            blog_id
 *
 * @returns array
 *						struct
 *							string (key): status value
 *							string (value): status description
 */
WordPress.prototype.getCommentStatusList = function(blog_id, cbProcessResult) {
	this.request.methodName = "wp.getCommentStatusList";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.send( cbProcessResult );
};

/**
 * === XML-RPC WordPress API/Options ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Options
 */

/**
 * Retrieve blog options.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Options#wp.getOptions
 *
 * @param int
 *            blog_id
 * @param array
 *            options List of option names to retrieve. If omitted, all options
 *            will be retrieved.
 *
 * @returns
 * 		struct
 * 			string desc
 * 			string value
 * 			bool readonly
 *
 * This method will only return white-listed options. If a
 *          non-white-listed option is included in options, it will be omitted
 *          from the response.
 */
WordPress.prototype.getOptions = function(blog_id, options, cbProcessResult) {
	this.request.methodName = "wp.getOptions";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(options);
	this.send( cbProcessResult );
};

/**
 * Edit blog options.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Options#wp.setOptions
 *
 * @param int
 *            blog_id
 * @param array
 *            options keys are option names, values are the new option values.
 *
 * @returns array the options with updated values.
 */
WordPress.prototype.setOptions = function(blog_id, options, cbProcessResult) {
	this.request.methodName = "wp.setOptions";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(options);
	this.send( cbProcessResult );
};

/**
 * === XML-RPC WordPress API/Users ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Users
 */

/**
 * Retrieve list of blogs for this user.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Users#wp.getUsersBlogs
 *
 * @return array
 */
WordPress.prototype.getUsersBlogs = function(cbProcessResult) {
	this.request.methodName = "wp.getUsersBlogs";

	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.send( cbProcessResult );
};

/**
 * Retrieve list of all authors.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Users#wp.getAuthors
 *
 * @param int
 *            blog_id
 * @returns array
 */
WordPress.prototype.getAuthors = function(blog_id, cbProcessResult) {
	this.request.methodName = "wp.getAuthors";

	this.request.addParam(blog_id);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.send( cbProcessResult );
};

