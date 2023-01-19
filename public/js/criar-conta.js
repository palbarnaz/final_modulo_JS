// CRIAR CONTA
const create = document.getElementById('create-form');
const usuario = localStorage.getItem('usuarioLogado');
document.addEventListener('DOMContentLoaded', ()=> { 
  if (usuario) {
    window.location.href = 'home.html'
  }
})
  create.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('senha-input').value;
    const password2 = document.getElementById('senha-input2').value;

    const verificado = validarLogin(email, password, password2);

    if (verificado) {
      let usuario = {
        login: email,
        password: password,
        listaRecados: [],
      };
      salvarUsuario(usuario);
      alert('Conta Criada com Sucesso!');
    }

    create.reset();
  });
function validarLogin(email, senha1, senha2) {
  if (email.length < 5) {
    alert('Preencha o campo com um e-mail válido!');
    return false;
  }
  if (senha1 !== senha2) {
    alert('Senhas não batem. Verifique o valor digitado.');
    return false;
  }
  if (senha1.length < 4) {
    alert('Preencha a senha com no mínimo 4 digitos!');
    return false;
  }
  const listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

  if (listaUsuarios !== null) {
    const existe = listaUsuarios.some((valor) => valor.login == email);

    if (existe) {
      alert('Usuário já cadastrado!');
      return;
    }
  }
  return true;
}
function salvarUsuario(objeto) {
  let listaUsuarios = localStorage.getItem('usuarios');
  if (!listaUsuarios) {
    localStorage.setItem('usuarios', JSON.stringify([objeto]));
  } else {
    listaUsuarios = JSON.parse(listaUsuarios);
    listaUsuarios.push(objeto);
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
  }
}