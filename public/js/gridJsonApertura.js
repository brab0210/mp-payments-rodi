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
    {
      name: 'Description',
      /* formatter: (_, row) =>
        gridjs.html(
          `<span  data-toggle="tooltip" data-placement="top" title="${row.cells[4].data}">${row.cells[4].data.length > 17 ? row.cells[4].data.substring(0, 17) : row.cells[4].data}...</span>`,
        ), */
      width: '180px',
    },
    'Add info',
    'Net Received Amount',
    'Total Paid Amount',
  ],

  data: () => {
    return dataGridJsonFiltradaApertura.map((item) => [
      item.id,
      item.date_created,
      item.date_approved,
      item.money_release_date,
      item.description,
      item.additional_info,
      item.net_received_amount,
      item.total_paid_amount,
    ]);
  },
});
//.render(document.getElementById('contenedor2'));
setTimeout(() => {
  gridApertura.render(document.getElementById('contenedor2'));
}, 2000);

function testFilterApertura(data) {
  gridApertura
    .updateConfig({
      data: () => {
        return data.map((item) => [
          item.id,
          item.date_created,
          item.date_approved,
          item.money_release_date,
          item.description,
          item.net_received_amount,
          item.total_paid_amount,
        ]);
      },
    })
    .forceRender(document.getElementById('contenedor2'));
}
