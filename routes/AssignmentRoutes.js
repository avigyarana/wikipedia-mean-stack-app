'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/assignmentController');

	// todoList Routes
	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(todoList.create_a_task);

	app.route('/tasks/:taskId')
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);
	
	app.route('/getArticleWithMostRevisions').get(todoList.get_most_revisions);
	app.route('/getArticleWithLeastRevisions').get(todoList.get_least_revisions);
	app.route('/getArticleWithHighestHistory').get(todoList.get_highest_history);
	app.route('/getArticleWithLowestHistory').get(todoList.get_lowest_history);
	app.route('/getArticleWithLargestgroupReguser').get(todoList.get_largest_group);
	app.route('/getArticleWithSmallestgroupReguser').get(todoList.get_smallest_group);
	app.route('/getAllTitles').get(todoList.get_all_title);
	app.route('/getArticleDetails/:title').get(todoList.get_article_details);
	app.route('/getTop5EditorsForArticles/:title').get(todoList.get_top5_editors);
	app.route('/getRevisionsByYear/:titleAndUsers').get(todoList.get_revisions_by_year);
	app.route('/getRevCountForAnon').get(todoList.get_anon_revisioncountpie);
	app.route('/getRevCountForAnonBar').get(todoList.get_anon_revisioncountbar);



};


