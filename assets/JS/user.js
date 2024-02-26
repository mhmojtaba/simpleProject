document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems, {});

  const modalBack = document.querySelector("#user-modal");
  const modal = document.querySelector(".add-user-modal-cont");
  const addUserButton = document.querySelector("#add-user");

  addUserButton.addEventListener("click", () => {
    modal.classList.add("show");
    modalBack.classList.remove("dis-none");
  });

  modalBack.addEventListener("click", () => {
    modal.classList.remove("show");
    modalBack.classList.add("dis-none");
  });
});
