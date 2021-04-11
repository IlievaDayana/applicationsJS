import { html } from '../../node_modules/lit-html/lit-html.js'
import { login, myListings } from '../api/data.js'


const myListingsTemplate = (cars) => html `
<section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
               ${cars.length===0?html`<p class="no-cars"> You haven't listed any cars yet.</p>`:cars.map(listTemplate)}                
            </div>
        </section>`

const listTemplate = (i) => html`                
<div class="listing">
    <div class="preview">
        <img src="${i.imageUrl}">
    </div>
    <h2>${i.brand} ${i.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${i.year}</h3>
            <h3>Price: ${i.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${i._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`

export async function myListingsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const userListings = await myListings(userId);
    console.log(userListings,userId);
    ctx.render(myListingsTemplate(userListings));
}