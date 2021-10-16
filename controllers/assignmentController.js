'use strict';
var path = require('path');
var mongoose = require('mongoose'),
    Revisions = mongoose.model('Revisions');

exports.list_all_tasks = function(req, res) {
    Revisions.aggregate(([{$group:{_id:'$title',numOfEdits:{$sum:1}}},{$sort:{numOfEdits:-1}},{$limit:1}]), function(err, result) {
        console.log(result);
        console.log('get all tasks');
        if (err)
            res.send(err);
        res.json(result);
    });
};

//All Articles
exports.get_all_title = function(req, res) {
    Revisions.distinct('title', function(err, titles) {
        if (err)
            res.send(err);
        res.json(titles);
    });
};

exports.create_a_task = function(req, res) {
    var revisions = new Revisions(req.body);
    revisions.save(function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};

exports.get_article_details = function(req, res) {
    Revisions.find({'title': req.params.title}).count(function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};

exports.get_top5_editors = function(req, res) {
    console.log(req.params.title);
    Revisions.aggregate(([{'$match':{$and:[{'anon':{$ne:''}},{'title': req.params.title}]}},{$group:{_id:'$user',numOfEdits:{$sum:1}}},{$sort:{numOfEdits:-1}},{$limit:5}]),function(err, top5users) {
        if (err)
            res.send(err);
        res.json(top5users);
    });
};

exports.get_revisions_by_year = function(req, res) {
    console.log(req.params.titleAndUser);
    console.log(users);
    var token = req.params.titleAndUser.split('~');
    db.getCollection('revisions').aggregate(([{'$match': {$and: [{$or:[{user:+token[1]}, {user:+token[2]}, {user:+token[3]}, {user:+token[4]}, {user:+token[5]}]} ,{title: +token[0]}]}},
        {$group:{_id:{$substr:[ '$timestamp', 0, 4 ]},numOfEdits:{$sum:1}}},{$sort:{_id:1}}]),function(err, top5users) {
        if (err)
            res.send(err);
        res.json(top5users);
    });
};


exports.update_a_task = function(req, res) {
    Revisions.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};

exports.delete_a_task = function(req, res) {

    Revisions.remove({
        _id: req.params.taskId
    }, function(err, revisions) {
        if (err)
            res.send(err);
        res.json({ message: 'revisions successfully deleted' });
    });
};


exports.get_most_revisions = function(req, res) {
    Revisions.aggregate(([{$group:{_id:'$title',numOfEdits:{$sum:1}}},{$sort:{numOfEdits:-1}},{$limit:2}]), function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};

exports.get_least_revisions = function(req, res) {
    Revisions.aggregate(([{$group:{_id:'$title',numOfEdits:{$sum:1}}},{$sort:{numOfEdits:1}},{$limit:2}]), function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};


exports.get_highest_history = function(req, res) {
    Revisions.aggregate(([{$group:{_id:'$title',time1:{$min:'$timestamp'}}},{$sort:{time1:1}},{$limit:2}]), function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};

exports.get_lowest_history = function(req, res) {
    Revisions.aggregate(([{$group:{_id:'$title',time2:{$min:'$timestamp'}}},{$sort:{time2:-1}},{$limit:2}]), function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};


exports.get_largest_group = function(req, res) {
    Revisions.aggregate(([{$match:{$and:[{embeddedData:{$exists:true,$size:0}},{anon:{$exists:false}}]}},
        {$group:{_id:"title",total:{$sum:1}}}],{$sort:{total:-1}},{allowDiskUse: true ,cursor:{} }), function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};

exports.get_smallest_group = function(req, res) {
    Revisions.aggregate(({$match:{$and:[{embeddedData:{$exists:true,$size:0}},{anon:{$exists:false}}]}},
        {$group:{_id:"title",total:{$sum:1}}},{$sort:{total:1}},{allowDiskUse: true, cursor:{} }), function(err, revisions) {
        if (err)
            res.send(err);
        res.json(revisions);
    });
};


exports.get_anon_revisioncountpie = function(req, res) {
    Revisions.aggregate(({$match:{anon:{$exists:true}}},
        {$group : {_id : "$anon", countPA : { $sum : 1 }}}), function(err, result) {
        console.log(result);
        console.log('get all tasks');
        if (err)
            res.send(err);
        res.json(result);
    });
};

exports.get_anon_revisioncountbar = function(req, res) {
    Revisions.aggregate(({$match:{anon:{$exists:true}}},
        {$group : {_id : "$anon", countBC : { $sum : 1 }}}), function(err, result) {
        console.log(result);
        console.log('get all tasks');
        if (err)
            res.send(err);
        res.json(result);
    });
};

exports.home = function(req, res) {
    Revisions.distinct('title', function(err, titles) {
        if (err)
            res.send(err);
        res.sendFile(path.resolve('index.html'));
    });
};
