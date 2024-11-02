const API_URL = '/api/products';

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const productForm = document.getElementById('product-form');
    productForm.addEventListener('submit', saveProduct);
});

// Función para cargar todos los productos
async function loadProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price} - Cantidad: ${product.quantity}`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editProduct(product);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteProduct(product._id);

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        productList.appendChild(li);
    });
}

// Función para guardar o actualizar un producto
async function saveProduct(event) {
    event.preventDefault();

    const productId = document.getElementById('product-id').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productQuantity = document.getElementById('product-quantity').value; // Captura el valor de cantidad

    const productData = {
        name: productName,
        price: productPrice,
        quantity: productQuantity // Asegúrate de incluir cantidad al objeto de datos
    };

    if (productId) {
        // Actualizar producto
        await fetch(`${API_URL}/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    } else {
        // Crear producto
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    }

    // Limpiar formulario y recargar productos
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = ''; // Limpiar campo de cantidad
    loadProducts();
}

// Función para editar un producto
function editProduct(product) {
    document.getElementById('product-id').value = product._id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-quantity').value = product.quantity; // Asegúrate de llenar el campo de cantidad
}

// Función para eliminar un producto
async function deleteProduct(productId) {
    await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE'
    });
    loadProducts();
}
