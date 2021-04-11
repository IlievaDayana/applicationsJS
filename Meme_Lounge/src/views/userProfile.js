import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyMemes } from '../api/data.js'

const userProfileTemplate = (myMemes, u) => html `        
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${u.gender==="female"?'/images/female.png':'/images/male.png'}>
        <div class="user-content">
            <p>Username: ${u.username}</p>
            <p>Email: ${u.email}</p>
            <p>My memes count: ${myMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${myMemes.length>0?html`${myMemes.map(meme)}`
        :html`<p class="no-memes">No memes in database.</p>`} 
    </div>
</section>`

const meme = (m)=>html`
<div class="user-meme">
    <p class="user-meme-title">${m.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${m.imageUrl}">
    <a class="button" href="/details/${m._id}">Details</a>
</div>`


export async function userPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const gender = sessionStorage.getItem('gender');
    const myMemes = await getMyMemes(userId);
    const u = {username,email,gender}
    ctx.render(userProfileTemplate(myMemes,u));
}