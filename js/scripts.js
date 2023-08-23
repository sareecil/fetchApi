/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

const pagePosts = document.querySelector(".posts");
const detailPost = document.querySelector("postDetail")
const postPreview = document.querySelector(".postPreview");
const urlPrefix = 'https://jsonplaceholder.org/';
const requestPost = 'https://jsonplaceholder.org/posts';
const requestUsers = 'https://jsonplaceholder.org/users';
const urlDetailPost = 'https://jsonplaceholder.org/posts/';
const body = document.querySelector("body")

let posts = [];
let users = [];

async function loadData() {
    posts = await fetch('http://localhost:1337/api/posts/').then(x => x.json())
    users = await fetch(requestUsers).then(x => x.json())
    render()
}

function render() {
    for (const post of posts.data) {
        // const writer = users.find(x => x.id === post.userId)
        pagePosts.innerHTML +=`
            <div class="post-preview" data-id="${post.id}" >
                <a href="#" class="link">
                    <h2 class="post-title" id=${post.id}>${post.attributes.title}</h2>
                    <h3 class="post-subtitle">${post.attributes.summary}</h3>
                </a>
              
            </div>
        `
    //     <p class="post-meta">                
    //     <span>${writer.firstname} ${writer.lastname}</span>                
    // </p>
        bindClick()
    };
        
}

function renderDetailPost(postDetail, postComment) {
    body.innerHTML = "";
    // const comments = postComment.map(x => `
    //     <div class="comment">
    //         <h5>${x.comment}</h5>
    //     </div>
    // `)
    body.innerHTML = `
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="index.html">Start Bootstrap</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto py-4 py-lg-0">
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Sample Post</a></li>
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Page Header-->
    <header class="masthead" style="background-image: url('assets/img/post-bg.jpg')">
        <div class="container position-relative px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <div class="post-heading">
                        <h1>${postDetail.data.attributes.title}</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            ${postDetail.data.attributes.createdAt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Post Content-->
    <article class="mb-4">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="postDetail col-md-10 col-lg-8 col-xl-7">
                    <p> ${postDetail.data.attributes.content}</p>
                </div>
            </div>
            <h3>Comments</h3>
            <div class="comments">
                <p>${postComment.data.attributes.comment}</p>
            </div>
          
        </div>
    </article>
    <!-- Footer-->
    <footer class="border-top">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <ul class="list-inline text-center">
                        <li class="list-inline-item">
                            <a href="#!">
                                <span class="fa-stack fa-lg">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#!">
                                <span class="fa-stack fa-lg">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://github.com/sareecil">
                                <span class="fa-stack fa-lg">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <div class="small text-center text-muted fst-italic">Copyright &copy; Your Website 2023</div>
                </div>
            </div>
        </div>
    </footer>
       
    `
}

function bindClick() {
    document.querySelectorAll(".post-preview a").forEach(x => x.addEventListener("click", postClick))

}

async function postClick(e) {
    e.preventDefault();
    await pageDetail(e.target.parentElement.parentElement.dataset.id)
}


async function pageDetail(postId) {
    const postDetail = await fetch('http://localhost:1337/api/posts/' + postId + '?populate=hero').then(x => x.json());
    console.log(postDetail);
    const postComment = await fetch('http://localhost:1337/api/commets/' + postId).then(x => x.json());
    console.log(postComment);
    renderDetailPost(postDetail, postComment)
    console.log(urlDetailPost + postId);
    // https://jsonplaceholder.org/comments?postId=1
    // console.log(postComment)
    
   
}

loadData()


