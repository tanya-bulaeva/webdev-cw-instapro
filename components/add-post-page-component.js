import { postFetch } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";

import { renderUploadImageComponent } from "./upload-image-component.js";
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
let imageUrl = ""; 
  const renderHtml = () => {

    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container ">
      <div class="header-container"> </div>
          <div class = "add-post-form">
          <div class= "add-image">
              <h3 class = "form-title"> Добавить пост </h3>
    <div class = 'upload-image-container'></div>
          </div>

    <label class = "image-description"> Опишите фотографию:</label>
    
     <textarea rows = 4" class = "textarea"> </textarea>
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

    const imageDescription = document.querySelector('.textarea');

    document.getElementById("add-button").addEventListener("click", () => {
    if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      } 
 if (!imageDescription){
  alert ('Вы не добавили описание');
  return
}



onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });

   postFetch();
    });

  };

 renderHtml();
}
