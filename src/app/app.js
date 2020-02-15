import '../scss/index.scss';

    Array.from(document.querySelectorAll('.sidebar>ul>li'),li => {
        
        li.onclick = function(e){
           [...document.getElementsByTagName("li")].forEach((elm)=>{
             elm.classList.remove('selected');
           })
           li.classList.toggle('selected');
        }
      })

