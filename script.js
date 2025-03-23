const contain = document.querySelector(".container");
const filtered = document.querySelector(".filter");
const seeMore = document.querySelector(".seeMore");
const btn = document.querySelector(".btn");
const logo = document.querySelector(".logo");
const navHeader = document.querySelector(".nav-header");
const imageBtn = document.querySelector(".image-btn");
const videoBtn = document.querySelector(".video-btn");

let per_page = 12;

logo.addEventListener('click', () => {
    navHeader.classList.toggle('active');
});

let query = "flower";
let page = 1 ;
let category = "image";
filtered.addEventListener("click",()=>{
    
    filtered.textContent=filtered.textContent==="image"? "video":"image";
    category= filtered.textContent;
    imageSearch(query,page,per_page,category)
})

let apiKey = "JVDBkRf52zNUdYIH6P1pItNR8gQBuNT2GaxIqsgYVqE8HgbGHauHDkzY";

seeMore.addEventListener("click",()=>{
    per_page += per_page;
    imageSearch(query,page,per_page,category)
});

imageBtn.addEventListener("click", () => {
    category = "image";
    imageSearch(query, page, per_page, category);
    setActiveButton(imageBtn);
});

videoBtn.addEventListener("click", () => {
    category = "video";
    imageSearch(query, page, per_page, category);
    setActiveButton(videoBtn);
});

async function imageSearch(query,page,per_page,category) {
contain.innerHTML="";
    let api = "";
if(category==="image"){
    api= `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`;
}else if(category==="video"){
    api = `https://api.pexels.com/v1/videos/search?query=${query}&per_page=${per_page}&page=${page}`;
}
console.log(page);

let response = await fetch(api,{
    headers:{
        Authorization:apiKey,
    }
});
let data = await response.json();
console.log(data);
let result = data.photos;
let videos = data.videos;
console.log(videos)
// console.log(data.photos);

if(category==="image"){
    result.map((data)=>{

        let parent = document.createElement("a");
        parent.className="parent";
        parent.href = data.url;
        // console.log(data.src.medium)
        let image = document.createElement("img");
        image.src=data.src.original;

        // contain.append(image);
        let para = document.createElement("p");
        // para.textContent=data.alt;
        parent.append(image)
        contain.append(parent);
        
    })

}else if(category ==="video"){
    videos.map((data)=>{

let vidparent = document.createElement("div");
vidparent.className="vidparent";
let video = document.createElement("video");
video.controls = true;

video.src=data.video_files[1].link;

let vpara = document.createElement("p");
// vpara.textContent=data.alt;
vidparent.append(video,vpara);
contain.append(vidparent);
})

}


}
imageSearch(query,page,per_page,category);
let pagination = document.querySelector(".pagination");

for(let i=1; i<=20; i++){
    let button = document.createElement("button");
    button.className ="page";
    button.textContent= i ;
    pagination.append(button);

}
let allPage = document.querySelectorAll(".pagination button");
for(let button of allPage){
    button.addEventListener("click",(e)=>{
        page = e.target.textContent;
        imageSearch(query,page,per_page,category)
    })
}

btn.addEventListener("click",(ele)=>{
    let input = btn.previousElementSibling;
    if( input.value){
        query = input.value;
    imageSearch(query,page,per_page,category)
    }else{
        alert(".Please..Enter..")
    }
    input.value ="";
})

const signIn = document.querySelector(".sign-in-btn");
const signInForm = document.getElementById("signInForm");
const currentDate = document.getElementById("currentDate");

signIn.addEventListener('click', () => {
    signInForm.style.display = 'flex';

    const currentDate = new Date().toLocaleDateString();
    currentDate.value = currentDate;
});

// Close Sign In Form
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('signInForm').style.display = 'none';
});

// Handle Form Submission
document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const mobile = document.getElementById('mobile').value;
    const currentDate = document.getElementById('currentDate').value;

    // Here you can add code to store data (e.g., localStorage, API call, etc.)
    console.log('Form Data:', { fullName, mobile, currentDate });

    alert('Form submitted successfully!');
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('userForm').reset();
});