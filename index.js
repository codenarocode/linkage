let myLinks=[]
const inputEl = document.querySelector("#input-el")
const inputName= document.querySelector("#input-name")
const inputBtn=document.querySelector("#input-btn")
const ulEl= document.querySelector("#ul-el")
const deleteBtn=document.querySelector("#delete-btn")
const  tabBtn=document.querySelector("#tab-btn")
const warn=document.querySelector("h5")
const storedItem = JSON.parse(localStorage.getItem("myLinks"))
if(storedItem){
    myLinks= storedItem
    render(myLinks)
    deleteBtn.style.display='block'
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true , currentWindow: true}, function(tabs){
       inputEl.value=tabs[0].url
     })
    
})


function render(links){
    let listItems=""

    for(let i=0;i<links.length;i++){
     listItems+= `<li>${links[i]}</li>`
      }
    ulEl.innerHTML= listItems
    
}


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLinks=[]
    ulEl.innerHTML=""
    deleteBtn.style.display='none'
})


inputBtn.addEventListener("click",function(){
    let name= inputName.value
    let link= inputEl.value
if(!link || !name){
     if(!link){
        inputEl.placeholder= "*Please add URL"
        inputEl.classList.add('change-color')
        
     }

     if(!name){
        inputName.placeholder= "*Please add name"
        inputName.classList.add('change-color')
        
     }
    return
}
    inputEl.placeholder="URL"
    inputName.placeholder="Name"
    inputEl.classList.remove('change-color')
    inputName.classList.remove('change-color')
    let content= ` <a target="_blank" href="${link}">${name}</a>`
    myLinks.push(content)
    inputName.value=''
    inputEl.value=''
    localStorage.setItem("myLinks" ,  JSON.stringify(myLinks))
    if(myLinks.length===1){
        deleteBtn.style.display='block'
    }
    render(myLinks)
})
