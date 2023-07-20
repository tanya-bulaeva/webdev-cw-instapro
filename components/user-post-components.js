import { renderHeaderComponent } from "./header-component.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { userPosts } from "../index.js";
import { deletePost } from "../api.js";
import { getToken } from "../index.js";   
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { likeCommentButton } from "./posts-page-component.js";

//import { formatDistanceToNow } from "date-fns";
//import { ru } from "date-fns/locale";
//${formatDistanceToNow(new Date(post.createdAt), { locale: ru })} назад 
  export function renderUserPageComponent({ appEl, token, user }) {
        // TODO: реализовать рендер постов из api+
           
     //    TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
      //   можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
  
 
        console.log("Актуальный список постов пользователя:", userPosts);
           const userPostsHtml =  userPosts.map((post) => {

          return ` 
                                     <li class="post">
                           <div class="post-image-container">
                            <img class="post-image" src="${post.imageUrl}">
                          </div>
                          <div class="post-likes">
                          <button  data-id ="${post.id}" data-liked="${post.isLiked}"    class="like-button">
                          ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}  
                          </button>
                            <p class="post-likes-text">
                            <p class="post-likes-text"> Нравится:
                            ${post.likes.length === 0 ? 0 : post.likes.length === 1 ? post.likes[0].name
                              : post.likes[(post.likes.length - 1)].name + ' и еще ' + (post.likes.length - 1)} 
                            </p>
                          </div>
                          <p class="post-text">
                           <span class="user-name">${post.user.name}</span>
                           ${post.description}
                          </p>
                          <p class="post-date">
                            ${post.createdAt}
                         
                        </p>
                  
              ${user ? `${post.user.login === user.login ? `<button data-id="${post.id}" class="delete-button ">Удалить  пост</button>` : ""}` : ""}
                        </li>`;
        }).join('');
      
        let userName = userPosts[0]?.user.name;
        let userImage = userPosts[0]?.user.imageUrl;
      
        
      
              const appHtml = `<div class="page-container">
              <div class="header-container"></div>
                   <div class = 'post-header'>
                  
                    <img src = '${userImage}' class="post-header__user-image">
                    <p class="post-header__user-name"> ${userName}
                    </p></div>
                    <ul class="posts posts-user">
                    ${userPostsHtml}
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
                    alert ("Пост удален!")
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
          };

  const page = USER_POSTS_PAGE;
  let data = {
    userId: userPosts[0]?.user.id
  };
  
  likeCommentButton(token, page, data);

    }


    
