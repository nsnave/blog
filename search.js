
POSTS = [{'title': 'My First Post', 'date': '2022-06-09', 'meta': ['selected', 'top', 'recent'], 'images': ['./media/memes/p-np-folders.webp'], 'caption': "This is my first post! I will be posting more stuff about whatever I feel like -- i.e, mostly stuff relating to computer science, mathematics, and logic. To get started with a light post, here's a handful of TCS/math/logic memes.", 'number': '0'}];
CARDS = ['<div class="card">\n  <h2>My First Post</h2>\n  <span style="color: dimgray"\n    ><h4><i>June 09, 2022</i></h4></span\n  >\n  <div class="post-image">\n<img src="./media/memes/p-np-folders.webp" alt="p-np-folders.webp" />\n</div>\n  <p>This is my first post! I will be posting more stuff about whatever I feel like -- i.e, mostly stuff relating to computer science, mathematics, and logic. To get started with a light post, here\'s a handful of TCS/math/logic memes.</p>\n  <div class="sp-div">\n    <a href="./posts/my+first+post.html" class="sp-link" style="text-align: center">\n      <b>Read More</b>\n    </a>\n  </div>\n</div>\n'];

document.getElementById("searchbtn").addEventListener("click", search, false);

function search() {
  console.log("searching");
}