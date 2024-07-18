let gridApertura = new gridjs.Grid({
  search: {
    enabled: true,
    debounceTimeout: 5000,
  },
  sort: true,
  autoWidth: true,
  resizable: true,
  fixedHeader: true,
  pagination: {
    limit: 50,
  },
  language: {
    search: {
      placeholder: '🔍 Búsqueda...',
    },
  },
  style: {
    table: {
      width: '100%',
    },
    th: {
      'background-color': '#008ad6',
      color: '#fff',
      'text-align': 'center',
      // border: '1px solid #fff',
    },
    td: {
      'text-align': 'center',
      'background-color': '#ededed',
      border: '1px solid #fff',
      'font-size': '14px',
    },
    footer: {
      'background-color': '#008ad6',
    },
    summary: {
      color: '#fff',
    },
  },
  columns: [
    {
      name: 'Id',
      formatter: (_, row) =>
        gridjs.html(
          `<a target="_blank" rel="noopener noreferrer" href='https://www.mercadopago.com.ar/activities/1?q=${row.cells[0].data}'>${row.cells[0].data}</a>`,
        ),
    },
    {
      name: 'Date Created',
      width: '184px',
    },
    {
      name: 'Date Approved',
      width: '184px',
    },
    {
      name: 'Money Release Date',
      width: '184px',
    },
    'Description',
    'Net Received Amount',
    'Total Paid Amount',
  ],

  data: () => {
    let dataModificada;
    if (dateApprovedCheckbox.checked) {
      dataModificada = dataReducidaParse.results.filter(
        (e) => e.date_approved != null,
      );
    } else {
      dataModificada = dataReducidaParse.results.map((e) => e);
    }
    return dataModificada.map((item) => [
      item.id,
      item.date_created,
      item.date_approved,
      item.money_release_date,
      item.description,
      item.net_received_amount,
      item.total_paid_amount,
    ]);
  },
});
setTimeout(() => {
  gridApertura.render(document.getElementById('contenedor2'));
}, 2000);
