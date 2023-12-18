function readAdvertisementsFromDB() {
    const url = '/advertisement';
  
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        resolve(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
        reject(error);
      }
    });
  }

async function showAdvertisements(){
    try{
        let advertisements = await readAdvertisementsFromDB();
        const advertisementTemplate = document.getElementById('advertisement-template');
        const advertisementpPototype = advertisementTemplate.content.getElementById('advertisement');
        const aca = document.getElementsByClassName('advertisement');
        const advertisementList = document.getElementById('advertisement-list');
        for(let advertisement of advertisements){
            const clone = advertisementpPototype.cloneNode(true);
            clone.getElementsByClassName('advertisement-list-title')[0].value = advertisement.title;
            clone.getElementsByClassName('advertisement-list-title')[0].disabled = 'true';
            clone.id = advertisement._id;
            advertisementList.appendChild(clone);
        }

    }catch (error) {
        console.log("Došlo je do greške prilikom prikaza konkursa ");
    }
}
showAdvertisements();

async function addAdvertisementInDB(title, text, date, type){
    console.log(date)
    let response = await fetch('/advertisement/new', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            title: title,
            text: text,
            date: date,
            type: type
        })
    })
    
    if(response.status == 201){
        let data = await response.json();
        // console.log(data);
    }
}

async function addEventListenerAdvertisementSubmitButton(){
    const advertisementSubmitButton = document.getElementById('add-btn-form');
    if(advertisementSubmitButton.hasClickListener != true){
        advertisementSubmitButton.addEventListener('click', async function(){
            const titleInput = document.getElementById('form-first-input');
            const textInput = document.getElementById('form-second-input');
            const dateInput = document.getElementById('form-third-input');
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            const title = titleInput.value;
            const text = textInput.value;
            const date = dateInput.value;
            let type = radioButtons[0].value;
            for(let radioButton of radioButtons){
                if (radioButton.checked){
                    type = radioButton.value;
                }
            }
            try {
                // console.log(title + "\n" + text)
                await addAdvertisementInDB(title, text, date, type);
            } catch (error) {
                console.log("Došlo je do greške: gggggg");
            }
        })
    }
}

function showForm(){
    let addBtn = document.getElementById('add-btn');
    let form = document.getElementById('form');
    let formAround = form.parentElement;
    addBtn.addEventListener('click', (e)=>{
        formAround.classList.remove('none');
        whenRadioButtonIsChanged();
        addEventListenerAdvertisementSubmitButton();
    })
}
showForm();

function closeForm(){
    let clearBtn = document.getElementById('clear-btn');
    // console.log(clearBtn)
    clearBtn.addEventListener('click', ()=>{
        location.reload();
    })
}
closeForm();

function changeForm(radioButton){
    let formFirstInput = document.getElementById('form-first-input');
    let formSecondInput = document.getElementById('form-second-input');
    let formThirdInput = document.getElementById('form-third-input');

    if(radioButton.value == 'konkurs'){
        formThirdInput.disabled = '';
        formFirstInput.placeholder = 'Naslov'
        formSecondInput.placeholder = 'Text'

    }else if(radioButton.value == 'vest'){
        formThirdInput.disabled = 'true';
        formFirstInput.placeholder = 'Naslov'
        formSecondInput.placeholder = 'Text'
        console.log(formThirdInput.value)
        formThirdInput.value = ''
    }else{
        formFirstInput.placeholder = 'Ime i Prezime'
        formSecondInput.placeholder = 'Opis'
        formThirdInput.disabled = 'true';
        formThirdInput.value = ''
    }
}

function whenRadioButtonIsChanged(){
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    for(let radioButton of radioButtons){
        radioButton.addEventListener('change',()=>{
            changeForm(radioButton);
        })
    }
}