/**
 * Esta solución está hecha con JavaScript "puro",
 * sin usar ninguna librería o framework como Vue.js
 */

// Contador:
var start = 0;

function loadComments() {
  var url = `http://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=10`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (comments) {
      var html = "";
      for (var comment of comments) {
        html += `
          <div class="comment">
            <h4>${comment.name}</h4>
            <p>${comment.body}</p>
            <p class="comment-id">ID del comentario: ${comment.id}</p>
          </div>
        `;
      }
      document.querySelector("#comments").insertAdjacentHTML("beforeend", html);
      start = start + 10;
    })
    .catch(function (error) {
      alert(error);
    });
} // End - Load Comments

// Se cargan 10 comentarios al inicio (al cargar la página):
loadComments();

// Se cargan 10 comentarios más al llegar al final de la página:
window.addEventListener("scroll", function () {
  if (
    window.innerHeight + Math.ceil(window.pageYOffset) >=
    document.body.offsetHeight
  ) {
    loadComments();
  }
});
