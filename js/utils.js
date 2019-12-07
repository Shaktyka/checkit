// Генерирует элемент из строки
const renderElement = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};
