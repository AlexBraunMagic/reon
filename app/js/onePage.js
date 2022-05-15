const id = localStorage.getItem('id');


const onePostTitle = document.querySelector('.one-post__title');
const onePostId = document.querySelector('.one-post__id');
const onePostContent = document.querySelector('.one-post__content');



const onePostCommentBox = document.querySelector('.one-post__comment-box');



async function getOnePost(id) {    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let data = await response.json();
    showPost(data);
}


async function getPostComments(id) {    
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    let data = await response.json();

    for(let item of data) {
        onePostCommentBox.appendChild(createCommentBox(item));
    }

}



getPostComments(id);



getOnePost(id);

function showPost(data) {
    onePostTitle.textContent = data.title;
    onePostId.textContent = data.id;
    onePostContent.textContent = data.body;
}


function createCommentBox(item) {
    const onePostCommentText = document.createElement('p');
    onePostCommentText.className = 'one-post__comment-text';
    onePostCommentText.textContent = item.body;

    const onePostCommentTextBox = document.createElement('div');
    onePostCommentTextBox.className = 'one-post__comment-text-box';
    onePostCommentTextBox.appendChild(onePostCommentText);

    const onePostPersoneMail = document.createElement('h4');
    onePostPersoneMail.className = 'one-post__persone-mail';
    onePostPersoneMail.textContent = item.email;

    const onePostCommentBoxItem = document.createElement('div');
    onePostCommentBoxItem.className = 'one-post__comment-box-item';

    onePostCommentBoxItem.appendChild(onePostPersoneMail);
    onePostCommentBoxItem.appendChild(onePostCommentTextBox);

    return onePostCommentBoxItem;
}







