App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderTasks();
  },
  loadWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No ethereum browser is installed. Try it installing MetaMask "
      );
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("TasksContract.json");
      const tasksContractJSON = await res.json();
      App.contracts.TasksContract = TruffleContract(tasksContractJSON);
      App.contracts.TasksContract.setProvider(App.web3Provider);

      App.tasksContract = await App.contracts.TasksContract.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    document.getElementById("account").innerText = App.account;
  },
  renderTasks: async () => {
    const tasksCounter = await App.tasksContract.tasksCounter();
    const taskCounterNumber = tasksCounter.toNumber();

    let html = "";

    for (let i = 1; i <= taskCounterNumber; i++) {
      const task = await App.tasksContract.tasks(i);
      const taskId = task[0].toNumber();
      const taskDniPropietario = task[1];
      const taskDniInquilino = task[2];
      const taskDatosInmueble = task[3];
      const taskCaracteristicasInmueble = task[4];
      const taskPlazoAlquiler = task[5];
      const taskMontoAlquiler = task[6];
      const taskMoraDiaria = task[7];
      const taskDone = task[8];
      const taskCreatedAt = task[9];

      // Creating a task Card
      let taskElement = `<div class="card bg-dark rounded-0 mb-2 mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>${taskId}</span>
          <div class="form-check form-switch">
            <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)" ${
              taskDone === true && "checked"
            }>
          </div>
        </div>
            <div id="img-contract">
            <img src="img/img${taskId}.jpg" alt="Property${taskId}" /> 
             </div>
        <div class="card-body">
          <span>DNI Propietario: ${taskDniPropietario}</span><br>
          <span>DNI Inquilino: ${taskDniInquilino}</span><br>
          <span>Direccion Inmueble: ${taskDatosInmueble}</span><br>
          <span>Caracteristicas Inmueble: ${taskCaracteristicasInmueble}</span><br>
          <span>Plazo Alquiler: ${taskPlazoAlquiler}</span><br>
          <span>Monto Alquiler: ${taskMontoAlquiler}</span><br>
          <span>Mora: ${taskMoraDiaria}</span>
          <div>
          <a href="docs/ContratoFirmado.pdf">Ver contrato</a>
          </div>
          <p class="text-muted">Contract was created ${new Date(
            taskCreatedAt * 1000
          ).toLocaleString()}</p>
          </label>
        </div>
      </div>`;
      html += taskElement;
    }

    document.querySelector("#tasksList").innerHTML = html;
  },
  createTask: async (dniPropietario,
                     dniInquilino, 
                     datosInmueble, 
                     caracteristicasInmueble, 
                     plazoAlquiler,
                     montoAlquiler,
                     moraDiaria) => {
    try {
      const result = await App.tasksContract.createTask(dniPropietario, 
                                                        dniInquilino,
                                                        datosInmueble,
                                                        caracteristicasInmueble,
                                                        plazoAlquiler,
                                                        montoAlquiler,
                                                        moraDiaria,
                                                         {
                                              from: App.account,
      });
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  toggleDone: async (element) => {
    const taskId = element.dataset.id;
    await App.tasksContract.toggleDone(taskId, {
      from: App.account,
    });
    window.location.reload();
  },
};
