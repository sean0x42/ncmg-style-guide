function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function matches (el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

const iconEntities = {
  CHECKED: "&#xE834;",
  UNCHECKED: "&#xE835;"
};

const updateCheckbox = function (checkbox) {
  console.log(checkbox);
  let input = checkbox.querySelector("input[type='checkbox']");
  let icon  = checkbox.querySelector("i.material-icons");
  if (input.checked) {
    checkbox.classList.add("active");
    icon.innerHTML = iconEntities.CHECKED;
  } else {
    checkbox.classList.remove("active");
    icon.innerHTML = iconEntities.UNCHECKED;
  }
};


const delegatedChangeHandler = function (event) {
  let target = event.target;

  // Find parent
  while (!target.classList.contains("checkbox")) {
    if (matches(target, "body")) return;
    target = target.parentNode;
  }

  updateCheckbox(target);
};


ready(function () {
  let checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach(updateCheckbox);
});


document.removeEventListener("change", delegatedChangeHandler);
document.addEventListener("change", delegatedChangeHandler);