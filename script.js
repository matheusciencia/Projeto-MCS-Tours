const nextBtn = document.querySelector ('.next')
const prevBtn = document.querySelector ('.prev')

const container = document.querySelector ('.container')
const list = document.querySelector ('.container .list')
const thumb = document.querySelector ('.container .thumb')

nextBtn.onclick = () => moveItemOnClick('next')
prevBtn.onclick = () => moveItemOnClick('prev')

function moveItemOnClick(type) {
    const listItems = document.querySelectorAll ('.list .list-item')
    const thumbItems = document.querySelectorAll ('.thumb .thumb-item')

    if(type === 'next'){
        list.appendChild(listItems[0])
        thumb.appendChild(thumbItems[0])
        container.classList.add('next')
    } else {
        list.prepend(listItems[listItems.length - 1])
        thumb.prepend(thumbItems[thumbItems.length -1] )
        container.classList.add('prev')
    }

    setTimeout(() => {
        container.classList.remove('next')
        container.classList.remove('prev')
    }, 500);

}

thumb.addEventListener('click', (e) => {
    const clickedThumb = e.target.closest('.thumb-item')
    if (!clickedThumb) return

    const thumbItems = Array.from(thumb.children)
    const index = thumbItems.indexOf(clickedThumb)

    // último item = ativo
    const activeIndex = thumbItems.length - 1
    if (index === activeIndex) return

    container.classList.add('next')

    // Rotaciona para que o clicado vire o ÚLTIMO
    const newThumbOrder = [
        ...thumbItems.slice(index + 1),
        ...thumbItems.slice(0, index + 1)
    ]

    const listItems = Array.from(list.children)
    const newListOrder = [
        ...listItems.slice(index + 1),
        ...listItems.slice(0, index + 1)
    ]

    thumb.innerHTML = ''
    list.innerHTML = ''

    newThumbOrder.forEach(item => thumb.appendChild(item))
    newListOrder.forEach(item => list.appendChild(item))

    setTimeout(() => {
        container.classList.remove('next')
    }, 500)
})