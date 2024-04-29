const allButtons = document.querySelectorAll(".header-tag-card-button");

allButtons.forEach((button,index)=>{
    button.addEventListener('click',()=>{
        takeMeToNextPage(index);
    })
})

function takeMeToNextPage(index)
{
    if (index === 0){
        window.open('/',"_self");
    }else if(index === 1){
        window.open('https://discord.gg/spHgh4PGzF');
    }else if(index === 2){
        window.open('/Data-Handler/new',"_self");
    }else if(index === 3){
        window.open('/Data-handler/details',"_self");
    }
}


// for setting css when hovering on button
document.querySelectorAll('.header-tag-card-button').forEach((button, index) => {
    button.addEventListener('mouseover', function() {
        addCSS(index); // Pass the index to addCSS
    });
    button.addEventListener('mouseout', function() {
        removeCSS(index); // Clear the style or do other actions on mouse out
    });
});

function addCSS(index){
    const title = document.querySelector('.header-title');
    if (index === 0){
        title.style.background = 'linear-gradient(90deg, rgba(255,135,135,1) 0%, rgba(98,0,255,1) 48%, rgba(197,160,255,1) 100%)';
    } else if (index === 1) {
        title.style.background = 'linear-gradient(90deg, rgba(0,255,135,1) 0%, rgba(255,0,98,1) 48%, rgba(160,197,255,1) 100%)';
    } else if (index === 2) {
        title.style.background = 'linear-gradient(90deg, rgba(135,0,255,1) 0%, rgba(255,255,0,1) 48%, rgba(255,197,160,1) 100%)';
    } else if (index === 3) {
        title.style.background = 'linear-gradient(90deg, rgba(0,135,255,1) 0%, rgba(255,197,0,1) 48%, rgba(197,160,255,1) 100%)';
    }
}

function removeCSS(){
    const title = document.querySelector('.header-title');
    title.style.background = '';
}