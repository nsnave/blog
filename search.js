const POSTS = [{'title': 'My First Post', 'date': '2022-06-09', 'meta': ['selected', 'top', 'recent'], 'tags': ['Misc.'], 'images': ['./media/memes/p-np-folders.png'], 'caption': "This is my first post! I will be posting more stuff about whatever I feel like -- i.e, mostly stuff relating to computer science, mathematics, and logic. To get started with a light post, here's a handful of TCS/math/logic memes.", 'number': '0'}, {'title': 'Logical Duality and "Et Cetera"', 'date': '2022-12-23', 'meta': ['selected', 'top', 'recent'], 'tags': ['Misc.', 'Logic'], 'images': [''], 'caption': 'In the study of logic, many operators have a <i>dual</i>: AND gates have OR gates, universal quantifiers have existential quantifiers, and so on. We commonly use the term "etc." to abbreviate the Latin phrase "et cetera", which in English roughly translates to "and the like". We don\'t, however, have an abbreviation for "or the like" --- the dual to "etc.". Should we?', 'number': '1'}];
const CARDS = ['<div class="card">\n  <h2>My First Post</h2>\n  <span style="color: dimgray"\n    ><h4><i>June 09, 2022</i></h4></span\n  >\n  <div class="post-image">\n<img src="./media/memes/p-np-folders.png" alt="p-np-folders.png" />\n</div>\n  <p>This is my first post! I will be posting more stuff about whatever I feel like -- i.e, mostly stuff relating to computer science, mathematics, and logic. To get started with a light post, here\'s a handful of TCS/math/logic memes.</p>\n  <div class="sp-div">\n    <a href="./posts/my-first-post.html" class="sp-link" style="text-align: center">\n      <b>Read More</b>\n    </a>\n  </div>\n</div>\n', '<div class="card">\n  <h2>Logical Duality and "Et Cetera"</h2>\n  <span style="color: dimgray"\n    ><h4><i>December 23, 2022</i></h4></span\n  >\n  <div class="post-image">\n<img src="" alt="" />\n</div>\n  <p>In the study of logic, many operators have a <i>dual</i>: AND gates have OR gates, universal quantifiers have existential quantifiers, and so on. We commonly use the term "etc." to abbreviate the Latin phrase "et cetera", which in English roughly translates to "and the like". We don\'t, however, have an abbreviation for "or the like" --- the dual to "etc.". Should we?</p>\n  <div class="sp-div">\n    <a href="./posts/logical-duality-and-et-cetera.html" class="sp-link" style="text-align: center">\n      <b>Read More</b>\n    </a>\n  </div>\n</div>\n'];

const TAGS = ["CS", "Math", "Logic", "Philosophy", "Misc."];

//document.getElementById("searchbtn").addEventListener("click", search, false);
document.getElementById("searchbox").addEventListener("keyup", search, false);
document.getElementById("show").addEventListener("click", search, false);
document.getElementById("hide").addEventListener("click", search, false);
document.getElementById("sub-cs").addEventListener("click", search, false);
document.getElementById("sub-math").addEventListener("click", search, false);
document.getElementById("sub-logic").addEventListener("click", search, false);
document.getElementById("sub-phil").addEventListener("click", search, false);
document.getElementById("sub-misc").addEventListener("click", search, false);
search();

function encodeTags(tags) {
  x = 0;
  for (i = 0; i < TAGS.length; i++) {
    if (tags.includes(TAGS[i])) {
      x |= 1 << i;
    }
  }
  return x;
}

function filterPosts(show, tags_enc, cards = false) {
  let filtered = [];

  let func = show ? (x, y) => (x & y) != 0 : (x, y) => (x & y) == 0;

  for (let i = 0; i < POSTS.length; i++) {
    if (func(encodeTags(POSTS[i]["tags"]), tags_enc)) {
      filtered.push(cards ? CARDS[i] : POSTS[i]);
    }
  }

  return filtered.reverse();
}

function search() {
  // gets radio button selections from "show" and "hide"
  let show = document.getElementById("show").checked;

  // gets checkboxes: "sub-cs", "sub-math", "sub-logic", "sub-phil", "sub-misc"
  let subcs = document.getElementById("sub-cs").checked;
  let submath = document.getElementById("sub-math").checked;
  let sublogic = document.getElementById("sub-logic").checked;
  let subphil = document.getElementById("sub-phil").checked;
  let submisc = document.getElementById("sub-misc").checked;

  let selections = [];
  if (subcs) selections.push("CS");
  if (submath) selections.push("Math");
  if (sublogic) selections.push("Logic");
  if (subphil) selections.push("Philosophy");
  if (submisc) selections.push("Misc.");

  let selections_encoding = encodeTags(selections);

  let searchtext = document.getElementById("searchbox").value;
  let filtered_cards = [];

  if (searchtext === "") {
    filtered_cards = filterPosts(show, selections_encoding, true);
  } else {
    let filtered_posts = filterPosts(show, selections_encoding);
    let filtered_post_strs = filtered_posts.map((x) =>
      JSON.stringify(x).toLowerCase()
    );

    // gets text from searchbox
    let keywords = searchtext.split(",");
    keywords = keywords.map((x) => x.trim().toLowerCase());

    let counts = [];
    for (let i = 0; i < filtered_post_strs.length; i++) {
      let count = 0;
      for (let j = 0; j < keywords.length; j++) {
        if (filtered_post_strs[i].includes(keywords[j])) {
          count++;
        }
      }
      counts.push(count);
    }

    // returns array of indices of counts in descending order
    let indices = counts
      .map((x, i) => [x, i])
      .sort((x, y) => y[0] - x[0])
      .map((x) => x[1]);

    for (let i = 0; i < indices.length; i++) {
      let index = indices[i];
      if (counts[index] == 0) break;

      let post = filtered_posts[index];

      let card_index = parseInt(post["number"]);
      let card = CARDS[card_index];
      filtered_cards.push(card);
    }
  }

  let foo = document.getElementById("results");
  if (filtered_cards.length == 0) {
    foo.innerHTML =
      '<div style="text-align: center;"><h4>No results found.</h4></div>';
  } else {
    foo.innerHTML = "";
    for (let i = 0; i < filtered_cards.length; i++) {
      foo.innerHTML = foo.innerHTML + filtered_cards[i];
    }
  }
}
