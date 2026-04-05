document.addEventListener('DOMContentLoaded', () => {
    const boardDisplay = document.querySelector('.board')
    const rounds = 4                // number of connections on the board
    const names = ['Coelho 1', 'Coelho 2', 'Sara 1', 'Rosa 1']
    const stcolor = ['coelho', 'coelho', 'sara', 'rosa']

    function createRounds() {
        for (let i = 0; i < rounds; i++) {
            const tile = document.createElement('button')
            
            tile.textContent = names[i]
            tile.setAttribute('id', stcolor[i])

            boardDisplay.appendChild(tile)
            
            tile.addEventListener('click', () => {
                const nameurl = 'connections' + i + '.html'
                popupWindow = window.open(nameurl)
            })




        }
}

createRounds()

})