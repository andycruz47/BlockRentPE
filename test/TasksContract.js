const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", (accounts) => {
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get Tasks List", async () => {
    const tasksCounter = await this.tasksContract.tasksCounter();
    const task = await this.tasksContract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter.toNumber());
    assert.equal(task.dniPropietario, 75869547);
    assert.equal(task.dniInquilino, 75369856);
    assert.equal(task.datosInmueble, "Departamento Miraflores");
    assert.equal(task.caracteristicasInmueble, "50 m2");
    assert.equal(task.plazoAlquiler, "Mensual");
    assert.equal(task.montoAlquiler, 1250);
    assert.equal(task.moraDiaria, 50);
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });

  it("task created successfully", async () => {
    const result = await this.tasksContract.createTask(45454, 45455, "depa1", "50m2", "Mensual", 1564, 50);
    const taskEvent = result.logs[0].args;
    const tasksCounter = await this.tasksContract.tasksCounter();

    assert.equal(tasksCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.dniPropietario, 45454);
    assert.equal(taskEvent.dniInquilino, 45455);
    assert.equal(taskEvent.datosInmueble, "depa1");
    assert.equal(taskEvent.caracteristicasInmueble, "50m2");
    assert.equal(taskEvent.plazoAlquiler, "Mensual");
    assert.equal(taskEvent.montoAlquiler, 1564);
    assert.equal(taskEvent.moraDiaria, 50);
    assert.equal(taskEvent.done, false);
  });

  it("task toggled done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.id.toNumber(), 1);
    assert.equal(taskEvent.done, true);
  });
});
