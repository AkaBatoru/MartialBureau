import {makeAutoObservable} from "mobx";

export default class ServiceStore {
    constructor() {
        this._types = [
            {id:1, name: "Услуга"}, 
            {id:2, name: "Комплекс"}
        ]
        this._service = []
        this._selectedType = {}
        this._selectedService = {}
        makeAutoObservable(this)
    }

    setTypes(type) {this._types = type}
    setServices(service) {this._service = service; console.log("Services in store:", this._service);}
    setSelectedType(type) {this._selectedType = type}
    setSelectedService(service){this._selectedService = service}

    filterServicesByType(type) {
        console.log("сработала фильтрация")
        return this._service.filter(service => service.type === type);
    }
    
    get types() {
        return this._types
    }
    get services() {
        return this._service
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedService() {
        console.log("selectedService", {
            id: this._selectedService.id,
            name: this._selectedService.name
        });
        
        return this._selectedService;
    }
}