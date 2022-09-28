// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public tasksCounter = 0;

    struct Task {
        uint256 id;
        uint256 dniPropietario;
        uint256 dniInquilino;
        string datosInmueble;
        string caracteristicasInmueble;
        string plazoAlquiler;
        uint256 montoAlquiler;
        uint256 moraDiaria;
        bool done;
        uint256 createdAt;
    }

    event TaskCreated(
        uint256 id,
        uint256 dniPropietario,
        uint256 dniInquilino,
        string datosInmueble,
        string caracteristicasInmueble,
        string plazoAlquiler,
        uint256 montoAlquiler,
        uint256 moraDiaria,
        bool done,
        uint256 createdAt
    );
    event TaskToggledDone(uint256 id, bool done);

    mapping(uint256 => Task) public tasks;

    constructor() {
        createTask(75869547, 75369856, "Calle Juan Faning, Miraflores, Lima", "2 dormitorios, 2 banos, 120m2", "Mensual", 3440, 70);
    }

    function createTask(uint256 _dniPropietario, 
                        uint256 _dniInquilino,
                        string memory _datosInmueble,
                        string memory _caracteristicasInmueble,
                        string memory _plazoalquiler,
                        uint256  _montoAlquiler,
                        uint256  _moraDiaria
                        )
        public
    {
        tasksCounter++;
        tasks[tasksCounter] = Task(
            tasksCounter,
            _dniPropietario,
            _dniInquilino,
            _datosInmueble,
            _caracteristicasInmueble,
            _plazoalquiler,
            _montoAlquiler,
            _moraDiaria,
            true,
            block.timestamp
        );
        emit TaskCreated(
            tasksCounter,
            _dniPropietario,
            _dniInquilino,
            _datosInmueble,
            _caracteristicasInmueble,
            _plazoalquiler,
            _montoAlquiler,
            _moraDiaria,
            true,
            block.timestamp
        );
    }

    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggledDone(_id, _task.done);
    }

    
}
