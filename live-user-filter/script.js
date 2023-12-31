const result = document.getElementById('result');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loading');
let userNames = [];

filter.addEventListener('input', (e) => filterData(e.target.value));

getData();

async function getData() {
  const res = await fetch('https://randomuser.me/api?results=50');
  const { results } = await res.json();

  userNames = results.map((user, idx) => {
    return {
            index: idx,
            name: `${user.name.first} ${user.name.last}`,
            }
  });

  result.innerHTML = '';


  

  results.forEach(user => {
    const li = document.createElement('li');

    li.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `;

    result.appendChild(li);
  });
}

function filterData(searchTerm) {
  const liArray = result.querySelectorAll('li');

  userNames.forEach(item => {

      if(item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        liArray[item.index].classList.remove('hide');
      } else {     
        liArray[item.index].classList.add('hide');
      }
  })
}