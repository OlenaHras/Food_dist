function openModalWindow(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModalWindow(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModalWindow(modalSelector);
    }
  });
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function closeModalWindow(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal

  // const modal = document.querySelector(modalSelector);
  const openModal = document.querySelectorAll(triggerSelector);
  openModal.forEach((btn) =>
    btn.addEventListener("click", () =>
      openModalWindow(modalSelector, modalTimerId)
    )
  );

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalWindow(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModalWindow, openModalWindow };
