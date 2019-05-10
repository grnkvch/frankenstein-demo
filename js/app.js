/*global jQuery, Handlebars, Router */

import todoStorage from "./storage";

jQuery(function ($) {
	'use strict';

	var util = {
		uuid: function () {
			return todoStorage.generateid(5);
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		store: function (namespace, data) {
			if (arguments.length > 1) {
				todoStorage.save(data);
			} else {
				return todoStorage.fetch();
			}
		}
	};

	var App = {
		init: function () {
			this.fetchStore();
			this.bindEvents();
		},
		bindEvents: function () {
			document.addEventListener('store-update', this.fetchStore.bind(this));
		},
		fetchStore: function() {
			this.todos = util.store('frankenstein');
		},
	};

	App.init();
});
