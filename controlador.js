function calcularedad() {
    var edad = document.getElementById("edad").value;
  
    if (edad >= 18 && edad <= 100) {
      alert("¡Bienvenido!");
      window.location.href = "index.html";
    } else {
      alert("No puedes acceder a esta pagina :(");
    }
}
let carrito = [];
let total = 0;
const LIMITE_COMPRA = 10;
let cuotasSeleccionadas = 1;

function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(producto => producto.nombre === nombre);
  
    if (productoExistente) {
      if (productoExistente.cantidad < 10) {
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
    if (nuevaCantidad < 1 || nuevaCantidad > 10) {
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

      function obtenerInteres(cuotas) {
        let interes = 0;
        switch (cuotas) {
          case 1:
            interes = 0;
            break;
          case 3:
            interes = 0.05;
            break;
          case 6:
            interes = 0.1;
            break;
          case 12:
            interes = 0.2;
            break;
          case 18:
            interes = 0.5;
            break;
          default:
            interes = 0;
        }
        return interes;
      }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const btnAgregar = document.querySelectorAll('.btn-add-cart');
        const btnPagar = document.getElementById('btnPagar');
        btnAgregar.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const producto = document.querySelectorAll('.producto')[index];
                const nombre = producto.querySelector('p.producto').textContent;
                const precio = parseFloat(producto.querySelector('p.precio').textContent.slice(1));
                agregarAlCarrito(nombre, precio);
                mostrarProductos();
            });
        });
        const cuotasSelect = document.getElementById('cuotas');
        cuotasSelect.addEventListener('change', actualizarMonto);
        
  btnPagar.addEventListener('click', realizarPago);
  });