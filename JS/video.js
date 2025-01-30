// loadCategories function----->

const loadCategories = async() =>{
    const res= await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data=await res.json();
    displayCategories(data.categories);
}
loadCategories()


// remove function ----->
const removeActiveClass = () => {
    const buttons=document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}

// loadCategoriesVideo function------->
const loadCategoriesVideo= async(id)=>{

    // remove btn color --
    removeActiveClass()
    // add btn color -
    const btn=document.getElementById(`btn-${id}`)
    btn.classList.add('active')

    const res= await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data= await res.json();
    displayVideo(data.category);
}


// displayCategories function---->
const displayCategories=(data)=>{
    const categoriesContainer=document.getElementById('categories');
    data.forEach((item) => {
        // console.log(item)
        const categoriesDiv=document.createElement('div');
        categoriesDiv.innerHTML=`
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn px-5 category-btn">
        ${item.category}
        </button>
        `;
        categoriesContainer.appendChild(categoriesDiv) 
    });
}


// video loadVideo function------>
async function loadVideo(searchInput='') {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`);
    const data = await res.json();
    displayVideo(data.videos);
}

// search-input function---->
document.getElementById('search-input').addEventListener('keyup',(event)=>{
    loadVideo(event.target.value)
})

// timer function---->
function getTime(time) {
    let hour=parseInt(time/3600);
    let remSeconds=parseInt(time%3600);
    let minutes=parseInt(remSeconds/60);
    let seconds=parseInt(remSeconds%60)
    return `${hour+' hour '+minutes+' min '+seconds+' sec'}`
}

// video detail function--->
const videoDetail= async(videoId) =>{
    // console.log(videoId)
    const res=await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data=await res.json();
    displayDetail(data.video)
}

const displayDetail= (video)=>{
    console.log(video);
    const modalContainer=document.getElementById('modal-container')
    modalContainer.innerHTML =`
    <img src="${video.thumbnail}" alt="">
    <p>${video.description}</p>
    `
    // way-1
    document.getElementById('modal-btn').click()
    // way-2
    // document.getElementById('customModal').showModal();
}
// Video displayVideo function---->
const displayVideo=(data)=>{
    const videosContainer=document.getElementById('videos');
    videosContainer.innerHTML ='';
    if (data.length ===0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML =`
        <div class="min-h-[150px] w-full gap-3 flex flex-col justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h3 class="text-red-600 font-bold w-[430px] text-3xl text-center">Oops!! Sorry, There is no content here</h3>
        </div>
        `;
    }
    else{
        videosContainer.classList.add('grid')
    }
    data.forEach((item)=>{
        // console.log(item);
        const cardDiv=document.createElement('div');
        cardDiv.classList='card card-compact rounded'
        cardDiv.innerHTML=`
        <figure class="h-[200px] relative " >
           <img 
             src="${item.thumbnail}"
             class="w-full h-full object-cover rounded-lg "
             alt="Shoes" />
             ${
                item.others.posted_date?.length===0 ?"":`<span class="absolute right-3 bottom-3 bg-black px-3 rounded text-white">${getTime(item.others.posted_date)}</span>`
            }
        </figure>
        <div class="py-3 flex gap-3">
            <div >
                <img class="w-8 h-8 rounded-full object-cover" src="${item.authors[0].profile_picture}" alt="">
            </div>
            <div>
                <h2 class="font-semibold">${item.title}</h2>
                <div class="flex gap-3 items-center">
                  <p class="py-1 text-xs">${item.authors[0].profile_name}</p>
                  ${item.authors[0].verified===true ?`<img class="h-4 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"  alt="">`:""}
                </div>
                <p class="py-1 text-xs">${item.others.views} views</p>
                <button onclick="videoDetail('${item.video_id}')" class="my-1 btn btn-sm py-0 px-2 rounded-md  text-sm  text-white bg-orange-400">detail</button>
            </div>
        </div>    
        `;
        videosContainer.appendChild(cardDiv)
    })
}

loadVideo()