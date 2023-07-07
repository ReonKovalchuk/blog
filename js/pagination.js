import { getPostsData } from "./post-get.js";

export const createPagination = async () => {
    const pagination = (await getPostsData()).pagination;
    const pages = pagination.pages;
    const current = pagination.page;
    const paginationList = document.querySelector('.pagination-list');

    const ellipcis = '<li><span class="pagination-ellipsis">&hellip;</span></li>';


    if (pages < 5) {
        //render all without ellipces
        for (let index = 1; index <= pages; index++) {
            paginationList.append(getListItem(index, current));
        }
    } else {
        //first page
        if (current === 1) {
            //together with 2 and 3
            for (let index = 1; index <= 3; index++) {
                paginationList.append(getListItem(index, current));
            }
        } else if (current > 2) {
            paginationList.append(getListItem(1, current));
            paginationList.innerHTML += ellipcis;
        }
        //render three middle pages
        if (current > 1 && current !== pages) {
            for (let index = current - 1; index <= current + 1; index++) {
                paginationList.append(getListItem(index, current));
            }

        }
        //last page
        if (current === pages) {
            //three last pages together
            for (let index = pages - 2; index <= pages; index++) {
                paginationList.append(getListItem(index, current));
            }
        } else if (current < pages - 3) {
            //append last page separately
            paginationList.innerHTML += ellipcis;
            paginationList.append(getListItem(pages, current));

        }
    };



}
const getListItem = (index, current) => {

    let listItem = document.createElement('li');
    let pageLink = document.createElement('a');
    pageLink.setAttribute('href', `index.html?page=${index}`);
    pageLink.setAttribute('aria-label', `Goto page ${index}`);
    pageLink.innerText = index;
    pageLink.classList.add('pagination-link')
    if (index === current) {
        pageLink.setAttribute('aria-current', 'page');
        pageLink.classList.add('is-current');
    }
    listItem.append(pageLink);

    return listItem;
}