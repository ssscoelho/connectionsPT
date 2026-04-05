document.addEventListener('DOMContentLoaded', () => {
    const boardDisplay = document.querySelector('.board')
    const scoreDisplay = document.querySelector('#score')
    const mistakeDisplay = document.querySelector('#mistakes')
    const numberDisplay1 = document.querySelector('#number1')
    const numberDisplay2 = document.querySelector('#number2')
    
    var score = 0
    var mistakes = 0
    var state = 0             // 0 = no button selected; 1 = one button selected 

    scoreDisplay.innerHTML = score
    mistakeDisplay.innerHTML = mistakes

    const categories = {
        'Personagens do K-Pop Demon Hunters': ['Rumi', 'Mira', 'Zoey', 'Jinu', 'Celine', 'Saja', 'Bobby', 'Gwi-Ma', 'Han'],
        'Rios de Portugal': ['Tejo', 'Mondego', 'Minho', 'Guadiana', 'Douro', 'Zêzere', 'Sado', 'Lima', 'Cávado'],
        'Mamíferos aquáticos': ['Golfinho', 'Baleia', 'Orca', 'Beluga', 'Manatim', 'Foca', 'Morsa', 'Narval', 'Cachalote'],
        'Cores': ['Rosa', 'Azul', 'Preto', 'Branco', 'Roxo', 'Verde', 'Magenta', 'Amarelo', 'Encarnado'],
        'Flores': ['Margarida', 'Malmequer', 'Lilás', 'Lírio', 'Cravo', 'Hortênsia', 'Túlipa', 'Orquídea', 'Girassol'],
        'Açores': ['São Miguel', 'Faial', 'Pico', 'São Jorge', 'Graciosa', 'Terceira', 'Corvo ', 'Flores', 'Santa Maria'],
        'Mitologia': ['Hércules', 'Zeus', 'Hera', 'Artemis', 'Apolo', 'Ares', 'Poseidon', 'Hermes', 'Aquiles'],
        'Tecidos': ['Flanela', 'Lã', 'Algodão', 'Linho', 'Seda', 'Viscose', 'Cetim', 'Veludo', 'Spandex'],
        'Geometria': ['Ponto', 'Linha', 'Ângulo', 'Cubo', 'Esfera', 'Círculo', 'Triângulo', 'Cone', 'Quadrado']
    }


    let N = Object.keys(categories).length
    let M = N*N 
    numberDisplay1.textContent = N
    numberDisplay2.textContent = N

    // Creates a suffled list of lists 
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
    }

    let allwords = []
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            allwords.push(Object.values(categories)[i][j])
        }
    }  

    shuffle(allwords)

    let tabledata = []

    for (i = 0; i < M; i++) {
        if (i % N == 0) {
            tabledata.push(allwords.slice(i, i+N)) 
        }
    }

    
    // Creates a list of lists to inject into the table
    function createTable() {
        const tbl = document.createElement('table')
        const tblbody = document.createElement('tbody')

        for (let i = 0; i < N; i++) {
            const row = document.createElement('tr')
            for (let j = 0; j < N; j++) {
                const cell = document.createElement('td')
                const tile = document.createElement('button')
                let content = tabledata[i][j]
                tile.textContent = content
                cell.setAttribute('id', 'cell '+ content)
                tile.setAttribute('id', content)
                tile.setAttribute('class', 'tile')
                tile.addEventListener('click', () => handleClicks(tile))

                cell.appendChild(tile)
                row.appendChild(cell)
            }
            tblbody.appendChild(row)
        }
        tbl.appendChild(tblbody)
        boardDisplay.append(tbl)
    }

    createTable()

    // Play the game
    
    function handleClicks(tile) {
        let content = tile.textContent

        // tile.setAttribute('class', 'tile')

        if (state == 0) {                   // state = 0, none is selected
            storedContent = content.split(', ')
            tile.setAttribute('class', 'selected')
            // console.log(state, storedContent)

            state = 1

        } else if (state == 1) {            // state = 1, one is already selected
            const selected = storedContent.join(', ')
            const preSelected = document.getElementById(selected)
            const preSelectedCell = document.getElementById('cell ' + selected)
            const clickedCell = document.getElementById('cell ' + content)
            
            if (content === preSelected.textContent) {
                if (preSelected.textContent.includes(', ')) {
                    preSelected.setAttribute('class', 'group')
                } else {
                    preSelected.setAttribute('class', 'tile')
            }
                state = 0 
                
            } else {

                if (content.includes(', ')) {
                    let newlist = storedContent.concat(content.split(', '))
                    storedContent = newlist
                } else {
                    storedContent.push(content)
                }

                if (preSelected.textContent.includes(', ')) {
                    preSelected.setAttribute('class', 'group')
                } else {
                    preSelected.setAttribute('class', 'tile')
                }
    
                state = 0

                let res = ''
                let verdict = false

                Object.keys(categories).forEach(function (key) {
                    const categ = new Set(categories[key])
                    const itemsToCheck = new Set(storedContent)

                if (itemsToCheck.isSubsetOf(categ)) {
                            verdict = true
                            res = key  
                    }
                })

                // console.log(res)

                if (verdict == false) {
                    mistakeDisplay.textContent = mistakes + 1
                    mistakes++ 
                    

                } else {
                    scoreDisplay.textContent = score + 1
                    score++

                    const newtext = storedContent.join(', ')                
                    
                    if (storedContent.length == N) {
                        clickedCell.setAttribute('id', res)
                        clickedCell.setAttribute('class', 'finished')
                        clickedCell.textContent = res
                        tile.remove()
                        
                    } else {
                        clickedCell.setAttribute('id', 'cell ' + newtext)
                        tile.textContent = newtext
                        tile.setAttribute('class', 'group') 
                        tile.setAttribute('id', newtext) 
                    }

                    preSelectedCell.remove()
                }
            }            

        } 
    }

}
)