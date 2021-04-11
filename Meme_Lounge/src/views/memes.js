import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMemes } from '../api/data.js'

const memesTemplate = (m) => html `       
 <!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">

        ${m.length>0?m.map(memeTempl):html`<!-- Display : If there are no memes in database -->
        <p class="no-memes">No memes in database.</p>`}
        
    </div>
</section>`

const memeTempl = (m) =>
    html `        <!-- Display : All memes in database ( If any ) -->
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${m.title}</p>
            <img class="meme-image" alt="meme-img" src='${m.imageUrl}'>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${m._id}">Details</a>
        </div>
    </div>
</div>`

export async function memesPage(ctx) {
    const memes = await getMemes();
    ctx.render(memesTemplate(memes))
}