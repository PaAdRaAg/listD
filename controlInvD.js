class Producto{
    constructor(cantidad, codigo, nombre, costo, descripcion){
        this.cantidad = cantidad;
        this.codigo = codigo;
        this.nombre = nombre;
        this.costo = costo;
        this.descripcion = descripcion;
        this.siguiente = null;
        this.anterior = null;
    };
};

class Inventario{
    constructor(){
        this.inicio = null;
        this.final = null;
        this.producto = new Producto();
        this.tamaño = 0;
    };

    agregar(cantidad, codigo, nombre, costo, descripcion){
        const nProducto = new Producto(cantidad, codigo, nombre, costo, descripcion);
        if(this.final){
            nProducto.anterior = this.final;
            this.final.siguiente = nProducto;
            this.final = nProducto;
        }   else{
            this.final = nProducto;
            this.inicio = nProducto;
        };
        this.tamaño++;
    };

    elPrim(){
        if(!this.inicio){
            return null;
        };

        const vReg = this.inicio.producto;

        if(this.inicio === this.final){
            this.inicio = null;
            this.final = null;
        } else{
            this.inicio = this.inicio.siguiente;
            this.inicio.anterior = null;
        };
        this.tamaño--;
        return vReg;
    };

    buscar(codigo){
        if(this.inicio == null){
            return null;
        };
        let aux = this.inicio;
        while(aux){
            if(aux.codigo == codigo){
                return aux;
            };
            aux = aux.siguiente;
        };
        return null;
    };

    elCod(codigo){
        let aux = this.inicio;
        let ant = null;

        while(aux !== null){
            if(aux.codigo === codigo){
                if(!ant){
                    return this.elPrim();
                }else {
                    ant.siguiente = aux.siguiente;
                    aux.siguiente.anterior = ant;
                };
                this.tamaño--;
                return aux.codigo;
            };
            ant = aux;
            aux = aux.siguiente;
        };
        return null;
    };

    imprimir(){
        let aux = this.inicio;
        let res = "";
        while(aux){
            res += aux.nProducto + " <-> ";
            aux = aux.siguiente;
        };
        return res += " Vacío ";
    };

    imprimirInv(){
        let aux = this.final;
        let res = "";
        while(aux){
            res += aux.nProducto + " <-> ";
            aux = aux.anterior
        };
        return res += " Vacío ";
    };
};

var cantidad = document.querySelector("#cantPA");
var codigo = document.querySelector("#codPA");
var nombre = document.querySelector("#nomPA");
var costo = document.querySelector("#costPA");
var descripcion = document.querySelector("#descPA");
var btnAg = document.querySelector("#agregarBtn");
var codEl = document.querySelector("#codEl");
var btnEl = document.querySelector("#elBtn");
var tabla1 = document.querySelector("#tabla1");
var btnBu = document.querySelector("#buBtn");
var codBu = document.querySelector("#codBu");
var tabla2 = document.querySelector("#tabla2");
var lista = document.querySelector("#lista");
var btnImp = document.querySelector("#impBtn");
var btnInvImp = document.querySelector("#impInvBtn");
var btnElPrim = document.querySelector("#elPrim");
var tabla3 = document.querySelector("#tabla3");
var tabla4 = document.querySelector("#tabla4");
var tabla5 = document.querySelector("#tabla5");

var nInventario = new Inventario();
var nProducto = new Producto(cantidad.value, codigo.value, nombre.value, costo.value, descripcion.value);


btnAg.addEventListener('click', () => {

    if(cantidad.value == 0 || codigo.value == 0 || nombre.value == "" || costo.value == 0 || descripcion.value == ""){
        alert("Llene todos los campos.");
        return this.tamaño--;
        
    }   else if(nInventario.buscar(Number(codigo.value)) == nInventario.codigo){
        nInventario.agregar(Number(cantidad.value), Number(codigo.value), String(nombre.value), Number(costo.value), String(descripcion.value));
        console.log(nInventario);

    }   else {
        alert("Elija otro código.");
    };
});

btnEl.addEventListener('click', () => {
    if(nInventario.buscar(Number(codEl.value)) != nInventario.codigo){
        let aux = nInventario.buscar(Number(codEl.value));
        tabla1.innerHTML = aux;
        nInventario.elCod(Number(codEl.value));
        console.log(nInventario);
    }   else{
        alert("Ingrese un código válido.")
    };

});

btnBu.addEventListener('click', () => {
    if(nInventario.buscar(Number(codBu.value)) != nInventario.codigo){
        let aux = nInventario.buscar(Number(codBu.value));
        tabla2.innerHTML = aux;
        console.log(nInventario.buscar(Number(codBu.value)));
    }   else{
        alert("Códogo inexistente.")
    };
});
/*
btnImp.addEventListener('click', () => {
    for(let i = 0; i <= nInventario.length; i++){
        tabla3.innerHTML = nInventario[i];
        console.log(nInventario.imprimir(nInventario));
    }

});*/


btnImp.addEventListener('click', () => {
    tabla3.innerHTML = "Productos impresos: " + nInventario.imprimir(nInventario);
    console.log(nInventario.imprimir(nInventario));
});

btnInvImp.addEventListener('click', () => {
    tabla4.innerHTML = "Productos impresos al inverso: " + nInventario.imprimirInv(nProducto);
    console.log(nInventario.imprimirInv(nProducto));
});

btnElPrim.addEventListener('click', () => {
    let aux = nInventario.inicio;
    tabla5.innerHTML = "Se ha eliminado: " + aux;
    nInventario.elPrim();
    console.log(nInventario);
});

/*
nInventario.agregar(11, 11, 11, 11, 11);
console.log(nInventario);

nInventario.agregar(22, 22, 22, 22, 22);
console.log(nInventario);

nInventario.agregar(33, 33, 33, 33, 33);
console.log(nInventario);

nInventario.agregar(44, 44, 44, 44, 44);
console.log(nInventario);


nInventario.elPrim();
console.log(nInventario);


console.log(nInventario.buscar(33));


nInventario.elCod(33);
console.log(nInventario);


console.log(nInventario.imprimir());


console.log(nInventario.imprimirInv());
*/