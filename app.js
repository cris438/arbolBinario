class Nodo {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value
    }
}
class BinarySearchTree {
    #contador = 0
    html = ''
    listaPrincipal = []
    constructor() {
        this.root = null
    }
    get contador() {
        return this.#contador
    }
    insert(value) {
        const newNode = new Nodo(value)
        if (this.root == null) {
            this.root = newNode
        } else {
            let currentNode = this.root
            while (true) {
                if (parseFloat(value) < parseFloat(currentNode.value)) {
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        return this
                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode
                        return this
                    }
                    currentNode = currentNode.right
                }
            }
        }
    }
    search(value) {
        if (this.root == null) {
            return undefined
        } else {
            let currentNode = this.root
            while (true) {
                if (parseFloat(value) <= parseFloat(currentNode.value)) {
                    if (parseFloat(value) == parseFloat(currentNode.value)) {
                        let nodoHtml = document.querySelector(`#t${currentNode.value}`)
                        nodoHtml.classList.add('marcar')
                        return currentNode
                    }
                    currentNode = currentNode.left
                } else {
                    if (parseFloat(value) == parseFloat(currentNode.value)) {
                        let nodoHtml = document.querySelector(`#t${currentNode.value}`)
                        nodoHtml.classList.add('marcar')
                        return currentNode
                    }
                    currentNode = currentNode.right
                }
            }
        }
    }
    renderizar(value) {
        if (this.root == null) {
            raiz.innerHTML = `<div class="node-box">
                        <div class="node" id="t${value}">${value}</div>
                        <div class="children" id=n${value}>
                        </div>
                    </div>`
        } else {
            let currentNode = this.root
            while (true) {
                if (parseFloat(value) < parseFloat(currentNode.value)) {
                    if (!currentNode.left) {
                        let nuevoNodo = document.querySelector(`#n${currentNode.value}`)
                        this.html = `<div class="node-box">
                            <div class="node" id="t${value}">${value}</div>
                            <div class="children" id="n${value}">
                            </div>
                            </div>`
                        nuevoNodo.insertAdjacentHTML('afterbegin', this.html)
                        return

                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        let nuevoNodo = document.querySelector(`#n${currentNode.value}`)
                        this.html = `<div class="node-box">
                            <div class="node" id="t${value}">${value}</div>
                            <div class="children" id="n${value}">
                            </div>
                            </div>`
                        nuevoNodo.insertAdjacentHTML('beforeend', this.html)
                        return

                    }
                    currentNode = currentNode.right
                }
            }
        }
    }
    lista() {
        let contador1 = 0
        if (this.root.left != null) {
            let currentNode = this.root.left
            while (true) {
                contador1++
                let listaParaRecorrer = []
                if (currentNode.left != null) {
                    listaParaRecorrer.push(currentNode.left.value)
                    if (currentNode.right != null) {
                        listaParaRecorrer.push(currentNode.right.value)
                    }
                    if (contador1 == 1) {
                        listaParaRecorrer.push(currentNode.value)
                    }
                    this.listaPrincipal.push(listaParaRecorrer)
                    currentNode = currentNode.left
                } else if (currentNode.right != null) {
                    listaParaRecorrer.push(currentNode.right.value)
                    if (currentNode.left != null) {
                        listaParaRecorrer.push(currentNode.left.value)
                    }
                    if (contador1 == 1) {
                        listaParaRecorrer.push(currentNode.value)
                    }
                    this.listaPrincipal.push(listaParaRecorrer)
                    currentNode = currentNode.right
                }else{
                    return
                }
            }
        }
    }
    lista2() {
        let contador1 = 0
        if (this.root.right != null) {
            let currentNode = this.root.right
            while (true) {
                contador1++
                let listaParaRecorrer = []
                if (currentNode.right != null) {
                    listaParaRecorrer.push(currentNode.left.value)
                    if (currentNode.right != null) {
                        listaParaRecorrer.push(currentNode.right.value)
                    }
                    if (contador1 == 1) {
                        listaParaRecorrer.push(currentNode.value)
                    }
                    this.listaPrincipal.push(listaParaRecorrer)
                    currentNode = currentNode.right
                } else {
                    return
                }
            }
        } else {
            return
        }
    }
    normalizar() {
        console.log(this.listaPrincipal)
        this.listaPrincipal = this.listaPrincipal.map(item => item.reverse())
        this.listaPrincipal = this.listaPrincipal.flat()
        this.listaPrincipal = this.listaPrincipal.reverse()
        this.listaPrincipal.push(this.root.value)
        console.log(this.listaPrincipal)
    }
    recorrido() {
        let longitud = this.listaPrincipal.length
        this.#contador++
        console.log(this.#contador)
        console.log(longitud)
        setTimeout(() => {
            if (this.#contador > longitud) {
                return
            }
            let nodoHtml = document.querySelector(`#t${this.listaPrincipal[this.#contador - 1]}`)
            nodoHtml.classList.add('marcar')
            this.recorrido()
        }, 2000);

    }
}

let arbol = new BinarySearchTree()

let btnAgregar = document.querySelector('#btnAgregar')
let inputValor = document.querySelector('#inputValor')
let raiz = document.querySelector('#raiz')
let btnBuscar = document.querySelector('#btnBuscar')
let inputBuscar = document.querySelector('#inputBuscar')
let btnLimpiar = document.querySelector('#btnLimpiar')
let btnRecorrido = document.querySelector('#btnRecorrido')

btnAgregar.addEventListener('click', (event) => {
    if (inputValor.value.trim() != '') {
        arbol.renderizar(inputValor.value)
        arbol.insert(inputValor.value)
    }
    inputValor.value = ''

})

btnBuscar.addEventListener('click', (event) => {
    arbol.search(inputBuscar.value)
    inputBuscar.value = ''
})


btnLimpiar.addEventListener('click', (event) => {
    let limpiar = document.querySelector('.marcar')
    if (limpiar != undefined) {
        limpiar.classList.remove('marcar')
    }
})

btnRecorrido.addEventListener('click', (event) => {
    arbol.lista2()
    arbol.lista()
    arbol.normalizar()
    arbol.recorrido()
})