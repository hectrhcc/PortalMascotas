import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
//import { getDatabase, ref, set } from 'firebase/database';


// Configura tu aplicación de Firebase con tus claves
const firebaseConfig = {
  apiKey: "AIzaSyAyDdP0QjxPDvcB9DdGju9Xl7ouGvjZ2hI",
  authDomain: "mascotas-8fa86.firebaseapp.com",
  projectId: "mascotas-8fa86",
  storageBucket: "mascotas-8fa86.appspot.com",
  messagingSenderId: "960763048480",
  appId: "1:960763048480:web:3feda522a90efea1390245"
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  

const MascotaForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    raza: '',
    tam: '',
    micro: '',
    marcas: '',
    fecha_de_perdida: '',
    descripcion: ''
  });
  const [fotografia, setFotografia] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFotografiaChange = (e) => {
    setFotografia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const database = getDatabase();
    const mascotasRef = ref(database, 'mascotas');

    try {
      // Aquí deberías manejar la subida de la imagen a Firebase Storage
      // y obtener la URL de la imagen subida

      const newMascotaRef = push(mascotasRef);
      await set(newMascotaRef, {
        ...formData,
        // fotografiaUrl: URL_DE_LA_IMAGEN
      });

      alert('Mascota registrada con éxito!');
      // Limpiar el formulario
      setFormData({
        name: '',
        raza: '',
        tam: '',
        micro: '',
        marcas: '',
        fecha_de_perdida: '',
        descripcion: ''
      });
      setFotografia(null);
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      alert('Hubo un error al registrar la mascota. Por favor, intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
      <input type="text" id="name" name="name" placeholder="Pon el nombre de tu amigo peludo" value={formData.name} onChange={handleChange} required 
             className="bg-white shadow-lg border-2 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>  
    
    <div className="mb-4">
      <label htmlFor="raza" className="block text-gray-700 text-sm font-bold mb-2">Raza:</label>
      <input type="text" id="raza" name="raza" placeholder="Raza de tu mascota" value={formData.raza} onChange={handleChange} required 
             className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    
    <div className="mb-4">
      <label htmlFor="tam" className="block text-gray-700 text-sm font-bold mb-2">Tamaño:</label>
      <input type="text" id="tam" name="tam"   placeholder="Pequeño, mediano, grande" value={formData.tam} onChange={handleChange} required 
             className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label htmlFor="micro" className="block text-gray-700 text-sm font-bold mb-2">Microchip:</label>
      <input type="text" id="micro" name="micro" placeholder="Número de microchip" value={formData.micro} onChange={handleChange} required 
             className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label htmlFor="marcas" className="block text-gray-700 text-sm font-bold mb-2">Marcas:</label>
      <input type="text" id="marcas" name="marcas" placeholder='Descripción de cualquier marca distintiva' value={formData.marcas} onChange={handleChange} required 
             className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label htmlFor="fecha_de_perdida" className="block text-gray-700 text-sm font-bold mb-2">Fecha de pérdida:</label>
      <input type="date" id="fecha_de_perdida" name="fecha_de_perdida" value={formData.fecha_de_perdida} onChange={handleChange} required 
             className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label htmlFor="fotografia" className="block text-gray-700 text-sm font-bold mb-2">Fotografía:</label>
      <input type="file" id="fotografia" name="fotografia" accept="image/*" onChange={handleFotografiaChange} 
             className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-6">
      <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
      <textarea id="descripcion" placeholder='Detalles sobre tu mascota' name="descripcion" value={formData.descripcion} onChange={handleChange} required 
                className="bg-white shadow-lg border-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"></textarea>
    </div>
    
    <div className="flex items-center justify-between">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Enviar
      </button>
    </div>
  </form>
  );
};

export default MascotaForm;
