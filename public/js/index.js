const logar = document.getElementById('form-login');
const usuario = localStorage.getItem('usuarioLogado');
document.addEventListener('DOMContentLoaded', ()=> {
  if (usuario) {
    window.location.href = 'home.html'
  }
})
// LOGAR NO SISTEMA

  logar.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailLogin = document.getElementById('email-login').value;
    const passwordLogin = document.getElementById('password-login').value;

    const conta = buscarUsuario(emailLogin);

    if (!conta) {
      alert('Conta não cadastrada! Verifique o usuário ou senha.');
      return;
    }

    if (conta.login !== emailLogin) {
      alert('Conta não cadastrada! Verifique o usuário ou senha.');
      return;
    }

    if (conta.password !== passwordLogin) {
      alert('Conta não cadastrada! Verifique o usuário ou senha .');
      return;
    }
    usuarioLogado(conta);
  });
function usuarioLogado(usuario) {
  localStorage.setItem('usuarioLogado', usuario.login);
  window.location.href = 'home.html';
}
function buscarUsuario(emailUsuario) {
  const lista = JSON.parse(localStorage.getItem('usuarios'));

  if(lista){
    const infoEncontrada = lista.find((valor) => valor.login === emailUsuario);
    return infoEncontrada;
  } 
  return 
}
