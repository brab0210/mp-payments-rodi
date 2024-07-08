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
              ? parseFloat(charge.amounts.original.toFixed(2))
              : `-${parseFloat(charge.amounts.original.toFixed(2))}`,
          type: charge.type,
        });
        total = total + parseFloat(charge.amounts.original.toFixed(2));
      } else if (payer && charge.accounts.from == 'collector') {
        newChargesDetails.push({
          name: charge.name,
          account_type: charge.accounts.from,
          amount:
            charge.type == 'coupon'
              ? parseFloat(charge.amounts.original.toFixed(2))
              : `-${parseFloat(charge.amounts.original.toFixed(2))}`,
          type: charge.type,
        });
        total = total + parseFloat(charge.amounts.original.toFixed(2));
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
        net_received_amount: charge.amount.toFixed,
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
<link rel="stylesheet" href="/css/main.css" />
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
<style>
  .nav-link {
    color: #fff;
  }

  .navbar {
    background-color: var(--head-bg-color);
    color: #fff;
  }
</style>
<body>
<header class="mb-3">
<nav
  class="navbar navbar-expand-lg shadow"
  style="
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 5rem;
  "
>
  <div class="container">
    <h2
      class="navbar-brand"
      onclick="goHome()"
      style="
        cursor: pointer;
        font-family: 'Proxima Nova Bold' !important;
        padding-bottom: 0rem;
      "
    >
      MP Payments | JSON Grid
    </h2>

    <ul
      class="navbar-nav"
      style="gap: 28px; letter-spacing: 1.2px; flex-direction: row"
    >
      <li class="nav-item active">
        <a class="nav-link" href="/mp/old">OLD JSON</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/auth/logout">LOGOUT</a>
      </li>
    </ul>
  </div>  
  </script>
</nav>
</header>

<main class="container-fluid">
  <div class="row ms-2">
          <div class="col-2">
          
            <h4 class="text-muted text-center">Fecha Inicial</h4>
            <div class="input-group">
              <input type="date" class="form-control" id="date_ini" name="begin_date" value='${queryParams.begin_date}'/>
              <div  iv class="input-group-addon">
                <span class="glyphicon glyphicon-th"></span>
              </div>
           </div>
          </div>
          <div class="col-2">
            <h4 class="text-muted text-center">Fecha Final</h4>
              <div class="input-group">
                <input type="date" class="form-control" id="date_fin" name="end_date" value='${queryParams.end_date}'/>
                <div class="input-group-addon">
                <span class="glyphicon glyphicon-th"></span>
                </div>
              </div>
          </div>
        </div>
         

        <div class="row mt-2">
          <div class="col-2 text-center wrap-btn" style="margin-left: 0.45rem;">            
            <button class="mt-2 btn" onclick="getFechaOld()" >Buscar</button>            
          </div>
            <div class="col-4 mt-1 ms-1" style="margin-left: 0.75rem; font-size: 14px;">  
           <div class="form-check">
              <input class="form-check-input" type="checkbox" id="date_approved"  ${queryParams.orderOnlyApproved == 'true' ? 'checked' : ''}  ${queryParams.orderDateMoney == 'true' ? 'disabled' : ''}>
              <label for="date_approved">Solo operaciones aprobadas</label>                
            </div>          
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="date_money" ${queryParams.orderDateMoney == 'true' ? 'checked' : ''}>
              <label id="label_date_money" for="date_money">Por fecha de dinero liberado</label>

            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 ms-2">
<h3 class="mt-3 mb-1 ms-1">Tabla Reducida</h3>
<section id="container"></section>
<hr class="mt-3"/>
<br/>
<h3 class="mt-2 mb-1 ms-1">Tabla con Apertura</h3>
<section id="container2"></section>
<hr class="mt-3" />
<br/>
<h3 class="mt-2 mb-1 ms-1">Tabla Original</h3>
<section id="container3"></section>
</div> 

</main>
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


 let dateApprovedCheckbox = document.getElementById('date_approved')
 let dateMoneyCheckbox = document.getElementById('date_money')
  
      dateMoneyCheckbox.addEventListener('change', ()=>{
        if(dateMoneyCheckbox.checked){
         dateApprovedCheckbox.checked = true
          dateApprovedCheckbox.disabled = true
          document.getElementById('label_date_money').innerHTML = "Por fecha de creación"

        }
        if(!dateMoneyCheckbox.checked){          
          dateApprovedCheckbox.disabled = false
          
          document.getElementById('label_date_money').innerHTML = "Por fecha de dinero liberado"
        }
      })
       function goHome() {
      window.location.href = '/mp';
    }
</script>
</body>
</html>
`;
