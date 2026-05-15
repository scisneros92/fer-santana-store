// MENU MOBILE

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});


// AOS

AOS.init({
  duration: 1000,
  once: true
});


// PRODUCTOS DEMO

const productos = [

  {
    nombre: "Leggings Pro",
    precio: "$899 MXN",
    imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
  },

  {
    nombre: "Top Fitness",
    precio: "$699 MXN",
    imagen: "https://images.unsplash.com/photo-1506629905607-d9c297d0fbc9?q=80&w=1200&auto=format&fit=crop"
  },

  {
    nombre: "Sport Outfit",
    precio: "$1,299 MXN",
    imagen: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
  }

];


// NAVBAR SCROLL

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {

    nav.classList.add("nav-scroll");

  } else {

    nav.classList.remove("nav-scroll");

  }

});


// LOADER

window.addEventListener("load", () => {

  const loader = document.querySelector(".loader");

  loader.style.opacity = "0";

  setTimeout(() => {

    loader.style.display = "none";

  }, 800);

});


// DARK MODE

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {

    darkBtn.innerHTML = "☀️";

  } else {

    darkBtn.innerHTML = "🌙";

  }

});


// SUPABASE

const SUPABASE_URL =
  "https://rptnbxyerjcwzxflijpm.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_6ik7MsO_dx2Jua_lZH5lPg_yl3r4pt_";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// CARGAR PRODUCTOS

async function cargarProductos() {

  const { data, error } = await supabaseClient
    .from("productos")
    .select("*")
    .eq("activo", true);

  if (error) {
    console.error(error);
    return;
  }

  const contenedor =
    document.getElementById("contenedor-productos");

  contenedor.innerHTML = "";

  data.forEach((producto, index) => {

    const precio =
      producto.en_oferta && producto.precio_oferta
        ? producto.precio_oferta
        : producto.costo;

    const imagenes =
      producto.imagenes?.length
        ? producto.imagenes
        : ["https://via.placeholder.com/300x400?text=Sin+Imagen"];

 const imagenesHTML = imagenes.map((img, i) => `

  <img
    src="${img}"
    class="product-slide ${i === 0 ? 'activo' : ''}"
    onclick="abrirImagen(this.src)"
  >

`).join("");

    contenedor.innerHTML += `

    <div class="product-card">

        <div class="slider" id="slider-ropa-${index}">

          ${imagenesHTML}

          ${
            imagenes.length > 1
            ? `
              <button class="prev"
                onclick="moverSlide('ropa', ${index}, -1)">
                ❮
              </button>

              <button class="next"
                onclick="moverSlide('ropa', ${index}, 1)">
                ❯
              </button>
            `
            : ""
          }

        </div>

        <div class="card-content">

          <h3>${producto.nombre}</h3>

          <p>
            ${producto.descripcion || "Sin descripción"}
          </p>

          <span>$${precio} MXN</span>

        </div>

      </div>

    `;

  });

}

