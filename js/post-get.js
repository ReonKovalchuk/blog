export const getPostsData = async () => {
    const pageParams = new URLSearchParams(location.search);
    const page = pageParams.get('page')
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page === null ? 1 : page}`);
    const result = await response.json();

    return {
        posts: result.data,
        pagination: result.meta.pagination,
    };
}

export const getPostByID = async () => {
    const pageParams = new URLSearchParams(location.search);
    const id = pageParams.get('id');
    const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const result = await response.json();

    return result.data;
}

export const getComments = async (id) => {
    if (id === undefined) {
        const pageParams = new URLSearchParams(location.search);
        id = pageParams.get('id');
    }
    const response = await fetch(`https://gorest.co.in/public-api/posts/${id}/comments`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer 161c84f7626735824ed67b3d40a6b175c70dcfb43598bd9100dfebd43849e1e5',
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();

    return result.data;
}

// export const getUserByID = async (userId) => {
//     const response = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
//     const result = await response.json();

//     return result.data;
// }

export const postComment = async (commentBody) => {
    const pageParams = new URLSearchParams(location.search);
    const id = pageParams.get('id');
    const response = await fetch(`https://gorest.co.in/public-api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            name: 'Anonimous',
            post_id: parseInt(id),
            email: 'example@mail.com',
            body: commentBody,
        }),
        headers: {
            Authorization: 'Bearer 161c84f7626735824ed67b3d40a6b175c70dcfb43598bd9100dfebd43849e1e5',
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();

}