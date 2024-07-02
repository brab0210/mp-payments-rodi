export const miniNarrowResults = async function (response): Promise<Object> {
  let responseArray = [];
  let responseObject = {};

  await response.results.forEach((res, index) => {
    let newChargesDetails = [];
    const {
      id,
      date_approved,
      payment_type_id,
      payer,
      fee_details,
      transaction_details,
      description,
      charges_details,
      operation_type,
      money_release_date,
    } = res;
    let total = 0;
    charges_details.forEach((charge) => {
      if (payer == null && charge.accounts.from == 'payer') {
        newChargesDetails.push({
          name: charge.name,
          account_type: charge.accounts.from,
          amount:
            charge.type == 'coupon'
              ? charge.amounts.original
              : -charge.amounts.original,
          type: charge.type,
        });
        total = total + charge.amounts.original;
      } else if (payer && charge.accounts.from == 'collector') {
        newChargesDetails.push({
          name: charge.name,
          account_type: charge.accounts.from,
          amount:
            charge.type == 'coupon'
              ? charge.amounts.original
              : -charge.amounts.original,
          type: charge.type,
        });
        total = total + charge.amounts.original;
      }
    });

    let { net_received_amount, total_paid_amount } = transaction_details;

    responseArray.push({
      id,
      date_approved:
        date_approved != null ? new Date(date_approved).toString() : null,
      payment_type_id,
      money_release_date:
        money_release_date != null
          ? new Date(money_release_date).toString()
          : null,
      cuit: payer == null ? '' : payer.identification.number,
      description: description == null ? operation_type : description,
      fee_details,
      transaction_details,
      charges_details_total: total,
      charges_details: newChargesDetails,
      net_received_amount:
        payer == null ? -net_received_amount : net_received_amount,
      total_paid_amount: payer == null ? -total_paid_amount : total_paid_amount,
    });
  });

  responseObject['totalResults'] = response['paging'].total;
  responseObject['results'] = responseArray;

  return responseObject;
};

export const funcAperturaImpuestos = async (res) => {
  let arr = [];
  let obj = {};

  for (let index = 0; index < res.results.length; index++) {
    const {
      id,
      date_approved,
      description,
      charges_details,
      charges_details_total,
      net_received_amount,
      total_paid_amount,
    } = res.results[index];
    arr.push({
      id,
      date_approved,
      description,
      net_received_amount,
      total_paid_amount,
    });

    res.results[index].charges_details.forEach((charge) => {
      arr.push({
        id: res.results[index].id,
        date_approved:
          res.results[index].date_approved != null
            ? new Date(res.results[index].date_approved).toString()
            : null,
        description: 'IMPUESTO: ' + charge.type + ' | ' + charge.name,
        net_received_amount: charge.amount,
        total_paid_amount: '',
      });
    });
  }
  obj['resultados'] = arr;
  return obj;
};

export const html_narrow = (data, data2, data3) => `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="/index.css" />
<link
  href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700&display=swap"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/@araujoigor/json-grid/dist/json-grid.css"
/>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  id="bootstrap-css"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/@araujoigor/json-grid/dist/JSONGrid.min.js"></script>
<title>MP-Payments-Rodi</title>
</head>
<body class="container">
<h1>MP-Payments</h1>

<h3 class="mt-2 mb-2">Tabla Reducida</h3>
<section id="container"></section>
<hr>
<br/>
<h3 class="mt-2 mb-2">Tabla con Apertura</h3>
<section id="container2"></section>
<hr>
<br/>
<h3 class="mt-2 mb-2">Tabla Original</h3>
<section id="container3"></section>

<script>
    let data = ${JSON.stringify(data)}
    let data2 = ${JSON.stringify(data2)}
    let data3 = ${JSON.stringify(data3)}
let container = document.getElementById('container');
let container2 = document.getElementById('container2');
let container3 = document.getElementById('container3');

let jsonGrid = new JSONGrid(data, container);
let jsonGrid2 = new JSONGrid(data2, container2);
let jsonGrid3 = new JSONGrid(data3, container3);

jsonGrid.render();
jsonGrid2.render();
jsonGrid3.render();
</script>
</body>
</html>
`;
