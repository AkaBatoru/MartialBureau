import {$authHost, $host} from "./index";

export const createServices = async (service) => {
    const {data} = await $authHost.post('api/service', service)
    return data
}

export const fetchServices = async () => {
    const {data} = await $host.get('api/service')
    console.log("Данные об услуге:", data);
    if (typeof data.img !== 'string') {
        console.error("Неправильный тип данных для img:", data.img);
    }    
    return data
}

export const fetchOneService = async (ID_Service) => {
    console.log("ID_Service in fetchOneService:", ID_Service);
    const {data} = await $host.get('api/service/' + ID_Service)
    return data
}

export const editService = async (ID_Service, newData) => {
    console.log("New data to edit:", newData); // Добавьте эту строку
    const { data } = await $authHost.patch(`api/service/${ID_Service}`, newData);
    return data;
}



export const deleteService = async (ID_Service) =>{
    const {data} = await $authHost.delete('api/service/' + ID_Service)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
    }