async function cargarSuplementos() {

  const { data, error } = await supabaseClient
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("categoria_id", 3);
    console.log(data);
    console.log(error);

  if (error) {
    console.error(error);
    return;
  }

  const contenedor =
    document.getElementById("contenedor-suplementos");

  contenedor.innerHTML = "";

  data.forEach((producto, index) => {

    const precio =
      producto.en_oferta && producto.precio_oferta
        ? producto.precio_oferta
        : producto.costo;

    const imagenes =
      producto.imagenes?.length
        ? producto.imagenes
        : ["https://via.placeholder.com/300x400?text=Sin+Imagen"];

    const imagenesHTML = imagenes.map((img, i) => `

      <img
        src="${img}"
        class="product-slide ${i === 0 ? 'activo' : ''}"
        onclick="abrirImagen(this.src)"
      >

    `).join("");

    contenedor.innerHTML += `

      <div class="product-card">

        <div class="slider" id="slider-suplementos-${index}">

          ${imagenesHTML}

          ${
            imagenes.length > 1
            ? `
              <button
                class="prev"
                onclick="moverSlide('suplementos', ${index}, -1)">
                ❮
              </button>

              <button
                class="next"
                onclick="moverSlide('suplementos', ${index}, 1)">
                ❯
              </button>
            `
            : ""
          }

        </div>

        <div class="card-content">

          <h3>${producto.nombre}</h3>

          <p>
            ${producto.descripcion || "Sin descripción"}
          </p>

          <span>$${precio} MXN</span>

        </div>

      </div>

    `;

  });

}
async function cargarMaquillaje() {

  const { data, error } = await supabaseClient
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("categoria_id", 2);

  console.log(data);
  console.log(error);

  if (error) {
    console.error(error);
    return;
  }

  const contenedor =
    document.getElementById("contenedor-maquillaje");

  contenedor.innerHTML = "";

  data.forEach((producto, index) => {

    const precio =
      producto.en_oferta && producto.precio_oferta
        ? producto.precio_oferta
        : producto.costo;

    const imagenes =
      producto.imagenes?.length
        ? producto.imagenes
        : ["https://via.placeholder.com/300x400?text=Sin+Imagen"];

    const imagenesHTML = imagenes.map((img, i) => `

      <img
        src="${img}"
        class="product-slide ${i === 0 ? 'activo' : ''}"
        onclick="abrirImagen(this.src)"
      >

    `).join("");

    contenedor.innerHTML += `

      <div class="product-card">

        <div class="slider" id="slider-maquillaje-${index}">

          ${imagenesHTML}

          ${
            imagenes.length > 1
            ? `
              <button
                class="prev"
                onclick="moverSlide('maquillaje', ${index}, -1)">
                ❮
              </button>

              <button
                class="next"
                onclick="moverSlide('maquillaje', ${index}, 1)">
                ❯
              </button>
            `
            : ""
          }

        </div>

        <div class="card-content">

          <h3>${producto.nombre}</h3>

          <p>
            ${producto.descripcion || "Sin descripción"}
          </p>

          <span>$${precio} MXN</span>

        </div>

      </div>

    `;

  });

}
async function cargarAccesorios() {

  const { data, error } = await supabaseClient
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("categoria_id", 4);

  console.log(data);
  console.log(error);

  if (error) {
    console.error(error);
    return;
  }

  const contenedor =
    document.getElementById("contenedor-accesorios");

  contenedor.innerHTML = "";

  data.forEach((producto, index) => {

    const precio =
      producto.en_oferta && producto.precio_oferta
        ? producto.precio_oferta
        : producto.costo;

    const imagenes =
      producto.imagenes?.length
        ? producto.imagenes
        : ["https://via.placeholder.com/300x400?text=Sin+Imagen"];

    const imagenesHTML = imagenes.map((img, i) => `

      <img
        src="${img}"
        class="product-slide ${i === 0 ? 'activo' : ''}"
        onclick="abrirImagen(this.src)"
      >

    `).join("");

    contenedor.innerHTML += `

      <div class="product-card">

        <div class="slider" id="slider-accesorios-${index}">

          ${imagenesHTML}

          ${
            imagenes.length > 1
            ? `
              <button
                class="prev"
                onclick="moverSlide('accesorios', ${index}, -1)">
                ❮
              </button>

              <button
                class="next"
                onclick="moverSlide('accesorios', ${index}, 1)">
                ❯
              </button>
            `
            : ""
          }

        </div>

        <div class="card-content">

          <h3>${producto.nombre}</h3>

          <p>
            ${producto.descripcion || "Sin descripción"}
          </p>

          <span>$${precio} MXN</span>

        </div>

      </div>

    `;

  });

}
async function cargarOfertas() {

  const { data, error } = await supabaseClient
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("en_oferta", true);

  if (error) {
    console.error(error);
    return;
  }

  const contenedor =
    document.getElementById("contenedor-ofertas");

  contenedor.innerHTML = "";

  data.forEach((producto, index) => {

    const precio =
      producto.precio_oferta || producto.costo;

    const imagenes =
      producto.imagenes?.length
        ? producto.imagenes
        : ["https://via.placeholder.com/300x400?text=Sin+Imagen"];

    const imagenesHTML = imagenes.map((img, i) => `

      <img
        src="${img}"
        class="product-slide ${i === 0 ? 'activo' : ''}"
        onclick="abrirImagen(this.src)"
      >

    `).join("");

    contenedor.innerHTML += `

      <div class="product-card">

        <div class="slider" id="slider-ofertas-${index}">

          ${imagenesHTML}

          ${
            imagenes.length > 1
            ? `
              <button
                class="prev"
                onclick="moverSlide('ofertas', ${index}, -1)">
                ❮
              </button>

              <button
                class="next"
                onclick="moverSlide('ofertas', ${index}, 1)">
                ❯
              </button>
            `
            : ""
          }

        </div>

        <div class="card-content">

          <h3>${producto.nombre}</h3>

          <p>${producto.descripcion || "Sin descripción"}</p>

          <span>$${precio} MXN</span>

        </div>

      </div>

    `;

  });

}

// SLIDER

 function moverSlide(tipo, index, direccion) {

  const slider =
    document.getElementById(`slider-${tipo}-${index}`);

  if (!slider) return;

  const slides =
    slider.querySelectorAll(".product-slide");

  let actual = 0;

  slides.forEach((slide, i) => {

    if (slide.classList.contains("activo")) {
      actual = i;
    }

  });

  slides[actual].classList.remove("activo");

  actual += direccion;

  if (actual >= slides.length) {
    actual = 0;
  }

  if (actual < 0) {
    actual = slides.length - 1;
  }

  slides[actual].classList.add("activo");
}

 // =========================
// MODAL IMAGEN
// =========================

const modal =
  document.getElementById("imageModal");

const modalImg =
  document.getElementById("modalImg");

const closeModal =
  document.getElementById("closeModal");

function abrirImagen(img) {

  modal.classList.add("active");

  modalImg.src = img;

}

closeModal.addEventListener("click", () => {

  modal.classList.remove("active");

});

modal.addEventListener("click", (e) => {

  if (e.target === modal) {

    modal.classList.remove("active");

  }

});
const swiper = new Swiper(".mySwiper", {

  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});
// INICIAR

cargarProductos();
cargarSuplementos();
cargarMaquillaje();
cargarAccesorios();
cargarOfertas();