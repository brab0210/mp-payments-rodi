const grid = new gridjs.Grid({
  search: {
    enabled: true,
    debounceTimeout: 5000,
  },
  sort: true,
  autoWidth: true,
  resizable: true,
  fixedHeader: true,
  pagination: {
    limit: 15,
  },
  style: {
    table: {
      width: '100%',
    },
    th: {
      'background-color': '#fdbb2d26',
      color: 'black',
      'text-align': 'center',
      border: '1px solid #fff',
    },
    td: {
      'text-align': 'center',
      'background-color': '#837b7b26',
      border: '1px solid #fff',
    },
    footer: {
      'background-color': '#fdbb2d26',
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
    'Date Approved',
    'Payment Type Id',
    'Money Release Date',
    'CUIT',
    'Description',
    'Fee Details - Amount',
    'Fee Details - Fee Payer',
    'Fee Details - Type',
    'Charges Details Total',
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
  /* server: {
    url: 'https://gorest.co.in/public/v2/users',
    then: (data) => {
      return dataParse.results.map((item, index) => [
        item.id,
        item.date_approved,
        item.fee_datails == null ? 0 : item.fee_datails.amount,
      ]);
    },
  }, */

  data: () => {
    return dataParse.results.map((item) => [
      item.id,
      item.date_approved,
      item.payment_type_id,
      item.money_release_date,
      item.cuit,
      item.description,
      item.fee_details.length > 0 ? item.fee_details[0].amount : '',
      item.fee_details.length > 0 ? item.fee_details[0].fee_payer : '',
      item.fee_details.length > 0 ? item.fee_details[0].type : '',
      item.charges_details_total,
      item.net_received_amount,
      item.total_paid_amount,
    ]);
  },
}).render(document.getElementById('contenedor'));

const grid2 = new gridjs.Grid({
  search: {
    enabled: true,
    debounceTimeout: 5000,
  },
  sort: true,
  autoWidth: true,
  resizable: true,
  fixedHeader: true,
  pagination: {
    limit: 15,
  },
  style: {
    table: {
      width: '100%',
    },
    th: {
      'background-color': '#fdbb2d26',
      color: 'black',
      'text-align': 'center',
      border: '1px solid #fff',
    },
    td: {
      'text-align': 'center',
      'background-color': '#837b7b26',
      border: '1px solid #fff',
    },
    footer: {
      'background-color': '#fdbb2d26',
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
    'Date Approved',
    'Payment Type Id',
    'Money Release Date',
    'CUIT',
    'Description',
    'Fee Details - Amount',
    'Fee Details - Fee Payer',
    'Fee Details - Type',
    'Charges Details Total',
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
  /* server: {
    url: 'https://gorest.co.in/public/v2/users',
    then: (data) => {
      return dataParse.results.map((item, index) => [
        item.id,
        item.date_approved,
        item.fee_datails == null ? 0 : item.fee_datails.amount,
      ]);
    },
  }, */

  data: () => {
    return dataParse2.results.map((item) => [
      item.id,
      item.date_approved,
      item.payment_type_id,
      item.money_release_date,
      item.cuit,
      item.description,
      item.fee_details.length > 0 ? item.fee_details[0].amount : '',
      item.fee_details.length > 0 ? item.fee_details[0].fee_payer : '',
      item.fee_details.length > 0 ? item.fee_details[0].type : '',
      item.charges_details_total,
      item.net_received_amount,
      item.total_paid_amount,
    ]);
  },
}).render(document.getElementById('contenedor2'));
