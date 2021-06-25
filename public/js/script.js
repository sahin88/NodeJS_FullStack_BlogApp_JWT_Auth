
var activate_page=1
try {
    var responsive_division= document.querySelector('.navigation-bar-routes');
    var icon_hamburger_button= document.querySelector('.fa-bars');
    const division_button=document.querySelector('.division-button');
    icon_hamburger_button.addEventListener('click',()=>{
    if(responsive_division.classList.contains('backing')){
        responsive_division.style.animation=''
        responsive_division.classList.remove('backing');

        responsive_division.classList.add('forward');
        }
    else{
        responsive_division.classList.remove('forward');
        responsive_division.classList.add('backing');
        responsive_division.style.animation='navbar_animation_back'
        
    }
})

function visitPage(page){
    let clicked_button=document.getElementById(`btn${page}`);
    let prev_button=document.getElementById(`btn${activate_page}`);
    prev_button.classList.remove('active');
    try {
     clicked_button.classList.add('active');
    } catch (error) {
        
    }
    
    activate_page=page;
    console.log("clicked button ", page)
    updatePagination(activate_page)
 
 }
 function updatePagination(activate_page){

     division_button.innerHTML=''
 
     for(let i=activate_page; i<activate_page+10; i++){
         var element = document.createElement("input");
           element.type = "button";
           element.value = i;
           element.name = i + 1;
           element.id = "btn" + i;
           element.className='pagination_button'
           if (i==activate_page){
             element.className='pagination_button active'
           }
           element.addEventListener('click', ()=>{visitPage(i)})
           division_button.appendChild(element);
           };
 
 
 
  var previous_button=document.createElement("input");
  previous_button.type='button';
  previous_button.value='Previous';
  previous_button.name='previous';
  previous_button.className='pagination_button';
  previous_button.addEventListener('click',()=>{visitPage(activate_page-1)});
  division_button.insertBefore(previous_button, division_button.firstChild)
  
 
  var next_button=document.createElement("input");
  next_button.type='button';
  next_button.value='Next';
  next_button.name='next';
  next_button.className='pagination_button';
  next_button.addEventListener('click',()=>{visitPage(activate_page+1)});
  division_button.appendChild(next_button)
         
         
 
 }
 
 updatePagination(activate_page);
 
 
 







// setInterval(() => {
//     console.log("merhaba dünya")
    
// }, 1000);

