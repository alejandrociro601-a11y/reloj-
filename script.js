// Límites reales de cada unidad de tiempo
const LIMITES = {
  hora: { min: 0, max: 23 },
  minSeg: { min: 0, max: 59 }
};

// Ids de los campos de horas y de minutos/segundos
const camposHora = ['hora1', 'hora2'];
const camposMinSeg = ['min1', 'seg1', 'min2', 'seg2'];

// Fuerza que un input numérico no salga de su rango permitido
function limitarCampo(id, limite) {
  const input = document.getElementById(id);

  const corregir = () => {
    if (input.value === '') return; // deja escribir vacío mientras el usuario teclea
    let valor = parseInt(input.value, 10);
    if (isNaN(valor)) valor = 0;
    if (valor < limite.min) valor = limite.min;
    if (valor > limite.max) valor = limite.max;
    input.value = valor;
  };

  input.addEventListener('input', corregir);
  input.addEventListener('blur', () => {
    if (input.value === '') input.value = 0; // no dejar el campo vacío al salir
    corregir();
  });
}

camposHora.forEach((id) => limitarCampo(id, LIMITES.hora));
camposMinSeg.forEach((id) => limitarCampo(id, LIMITES.minSeg));

// Lee un campo ya validado, con 0 como respaldo
function leer(id) {
  const valor = parseInt(document.getElementById(id).value, 10);
  return isNaN(valor) ? 0 : valor;
}

// Convierte segundos totales a "hh:mm:ss"
function formatear(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
}

document.getElementById('btnSumar').addEventListener('click', () => {
  const totalSegundos1 = leer('hora1') * 3600 + leer('min1') * 60 + leer('seg1');
  const totalSegundos2 = leer('hora2') * 3600 + leer('min2') * 60 + leer('seg2');

  const suma = totalSegundos1 + totalSegundos2;
  const diferencia = Math.abs(totalSegundos2 - totalSegundos1);

  document.getElementById('valorResultado').textContent = formatear(suma);
  document.getElementById('valorDiferencia').textContent = formatear(diferencia);
});
