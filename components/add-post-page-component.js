export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  
  const render = () => {

    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container ">
      <div class="header-container"> </div>
          <div class = "add-post-form">
              <h3 class = "form-title"> Добавить пост </h3>

                <label class="file-upload-label secondary-button">
                <input
        type="file"
        class="file-upload-input"
        style="display:none"
      />
      Выберите фото
  </label>
    <label class = "image-description"> Опишите фотографию:</label>
    
     <textarea rows = 4" class = "add-image-description"> </textarea>
      <button class="button add-button" id="add-button">Добавить</button>
            </div>
         </div>
  `;

    appEl.innerHTML = appHtml;



    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });

  };

 render();
}
