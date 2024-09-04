import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      
      <label htmlFor="raza">Raza:</label>
      <input type="text" id="raza" name="raza" value={formData.raza} onChange={handleChange} required />
      
      <label htmlFor="tam">Tamaño:</label>
      <input type="text" id="tam" name="tam" value={formData.tam} onChange={handleChange} required />

      <label htmlFor="micro">Microchip:</label>
      <input type="text" id="micro" name="micro" value={formData.micro} onChange={handleChange} required />

      <label htmlFor="marcas">Marcas:</label>
      <input type="text" id="marcas" name="marcas" value={formData.marcas} onChange={handleChange} required />

      <label htmlFor="fecha_de_perdida">Fecha de pérdida:</label>
      <input type="date" id="fecha_de_perdida" name="fecha_de_perdida" value={formData.fecha_de_perdida} onChange={handleChange} required />

      <label htmlFor="fotografia">Fotografía:</label>
      <input type="file" id="fotografia" name="fotografia" accept="image/*" onChange={handleFotografiaChange} />

      <label htmlFor="descripcion">Descripción:</label>
      <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
      
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MascotaForm;
