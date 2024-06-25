export const miniNarrowResults = async function (response): Promise<Object> {
  let responseArray = [];
  let responseObject = {};

  await response.results.forEach((res, index) => {
    let newChargesDetails = [];
    const {
      id,
      date_approved,
      fee_details,
      transaction_details,
      description,
      charges_details,
    } = res;
    let total = 0;
    charges_details.forEach((charge) => {
      newChargesDetails.push({
        name: charge.name,
        amount: charge.amounts.original,
      });
      total = total + charge.amounts.original;
    });

    let { net_received_amount, total_paid_amount } = transaction_details;

    responseArray.push({
      id,
      date_approved,
      description,
      fee_details,
      transaction_details,
      charges_details_total: total,
      charges_details: newChargesDetails,
      net_received_amount,
      total_paid_amount,
    });
  });

  responseObject['totalResults'] = response['paging'].total;
  responseObject['results'] = responseArray;

  return responseObject;
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

<h3 class="mt-2 mb-2">Tabla Original</h3>
<section id="container"></section>
<hr>
<br/>
<h3 class="mt-2 mb-2">Tabla Reducida</h3>
<section id="container2"></section>
<hr>
<br/>
<h3 class="mt-2 mb-2">Tabla con Apertura</h3>
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
        date_approved: res.results[index].date_approved,
        description: charge.name,
        net_received_amount: '',
        total_paid_amount: charge.amount,
      });
    });
  }
  obj['resultados'] = arr;
  return obj;
};
