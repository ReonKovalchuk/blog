import { getPostByID, getComments, postComment } from "./post-get.js";

export const createPostPage = async () => {
    const postContainer = document.querySelector('.post-container');
    const comments = await getComments();
    const postBody = await getPostBody(comments.length);
    postContainer.innerHTML = postBody;

    //create comments
    await createCommentsSection(comments);



}

const getPostBody = async (n) => {
    let post = await getPostByID();
    return `<figure class="media-left is-hidden-mobile">
                <p class="image is-128x128">
                    <img src="img/userpic 280.jpeg">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1 class="title is-3 mb-1">${post.title}</h1>
                    <p>
                        <strong>ID</strong> <small>${post.user_id}</small>
                    </p>
                    <p>
                        ${post.body}
                    </p>
                </div>

                ${getPostFooter(post.id, n)}
            </div>`
}

export const getPostFooter = (id, n) => {
    return `<small>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            <a>Like</a>
                        </div>

                        <div class="level-item">
                            <a href="post.html?id=${id}#reply">Reply</a>
                        </div>
                        <div class="level-item">
                            <a href="post.html?id=${id}#comments"> ${n} ${n === 1 ? 'comment' : 'comments'}</a>
                        </div>
                    </div>
                </nav>
            </small>`
}
{/* <nav class="level is-mobile">
                            <div class="level-left">
                            <small><a class="level-item">Like</a> · <a class="level-item">Reply</a></small>
                                <a href="#comments" class="level-item"> comment(s)</a>
                            </div>
</nav> */}


const createCommentsSection = async (comments) => {
    const commentsContainer = document.querySelector('.comments-container');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        commentsContainer.append(getCommentBody(comment));
    });
    commentsContainer.append(createReplyForm());
    const postBtn = document.querySelector('.post-btn');
    postBtn.addEventListener('click', submitComment)
}

const getCommentBody = (comment) => {
    let article = document.createElement('article');
    article.classList.add('media');
    article.innerHTML = `
        <figure class="media-left">
            <p class="image is-48x48">
                <img src="img/userpic 280.jpeg">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>${comment.name}</strong>
                    <br>
                        ${comment.body}
                        <br>
                            <small><a>Like</a></small>
                        </p>
                    </div>
            </div>`
    return article;
}

const createReplyForm = () => {
    let article = document.createElement('article');
    article.classList.add('media');
    article.setAttribute('id', 'reply');
    article.innerHTML =
        `<figure class="media-left">
            <p class="image is-64x64">
                <img src="img/userpic 280.jpeg">
            </p>
        </figure>
        <div class="media-content">
            <div class="field">
                <p class="control">
                    <textarea class="textarea comment-text" placeholder="Add a comment..."></textarea>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button post-btn">Post comment</button>
                </p>
            </div>
        </div>`;


    return article;
}

const submitComment = async () => {
    const commentBody = document.querySelector('.comment-text').value;
    if (commentBody) {
        await postComment(commentBody);
        await createPostPage();
    }


}