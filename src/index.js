document.addEventListener('DOMContentLoaded', ()=>{
fetch("http://localhost:3000/characters")
.then(res=>res.json())
.then(characters => {
    const characterBar = document.getElementById("character-bar")
    const img = document.getElementById('image')
    const Info = document.getElementById('characterInfo')
    const characterName = document.getElementById("name")
    const vote = document.getElementById("vote-count")
    const votesForm = document.getElementById("votes-form")
    const resetBtn = document.getElementById("reset-btn")

   let selectedCharacter = null

    characters.forEach(character => {
    let card = document.createElement('li')
    card.className = "Card"
    card.textContent = character.name 

    card.addEventListener("click",() => {
        selectedCharacter = character
        characterName.textContent = character.name
        img.src = character.image
        vote.textContent = character.votes
        Info.style.display = "block"
    })
    characterBar.appendChild(card)

    });
votesForm.addEventListener("submit", (event) =>{
    event.preventDefault()
    if(selectedCharacter){
    const newVotes = parseInt(event.target.votes.value,10)
    if(!isNaN(newVotes)){
        selectedCharacter.votes+=newVotes
        vote.textContent = selectedCharacter.votes
     
        fetch(`http://localhost:3000/characters/${selectedCharacter.id}`,{
            method:"PATCH",
            headers : {
                     "content-Type" : "application/json",
            },
                    
                    body:JSON.stringify({votes:selectedCharacter.votes})   
               })
             }
        event.target.reset()
        }
      })
   resetBtn.addEventListener("click", ()=>{
    if(selectedCharacter){
        selectedCharacter.votes = 0
        vote.textContent = 0
    fetch(`http://localhost:3000/characters/${selectedCharacter.id}`,{
        method: "PATCH",
        headers:{
            "content-Type":"application/json",
        },
        body: JSON.stringify({votes:0})
    })
   }

})
})

})
