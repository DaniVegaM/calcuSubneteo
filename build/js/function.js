
let porcionRed = 0; //Porcion tomada
let unosHost = 0; //Porcion tomada
let numSubredes = 0;
let ip = "0000";
let ip1, ip2, ip3, ip4;
let salto = "0";
let clase;
let mask;

//Para resultados
let dirSubred = "";

const selectSubRedes = document.getElementById("numSubredes");
const selectMask = document.getElementById("selectMask");
const options = Array.from(selectSubRedes.options);
const ipContainer = document.getElementById("ipContainer");
const button = document.getElementById("button");
const tableBody  = document.getElementById("tableBody");


selectMask.addEventListener("change", ()=>{
    switch(selectMask.options[selectMask.selectedIndex].value){
        case "A":
            porcionRed = 8;
            clase = 'A';
        break;
        case "B":
            porcionRed = 16;
            clase = 'B';
        break;
        case "C":
            porcionRed = 24;
            clase = 'C';
        break;

    }

    console.log(`Porcion de red: ${porcionRed}`);
});

ipContainer.addEventListener("change", ()=>{
    ip1 = (parseInt((document.getElementById("ip1")).value, 10));
    ip2 = (parseInt((document.getElementById("ip2")).value, 10));
    ip3 = (parseInt((document.getElementById("ip3")).value, 10));
    ip4 = (parseInt((document.getElementById("ip4")).value, 10));
    ip = ip1 + "." + ip2 + "." + ip3 + "." + ip4;
    console.log(`La ip es: ${ip}`);
});


selectSubRedes.addEventListener("change", ()=>{
    numSubredes = parseInt(selectSubRedes.options[selectSubRedes.selectedIndex].text, 10);
    console.log(`El num de subredes es: ${numSubredes}`);
    unosHost = Math.log(numSubredes) / Math.log(2);
    console.log(`Unos de Host es: ${unosHost}`);
    porcionRed += unosHost;

    //Obtener Rango;
    if((32 - porcionRed) > 16){
        salto = 2 ** ((32 - porcionRed) - 16);
    } else if((32 - porcionRed) > 8){
        salto = 2 ** ((32 - porcionRed) - 8);
    } else if((32 - porcionRed) < 8){
        salto = 2 ** (32 - porcionRed);
    }
    console.log(`El salto es ${salto}`);
});

button.addEventListener("click", ()=>{
    generarTabla();
});

function generarTabla (){
    let cerosSubred;
    //Generando inicio de direccion de subred
    switch(clase){
        case 'A':
            dirSubred = ip1;
            cerosSubred = ".0.0";
            mask = "/8";
        break;
        case 'B':
            dirSubred = ip1 + "." + ip2;
            cerosSubred = ".0";
            mask = "/16";
        break;
        case 'C':
            dirSubred = ip1 + "." + ip2 + "." + ip3;
            cerosSubred = "";
            mask = "/24";
        break;
    }

    for(i = numSubredes; i >= 1; i--){
        tableBody.insertAdjacentHTML("afterend", 
            `<tr>
                <th>${i}</th>
                <th>${dirSubred + "." + ((salto * i) - salto) + cerosSubred}</th>
                <th>${dirSubred + "." + ((salto * i) - salto) + cerosSubred.slice(0, -1) + "1"}</th>
                <th>${dirSubred + "." + ((salto * (i+1)) - salto - 1) + cerosSubred.slice(0, -1) + "254"}</th>
                <th>${dirSubred + "." + ((salto * (i+1)) - salto - 1) + cerosSubred.slice(0, -1) + "255"}</th>
                <th>${mask}</th>
            </tr>`); 
    }
    
}