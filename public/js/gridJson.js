let grid = new gridjs.Grid({
  search: {
    enabled: true,
    debounceTimeout: 5000,
  },
  sort: true,
  autoWidth: true,
  resizable: true,
  fixedHeader: true,
  pagination: {
    limit: 20,
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
    ,
    'Payment Type Id',
    'CUIT',
    //'Description',
    {
      name: 'Description',
      /*formatter: (_, row) =>
        gridjs.html(
          `<span data-toggle="tooltip" data-placement="top" title="${row.cells[6].data}">${row.cells[6].data.length > 17 ? row.cells[6].data.substring(0, 17) : row.cells[6].data}...</span>`,
        ), */
      width: '180px',
    },
    'Fee Amount',
    'Total Charges',
    /* {
          name: 'Charges Details',
          columns: [
            {
              name: 'Name',
            },
            {
              name: 'Account Type',
            },
            {
              name: 'Amount',
            },
            {
              name: 'Type',
            },
          ],
        }, */
    'Net Received Amount',
    'Total Paid Amount',
  ],

  data: () => {
    return dataGridJsonFiltrada.map((item) => [
      item.id,
      item.date_created,
      item.date_approved,
      item.money_release_date,
      item.payment_type_id,
      item.cuit,
      item.description,
      item.fee_details,
      item.charges_details_total,
      item.net_received_amount,
      item.total_paid_amount,
    ]);
  },
});
setTimeout(() => {
  grid.render(document.getElementById('contenedor'));
}, 1000);

function testFilter(data) {
  grid
    .updateConfig({
      data: () => {
        return data.map((item) => [
          item.id,
          item.date_created,
          item.date_approved,
          item.money_release_date,
          item.payment_type_id,
          item.cuit,
          item.description,
          item.fee_details,
          item.charges_details_total,
          item.net_received_amount,
          item.total_paid_amount,
        ]);
      },
    })
    .forceRender(document.getElementById('contenedor'));
}
