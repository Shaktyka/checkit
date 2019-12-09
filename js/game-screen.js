// Разметка экрана настроек
const gameString = `<section class="game-screen">
      <div class="game-screen__wrap">
        <h2 class="settings__title">Посмотри и запомни:</h2>
      </div>
    </section>`;

// Рендерим элемент
const renderGameScreenEl = () => {
  return renderElement(gameString)
};
