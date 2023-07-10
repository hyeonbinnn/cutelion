const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const clear = document.querySelector('.clear');
let todos = []; // 할 일 목록을 저장하는 배열

// 로컬 스토리지에 todos 배열을 저장
const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// 할 일 목록을 삭제
const delTodo = (event) => {
  const target = event.target.parentElement;

  // todos 배열에서 해당 id값을 가진 요소를 찾아서 삭제하고 그 요소가 삭제된 새로운 배열을 다시 저장
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  saveTodo();

  target.remove();
};

// 할 일 목록 전체 삭제
const allClear = () => {
  localStorage.clear('todos', JSON.stringify(todos));
  ul.innerHTML = '';
};

// 할 일 추가하고, 화면에 표시
const addTodo = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li'); //새로운 li 요소를 생성
    const button = document.createElement('button'); // 삭제 버튼을 생성
    const span = document.createElement('span'); // 할 일 텍스트를 감싸기 위한 span 요소를 생성
    const check = document.createElement('button'); // 완료 체크 버튼을 생성

    check.innerText = '✔'; // 완료 체크 버튼의 텍스트를 설정
    check.classList.add('btn-check'); // 완료 체크 버튼에 CSS 클래스를 추가
    span.innerText = todo.text; // 할 일 텍스트를 설정
    button.innerText = '✘'; // 삭제 버튼의 텍스트를 설정
    button.classList.add('btn-x'); // 삭제 버튼에 CSS 클래스를 추가

    button.addEventListener('click', delTodo); // 삭제 버튼에 클릭 이벤트 리스너를 추가
    clear.addEventListener('click', allClear); // 전체 삭제 버튼에 클릭 이벤트 리스너를 추가

    // 할 일 완료 버튼을 클릭했을 때, 완료 상태를 토글하고 저장
    check.addEventListener('click', () => {
      li.classList.toggle('complete');
      todo.completed = !todo.completed; // 완료 상태를 반전시킴
      saveTodo();
    });

    // li 요소의 자식으로 구성
    li.appendChild(check); // li 요소에 완료 체크 버튼을 추가
    li.appendChild(span); // li 요소에 할 일 텍스트를 감싼 span 요소를 추가
    li.appendChild(button); // li 요소에 삭제 버튼을 추가
    ul.appendChild(li); // ul 요소에 li 요소를 추가

    // li 요소의 id 속성에 todo가 가지고 있는 고유 ID를 설정
    li.id = todo.id;

    // 로컬 스토리지에서 완료된 항목인 경우, 클래스를 추가하여 줄 그어진 상태로 표시
    if (todo.completed) {
      li.classList.add('complete');
    }
  }
};

// 폼 제출 이벤트 핸들러
const handleSubmit = (event) => {
  event.preventDefault();

  // 입력된 할 일을 todo 객체로 포장
  const todo = {
    id: Date.now(),
    text: input.value,
    completed: false, // 새로운 할 일은 완료되지 않은 상태로 초기화
  };

  // todos 배열에 추가
  todos.push(todo);

  // 화면에 할 일을 추가
  addTodo(todo);

  // todos 배열을 저장
  saveTodo();

  // 입력 필드를 초기화
  input.value = '';
};

// 초기화 함수
const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos'));

  if (userTodos) {
    // 새롭게 페이지를 로드할 때 만약에 로컬스토리지에 저장된 기본 정보가 있다면 해당 정보를 알아서 생성해서 나오도록 하기
    userTodos.forEach((todo) => {
      addTodo(todo);
    });

    todos = userTodos;
  }
};

// 초기화 함수를 실행하여 이전에 저장된 할 일 목록을 화면에 표시
init();

// form이 submit 이벤트가 일어날 때, handleSubmit 함수 동작
form.addEventListener('submit', handleSubmit);

// Date() 오늘 날짜 가져오기
const today = new Date();
const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(
  2,
  '0'
)}.${String(today.getDate()).padStart(2, '0')}`;

document.getElementById('current-date').textContent = formattedDate;
