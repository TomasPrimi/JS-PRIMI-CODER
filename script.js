function calcularedad() {
  var edad = document.getElementById("edad").value;

  if (edad >= 18 && edad <= 100) {
    alert("¡Bienvenido!");
    window.location.href = "index.html";
  } else {
    alert("No puedes acceder a esta página :(");
  }
}

let carrito = [];
let total = 0;
const LIMITE_COMPRA = 10;
let cuotasSeleccionadas = 1;

fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const productos = data;

    const productosContainer = document.getElementById('productosContainer');

    productos.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('div-mercancia');

      const imagen = document.createElement('img');
      imagen.classList.add('img-destacado');
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;
      productoDiv.appendChild(imagen);

      const nombreProducto = document.createElement('p');
      nombreProducto.classList.add('producto');
      nombreProducto.textContent = producto.nombre;
      productoDiv.appendChild(nombreProducto);

      const precioProducto = document.createElement('p');
      precioProducto.classList.add('precio');
      precioProducto.textContent = `$${producto.precio.toFixed(2)}`;
      productoDiv.appendChild(precioProducto);

      const botonAgregar = document.createElement('button');
      botonAgregar.classList.add('btn-add-cart');
      botonAgregar.textContent = '+ Agregar al carrito';
      botonAgregar.addEventListener('click', () => {
        agregarAlCarrito(producto.nombre, producto.precio);
        mostrarProductos();
      });
      productoDiv.appendChild(botonAgregar);

      productosContainer.appendChild(productoDiv);
    });
  })
  .catch(error => console.error('Error al cargar los datos del archivo JSON:', error));

function agregarAlCarrito(nombre, precio) {
  let productoExistente = carrito.find(producto => producto.nombre === nombre);

  if (productoExistente) {
    if (productoExistente.cantidad < LIMITE_COMPRA) {
      productoExistente.cantidad++;
    } else {
      alert("Has alcanzado el límite de compra por producto");
      return;
    }
  } else {
    const nuevoProducto = {
      nombre: nombre,
      precio: precio,
      cantidad: 1
    };
    carrito.push(nuevoProducto);
  }

  total += precio;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;

  mostrarProductos();
  alert(`Su producto "${nombre}" fue añadido satisfactoriamente al carrito.`);
}

function eliminarDelCarrito(nombre) {
  let productoIndex = carrito.findIndex(producto => producto.nombre === nombre);

  if (productoIndex !== -1) {
    const producto = carrito[productoIndex];
    total -= producto.precio * producto.cantidad;
    carrito.splice(productoIndex, 1);
  }

  document.getElementById('total').textContent = `$${total.toFixed(2)}`;

  mostrarProductos();
}

function cambiarCantidad(nombre, nuevaCantidad) {
  let productoExistente = carrito.find(producto => producto.nombre === nombre);

  if (productoExistente) {
    if (nuevaCantidad < 1 || nuevaCantidad > LIMITE_COMPRA) {
      alert("La cantidad debe estar entre 1 y 10");
      return;
    }

    total -= productoExistente.precio * productoExistente.cantidad;
    productoExistente.cantidad = nuevaCantidad;

    total += productoExistente.precio * productoExistente.cantidad;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    mostrarProductos();
  }
}

function mostrarProductos() {
  const productosDiv = document.getElementById('product');
  productosDiv.innerHTML = '';

  let i = 0;
  while (i < carrito.length) {
    const producto = carrito[i];
    const productoDiv = document.createElement('div');
    productoDiv.innerHTML =
      `<p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
        <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
        <button onclick="cambiarCantidad('${producto.nombre}', ${producto.cantidad - 1})">-</button>
        <button onclick="cambiarCantidad('${producto.nombre}', ${producto.cantidad + 1})">+</button>`
      ;
    productosDiv.appendChild(productoDiv);
    i++;
  }
}

function actualizarMonto() {
  const cuotas = document.getElementById('cuotas').value;
  cuotasSeleccionadas = parseInt(cuotas);
  let monto = total;

  if (cuotasSeleccionadas === 1) {
    document.getElementById('interes').textContent = 'Sin intereses';
  } else if (cuotasSeleccionadas === 3) {
    const interes = monto * 0.05;
    monto += interes;
    document.getElementById('interes').textContent = `Intereses: $${interes.toFixed(2)}`;
  } else if (cuotasSeleccionadas === 6) {
    const interes = monto * 0.1;
    monto += interes;
    document.getElementById('interes').textContent = `Intereses: $${interes.toFixed(2)}`;
  } else if (cuotasSeleccionadas === 12) {
    const interes = monto * 0.2;
    monto += interes;
    document.getElementById('interes').textContent = `Intereses: $${interes.toFixed(2)}`;
  } else if (cuotasSeleccionadas === 18) {
    const interes = monto * 0.5;
    monto += interes;
    document.getElementById('interes').textContent = `Intereses: $${interes.toFixed(2)}`;
  }

  document.getElementById('total').textContent = `$${monto.toFixed(2)}`;
}

function realizarPago() {
  if (carrito.length > 0) {
    let mensaje = `Pago realizado. Gracias por tu compra!\n`;

    let montoCuota = total;
    let totalIntereses = 0;

    if (cuotasSeleccionadas === 1) {
      mensaje += 'Pago en 1 cuota (sin intereses)\n';
    } else if (cuotasSeleccionadas === 3) {
      const interes = total * 0.05;
      totalIntereses = interes;
      montoCuota = (total + interes) / cuotasSeleccionadas;
      mensaje += `Pago en ${cuotasSeleccionadas} cuotas con 5% de interes: $${montoCuota.toFixed(2)} por cuota\n`;
    } else if (cuotasSeleccionadas === 6) {
      const interes = total * 0.1;
      totalIntereses = interes;
      montoCuota = (total + interes) / cuotasSeleccionadas;
      mensaje += `Pago en ${cuotasSeleccionadas} cuotas con 10% de interes: $${montoCuota.toFixed(2)} por cuota\n`;
    } else if (cuotasSeleccionadas === 12) {
      const interes = total * 0.2;
      totalIntereses = interes;
      montoCuota = (total + interes) / cuotasSeleccionadas;
      mensaje += `Pago en ${cuotasSeleccionadas} cuotas con 20% de interes: $${montoCuota.toFixed(2)} por cuota\n`;
    } else if (cuotasSeleccionadas === 18) {
      const interes = total * 0.5;
      totalIntereses = interes;
      montoCuota = (total + interes) / cuotasSeleccionadas;
      mensaje += `Pago en ${cuotasSeleccionadas} cuotas con 50% de interes: $${montoCuota.toFixed(2)} por cuota\n`;
    }
    mensaje += `Intereses Agregados: $${totalIntereses.toFixed(2)}\nMonto total: $${(total + totalIntereses).toFixed(2)}`;

    const productContainer = document.getElementById('product');
    while (productContainer.firstChild) {
      productContainer.removeChild(productContainer.firstChild);
    }

    alert(mensaje);
    carrito.length = 0;
    total = 0;
    document.getElementById('total').textContent = '$0';
    document.getElementById('interes').textContent = '';
    mostrarProductos();
  } else {
    alert('No hay productos en el carrito.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cuotasSelect = document.getElementById('cuotas');
  cuotasSelect.addEventListener('change', actualizarMonto);

  document.getElementById('btnPagar').addEventListener('click', realizarPago);
});
