import "./style.css";
import couch from "./assets/simpsons-couch.jpg";
import homer from "./assets/homer.avif";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.classList.add("hero", "min-h-screen");
app.style.backgroundImage = `url(${couch})`;

app.innerHTML = `
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-white text-center">
      <div class="max-w-md">
        <div class="avatar">
          <div class="w-24 rounded">
            <img src="${homer}" />
          </div>
        </div>
        <h1 class="mb-5 text-5xl font-bold">Benjamin's Couch</h1>
        <p class="mb-5">It's such a nice place!</p>
        <div class="join">
          <a class="join-item btn" href="/minesweeper/">Minesweeper</a>
          <a class="join-item btn" href="/generals/">Generals</a>
        </div>
        <a
          class="btn glass"
          href="https://www.google.com/search?q=do+a+barrel+roll"
          >I'm Feeling Lucky</a
        >
      </div>
    </div>
`;
