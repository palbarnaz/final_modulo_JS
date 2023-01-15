const formularioRecados = document.getElementById('formulario-recados')
const tbody = document.getElementById('recados')


document.addEventListener('DOMContentLoaded', ()=> {
  
  if (!usuario) {
    window.location.href = 'index.html'
  } else {
    atualizarTabela()
  }
  
})

// buscar lista no sistema 

let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

// buscar usuario logado no sistema
const usuario = localStorage.getItem('usuarioLogado');

// Informações do usuário logado
let infoUsuario = listaUsuarios.find((valor) => valor.login === usuario);

function salvarRecado(objeto) {
   
infoUsuario.listaRecados.push(objeto)

  const usuarios = listaUsuarios.map((usuario) => {
    if (usuario.login === infoUsuario.login) {
     
     return infoUsuario;  
  
    }
    return usuario
  })
  
  // pegando o retorno do map, mando o objeto da pessoa logada, já atualizado, para o LocalStorage.
  let mandarObjeto = JSON.stringify(usuarios) 
 
  localStorage.setItem('usuarios', mandarObjeto)
}
formularioRecados.addEventListener('submit', (e)=> {
  e.preventDefault()
  
  const descricao = document.getElementById('descricao').value

  const detalhe = document.getElementById('detalhe').value
  
  const novoRecado = {
     descricao: descricao,
     detalhe: detalhe,
  }
  salvarRecado(novoRecado)

  formularioRecados.reset()

  atualizarTabela()

})

function atualizarTabela(){
  tbody.innerHTML = ''

  infoUsuario.listaRecados.forEach((recado,index) => {
    tbody.innerHTML += `
    <tr id="${index}" >
          <th>${index+1}</th>
          <td>${recado.descricao}</td>
          <td>${recado.detalhe}</td>
          <td><button class="button-apagar" onclick="apagarRegistro(${index})" >Apagar</button><button class="button-editar"  onclick="editarRegistro(${index})" >Editar</button></td>
    </tr>
  `
  })
}

function apagarRegistro(indice) {
  // remover da lista de registros
  let listaAtualizada = infoUsuario.listaRecados.filter((valor, index)=> index != indice)


  let usuarios = listaUsuarios.map((usuario) => {
    if (usuario.login === infoUsuario.login) {
      infoUsuario.listaRecados = listaAtualizada 
     return infoUsuario;  
   
    }
    return usuario
  })
  
 localStorage.setItem('usuarios', JSON.stringify(usuarios) ) 
  
  // atualizar o localstorage

  // remover do html
  let trRemover = document.getElementById(indice)
  trRemover.remove()
  atualizarTabela()
  
}
function sairDoSistema(){
  localStorage.removeItem('usuarioLogado')
  window.location.href = "index.html";
}

function buscarRecado(indice){
  let recado = infoUsuario.listaRecados.find((valor, index)=> index === indice)
  return recado
}

function editarRegistro(indice){
  const linhaEditar = document.getElementById(indice)
  const recado = buscarRecado(indice)

   linhaEditar.innerHTML = `
   
      <tr>
          <th>${indice+1}</th>
          <td><input class="editar-descricao" type="text" name="descricao" id="descricao-${indice}" value="${recado.descricao}"/></td>
          <td> <input class="editar-detalhe" type="text" name="detalhe" id="detalhe-${indice}" value="${recado.detalhe}" /></td>
          <td><button class="button-editar"  onclick="editarRecado(${indice})">Editar</button></td>
      </tr>
   `
}
function editarRecado(indice){
  
  const novaDescricao = document.getElementById(`descricao-${indice}`).value
  const novoDetalhe = document.getElementById(`detalhe-${indice}`).value
  
  const recadoEditar = buscarRecado(indice)
  recadoEditar.descricao =  novaDescricao
  recadoEditar.detalhe = novoDetalhe

  atualizarTabela()

  infoUsuario.listaRecados[indice] = recadoEditar

  let usuarios = listaUsuarios.map((usuario) => {
    if (usuario.login === infoUsuario.login) {
       infoUsuario.listaRecados
     return infoUsuario;  
   
    }
    return usuario
  })
  

 localStorage.setItem('usuarios', JSON.stringify(usuarios) ) 
 
}