function getFecha() {
  let date_ini = document.getElementById('date_ini');
  let date_fin = document.getElementById('date_fin');
  let filterDate = document.getElementById('date_money');
  let orderApproved = document.getElementById('date_approved');

  if (!date_ini.value || !date_fin.value)
    return alert('Debe elegir ambas fechas!');
  let begin_date = calcFecha(date_ini);
  let end_date = calcFecha(date_fin, 'final');
  let filter;
  let filterOrder;

  if (filterDate.checked) {
    filter = 'true';
  } else {
    filter = 'false';
  }

  if (orderApproved.checked) {
    filterOrder = 'true';
  } else {
    filterOrder = 'false';
  }

  const url = `/mp/search-narrow?begin_date=${begin_date}&end_date=${end_date}&orderDateMoney=${filter}&orderOnlyApproved=${filterOrder}`;
  window.location.href = url;
  return false;
}

function getFechaOld() {
  let filterDate = document.getElementById('date_money');
  let orderApproved = document.getElementById('date_approved');
  if (!date_ini.value || !date_fin.value)
    return alert('Debe elegir ambas fechas!');
  let begin_date = calcFecha(date_ini);
  let end_date = calcFecha(date_fin, 'final');
  let filter;
  let filterOrder;

  if (filterDate.checked) {
    filter = 'true';
  } else {
    filter = 'false';
  }

  if (orderApproved.checked) {
    filterOrder = 'true';
  } else {
    filterOrder = 'false';
  }

  const url = `/mp/old-narrow?begin_date=${begin_date}&end_date=${end_date}&orderDateMoney=${filter}&orderOnlyApproved=${filterOrder}`;
  window.location.href = url;
  return false;
}

function calcFecha(date, txt = '') {
  let fechaSeleccionada = new Date(date.value);
  let fecha;
  if (txt === 'final') {
    fecha = setFecha(fechaSeleccionada);
  } else {
    fecha = fechaSeleccionada;
  }
  let fechaISO = fecha.toISOString();
  let timezoneString = '-03:00';
  let fechaFormateada = fechaISO.slice(0, -1) + timezoneString;

  return fechaFormateada;
}

function setFecha(fecha) {
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

  nuevaFecha = new Date(milisegundos + hora + minutos + segundos);
  return nuevaFecha;
}
