import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
  // Validar

  const { nombre, correo, mensaje } = req.body;

  const errores = [];

  if (nombre.trim() === '') {
    //Trim quita espacios adelante y atras.
    errores.push({ mensaje: 'El nombre esta vacio' });
  }

  if (correo.trim() === '') {
    errores.push({ mensaje: 'El correo esta vacio' });
  }

  if (mensaje.trim() === '') {
    errores.push({ mensaje: 'El mensaje esta vacio' });
  }

  //   console.log(errores);

  if (errores.length > 0) {
    // Consultar Testimoniales existentes
    const testimoniales = await Testimonial.findAll();

    // Mostrar la vista con errores
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    // Almacenarlo en la base de datos
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });

      res.redirect('/testimoniales');
    } catch (error) {
      console.log(error);
    }
  }

  //   console.log(req.body); //capta la información que es capturada en el formulario.
};

export { guardarTestimonial };
