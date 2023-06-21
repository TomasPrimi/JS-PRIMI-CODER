let productos = [
    { id: 2, nombre: "Remera Strand", categoria: "Vestimenta", stock: 30, precio: 24.99 },
    { id: 3, nombre: "Muñeco Vagabundo", categoria: "Coleccionables", stock: 45, precio: 15.99 },
    { id: 4, nombre: "Peluche Exo", categoria: "Coleccionables", stock: 48, precio: 21.99 },
    { id: 5, nombre: "Muñeco Cayde-6", categoria: "Coleccionables", stock: 36, precio: 18.99 },
    { id: 6, nombre: "Peluche De Sirviente", categoria: "Coleccionables", stock: 54, precio: 19.99 },
    { id: 7, nombre: "Muñeco De Shaxx", categoria: "Coleccionables", stock: 36, precio: 19.99 },
    { id: 8, nombre: "Casco De Halcon", categoria: "Coleccionables", stock: 58, precio: 55 },
    { id: 9, nombre: "Collar De Cazador", categoria: "Coleccionables", stock: 27, precio: 9.99 },
    { id: 10, nombre: "Collar De Gjarllarhorn", categoria: "Coleccionables", stock: 39, precio: 35},
    { id: 11, nombre: "Remera De LightFall", categoria: "Vestimenta", stock: 32, precio: 30 },
    { id: 12, nombre: "Campera De Cazador", categoria: "Vestimenta", stock: 21, precio: 55 },
    { id: 13, nombre: "Estatua De Hechicero", categoria: "Coleccionables", stock: 18, precio: 49.99 },
  ]
  
  let carrito = []
  
  let mensaje = "Bienvenido a D-Shop\n1 - Lista de productos\n2 - Agregar productos al carrito\n3 - Ver carrito\n4 - Total y finalizar compra\n0 - SALIR"
  
  let opcion
  
  do {
    opcion = Number(prompt(mensaje))
    if (opcion === 1) {
      alert(listarProductos(productos))
    } else if (opcion === 2) {
      let id = Number(prompt("Seleccione el ID del producto a comprar\n" + listarProductos(productos)))
      let productoSeleccionado = obtenerProductoPorId(id)
      if (productoSeleccionado) {
        agregarAlCarrito(productoSeleccionado)
      } else {
        alert("El producto seleccionado no existe")
      }
    } else if (opcion === 3) {
      if (carrito.length > 0) {
        alert(listarProductosCarrito(carrito))
      } else {
        alert("Primero debe agregar productos al carrito")
      }
    } else if (opcion === 4) {
      if (carrito.length > 0) {
        let total = calcularTotalCarrito(carrito)
        alert("Total de la compra: $" + total)
        let confirmacion = prompt("¿Desea finalizar la compra? (SI/NO)").toUpperCase()
        if (confirmacion === "SI") {
          finalizarCompra()
        } else {
          alert("La compra ha sido cancelada")
        }
      } else {
        alert("Primero debe agregar productos al carrito")
      }
    }
  } while (opcion !== 0)
  function listarProductos(arrayAListar) {
    let listado = "ID - Nombre\n"
    arrayAListar.forEach(element => {
      listado = listado + element.id + " - " + element.nombre + "\n"
    })
    return listado
  }
  function listarProductosCarrito(arrayCarrito) {
    let listado = "ID - Nombre - Cantidad - Precio Total\n"
    arrayCarrito.forEach(element => {
      listado = listado + element.id + " - " + element.nombre + " - " + element.unidades + " - $" + (element.precioUnitario * element.unidades).toFixed(2) + "\n"
    })
    return listado
  }
  function obtenerProductoPorId(id) {
    return productos.find(prod => prod.id === id)
  }
  function agregarAlCarrito(producto) {
    let posicionProductoEnCarrito = carrito.findIndex(prod => prod.id === producto.id)
  
    if (posicionProductoEnCarrito === -1) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precioUnitario: producto.precio,
        unidades: 1,
        subtotal: producto.precio
      })
    } else {
      carrito[posicionProductoEnCarrito].unidades++
      carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].precioUnitario * carrito[posicionProductoEnCarrito].unidades
    }
    console.log(carrito)
  }
  function calcularTotalCarrito(arrayCarrito) {
    let total = 0
    arrayCarrito.forEach(producto => {
      total += producto.subtotal
    })
    return total.toFixed(2)
  }
  function finalizarCompra() {
    alert("Su compra ha sido realizada con éxito. ¡Muchas gracias!")
    carrito = []
  }