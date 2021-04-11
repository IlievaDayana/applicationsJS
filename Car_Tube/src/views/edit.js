import { html } from '../../node_modules/lit-html/lit-html.js'
import { editCar, getListingById } from '../api/data.js'


const editTemplate = (car, sub) => html `
<section id="edit-listing">
<div class="container">

    <form @submit=${sub} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value="${car.brand}">

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value="${car.model}">

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value="${car.description}">

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value="${car.year}">

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${car.imageUrl}">

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value="${car.price}">

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>`



export async function editPage(ctx) {
    const carId = ctx.params.id;
    const car = await getListingById(carId);
    ctx.render(editTemplate(car, sub));
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
            await editCar({
                brand,
                model,
                description,
                year: year,
                imageUrl,
                price: price
            }, carId)
            ctx.page.redirect(`/details/${carId}`)
        }

    }
}