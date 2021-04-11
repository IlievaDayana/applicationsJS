import { html } from '../../node_modules/lit-html/lit-html.js'
import { createCar } from '../api/data.js';



const createTemplate = (sub) => html `
<section id="create-listing">
    <div class="container">
        <form @submit="${sub}" id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`



export async function createPage(ctx) {
    ctx.render(createTemplate(sub))
    async function sub(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const year = form.get('year');
        const price = form.get('price');
        const description = form.get('description');
        const brand = form.get('brand');
        const model = form.get('model');
        const imageUrl = form.get('imageUrl');

        if (!form || !year || !price || !description || !brand || !model) {
            throw new Error('All fields are required!')
        } else if (isNaN(year) || isNaN(price) || Number(price) < 0 || Number(year) < 0) {
            throw new Error('Numbers are required!')
        } else {
            await createCar({
                brand,
                model,
                description,
                year: Number(year),
                imageUrl,
                price: Number(price)
            })
            ctx.page.redirect('/listings');
        }


    }
}