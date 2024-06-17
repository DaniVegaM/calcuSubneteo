
let porcionRed = 0; //Porcion tomada
let unosHost = 0; //Porcion tomada
let numSubredes = 0;
let ip = "0000";
let salto = "0";
let ip1 = "", ip2 = "", ip3 = "", ip4 = "";
let clase = 'X';
let mask;

//Para resultados
let dirSubred = "";

const selectSubRedes = document.getElementById("numSubredes");
const selectMask = document.getElementById("selectMask");
const options = Array.from(selectSubRedes.options);
const ipContainer = document.getElementById("ipContainer");
const button = document.getElementById("button");
const tableBody  = document.getElementById("tableBody");
const lastSelect = document.getElementById("lastSelect");

selectMask.addEventListener("change", ()=>{
    fselectMask();
});

button.addEventListener("click", ()=>{
    tableBody.innerHTML = `<tr class="thead">
                        <th>Número de red</th>
                        <th>Dirección de Subred</th>
                        <th>IP Inicial</th>
                        <th>IP Final</th>
                        <th>Dirección de Broadcast</th>
                        <th>Mascara de Red</th>
                    </tr>`;

    document.getElementById("v1").classList.add("invisible");
    document.getElementById("v2").classList.add("invisible");
    document.getElementById("v3").classList.add("invisible");

    // let porcionRed = 0; //Porcion tomada
    // let unosHost = 0; //Porcion tomada
    // let salto = "0";
    // numSubredes = 0;
    ip = "0000";
    mask = 'X';
    
    fselectMask();

    if(clase == 'X'){
        document.getElementById("v2").classList.remove("invisible");
    }

    fselectIP();

    if(ip == `${NaN}.${NaN}.${NaN}.${NaN}`){
        document.getElementById("v1").classList.remove("invisible");
    }

    fselectSubnet();

    if(numSubredes == 0){
        document.getElementById("v3").classList.remove("invisible");
    }

    generarTabla();
});


function fselectMask(){
    switch(selectMask.options[selectMask.selectedIndex].value){
        case "A":
            porcionRed = 8;
            clase = 'A';
            lastSelect.classList.remove("invisible");
        break;
        case "B":
            porcionRed = 16;
            clase = 'B';
            lastSelect.classList.remove("invisible");
        break;
        case "C":
            porcionRed = 24;
            clase = 'C';
            lastSelect.classList.add("invisible");
        break;

    }

    console.log(`Porcion de red: ${porcionRed}`);
};

function fselectIP(){
    ip1 = (parseInt((document.getElementById("ip1")).value, 10));
    ip2 = (parseInt((document.getElementById("ip2")).value, 10));
    ip3 = (parseInt((document.getElementById("ip3")).value, 10));
    ip4 = (parseInt((document.getElementById("ip4")).value, 10));
    ip = ip1 + "." + ip2 + "." + ip3 + "." + ip4;
    console.log(`La ip es: ${ip}`);
};


function fselectSubnet(){
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
    } else{
        numSubredes = 0;
    }
    console.log(`El salto es ${salto}`);
};

function generarTabla (){
    let cerosSubred;
    //Generando inicio de direccion de subred
    switch(clase){
        case 'A':
            dirSubred = ip1;
            // cerosSubred = ".0.0";
            mask = "/8";
        break;
        case 'B':
            dirSubred = ip1 + "." + ip2;
            // cerosSubred = ".0";
            mask = "/16";
        break;
        case 'C':
            dirSubred = ip1 + "." + ip2 + "." + ip3;
            // cerosSubred = "";
            mask = "/24";
        break;
    }

    for(i = 1; i <= numSubredes; i++){
        tableBody.insertAdjacentHTML("beforeend", 
            `<tr>
                <th>${i}</th>
                <th>${dirSubred + "." + genSalto1() + genPartDir()}</th>
                <th>${dirSubred + "." + genSalto11() + genPartInit()}</th>
                <th>${dirSubred + "." +  genSalto22() + genPartFinal()}</th>
                <th>${dirSubred + "." +  genSalto2() + genPartBroadcast()}</th>
                <th>${mask}</th>
            </tr>`); 
    }
    
}



function genSalto1(){
    switch(clase){
        case 'A':
            return ((salto * i) - salto)
        break;
        case 'B':
            return ((salto * i) - salto)
        break;
        case 'C':
            return ((salto * i) - salto)
        break;
    }
}
function genSalto11(){
    switch(clase){
        case 'A':
            return ((salto * i) - salto)
        break;
        case 'B':
            return ((salto * i) - salto)
        break;
        case 'C':
            return ((salto * i) - salto + 1)
        break;
    }
}
function genSalto22(){
    switch(clase){
        case 'A':
            return ((salto * (i+1)) - salto - 1)
        break;
        case 'B':
            return ((salto * (i+1)) - salto - 1)
        break;
        case 'C':
            return ((salto * (i+1)) - salto - 2)
        break;
    }
}
function genSalto2(){
    switch(clase){
        case 'A':
            return ((salto * (i+1)) - salto - 1)
        break;
        case 'B':
            return ((salto * (i+1)) - salto - 1)
        break;
        case 'C':
            return ((salto * (i+1)) - salto - 1)
        break;
    }
}
function genPartDir(){
    switch(clase){
        case 'A':
            return ".0.0"
        break;
        case 'B':
            return ".0"
        break;
        case 'C':
            return ""
        break;
    }
}
function genPartInit(){
    switch(clase){
        case 'A':
            return ".0.1"
        break;
        case 'B':
            return ".1"
        break;
        case 'C':
            return "" //Checar detalle para ver si se elimina parte del salto en clase C
        break;
    }
}
function genPartFinal(){
    switch(clase){
        case 'A':
            return ".255.254"
        break;
        case 'B':
            return ".254"
        break;
        case 'C':
            return "" //Checar detalle para ver si se elimina parte del salto en clase C
        break;
    }
}
function genPartBroadcast(){
    switch(clase){
        case 'A':
            return ".255.255"
        break;
        case 'B':
            return ".255"
        break;
        case 'C':
            return "" //Checar detalle para ver si se elimina parte del salto en clase C
        break;
    }
}

//DETALLE PARA MOVERSE ENTRE INPUTS AUTO

const inputs = document.querySelectorAll('#ipContainer input[type="text"]');

inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        const maxLength = event.target.getAttribute('maxlength');
        if (event.target.value.length >= maxLength && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && index < inputs.length - 1) {
            inputs[index + 1].focus();
        } else if (event.key === 'ArrowLeft' && index > 0) {
            inputs[index - 1].focus();
        }
    });
});