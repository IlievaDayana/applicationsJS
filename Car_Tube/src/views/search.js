import { html } from '../../node_modules/lit-html/lit-html.js'
import { getSearched } from '../api/data.js';


const searchTemplate = (search, results = [], ) => html `
<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input type="text" name="search" placeholder="Enter desired production year">
    <button class="button-list" @click=${search}>Search</button>
</div>

<h2>Results:</h2>
<div class="listings">
 ${results.length===0?html`<p class="no-cars"> No results.</p>`:results.map(resultTemplate)} 
</div>
</section>`


const resultTemplate = (c)=>html`
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

export async function searchPage(ctx) {
    ctx.render(searchTemplate(search))
    async function search(){
        const value = encodeURIComponent(document.querySelector('input[name="search"]').value);
        const result = await getSearched(value);
        ctx.render(searchTemplate(search,result))
    
    }
}