import api from './api';

const { createComment } = api();

const commentForm = document.getElementById('comment-form');

const commentTemplate = ({ comment, dateComment }) =>`
<div class="list-item">
<p>${comment}</p>
<span>${dateComment}</span>
</div>
`;

commentForm.addEventListener('submit', async (evt) =>{ 
  evt.preventDefault();
  try{
    const commentInput= document.getElementById('comment');
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const comment = await createComment(id, commentInput.value);

    renderComments(comment);

  }catch(e){
    console.error(e);
  }
});

export const renderComments = (comments = []) => {
  const commentsHTML = comments.map((comment) => commentTemplate(comment)).join('');
  document.getElementById('commentList').innerHTML = commentsHTML;
};