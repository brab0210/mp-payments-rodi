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
    {
      name: 'Date Last Updated',
      width: '184px',
    },
    ,
    'Payment Type Id',
    'CUIT',
    'Description',
    'Fee Amount',
    'Total Charges',
    'Trans. Amount Refunded',
    'Net Received Amount',
    'Total Paid Amount',
  ],

  data: () => {
    let dataModificada;
    if (dateApprovedCheckbox.checked) {
      dataModificada = dataReducidaParse.results.filter(
        (e) => e.date_approved != null,
      );
    }
    if (selectedValue.value == 'date_last_updated') {
      dataModificada = dataReducidaParse.results.filter(
        (e) => e.transaction_amount_refunded > 0,
      );
    }
    if (!dateApprovedCheckbox.checked) {
      dataModificada = dataReducidaParse.results.map((e) => e);
    }
    return dataModificada.map((item) => [
      item.id,
      item.date_created,
      item.date_approved,
      item.money_release_date,
      item.date_last_updated,
      item.payment_type_id,
      item.cuit,
      item.description,
      item.fee_details,
      parseFloat(item.charges_details_total).toFixed(2),
      item.transaction_amount_refunded,
      item.net_received_amount,
      item.total_paid_amount,
    ]);
  },
});
setTimeout(() => {
  grid.render(document.getElementById('contenedor'));
}, 2000);
