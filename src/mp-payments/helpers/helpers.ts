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
