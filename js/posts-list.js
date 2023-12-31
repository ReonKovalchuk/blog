import { getComments, getPostsData } from "./post-get.js";
import { getPostFooter } from "./post-details.js";


export const createPosts = async () => {
    const posts = (await getPostsData()).posts;
    const postsContainer = document.querySelector('.posts-container');
    posts.forEach(async post => {
        let postElem = await createPost(post);
        postsContainer.append(postElem);
    });
}

const createPost = async (post) => {
    let postElem = document.createElement('div');
    let n = (await getComments(post.id)).length;
    postElem.classList.add('box');
    postElem.innerHTML = `
    
                <article class="media post">
                    <figure class="media-left is-hidden-mobile">
                        <p class="image is-128x128 ">
                            <img src="img/userpic 280.jpeg">
                        </p>
                        <p>
                            <strong>ID</strong> <small>${post.user_id}</small>
                        </p>
                    </figure>
                    <div class="media-content post-content">
                        <div class="content">
                            <a href="post.html?id=${post.id}">
                                <h2 class="title is-4 article-link">${post.title}</h2>
                            </a>

                        </div>
                        ${getPostFooter(post.id, n)}
                    </div>
                </article>`

    return postElem;

}

// 
