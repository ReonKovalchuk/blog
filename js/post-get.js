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

export const getComments = async (id = null) => {
    if (id === null) {
        const pageParams = new URLSearchParams(location.search);
        id = pageParams.get('id');
    }
    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
    const result = await response.json();

    return result.data;
}

// export const getUserByID = async (userId) => {
//     const response = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
//     const result = await response.json();

//     return result.data;
// }