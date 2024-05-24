let inp = document.querySelector("input");
let form = document.querySelector("form");
let searched = document.querySelector(".searched");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?limit=15&q=${inp.value}=0 `
  )
    .then((res) => res.json())
    .then((json) => {
      searched.innerHTML = "";
      json.data.forEach((o) => {
        // searched.innerHTML += `
        // <div class="item">
        //   <p>${o.artist.name} - ${o.title}</p>
        //   <button>Lyrics</button>
        // </div>
        // `;
        let div = document.createElement("div");
        div.className = "item";
        let p = document.createElement("p");
        p.innerHTML = `${o.artist.name} - ${o.title}`;
        let btn = document.createElement("button");
        btn.innerHTML = "Lyrics";
        searched.append(div);
        div.append(p);
        div.append(btn);
        btn.addEventListener("click", () => {
          fetch(`https://api.lyrics.ovh/v1/${o.artist.name}/${o.title}`)
            .then((res) => res.json())
            .then((song) => {
              const lyrics = song.lyrics.replace(/(\r\n|\n|\r)/g, "<br />");
              searched.innerHTML = `
              <div class="lyricsDiv">
                <h2>${o.artist.name} - ${o.title}</h2>
                <p>${lyrics}</p>
              </div>
              `;
              console.log(song.lyrics);
              // searched.innerHTML = `
              // // <div class="lyricsItem">
              // //   <p>${song.lyrics}</p>
              // // </div>
              // `;
            });
        });
      });
    });
});

/* 
<div class="item">
  <p>Dr. Dre - Still D.R.E.</p>
  <button>Lyrics</button>
</div>
*/

// let a = {
//   name: "Vazgen",
//   surname: "Arakelyan",
//   age: 25,
// };

// let c = 454;

// let b = JSON.stringify(a);
// console.log(b);

// let c = JSON.parse(b);
// console.log(c);

// localStorage.setItem("test", JSON.stringify(a));

// localStorage.setItem("num", c);

// let b = localStorage.getItem("test");

// console.log(JSON.parse(b));

// localStorage.clear();

// localStorage.removeItem("num");
