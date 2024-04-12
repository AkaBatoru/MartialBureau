const fs = require('fs');
const path = require('path');
const { Services } = require('../models/models');
const ApiError = require('../errors/APIError');

// Функция для генерации содержимого файла
const generateFileContent = (Services) => {
let content = 'Service ID | Service Name | Price | Description | Type\n';
Services.forEach(service => {
content += `${service.ID_Service} | ${service.Name} | ${service.Cost} | ${service.Description} | ${service.Type}\n`;
});
return content;
};

class typeController {
    async downloadFile(req, res) {
        try {
            console.log('Downloading file...'); // Добавляем лог перед началом загрузки файла

            const services = await Services.findAll();
            if (!services || services.length === 0) {
            throw ApiError.forbidden('No services found');
            }
            const fileContent = generateFileContent(services);

            const filePath = path.resolve(__dirname, '..', 'downloads', 'services.txt');
            fs.writeFileSync(filePath, fileContent);

            console.log('File successfully generated:', filePath); // Добавляем лог после успешной генерации файла

            // Отправляем файл на frontend
            res.download(filePath, 'services.txt');
        } catch (e) {
            console.error('Error generating file:', e);
            res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }
}

module.exports = new typeController();