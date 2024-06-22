function getFecha() {
  let date_ini = document.getElementById('date_ini');
  let date_fin = document.getElementById('date_fin');
  let fechaInicial = calcFecha(date_ini, 'inicial');
  let fechaFinal = calcFecha(date_fin);

  const url = `/mp/search-narrow?begin_date=${fechaInicial}&end_date=${fechaFinal}`;
  window.location.href = url;
  return false;
}

function calcFecha(date, txt = '') {
  let fechaSeleccionada = new Date(date.value);
  let fecha = setFecha(fechaSeleccionada, txt);
  let fechaISO = fecha.toISOString();
  let timezoneString = '-04:00';
  let fechaFormateada = fechaISO.slice(0, -1) + timezoneString;

  return fechaFormateada;
}

function setFecha(fecha, txt) {
  let milisegundos = fecha.getTime();
  let dia,
    hora,
    minutos,
    segundos = 0;
  let nuevaFecha;
  dia = 24 * 60 * 60 * 1000;
  hora = 23 * 60 * 60 * 1000;
  minutos = 59 * 60 * 1000;
  segundos = 59 * 1000;
  if (txt == 'inicial') {
    nuevaFecha = new Date(milisegundos + hora + minutos + segundos);
  } else {
    nuevaFecha = new Date(milisegundos + dia + hora + minutos + segundos);
  }

  return nuevaFecha;
}
