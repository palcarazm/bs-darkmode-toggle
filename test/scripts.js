import * as pagemodel from "./src/PageModel.js";
const PAGEMODEL = new pagemodel.default(INTERFACE);

import * as testcases from "./src/TestCases.js";
const TESTCASES = new testcases.default(INTERFACE);

$(function () {
  PAGEMODEL.loadEnvData();
  TESTCASES.loadTestCases();
});
