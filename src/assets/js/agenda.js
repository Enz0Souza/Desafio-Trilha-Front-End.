const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];//busca a lista de agendamentos do localstorage

document.addEventListener("DOMContentLoaded", () => {//carregar os agendamentos quando o site estiver totalmente carregado
  renderizarAgendamentos();
});

function agendar() {
  const dataInput = document.getElementById("data");
  const horaInput = document.getElementById("hora");
  const erroMsg = document.getElementById("erro-msg");

  const data = dataInput.value.trim();
  const hora = horaInput.value.trim();
  erroMsg.textContent = "";

  if (!data || !hora) {
    erroMsg.textContent = "Por favor, preencha data e hora.";z
    return;
  }

  const dataHora = new Date(`${data}T${hora}`);
  const agora = new Date();

  if (dataHora <= agora) {
    erroMsg.textContent = "Escolha um horário futuro.";
    return;
  }

  const agendamento = `${data} ${hora}`;

  if (agendamentos.includes(agendamento)) {
    erroMsg.textContent = "Esse horário já foi agendado!";
    return;
  }

  agendamentos.push(agendamento);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  renderizarAgendamentos();

  dataInput.value = "";
  horaInput.value = "";
}

function renderizarAgendamentos() {
  const lista = document.getElementById("lista-agendamentos");
  lista.innerHTML = "";

  agendamentos.forEach(ag => {
    const [data, hora] = ag.split(" ");
    const item = document.createElement("li");
    item.textContent = `Agendado para: ${data} às ${hora}`;
    lista.appendChild(item);
  });
}
