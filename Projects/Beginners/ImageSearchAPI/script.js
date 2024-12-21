const searchForm = document.querySelector('form');
const imageContainer = document.querySelector('.image-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

const accessKey = `pmjorCBwhlIpT79qut_dpcUgkST4guGWCfT9RIem9mY`;

let page = 1;
//function to fetch images using Unsplash API
const fetchImages = async (query,pageNo)=>{

    try {
        // imageContainer.innerHTML = `Fetching Images of your Search`;
    if(pageNo === 1){
        imageContainer.innerHTML = "";
    }
    // console.log(query);
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data =  await response.json();

    if(data.results.length > 1){
        data.results.forEach( photos => {

            //creating imageDiv 
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photos.urls.regular}
            ">`;
    
            //createing overlay
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');
    
            //creating overlayText
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photos.alt_description}`;
    
            //appending
            imageElement.appendChild(overlayElement);
            overlayElement.appendChild(overlayText);
            imageContainer.appendChild(imageElement);
        });
        // console.log(data);
    
        //to make button dispaly none when reached lastPage
        if(data.total_pages === pageNo){
            loadMoreBtn.style.display = "none";
        }   else{
            loadMoreBtn.style.display = "block";
        }
    }   else{
        imageContainer.innerHTML = `<h2>search properly</h2>`
    }
   
    } catch (error) {
        imageContainer.innerHTML = `<h2>Try Again Later , Check Internet Connection</h2>`;
    }
}


//Adding EverntListener to search form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log(searchInput.value);
    
    const inputText = searchInput.value.trim();
    if(inputText !== ""){
        page = 1;
        fetchImages(inputText,page);
    } else{
        imageContainer.innerHTML = `<h2>Search something</h2>`
    }
})

//Adding EventListener to LoadMore button to fetch more Images
loadMoreBtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(),++page);
});