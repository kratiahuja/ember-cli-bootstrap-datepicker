/* jshint node: true */
'use strict';

var path = require('path');
var existsSync = require('exists-sync');
var fastbootTransform = require('fastboot-transform');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-bootstrap-datepicker',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/bootstrap-datepicker/bootstrap-datepicker.js');
    app.import(app.bowerDirectory + '/bootstrap-datepicker/dist/css/bootstrap-datepicker.css');
  },

  treeForVendor(tree) {
    var trees = [];

    if (tree) {
      trees.push(tree);
    }

    var bootstrapDatepickerPath = path.join(this.project.root, this.app.bowerDirectory, 'bootstrap-datepicker', 'dist', 'js');

    if (existsSync(bootstrapDatepickerPath)) {
      var bootstrapTree = fastbootTransform(new Funnel(bootstrapDatepickerPath, {
        files: ['bootstrap-datepicker.js'],
        destDir: 'bootstrap-datepicker'
      }));

      trees.push(bootstrapTree);
    }

    return new MergeTrees(trees);
  }
};

