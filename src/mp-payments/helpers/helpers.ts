export const narrowResults = async function (response) {
  let responseArray = [];

  await response.results.forEach((res, index) => {
    const {
      id,
      date_approved,
      fee_details,
      transaction_details,
      description,
      charges_details,
    } = res;
    responseArray.push({
      id,
      date_approved,
      description,
      fee_details,
      transaction_details,
      charges_details,
    });
  });

  let responseObject = {};

  responseObject['paging'] = response['paging'];
  responseObject['results'] = responseArray;

  return responseObject;
};

export const miniNarrowResults = async function (response) {
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

    responseArray.push({
      id,
      date_approved,
      description,
      fee_details,
      transaction_details,
      charges_details_total: total,
      charges_details: newChargesDetails,
    });
  });

  responseObject['totalResults'] = response['paging'].total;
  responseObject['results'] = responseArray;

  return responseObject;
};

export const html_narrow = (data, data2) => `
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
<script src="https://unpkg.com/@araujoigor/json-grid/dist/JSONGrid.min.js"></script>
<title>MP-Payments-Rodi</title>
</head>
<body>
<h1>MP-Payments</h1>

<section id="container"></section>
<br/>
<section id="container2"></section>

<script>
    let data = ${JSON.stringify(data)}
    let data2 = ${JSON.stringify(data2)}
let container = document.getElementById('container');
let container2 = document.getElementById('container2');
console.log("hola")
let jsonGrid = new JSONGrid(data, container);
let jsonGrid2 = new JSONGrid(data2, container2);
jsonGrid.render();
jsonGrid2.render();
</script>
</body>
</html>
`;

//export const html_completo =
