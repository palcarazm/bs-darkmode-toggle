/// <reference types="cypress" />

import { BsDarkmodeToggleModel } from "../support/BsDarkmodeToggleModel.js";
import { TestAppModel } from "../support/TestAppModel.js";

describe("Data Attribute Feature", () => {
  context("Given ECMAS plugin interface", () => {
    testCase("ecmas");
  });
  context("Given jQuery plugin interface", () => {
    testCase("jquery");
  });
});

function testCase(pluginInterface) {
  context(
    "When Boostrap Darkmode Toggle are initialize with data attributes",
    () => {
      const data_test = "attributes";
      it("Then Boostrap Darkmode Toggle take data-state or default", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.checkState($element);
          });
        });
      });

      it("Then Boostrap Darkmode Toggle take data-root or default", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.checkRoot($element);
          });
        });
      });

      it("Then Boostrap Darkmode Toggle take data-lightLabel or default", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.checkLightLabel($element);
          });
        });
      });

      it("Then Boostrap Darkmode Toggle take data-darkLabel or default", () => {
        TestAppModel.load(pluginInterface, data_test);
        TestAppModel.getTests().each(($test) => {
          TestAppModel.getElement($test).each(($element) => {
            BsDarkmodeToggleModel.checkDarkLabel($element);
          });
        });
      });
    }
  );
}
