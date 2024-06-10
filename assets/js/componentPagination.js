const pagination=document.querySelector('.pagination');
const paginationPrev=document.querySelector('.pagination .prev');
const paginationNext=document.querySelector('.pagination .next');
pagination.addEventListener('click',e=>{
    if((e.target.nodeName!=='LI')&&(e.target.nodeName!=='A')&&(e.target.nodeName!=='IMG')){
        return
    }
    if((e.target.nodeName==="LI"||e.target.nodeName==="A")&&e.target.closest('a').className.includes('page-num')){
        [...pagination.children].forEach(item=>{
            item.children[0].classList.remove('active');
        })
        e.target.classList.add('active');
    }else{
        if(e.target.closest('a').className.includes('page-prev')){
            for (let i = 2; i < pagination.childElementCount-1; i++) {
                if(pagination.children[i].children[0].className.includes('active')){
                    pagination.children[i].children[0].classList.remove('active');
                    pagination.children[i-1].children[0].classList.add('active');
                    break;
                }
            }
        }else if(e.target.closest('a').className.includes('page-next')){
            for (let i = 1; i < pagination.childElementCount-2; i++) {
                if(pagination.children[i].children[0].className.includes('active')){
                    pagination.children[i].children[0].classList.remove('active');
                    pagination.children[i+1].children[0].classList.add('active');
                    break;
                }
            }
        }
    }
})
