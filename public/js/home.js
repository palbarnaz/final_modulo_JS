const listaRecados = []
const formularioRecados = document.getElementById('formulario-recados')
const tbody = document.getElementById('recados')


// buscar usuario no sistema 





formularioRecados.addEventListener('submit', (e)=> {
  e.preventDefault()
  
  const descricao = document.getElementById('descricao').value

  const detalhe = document.getElementById('detalhe').value
  
  const novoRecado = {
     descricao: descricao,
     detalhe: detalhe,
  }
  
  listaRecados.push(novoRecado)
  formularioRecados.reset()

  atualizarTabela()

})

function atualizarTabela(){
  tbody.innerHTML = ''

  listaRecados.forEach((recado,index) => {
    tbody.innerHTML += `
    <tr>
          <th>${index+1}</th>
          <td>${recado.descricao}</td>
          <td>${recado.detalhe}</td>
          <td><button class="button-apagar">Apagar</button><button class="button-editar">Editar</button></td>
    </tr>
  `
  })
}