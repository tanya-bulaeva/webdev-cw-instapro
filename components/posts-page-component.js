import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, user, goToPage} from "../index.js";
import {  deletePost, getDislike, getLike} from "../api.js";
import { getToken } from "../index.js"; 

import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";



export function likeCommentButton(token, page, data) {
  const likeButtons  = document.querySelectorAll(".like-button");
  for (const like of likeButtons) {
    like.addEventListener("click", () => {
      let id = like.dataset.id;
      let liked = like.dataset.liked;
  if (!getToken()) {
    alert (`Поставить лайк могут только авторизованные пользователи`);
  }
  if (getToken()){

      if (liked == "false") {
    
      getLike({
          id,
          token
        })
      .then (() => {
           goToPage(page, data);
        }).catch((error) => {
          alert(error.message);
        });
           
        
      } else {
        return  getDislike({
          id,
          token
        }).then (() => {
          goToPage(page, data);
       }).catch((error) => {
        alert(error.message);
      });
   
      }

    
  }

    });
  }
}
export function renderPostsPageComponent({ appEl, token }) {
  // TODO: реализовать рендер постов из api


    /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  console.log("Актуальный список постов:", posts);
 let postHtml =  posts.map((post) => {
    return `
                               <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button  data-id ="${post.id}" data-liked="${post.isLiked}"    class="like-button">
                      ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}  
                      </button>
                      <p class="post-likes-text"> Нравится:
                      ${post.likes.length === 0 ? 0 : post.likes.length === 1 ? post.likes[0].name
                        : post.likes[(post.likes.length - 1)].name + ' и еще ' + (post.likes.length - 1)}  
                       
                      </p>
                    </div>
                    <p class="post-text">
                     <span class="user-name"> ${post.user.name}</span>
                    ${post.description}
                    </p>
                    <p class="post-date">

                    ${formatDistanceToNow(new Date(post.createdAt), { locale: ru })} назад
                  </p>
            
        ${user ? `${post.user.login === user.login ? `<button data-id="${post.id}" class="delete-button">Удалить  пост</button>` : ""}` : ""}
                  </li>`;
  }).join('');



        const appHtml = `<div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
          ${postHtml}
          </ul>
          </div>`;

  appEl.innerHTML = appHtml;
  



  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });




  if (document.querySelectorAll(".delete-button")) {
    for (const deleteElement of document.querySelectorAll(".delete-button")) {
      deleteElement.addEventListener("click", () => {
        deleteElement.disabled = true;
        deletePost({ token: getToken(), id: deleteElement.dataset.id })
          .then(() => {
            alert(`Пост удален!`)
            goToPage(POSTS_PAGE);
          })
      })
    }
  }


    for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
const page = POSTS_PAGE;
likeCommentButton(token, page);

}

