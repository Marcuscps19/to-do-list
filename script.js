const btnAddTask = document.getElementById('criar-tarefa');
const btnMoveUp = document.getElementById('mover-cima');
const btnMoveDown = document.getElementById('mover-baixo');
const btnClearTasks = document.getElementById('apaga-tudo');
const btnRemoveCompletedTasks = document.getElementById('remover-finalizados');
const btnRemoveSelected = document.getElementById('remover-selecionado');
const btnSaveTasks = document.getElementById('salvar-tarefas');
const inputTasks = document.getElementById('texto-tarefa');
const listOfTasks = document.getElementById('lista-tarefas');
const listItems = document.getElementsByClassName('item-lista');
const errorSpan = document.getElementById('error');

function clearInput() {
  inputTasks.value = '';
}

function saveTasks() {
  localStorage.setItem('tasks', listOfTasks.innerHTML);
}

function removesBackgroundColor() {
  for (let index = 0; index < listItems.length; index += 1) {
    listItems[index].classList.remove('selected');
    listItems[index].style.setProperty('background-color', 'transparent');
  }
}

function changeBgColor(event) {
  removesBackgroundColor();
  event.target.classList.add('selected');
  event.target.style.setProperty('background-color', 'rgb(128, 128, 128)');
}

function streakItem(event) {
  event.target.classList.toggle('completed');
}

function createListItem() {
  const listItem = document.createElement('li');
  listItem.classList.add('item-lista');
  return listItem;
}

function updateListItemsListeners() {
  for (let index = 0; index < listItems.length; index += 1) {
    listItems[index].addEventListener('click', changeBgColor);
    listItems[index].addEventListener('dblclick', streakItem);
  }
  if (listItems.length > 1) {
    btnMoveDown.disabled = false;
    btnMoveUp.disabled = false;
  }
}

function addInputValuesToListItem(listItem) {
  const item = listItem;
  item.innerText = inputTasks.value;
}

function isInvalidTask() {
  return inputTasks.value === '';
}

function addsTaskToList() {
  if (isInvalidTask()) {
    errorSpan.innerText = 'Escreva uma tarefa';
    return 0;
  }
  const listItem = createListItem();
  addInputValuesToListItem(listItem);
  listOfTasks.appendChild(listItem);
  updateListItemsListeners();
  clearInput();
}

function clearTasks() {
  listOfTasks.innerHTML = '';
  localStorage.removeItem('tasks');
}

function removeCompletedTasks() {
  const completedTasks = document.querySelectorAll('.completed');
  for (let index = 0; index < completedTasks.length; index += 1) {
    listOfTasks.removeChild(completedTasks[index]);
  }
  saveTasks();
}

function getSavedTasks() {
  listOfTasks.innerHTML = localStorage.getItem('tasks');
  updateListItemsListeners();
}

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.previousSibling != null) {
    listOfTasks.insertBefore(selected, selected.previousSibling);
  }
}
function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.nextSibling !== null) {
    listOfTasks.insertBefore(selected.nextSibling, selected);
  }
}

function removeSelected() {
  const selected = document.querySelector('.selected');
  listOfTasks.removeChild(selected);
  saveTasks();
}

function clearError() {
  errorSpan.innerText = '';
}

window.onload = getSavedTasks;

btnAddTask.addEventListener('click', addsTaskToList);
btnClearTasks.addEventListener('click', clearTasks);
btnRemoveCompletedTasks.addEventListener('click', removeCompletedTasks);
btnSaveTasks.addEventListener('click', saveTasks);
btnMoveUp.addEventListener('click', moveUp);
btnMoveDown.addEventListener('click', moveDown);
btnRemoveSelected.addEventListener('click', removeSelected);
inputTasks.addEventListener('click', clearError);
