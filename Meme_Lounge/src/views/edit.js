import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMemeById, editMeme } from '../api/data.js'
import { notify } from './notification.js';


const editTemplate = (m, sub) => html `
<section id="edit-meme">
    <form @submit=${sub} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value='${m.title}'>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" >${m.description}</textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value='${m.imageUrl}'>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`



export async function editPage(ctx) {

    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId)
    ctx.render(editTemplate(meme, sub))

    async function sub(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const title = form.get('title');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl');
        console.log(title, description, imageUrl);
        if (!title || !description || !imageUrl) {
            notify("Missing fields")
        } else {
            await editMeme({ title, description, imageUrl }, memeId)
            ctx.setUserNav();
            ctx.page.redirect(`/details/${memeId}`)
        }
    }

}