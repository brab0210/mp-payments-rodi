export const miniNarrowResults = async function (response): Promise<Object> {
  let responseArray = [];
  let responseObject = {};

  await response.results.forEach((res, index) => {
    let newChargesDetails = [];
    const {
      id,
      date_approved,
      date_created,
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
        date_approved != null ? formatoDeFecha(date_approved) : null,
      payment_type_id,
      date_created: date_created != null ? formatoDeFecha(date_created) : null,
      money_release_date:
        money_release_date != null ? formatoDeFecha(money_release_date) : null,
      cuit:
        payer == null || payer == undefined ? '' : payer.identification?.number,
      description: description == null ? operation_type : description,
      fee_details: payer == null ? 0 : fee_details[0]?.amount,
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
      date_created,
      description,
      money_release_date,
      charges_details,
      charges_details_total,
      net_received_amount,
      total_paid_amount,
    } = res.results[index];
    arr.push({
      id,
      date_created,
      date_approved,
      money_release_date,
      description,
      net_received_amount,
      total_paid_amount,
    });

    res.results[index].charges_details.forEach((charge) => {
      arr.push({
        id: res.results[index].id,
        date_created,
        date_approved:
          res.results[index].date_approved != null
            ? res.results[index].date_approved
            : null,
        money_release_date,
        description: 'IMPUESTO: ' + charge.type + ' | ' + charge.name,
        net_received_amount: charge.amount,
        total_paid_amount: '',
      });
    });
  }
  obj['resultados'] = arr;
  return obj;
};

function formatoDeFecha(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const html_narrow = (data, data2, data3, queryParams) => `
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
<h1 onclick=goBack() style="cursor:pointer;">MP-Payments</h1>

<div class="row">
          <div class="col-3">
          
            <h2 class="text-muted mx-1">Fecha Inicial</h2>
            <div class="input-group">
              <input type="date" class="form-control" id="date_ini" name="begin_date" value='${queryParams.begin_date}'/>
              <div  iv class="input-group-addon">
                <span class="glyphicon glyphicon-th"></span>
              </div>
           </div>
          </div>
        </div>
  
        <div class="row mt-2">
          <div class="col-3">
            <h2 class="text-muted mx-1">Fecha Final</h2>
              <div class="input-group">
                <input type="date" class="form-control" id="date_fin" name="end_date" value='${queryParams.end_date}'/>
                <div class="input-group-addon">
                <span class="glyphicon glyphicon-th"></span>
                </div>
              </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-3 text-center">            
            <button class="mt-2 btn btn-outline-primary " onclick="getFechaOld()" >Buscar</button>            
          </div>
            <div class="col-4 mt-1 ms-1">  
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="date_null" checked>
              <label for="date_null">Filtro: date_null</label>  
            </div>          
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="date_created">
              <label for="date_null">Filtro: date_created</label>

            </div>
          </div>
        </div>
      </div>

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


<script src="/js/fecha-helper.js"></script>
<script>
function goBack(){
window.location.href = '/mp';
}
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
