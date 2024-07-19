async function getExcelApertura() {
  let data;
  if (selectedValue.value == 'date_last_updated') {
    data = dataAperturaParse.resultados.filter(
      (e) => e.transaction_amount_refunded > 0,
    );
  }
  if (
    dateApprovedCheckbox.checked &&
    selectedValue.value != 'date_last_updated'
  ) {
    data = dataAperturaParse.resultados.filter((e) => e.date_approved != null);
  }

  if (selectedValue.value == 'date_created' && !dateApprovedCheckbox.checked) {
    data = dataAperturaParse.resultados.map((e) => e);
  }

  let testBody = { data, params };
  try {
    const response = await fetch(
      `${window.location.origin}/mp/downloadapertura`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testBody),
      },
    );

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
async function getExcelReducida() {
  let data;
  if (selectedValue.value == 'date_last_updated') {
    data = dataReducidaParse.results.filter(
      (e) => e.transaction_amount_refunded > 0,
    );
  }
  if (
    dateApprovedCheckbox.checked &&
    selectedValue.value != 'date_last_updated'
  ) {
    data = dataReducidaParse.results.filter((e) => e.date_approved != null);
  }

  if (selectedValue.value == 'date_created' && !dateApprovedCheckbox.checked) {
    data = dataReducidaParse.results.map((e) => e);
  }
  let testBody = { data, params };
  try {
    const response = await fetch(
      `${window.location.origin}/mp/downloadreducida`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testBody),
      },
    );

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

async function getExcelExtracto() {
  let data;
  if (selectedValue.value == 'date_last_updated') {
    data = dataAperturaParse.resultados.filter(
      (e) => e.transaction_amount_refunded > 0,
    );
  }
  if (
    dateApprovedCheckbox.checked &&
    selectedValue.value != 'date_last_updated'
  ) {
    data = dataAperturaParse.resultados.filter((e) => e.date_approved != null);
  }

  if (selectedValue.value == 'date_created' && !dateApprovedCheckbox.checked) {
    data = dataAperturaParse.resultados.map((e) => e);
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
