/// <reference types="cypress" />

import { BsDarkmodeToggleModel } from "../../support/BsDarkmodeToggleModel.js";
import { TestAppModel } from "../../support/TestAppModel.js";

describe("API Constructor Feature", () => {
  context("Given ECMAS plugin interface", () => {
    testCase("ecmas");
  });
  context("Given jQuery plugin interface", () => {
    testCase("jquery");
  });
});

function testCase(pluginInterface) {
  context("When Boostrap Darkmode Toggle are initialize vía API", () => {
    const data_test = "options";
    it("Then Boostrap Darkmode Toggle take state or default", () => {
      TestAppModel.load(pluginInterface, data_test);
      TestAppModel.getTests().each(($test) => {
        TestAppModel.getElement($test).each(($element) => {
          BsDarkmodeToggleModel.checkState(
            $element,
            TestAppModel.getOptions($test)
          );
        });
      });
    });

    it("Then Boostrap Darkmode Toggle take root or default", () => {
      TestAppModel.load(pluginInterface, data_test);
      TestAppModel.getTests().each(($test) => {
        TestAppModel.getElement($test).each(($element) => {
          BsDarkmodeToggleModel.checkRoot(
            $element,
            TestAppModel.getOptions($test)
          );
        });
      });
    });

    it("Then Boostrap Darkmode Toggle take lightLabel or default", () => {
      TestAppModel.load(pluginInterface, data_test);
      TestAppModel.getTests().each(($test) => {
        TestAppModel.getElement($test).each(($element) => {
          BsDarkmodeToggleModel.checkLightLabel(
            $element,
            TestAppModel.getOptions($test)
          );
        });
      });
    });

    it("Then Boostrap Darkmode Toggle take darkLabel or default", () => {
      TestAppModel.load(pluginInterface, data_test);
      TestAppModel.getTests().each(($test) => {
        TestAppModel.getElement($test).each(($element) => {
          BsDarkmodeToggleModel.checkDarkLabel(
            $element,
            TestAppModel.getOptions($test)
          );
        });
      });
    });
  });
}
