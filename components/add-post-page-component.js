import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
let imageUrl = ""; 

  const renderHtml = () => {

    // TODO: Реализовать страницу добавления поста+
    const appHtml = `
    <div class="page-container ">
      <div class="header-container"> </div>
          <div class = "add-post-form">
          <div class= "add-image">
              <h3 class = "form-title"> Добавить пост </h3>
    <div class = 'upload-image-container'></div>
          </div>

    <label class = "image-description"> Опишите фотографию:</label>
    
    <div class="form-error"></div>              

     <textarea rows = "4" class = "add-text textarea" id ="textarea"> </textarea>
      <button class="button add-button" id="add-button">Добавить</button>
            </div>
         </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

     renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });


 
    document.getElementById("add-button").addEventListener("click", () => {

     let imageDescription = document.getElementById("textarea").value;
   
        if (!imageUrl) {
      alert("Не выбрана фотография");
      return ;
    };

     if (!imageDescription) {

         alert("Нет описания фотографии");
      return;
    };

onAddPostClick({
        description: imageDescription
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        imageUrl,
      });
    });

  };

 renderHtml();
}
