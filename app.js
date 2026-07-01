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
        let nodoHtml = document.querySelector(`#t${value}`)
        if(nodoHtml!=undefined){
            nodoHtml.classList.add('marcar')
        }else{
            alert('El valor que esta buscando no existe, pruebe con uno que si exista')
        }
        return
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
        this.listaPrincipal = []
        const recorrer = (nodo) => {
            if (!nodo) {
                console.log('regresa')
                return
            }
            recorrer(nodo.left)
            recorrer(nodo.right)
            this.listaPrincipal.push(nodo.value)
            console.log(nodo.value)
        }

        recorrer(this.root)
    }
    recorrido() {
        if (!this.root) {
            return
        }

        this.lista()

        let limpiar = document.querySelectorAll('.marcar')
        limpiar.forEach(nodo => {
            nodo.classList.remove('marcar')
        })

        this.#contador = 0
        const longitud = this.listaPrincipal.length
        console.log(this.listaPrincipal)
        const mostrarSiguiente = () => {
            if (this.#contador >= longitud) {
                return
            }

            const valor = this.listaPrincipal[this.#contador]
            const nodoHtml = document.querySelector(`#t${valor}`)

            if (nodoHtml) {
                nodoHtml.classList.add('marcar')
            }

            this.#contador++
            setTimeout(() => {
                mostrarSiguiente()
            }, 1000);
        }

        mostrarSiguiente()
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
    let limpiar = document.querySelectorAll('.marcar')
    limpiar.forEach(nodo => {
        nodo.classList.remove('marcar')
    })
})

btnRecorrido.addEventListener('click', (event) => {
    arbol.recorrido()
})