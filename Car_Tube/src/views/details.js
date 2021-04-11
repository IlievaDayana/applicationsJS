import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteCar, getListingById } from '../api/data.js'


const detailsTemplate = (c, del, isOwner) => html `<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${c.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${c.brand}</li>
            <li><span>Model:</span>${c.model}</li>
            <li><span>Year:</span>${c.year}</li>
            <li><span>Price:</span>${c.price}$</li>
        </ul>

        <p class="description-para">${c.description}</p>

        ${isOwner?html`<div class="listings-buttons">
                            <a href="/edit/${c._id}" class="button-list">Edit</a>
                            <a href="javascript:void(0)" @click="${del}" class="button-list">Delete</a>
                        </div>`
        :''}
        
    </div>
</section>`



export async function detailsPage(ctx) {
    const carId = ctx.params.id;
    const car = await getListingById(carId);
    const isOwner = sessionStorage.getItem('userId')===car._ownerId;
    console.log(isOwner);
    ctx.render(detailsTemplate(car, del,isOwner));

    async function del() {
        await deleteCar(carId);
        ctx.page.redirect('/listings')
    }
}