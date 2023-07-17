import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, user, goToPage } from "../index.js";
import { deletePost } from "../api.js";
import { getToken } from "../index.js"; 





export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api+
  //исправить время создания

    /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  console.log("Актуальный список постов:", posts);
 let postHtml =  posts.map((post, index) => {
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
                      <button data-index = '${index}' data-post-id="${post.likes}" class="like-button">
                      ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}  
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                     <span class="user-name"> <span class="user-name">${post.user.name}</span>
                     ${post.description}
                    </p>
                    <p class="post-date">
                    ${post.createdAt}
                  </p>
            
        ${user ? `${post.user.login === user.login ? `<button data-id="${post.id}" class="post-delete">Удалить  пост</button>` : ""}` : ""}
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




  if (document.querySelectorAll(".post-delete")) {
    for (const deleteElement of document.querySelectorAll(".post-delete")) {
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

  }



