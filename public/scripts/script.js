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
        window.open('/Data-handler/search',"_self");
    }else if(index === 4){
        window.open('/Data-handler/details',"_self");
    }
}


// for setting css when hovering on button
document.querySelectorAll('.header-tag-card-button').forEach((button, index) => {
    button.addEventListener('mouseover', ()=> {
        document.querySelector('.header-title').style.filter= 'invert()';
    });
    button.addEventListener('mouseout', ()=> {
        document.querySelector('.header-title').style.filter = '';
    });
});