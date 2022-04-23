const parseJSON = async (url) =>{
    const response = await fetch(url);
    return response.json()
}

const swiperSlideComponent = ({ title, filename, photographersName }) =>{
    return `
        <div class='swiper-slide'>
            <h2>${title}</h2>
            <img src="/pub/img/${filename}">
 
        </div>
    `
}

const swiperComponent = (data,comp) => {
    return`
        <div class="swiper">        
            <div class="swiper-wrapper">
                ${data.map(img=>comp(img)).join('')}
            </div>
        
        </div>        
    `
}

const formComponent = () => {
    return `
        <div class='container'> 
            <form id='form'>       
                <label for='url'>Url:</label>
                <input type='text' id='url' name='url'> 
                <label for='title'>Title:</label>
                <input type='text' id='title' name='title'> 
                <label for='uploadDate'>Date:</label>
                <input type='date' id='uploadDate'name='uploadDate'> 
                <label for='photographersName'>Photographer's name:</label>
                <input type='text' id='photographersName' name='photographersName'> 
                <label for='picture'>New Picture:</label>
                <input type='file' id='picture' name='picture'>
                <div class='btn-container'>
                    <button class='send'>Send</button>
                    <button class='delete'>Delete</button>
                </div>
            </form>
        </div>
    
    `
}

const loadEvent = async () => {

    const rootElement = document.getElementById('root')
    
    const result = await parseJSON('image-list')
    
    rootElement.insertAdjacentHTML('beforeend', swiperComponent(result,swiperSlideComponent))
    rootElement.insertAdjacentHTML('beforeend', formComponent())
    const formElement = document.getElementById('form')

    const swiper = new Swiper('.swiper', {
        loop: true,
    })

    console.log(formElement)

    formElement.addEventListener('submit', (e)=>{
        e.preventDefault()

        const formData = new FormData()

        formData.append('url', e.target.querySelector(`input[name='url']`).value)
        formData.append('title', e.target.querySelector(`input[name='title']`).value)
        formData.append('uploadDate', e.target.querySelector(`input[name='uploadDate']`).value)
        formData.append('photographersName', e.target.querySelector(`input[name='photographersName']`).value)
        formData.append('picture', e.target.querySelector(`input[name='picture']`).files[0]);

        const fetchSettings = {
            method: "POST",
            body: formData
        }

        fetch('/', fetchSettings)
            .then(async data =>{
                if(data.status === 200){
                    const res = await data.json()
                    document.getElementById('picture').outerHTML = `img src='/pub/img/${filename}'`
                }
            })


    })



    
}
window.addEventListener('load', loadEvent)