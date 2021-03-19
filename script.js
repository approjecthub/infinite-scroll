const filter = document.getElementById('filter');
const postsContainer = document.getElementById('posts-container');
const loader = document.getElementsByClassName('loader')[0];

let page = 1
let limit = 3
let totalpost = 100

async function getpost(){
    const posts = await fetch(`
    http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}
    `)
    const datas = await posts.json()
    datas.forEach(element => {
        const post = document.createElement('div');
        post.setAttribute('class','post');
        post.innerHTML = `
        <div class="number">${element.id}</div>
        <div class="post-info">
          <h2 class="post-title">${element.title}</h2>
          <p class="post-body">
            ${element.body}
          </p>
        </div>
        `
        postsContainer.appendChild(post)
    });
    totalpost -= 3
    filteredText()
}

function filteredText(){
    const filtertxt = filter.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post=>{
        const postheading = post.getElementsByClassName('post-title')[0].innerHTML;
        const postbody = post.getElementsByClassName('post-body')[0].innerHTML;
        if (postheading.toUpperCase().indexOf(filtertxt) > -1 || postbody.toUpperCase().indexOf(filtertxt) > -1) {
            post.style.display = "block";
          } else {
            post.style.display = "none";
          }
      
    })
}

getpost()

document.addEventListener('scroll', (element)=>{
    const top = document.documentElement.scrollTop ;
    const currentheight = document.documentElement.clientHeight;
    const totalheight = document.documentElement.scrollHeight;
    
    if (top + currentheight >= totalheight-2 && totalpost>0 ){
        loader.classList.add('show')
        
        setTimeout(()=>{
            loader.classList.remove('show')
            setTimeout(()=>{
                page++;
                getpost();
            },100)
        },1000)
    }
})

filter.addEventListener('keyup', filteredText)

