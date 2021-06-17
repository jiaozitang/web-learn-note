import Element from './lib/element'

const el = Element

const element = el('div', {'id': 'container'}, [
    el('p', {'id': 'p1'}, [
        'pppppppp'
    ])
])

console.log(element)
