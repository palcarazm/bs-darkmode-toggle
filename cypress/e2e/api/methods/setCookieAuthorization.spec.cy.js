/// <reference types="cypress" />

import { BsDarkmodeToggleModel } from "../../../support/BsDarkmodeToggleModel.js";
import { TestAppModel } from "../../../support/TestAppModel.js";

describe("API Set Cookie Authorization Method Feature", () => {
  context("Given ECMAS plugin interface", () => {
    testcase("ecmas");
  });
  context("Given jQuery plugin interface", () => {
    testcase("jquery");
  });
});

const data_test = "methods";

function testcase(pluginInterface) {
  context("When there is not Boostrap Darkmode Toggle cookie", () => {
    context("And allowCookie method is invoked", () => {
      const btn = "#allowCookie";
      context("And Boostrap Darkmode Toggle is in light mode", () => {
        it("Then Light color scheme is preserve and Boostrap Darkmode Toggle cookie is created", () => {
          TestAppModel.load(pluginInterface, data_test);
          TestAppModel.getTests().each(($test) => {
            TestAppModel.getElement($test).each(($element) => {
              BsDarkmodeToggleModel.setLight($element, pluginInterface);

              cy.get(btn)
                .click()
                .then(() => {
                  BsDarkmodeToggleModel.checkCurrentState($element, true);
                  BsDarkmodeToggleModel.checkRoot($element);
                  cy.getCookie(BsDarkmodeToggleModel.COOKIE_NAME).should(
                    "have.property",
                    "value",
                    BsDarkmodeToggleModel.getLightColorMode($element)
                  );
                });
            });
          });
        });
      });
      context("And Boostrap Darkmode Toggle is in dark mode", () => {
        it("Then Dark color scheme is preserve and Boostrap Darkmode Toggle cookie is created", () => {
          TestAppModel.load(pluginInterface, data_test);
          TestAppModel.getTests().each(($test) => {
            TestAppModel.getElement($test).each(($element) => {
              BsDarkmodeToggleModel.setDark($element, pluginInterface);

              cy.get(btn)
                .click()
                .then(() => {
                  BsDarkmodeToggleModel.checkCurrentState($element, false);
                  BsDarkmodeToggleModel.checkRoot($element);
                  cy.getCookie(BsDarkmodeToggleModel.COOKIE_NAME).should(
                    "have.property",
                    "value",
                    BsDarkmodeToggleModel.getDarkColorMode($element)
                  );
                });
            });
          });
        });
      });
    });
    context("And denyCookie method is invoked", () => {
      const btn = "#denyCookie";
      it("Then color scheme is preserve and Boostrap Darkmode Toggle cookie is not created", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.setLight($element, pluginInterface);

            cy.get(btn)
              .click()
              .then(() => {
                BsDarkmodeToggleModel.checkCurrentState($element, true);
                BsDarkmodeToggleModel.checkRoot($element);
                cy.getCookie(BsDarkmodeToggleModel.COOKIE_NAME).should(
                  "equal",
                  null
                );
              });
          });
        });
      });
    });
  });
  context("When there is Boostrap Darkmode Toggle cookie", () => {
    context("And denyCookie method is invoked", () => {
      const btn = "#denyCookie";
      context("And Boostrap Darkmode Toggle is in light mode", () => {
        it("Then Light color scheme is preserve and Boostrap Darkmode Toggle cookie is removed", () => {
          TestAppModel.load(pluginInterface, data_test);
          TestAppModel.getTests().each(($test) => {
            TestAppModel.getElement($test).each(($element) => {
              BsDarkmodeToggleModel.setLight($element, pluginInterface);

              cy.get(btn)
                .click()
                .then(() => {
                  BsDarkmodeToggleModel.checkCurrentState($element, true);
                  BsDarkmodeToggleModel.checkRoot($element);
                  cy.getCookie(BsDarkmodeToggleModel.COOKIE_NAME).should(
                    "equal",
                    null
                  );
                });
            });
          });
        });
      });
      context("And Boostrap Darkmode Toggle is in dark mode", () => {
        it("Then Dark color scheme is preserve and Boostrap Darkmode Toggle cookie is removed", () => {
          TestAppModel.load(pluginInterface, data_test);
          TestAppModel.getTests().each(($test) => {
            TestAppModel.getElement($test).each(($element) => {
              BsDarkmodeToggleModel.setDark($element, pluginInterface);

              cy.get(btn)
                .click()
                .then(() => {
                  BsDarkmodeToggleModel.checkCurrentState($element, false);
                  BsDarkmodeToggleModel.checkRoot($element);
                  cy.getCookie(BsDarkmodeToggleModel.COOKIE_NAME).should(
                    "equal",
                    null
                  );
                });
            });
          });
        });
      });
    });
  });
}
