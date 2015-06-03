/* global $, it, describe, expect, beforeEach, allFeeds, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  'use strict';

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('each entry has a URL', function() {
      for (var a = 0; a < allFeeds.length; a++) {
        expect(allFeeds[a].url).toBeDefined();
        expect(allFeeds[a].url.length).not.toBe(0);
      }
    });

    /* This test loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('each entry has a name', function() {
      for (var a = 0; a < allFeeds.length; a++) {
        expect(allFeeds[a].name).toBeDefined();
        expect(allFeeds[a].name.length).not.toBe(0);
      }
    });
  });

  /* This test suite checks the menu */
  describe('The menu', function() {

    /* This test checks that the menu is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
    it('menu is hidden', function() {
      var ele0 = $('.menu.hidden');
      var pos = ele0.position();
      expect(pos.left).toBeLessThan(0);
    });

    /* This test checks the menu's
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('menu expands and hides', function() {
      var btn = $('.menu-icon-link');

      //make sure that it is hidden to start
      var bodyCss = $('.menu-hidden');
      //should have 1 element
      expect(bodyCss.length).toEqual(1);

      btn.click(); //show it
      bodyCss = $('.menu-hidden');
      //should have 0 element
      expect(bodyCss.length).toEqual(0);

      btn.click(); // hide it again
      bodyCss = $('.menu-hidden');
      //should have 1 element
      expect(bodyCss.length).toEqual(1);
    });
  });

  /* This suite checks the feed load functionality */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      // load the second feed and pass done() to the callback
      loadFeed(1, function() {done();});
    });

    /* This test checks when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test wil require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    it('loadFeed has a single entry', function() {
      var articles = $('.entry');

      expect(articles.length).toBeGreaterThan(0);
    });

  });

  /* This test suite checks switching feed behavior */
  describe('New Feed Selection', function() {

    /* Test to ensure when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */
    it('new feed loaded', function(done) {
      var firstText = '';

      var cb2 = function() {
        var articles = $('.entry');
        var newText = articles[0].innerText;
        console.log('b ' + newText);

        expect(newText.length).not.toBe(0);
        expect(firstText.length).not.toBe(0);
        expect(firstText).toBeDefined();
        expect(newText).toBeDefined();
        expect(newText).not.toEqual(firstText);
        done();
      };

      var cb1 = function() {
        var articles = $('.entry');
        firstText = articles[0].innerText;
        console.log('a ' + firstText);

        //load the last feed
        loadFeed(3, cb2);
      };

      //load the first feed
      loadFeed(0, cb1);

    });

  });

}());
