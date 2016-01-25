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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not empty.
       */
    it('is defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed in the allFeeds
     * object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has URLs', function() {
      allFeeds.forEach( function(feed) {
        var url = feed.url;
        expect(url).toBeTruthy();
      });
    });

    /* This test loops through each feed in the allFeeds
     * object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has names', function() {
      allFeeds.forEach(function(feed) {
        var name = feed.name;
        expect(name).toBeTruthy();
      });
    });

  });

  /*  This test suite checks whether the slide-out menu is hidden
   *  by default, and that it functions correctly when its icon is clicked.
   */
  describe('The menu', function() {
      // This test ensures the menu element is hidden by default.
      it('is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });

      /* This test ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * has two expectations: the menu displays when
       * clicked and it hides when clicked again.
       */
      it('toggles visibility when menu icon is clicked', function() {
        var menuIcon = $('.menu-icon-link'),
            menuIsHidden;

        // This click should make the menu visible.
        menuIcon.click();
        menuIsHidden = $('.menu-hidden').length;
        expect(menuIsHidden).toBeFalsy();

        // This click should hide the menu again.
        menuIcon.click();
        menuIsHidden = $('.menu-hidden').length;
        expect(menuIsHidden).toBeTruthy();
      });

  });

  /* This test suite checks whether the loadFeed function successfully loads
   * the initial entries.
   */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* When the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed container.
     */
    it('loads at least one entry into .feed', function() {
      var entryLoaded = $('.entry').length;
      expect(entryLoaded).toBeGreaterThan(0);
    });

  });

  /* This test suite ensures that content actually
   * changes when a new feed is clicked.
   */
  describe('New Feed Selection', function() {
    var firstFeed, secondFeed;

    /* Before running the test, load a feed and save its first entry.
     * Then load a second feed and save its first entry.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        firstFeed = $('.entry')[0];

        // This is part of the first feed's callback so that it executes only
        // once the first feed successfully loads.
        loadFeed(1, function() {
          secondFeed = $('.entry')[0];
          done();
        });
      });
    });

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    it('actually changes content when a new feed is loaded', function() {
      expect(firstFeed.isEqualNode(secondFeed)).toBe(false);
    });
  });
}());
