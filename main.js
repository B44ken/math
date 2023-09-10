let calculator = Desmos.GraphingCalculator(document.querySelector('.calculator'), {
	graphpaper: false,
	expressionsTopbar: false,
	settingsMenu: false,
    keypad: false,
    fontSize: 19
})

calculator.setExpressions(JSON.parse(decodeURIComponent(document.location.hash.slice(1,))).list)

const tabWidth = document.querySelector('.dcg-tab').offsetWidth

const offsetEditor = (bool) => {
    const px = bool ? tabWidth : 0

    const editor = document.querySelector('.dcg-exppanel-container')
    editor.style.marginLeft = `-${px}px`
    editor.style.width = `calc(100% + ${px}px)`
}

document.addEventListener('mousemove', (e) =>
        offsetEditor(e.clientX >= tabWidth)
)

const encodeExpressions = () => {
    const expr = encodeURI(JSON.stringify(calculator.getState().expressions))
    const url = `${window.location.origin}${window.location.pathname}#${expr}`
    window.history.replaceState({}, '', url)
}

document.addEventListener('keydown', (e) => {
    encodeExpressions()
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
    }
})

document.querySelector('.save-button').addEventListener('click', () => {
    encodeExpressions()
    const saveBox = document.querySelector('.save-box')
    saveBox.style.display = 'block'
    saveBox.value = window.location.href
})