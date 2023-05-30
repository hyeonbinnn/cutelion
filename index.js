const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const clear = document.querySelector('.clear');

// item을 로컬스토리지에 저장하기
let todos = [];

const save = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// 버튼의 부모요소 찾고 target에 저장한 뒤에 문서에서 삭제하기
const delItem = (event) => {
  const target = event.target.parentElement;

  // todos 배열에서 해당 id값을 가진 요소를 찾아서 삭제하고 그 요소가 삭제된 새로운 배열을 다시 저장
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  save();

  target.remove();
};

// 전체 삭제
const allClear = () => {
  localStorage.clear('todos', JSON.stringify(todos));
  let ul = (document.querySelector('ul').innerHTML = '');
};

// 입력받은 text로 취급하는 input 값이 비어있지 않으면, html의 새로운 요소(li)로 만들어 문서에 추가
const addItem = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li');

    // text를 별도의 span으로 묶기 위해 생성
    // 개별 삭제, 체크 button 생성
    const button = document.createElement('button');
    const span = document.createElement('span');
    const check = document.createElement('button');

    check.innerText = '✔';
    check.classList.add('btn-check');
    span.innerText = todo.text;
    button.innerText = '✘';
    button.classList.add('btn-x');

    // 버튼에 이벤트 달기
    button.addEventListener('click', delItem);
    clear.addEventListener('click', allClear);
    check.addEventListener('click', () => {
      li.classList.toggle('complete');
    });

    // li 요소의 자식으로 구성
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    // 생성한 리스트 요소의 id값을 todo가 가지고 있는 id값으로 지정
    li.id = todo.id;
  }
};

// submit 이벤트가 일어날 때 preventDefault를 통해 페이지가 새로고침 안 되게 하기
const handler = (event) => {
  event.preventDefault();

  // todo라는 객체로 포장하기
  const todo = {
    id: Date.now(),
    text: input.value,
  };

  // todos라는 배열에 추가
  todos.push(todo);

  // addItem을 호출하면서 input 값 넘겨주기
  addItem(todo);

  // 저장 호출
  save();

  // input 창을 공백으로 초기화
  input.value = '';
};

// 새롭게 페이지를 로드할 때 만약에 로컬스토리지에 저장된 기본 정보가 있다면 해당 정보를 알아서 생성해서 나오도록 하기
const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos'));

  if (userTodos) {
    userTodos.forEach((todo) => {
      addItem(todo);
    });

    todos = userTodos;
  }
};

init();

// form이 submit 이벤트가 일어날 때, handler 함수 동작
form.addEventListener('submit', handler);

// Date() 오늘 날짜 가져오기
const today = new Date();

const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);

document.getElementById('current-date').innerHTML = year + '.' + month + '.' + day;
