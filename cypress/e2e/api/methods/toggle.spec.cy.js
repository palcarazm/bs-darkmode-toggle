/// <reference types="cypress" />

import { BsDarkmodeToggleModel } from "../../../support/BsDarkmodeToggleModel.js";
import { TestAppModel } from "../../../support/TestAppModel.js";

describe("API Toggle Method Feature", () => {
  context("Given ECMAS plugin interface", () => {
    testcase("ecmas");
  });
  context("Given jQuery plugin interface", () => {
    testcase("jquery");
  });
});

const data_test = "methods";

function testcase(pluginInterface) {
  context("When Boostrap Darkmode Toggle is in light mode", () => {
    context("And toggle method is invoked in not silent mode", () => {
      const btn = "#toggle";
      it("Then Dark color scheme is loaded and change event is logged in console", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.setLight($element, pluginInterface);

            cy.get(btn)
              .click()
              .then(() => {
                BsDarkmodeToggleModel.checkCurrentState($element, false);
                BsDarkmodeToggleModel.checkRoot($element);
                cy.get(TestAppModel.TEST_CONSOLE_SELECTOR).should(
                  "have.text",
                  TestAppModel.TEST_CONSOLE_FIRED_TEXT
                );
              });
          });
        });
      });
    });
  });

  context("When Boostrap Darkmode Toggle is in dark mode", () => {
    context("And toggle method is invoked in not silent mode", () => {
      const btn = "#toggle";
      it("Then Light color scheme is loaded and change event is logged in console", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.setDark($element, pluginInterface);

            cy.get(btn)
              .click()
              .then(() => {
                BsDarkmodeToggleModel.checkCurrentState($element, true);
                BsDarkmodeToggleModel.checkRoot($element);
                cy.get(TestAppModel.TEST_CONSOLE_SELECTOR).should(
                  "have.text",
                  TestAppModel.TEST_CONSOLE_FIRED_TEXT
                );
              });
          });
        });
      });
    });
  });

  context("When Boostrap Darkmode Toggle is in light mode", () => {
    context("And toggle method is invoked in silent mode", () => {
      const btn = "#toggleSilent";
      it("Then Dark color scheme is loaded and change event is not logged in console", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.setLight($element, pluginInterface);

            cy.get(btn)
              .click()
              .then(() => {
                BsDarkmodeToggleModel.checkCurrentState($element, false);
                BsDarkmodeToggleModel.checkRoot($element);
                cy.get(TestAppModel.TEST_CONSOLE_SELECTOR).should(
                  "not.have.text",
                  TestAppModel.TEST_CONSOLE_FIRED_TEXT
                );
              });
          });
        });
      });
    });
  });

  context("When Boostrap Darkmode Toggle is in dark mode", () => {
    context("And toggle method is invoked in silent mode", () => {
      const btn = "#toggleSilent";
      it("Then Light color scheme is loaded and change event is not logged in console", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.setDark($element, pluginInterface);

            cy.get(btn)
              .click()
              .then(() => {
                BsDarkmodeToggleModel.checkCurrentState($element, true);
                BsDarkmodeToggleModel.checkRoot($element);
                cy.get(TestAppModel.TEST_CONSOLE_SELECTOR).should(
                  "not.have.text",
                  TestAppModel.TEST_CONSOLE_FIRED_TEXT
                );
              });
          });
        });
      });
    });
  });
}
