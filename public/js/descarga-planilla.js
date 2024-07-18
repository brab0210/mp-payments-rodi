function getExcelApertura() {
  let date_ini = document.getElementById('date_ini');
  let date_fin = document.getElementById('date_fin');
  let orderApproved = document.getElementById('date_approved');

  let begin_date = calcFecha(date_ini);
  let end_date = calcFecha(date_fin, 'final');

  let filterOrder;

  if (orderApproved.checked) {
    filterOrder = 'true';
  } else {
    filterOrder = 'false';
  }
  const url = `/mp/download?begin_date=${begin_date}&end_date=${end_date}&orderDate=${selectedValue.value}&orderOnlyApproved=${filterOrder}`;
  window.location.href = url;
  return false;
}
function getExcelReducida() {
  let date_ini = document.getElementById('date_ini');
  let date_fin = document.getElementById('date_fin');
  let orderApproved = document.getElementById('date_approved');

  let begin_date = calcFecha(date_ini);
  let end_date = calcFecha(date_fin, 'final');

  let filterOrder;

  if (orderApproved.checked) {
    filterOrder = 'true';
  } else {
    filterOrder = 'false';
  }
  const url = `/mp/downloadredu?begin_date=${begin_date}&end_date=${end_date}&orderDate=${selectedValue.value}&orderOnlyApproved=${filterOrder}`;
  window.location.href = url;
  return false;
}

async function getExcelExtracto() {
  let data;
  if (dateApprovedCheckbox.checked) {
    data = dataReducidaParse.results.filter((e) => e.date_approved != null);
  } else {
    data = dataReducidaParse.results.map((e) => e);
  }
  let testBody = { data, params };
  try {
    const response = await fetch(`${window.location.origin}/mp/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testBody),
    });

    if (response.ok) {
      const disposition = response.headers.get('Content-Disposition');
      const fileName = disposition.split('filename=')[1].replace(/['"]/g, '');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error al generar el archivo');
    }
  } catch (error) {
    console.error('Error en la solicitud de generación del archivo:', error);
  }
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
