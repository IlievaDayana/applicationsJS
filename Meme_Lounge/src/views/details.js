import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteMeme, getMemeById } from '../api/data.js';



const detailsTemplate = (m, isOwner, delMeme) => html `        
<section id="meme-details">
<h1>Meme Title: ${m.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src="${m.imageUrl}">
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
           ${m.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner?html`<a class="button warning" href="/edit/${m._id}">Edit</a>
        <button @click=${delMeme} class="button danger">Delete</button>`:''}
    </div>
</div>
</section>`



export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const meme = await getMemeById(memeId)
    ctx.render(detailsTemplate(meme, userId === meme._ownerId,delMeme));

    async function delMeme(){
        await deleteMeme(memeId);
        ctx.page.redirect('/memes')
    }
}