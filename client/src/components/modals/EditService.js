import "./Admin.css";
import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import axios from "axios";

const AdminPage = observer(() => {
const[CreateServiceActive, setCreateServicesActive] = useState(false)

const downloadFile = async () => {
try {
const response = await axios.get('http://localhost:3000/api/file/download', { responseType: 'blob' });
console.log('Response data:', response.data);
const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
console.log('Download URL:', downloadUrl);
const link = document.createElement('a');
link.href = downloadUrl;
link.setAttribute('downloads', 'services.txt');
document.body.appendChild(link);
link.click();
link.remove();
} catch (error) {
console.error('Error downloading file:', error);
}
}

return (
<div className="actionList">
<li onClick={() => setModalProductsActive(true)}>Edit products</li>
<li onClick={() => setModalCategoriesActive(true)}>Edit categories</li>
<li onClick={() => setModalRecipesActive(true)}>Edit recipes</li>

<ModalProducts active={modalProductsActive} setActive = {()=> setModalProductsActive(false)}/>
<ModalCategories active={modalCategoriesActive} setActive = {() => setModalCategoriesActive(false)}/>
<ModalRecipes active={modalRecipesActive} setActive = {() => setModalRecipesActive(false)}/>

<li onClick={downloadFile}>downloadFile</li>
</div>
);
});

export default AdminPage