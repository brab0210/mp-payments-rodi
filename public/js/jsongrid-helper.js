console.log('script jsongrid cargado');
let container = document.getElementById('container');
let container2 = document.getElementById('container2');

let dato = JSON.stringify(data);

let jsonGrid = new JSONGrid(dato, container);
//let jsonGrid2 = new JSONGrid(data2, container2);
jsonGrid.render();
//jsonGrid2.render();
