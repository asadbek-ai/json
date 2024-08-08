const wrapper = document.querySelector("#wrapper-users")
const url = "http://localhost:3000/users"
async function getUsers(url) {
    try{
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data)
        renderUsers(data)
    }
    catch(error){
        console.error('Error:', error);
    }
}
getUsers("http://localhost:3000/users")


function showAction(id){
 const actionWrapper = document.querySelectorAll(".action-wrapper")
//  const actionBtn = document.querySelectorAll(".action-btn")
 actionWrapper.forEach(item => {
   const actionCont = item.querySelector('.action-content')
   if(actionCont.dataset.id==id){
      if(actionCont.classList.contains("hidden")){
        actionCont.classList.add("flex")
        actionCont.classList.remove("hidden")
      }
      else if(actionCont.classList.contains("flex")){
        actionCont.classList.remove("flex")
        actionCont.classList.add("hidden")

      }
    }
    })
}
function renderUsers(array){
  wrapper.innerHTML = "";
  array.forEach((user,index) => {
    wrapper.innerHTML += `
    <tr class="w-full">
        <td class="border-[1px] px-5 py-3 text-center">${index+1}</td>
            <td class="border-[1px] px-5 py-3 text-left">
                  <div class="flex gap-3">
                    <div>
                      <img class="w-[50px]  object-cover max-h-[50px] min-h-[50px] rounded-full" src="${user.image}" alt="" />
                    </div>
                    <div class="flex flex-col">
                      <span>${user.firstname}</span>
                      <span>${user.lastname}</span>
                    </div>
                  </div>
            </td>
        <td class="border-[1px] px-5 py-3 text-left">
                  ${user.email}
        </td>
        <td class="border-[1px] px-5 py-3 text-left">${user.phoneNumber}</td>
        <td onclick = {showAction(${user.id})} class=" border-[1px] px-5 py-3 text-center ">
        <div  class="action-wrapper h-full relative ">
        <div><button onclick = {showAction(${user.id})}  class="action-btn"><i class='bx bx-dots-horizontal-rounded text-[30px]'></i></button></div>
        <div data-id=${user.id} class="action-content flex-row items-center justify-center gap-[6px] inset-0 bg-white absolute hidden">
        <button onclick={deleteUser(${user.id})} class="btn bg-blue-800"><i class='bx bx-trash text-[25px]'></i></button>
        <button onclick={showModal(${user.id})} class="btn bg-red-800"><i class='bx bx-edit-alt text-[25px]' ></i></button>
        </div>
        </div>
 
        </td>
    </tr>
    `
  });
}
async function deleteUser(id){
    try{
        const res = await fetch(`${url}/${id}`,{
            method: 'DELETE'
        })
        getUsers(url)
        }
    catch(error){
        console.error('Error:', error);
    }
}


 function showModal(id){
   const modal = document.querySelector("#modal")
   const addBtn = document.querySelector("#add-btn")
   modal.classList.remove("hidden")
   modal.classList.add("flex")
 }
 function closeModal(){
  const modal = document.querySelector("#modal")
  const addBtn = document.querySelector("#add-btn")
  modal.classList.remove("flex")
  modal.classList.add("hidden")
 }

 const formModal = document.querySelector("#form-modal")
formModal.addEventListener("submit", (e)=>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries())
  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response=>{
    getUsers(url)
  }).catch(error=>{
    console.error('Error:', error);
  })
} )

// renderUsers(newUser)s

