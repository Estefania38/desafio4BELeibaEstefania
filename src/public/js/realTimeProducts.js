const socketClient = io();

socketClient.on("enviodeproductos", (obj) => {
  const list = document.querySelector('#list-products')
  console.log(obj);
    list.innerHTML = ''
  obj.forEach((product) => {
    list.innerHTML += `
            <article class="container">
          <div class="card">
            <div class="imgBx">
              <img src="${product.thumbnail}" width="90px" />
            </div>
            <div class="contentBx">
              <h2>${product.title}</h2>
              <div class="size">
                <h3>${product.description}</h3>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="color">
                <h3>${product.price}</h3>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <a href="#">Buy Now</a>
            </div>
          </div>      
        </article>          
            `;
      });
});

