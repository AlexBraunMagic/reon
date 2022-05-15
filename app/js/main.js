"use strict";


const contentBox = document.querySelector('.content__box');
const paginationList = document.querySelector('.pagination-list');
const searchInput = document.querySelector('.filter__box-input');
const addPostOpenBtn = document.querySelector('.add-post__open-btn');
const addPostBox = document.querySelector('.add-post___box');



let startPosition = 0;
let quantityPosts = 10;
let pageNumber = 0;




if(searchInput.value != '') {
    getPosts(startPosition, quantityPosts);
}
else {
    searchPost(searchInput);
}





function createContentBoxItem(data) {
    const contentItemTitle = document.createElement('a');
    contentItemTitle.className = 'content__item-title';   
    contentItemTitle.textContent = data.title;     
    contentItemTitle.id = data.id;
    contentItemTitle.href = 'onePostPage.html';
    contentItemTitle.addEventListener('click', (e) => {
        const id = e.target.id;
        localStorage.setItem('id', id);
    });

    const contentItemId = document.createElement('p');
    contentItemId.className = 'content__item-id';
    contentItemId.textContent = `Post №-${data.id}`;

    const contentItemDeleteBtn = document.createElement('button');
    contentItemDeleteBtn.className = 'content__item-delete-btn';
    contentItemDeleteBtn.textContent = 'Delete Post';

    contentItemDeleteBtn.addEventListener('click', () => {
        deletePost(data);
    });


    const idAndBtnBox = document.createElement('div');
    idAndBtnBox.classList = 'content__id-btn-box';
    idAndBtnBox.appendChild(contentItemId);
    idAndBtnBox.appendChild(contentItemDeleteBtn);


    const contentItemHead = document.createElement('div');
    contentItemHead.className = 'content__item-head';

    contentItemHead.appendChild(contentItemTitle);
    contentItemHead.appendChild(idAndBtnBox);

    const contentItemInfo = document.createElement('p');
    contentItemInfo.className = 'content__item-info';
    contentItemInfo.textContent = data.body;

    const contentBoxItem = document.createElement('div');
    contentBoxItem.className = 'content__box-item';
    contentBoxItem.id = data.id;

    contentBoxItem.appendChild(contentItemHead);
    contentBoxItem.appendChild(contentItemInfo);

    return contentBoxItem;
}



function createPagination(pageNumber) {
    const paginationListItem = document.createElement('li');
    paginationListItem.className = 'pagination-list__item';
    paginationListItem.textContent = pageNumber;
    paginationListItem.addEventListener('click', (e) => {
        addBgForPaginationItem(e);
        nextPage(e);
    });
    return paginationListItem;
}

async function getPosts(startPosition, quantityPosts) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let data = await response.json();

    pageNumber = getPages(data);

    data = data.splice(startPosition, quantityPosts);

    if(paginationList) {
        for(let i = 0; i < pageNumber; i++) {
            paginationList.appendChild(createPagination(i+1));
        }
        addFirstPageBg();
    }
    
    for(let post of data) {
        showPosts(post);
    }
}


async function getNextPageData(startPosition, quantityPosts) {    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    let data = await response.json();

    data = data.splice(startPosition, quantityPosts);
    
    for(let post of data) {
        showPosts(post);
    }
}

function deletePost(item) {    
    const posts = document.querySelectorAll('.content__box-item');
    for(let post of posts) {
        if(item.id === Number(post.id)) {
            contentBox.removeChild(post);
        }
    }    
}



function showPosts(data) {
    if(contentBox) {
        contentBox.append(createContentBoxItem(data));
    }    
}


function getPages(data) {
    const allPages = Math.ceil(data.length / quantityPosts);
    return allPages;
}


function addFirstPageBg() {
    const paginationListItem = document.querySelector('.pagination-list__item');
    paginationListItem.classList.add('pagination-list__item--active');
}


function addBgForPaginationItem(e) {
    const paginationListItems = document.querySelectorAll('.pagination-list__item');
    for(let item of paginationListItems) {
        if(item.classList.contains('pagination-list__item--active')) {
            item.classList.remove('pagination-list__item--active');
        }
    }
    e.target.classList.add('pagination-list__item--active');    
}

function nextPage(e) {
    const nextPage = e.target.textContent;
    startPosition = nextPage * quantityPosts - 10;
    contentBox.innerHTML = '';
    getNextPageData(startPosition, quantityPosts);
}




async function searchPost(searchInput) {

    const value = searchInput.value;

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let data = await response.json();


    const newData = data.filter((item) => {
        if(item.title.includes(value) || item.body.includes(value)) {            
            return item;
        }
    });



    if(newData.length) {
        pageNumber = getPages(newData);
    
        data = newData.splice(startPosition, quantityPosts);
    
        
        contentBox.innerHTML = '';
        paginationList.innerHTML = '';
    
        if(paginationList) {
            for(let i = 0; i < pageNumber; i++) {
                paginationList.appendChild(createPagination(i+1));
            }
            addFirstPageBg();
        }
        
        for(let post of data) {
            showPosts(post);
        }
    }    
    else {
        contentBox.innerHTML = '';
        paginationList.innerHTML = '';
        contentBox.appendChild(notFoundBox());
    }
}



searchInput.addEventListener('keydown', () => {
    if(searchInput.value === '') {
        getPosts(startPosition, quantityPosts);
    }
    else {
        searchPost(searchInput);
    }
});



function notFoundBox() {
    const notFoundText = document.createElement('h2');
    notFoundText.className = 'content__not-found';
    notFoundText.textContent = 'Not found';

    return notFoundText;
}




addPostOpenBtn.addEventListener('click', () => {
    if(addPostBox.classList.contains('add-post___box--active')) {
        addPostBox.classList.remove('add-post___box--active');
        addPostOpenBtn.textContent = 'Add new post';
    }
    else {
        addPostBox.classList.add('add-post___box--active');
        addPostOpenBtn.textContent = 'Close';
    }
})















