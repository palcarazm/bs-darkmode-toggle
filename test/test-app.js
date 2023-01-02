const ENV = $("#env-data");
const TESTCASES = new Map();
TESTCASES.set("attributes", {
  label: "attributes",
  init: initTestDataAttributes,
  test: () => {
    return;
  },
});
function appStartup(testcase) {
  ENV.html("");
  ENV.append(
    $("<div>").append(
      $("<code>").html("bootstrap v" + DOMPurify.sanitize(bootstrap))
    ),
    $("<div>").append(
      $("<code>").html("bs-toggle v" + DOMPurify.sanitize(bsToggle))
    ),
    $("<div>").append(
      $("<code>").html(
        "bs-darkmode-toggle v" + DOMPurify.sanitize(bsDarkmodeToggle)
      )
    ),
    $("<div>").append(
      $("<code>").html(
        "Interface " +
          DOMPurify.sanitize(INTERFACE) +
          DOMPurify.sanitize(jquery)
      )
    )
  );
  MAIN.html("");
  DESCRIPTION.html("");

  if (TESTCASES.has(testcase)) {
    TESTCASES.get(testcase).init();
  } else {
    throw new DOMException(
      "Unknown test case: " + testcase,
      "NotSupportedError"
    );
  }

  switch (INTERFACE) {
    case "ECMAS":
      document
        .querySelectorAll('[data-toggle="bs-darkmode-toggle"]')
        .forEach((ele) => {
          ele.bsDarkmodeToggle();
        });
      break;
    case "JQUERY":
      $('[data-toggle="bs-darkmode-toggle"]').bsDarkmodeToggle();
      break;

    default:
      throw new DOMException(
        "Unknown interface: " + INTERFACE,
        "NotSupportedError"
      );
  }

  setTimeout(function () {
    if (TESTCASES.has(testcase)) {
      TESTCASES.get(testcase).test();
    } else {
      throw new DOMException(
        "Unknown test case: " + testcase,
        "NotSupportedError"
      );
    }
  }, 500);
}

$(function () {
  $.getJSON("../package-lock.json", function (data) {
    bootstrap = data.packages["node_modules/bootstrap"].version;
    bsToggle = data.packages["node_modules/bootstrap5-toggle"].version;
    jquery =
      INTERFACE === "JQUERY"
        ? " v" + data.packages["node_modules/jquery"].version
        : "";
    bsDarkmodeToggle = data.version;
  });

  TESTCASES.forEach((testcase, key) => {
    $("#test-selector").append(
      $('<button type="button">')
        .addClass("btn btn-secondary text-capitalize")
        .attr("data-test", key)
        .html(testcase.label)
    );
  });

  $("#test-selector button[data-test]").on("click", (e) => {
    appStartup($(e.target).attr("data-test"));
  });
});
