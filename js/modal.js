const successModal = document.querySelector(`.all-success`);
const successClose = successModal.querySelector(`.all-success__close`);
const successAgain = successModal.querySelector(`.all-success__again`);

const successCloseClickHandler = (evt) => {
  evt.preventDefault();
  successModal.classList.remove('modal__show');
};

const successAgainClickHandler = (evt) => {
  evt.preventDefault();
  successModal.classList.remove('modal__show');
  initTable();
};

successClose.addEventListener(`click`, successCloseClickHandler);
successAgain.addEventListener(`click`, successAgainClickHandler);
