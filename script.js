const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sTelefone = document.querySelector('#m-telefone')
const sNomeResp = document.querySelector('#m-nomeresp')
const sEmailResp = document.querySelector('#m-emailresp')
const sTelResp = document.querySelector('#m-telresp')
const sCurso = document.querySelector('#m-curso')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sEmail.value = itens[index].email
    sTelefone.value = itens[index].telefone
    sNomeResp.value = itens[index].nomeresp
    sEmailResp.value = itens[index].emailresp
    sTelResp.value = itens[index].telresp
    sCurso.value = itens[index].curso
    id = index
  } else {
    sNome.value = ''
    sEmail.value = ''
    sTelefone.value = ''
    sNomeResp.value = ''
    sEmailResp.value = ''
    sTelResp.value = ''
    sCurso.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>
    <td>${item.nomeresp}</td>
    <td>${item.emailresp}</td>
    <td>${item.telresp}</td>
    <td>${item.curso}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sEmail.value == '' || sTelefone.value == '' || sNomeResp.value == '' || sEmailResp.value == '' || sTelResp.value == '' || sCurso.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].email = sEmail.value
    itens[id].telefone = sTelefone.value
    itens[id].nomeresp = sNomeResp.value
    itens[id].emailresp = sEmailResp.value
    itens[id].telresp = sTelResp.value
    itens[id].curso = sCurso.value
  } else {
    itens.push({'nome': sNome.value, 'email': sEmail.value, 'telefone': sTelefone.value, 'Responsável': sNomeResp.value, 'email resp': sEmailResp.value, 'telefone resp': sTelResp.value, 'curso': sCurso.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()