import { html } from '../../node_modules/lit-html/lit-html.js'
import { createMeme } from '../api/data.js';
import { notify } from './notification.js';


const createTemplate = (sub) => html `       
 <section id="create-meme">
<form @submit = ${sub} id="create-form">
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>`



export async function createPage(ctx) {
    ctx.render(createTemplate(sub))
    async function sub(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const title = form.get('title');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl');
        if (!title || !description || !imageUrl) {
            notify('Missing fields')
        } else {
            await createMeme({ title, description, imageUrl })
            ctx.setUserNav();
            ctx.page.redirect('/memes')
        }
    }
}