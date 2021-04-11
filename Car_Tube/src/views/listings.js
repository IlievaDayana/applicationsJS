import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllListings, getCollectionSize } from '../api/data.js'


const listingsTemplate = (data, page, pages) => html `
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings" >  
    <div>
    <div>${page}/${pages}</div>
     ${page>1?html`<a href="/listings?page=${page-1}">Prev</a>`:''}
      ${page<pages && pages > 1 ?html` <a href="/listings?page=${page+1}">Next</a>`:''}

  
    </div> 
        ${data.length===0?html`<p class="no-cars">No cars in database.</p>`:data.map(singleTemplate)}    
    </div>
</section>`


const singleTemplate = (c) => html `
<div class="listing">
    <div class="preview">
        <img src="${c.imageUrl}">
    </div>
    <h2>${c.brand} ${c.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${c.year}</h3>
            <h3>Price: ${c.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${c._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`



export async function listingsPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;
    console.log(page);
    const c = await getCollectionSize();
    const pages= Math.ceil(c/3);
    const cars = await getAllListings(page);
    ctx.render(listingsTemplate(cars,page,pages));
}