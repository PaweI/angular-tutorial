'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('phonecatApp', function() {


  describe('Phone list view', function() {
    
    beforeEach(function() {
      browser.get('app/index.html');
    });
    
      var phoneList = element.all(by.repeater("phone in phones"));
      var query = element(by.model("query"));

    it('should filter the phones as user types into the search box', function() {

      expect(phoneList.count()).toBe(3);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys("motorola");
      expect(phoneList.count()).toBe(2);
    });

    it('should display the current filter value in the title bar', function() {
      query.clear();
      expect(browser.getTitle()).toMatch(/Phone gallery:\s*$/);

      query.sendKeys('nexus');
      expect(browser.getTitle()).toMatch(/Phone gallery: nexus$/)
    });

    it('should be possible to control phone order via the drop down selection box', function() {
      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
      var query = element(by.model('query'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet');

      expect(getNames(phoneList)).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "Motorola XOOM\u2122"
        ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
        ]);
    });
  });
});
