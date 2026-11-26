let calificacion = 3;
const estrellas = document.querySelectorAll('#estrellas span');

// Reseñas que ya vienen de ejemplo
let reseñas = JSON.parse(localStorage.getItem('reseñasGrinch')) || [
  {nombre:"María López", estrellas:5, texto:"¡Hermosa escuela! Mi hijo ama el festival navideño y los maestros son muy amables.", fecha:"20 Nov 2026"},
  {nombre:"Carlos Méndez", estrellas:4, texto:"Muy buena escuela, patio grande y salones limpios. La decoración del Grinch está padrísima.", fecha:"22 Nov 2026"},
  {nombre:"Sofía Ramírez", estrellas:5, texto:"La mejor primaria, siempre hacen actividades bonitas para los niños.", fecha:"25 Nov 2026"}
];

function pintar(){
  estrellas.forEach(e => {
    e.classList.toggle('activa', e.dataset.valor <= calificacion);
  });
  document.getElementById('textoEstrella').textContent = `(${calificacion} de 5 estrellas)`;
}
estrellas.forEach(e => {
  e.onclick = () => { calificacion = e.dataset.valor; pintar(); }
});
pintar();

function mostrarReseñas(){
  const cont = document.getElementById('listaResenas');
  cont.innerHTML = '';
  let suma = 0;
  reseñas.forEach(r => {
    suma += r.estrellas;
    cont.innerHTML += `
      <div class="resena-card">
        <b>👤 ${r.nombre}</b> <span class="stars">${'★'.repeat(r.estrellas)}${'☆'.repeat(5-r.estrellas)}</span> <small>• ${r.fecha}</small>
        <p>${r.texto}</p>
      </div>`;
  });
  document.getElementById('promedio').textContent = (suma / reseñas.length).toFixed(1);
  document.getElementById('totalResenas').textContent = reseñas.length;
}

function enviar(){
  const nombre = document.getElementById('nombre').value.trim();
  const resena = document.getElementById('resena').value.trim();
  if(!nombre || !resena){
    document.getElementById('mensaje').textContent = '¡Oye! Te faltó poner tu nombre y tu reseña 💚';
    return;
  }
  const hoy = new Date().toLocaleDateString('es-MX', {day:'numeric', month:'short', year:'numeric'});
  reseñas.unshift({nombre, estrellas: calificacion, texto: resena, fecha: hoy});
  localStorage.setItem('reseñasGrinch', JSON.stringify(reseñas));
  mostrarReseñas();
  document.getElementById('mensaje').textContent = `¡Gracias ${nombre}! Tu reseña de ${calificacion} estrellas ya se publicó 🎄`;
  document.getElementById('nombre').value = '';
  document.getElementById('resena').value = '';
  document.getElementById('correo').value = '';
}

function abrirFoto(src){
  document.getElementById('fotoGrande').src = src;
  document.getElementById('visor').style.display = 'flex';
}
function cerrarFoto(){
  document.getElementById('visor').style.display = 'none';
}

mostrarReseñas();