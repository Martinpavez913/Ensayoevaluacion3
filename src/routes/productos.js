import express from "express";
import checkToken from "../middlewares/checkToken.js";
const router = express.Router();

let productos = [
  {
    id: 1,
    nombre: "Camiseta Local 1997",
    descripcion: "Camiseta oficial de local temporada 1997. Edición especial conmemorativa.",
    descripcionLarga: "Esta camiseta conmemora una de las temporadas más gloriosas del Club Social y Deportivo Colo Colo. Fabricada en poliéster de alta calidad, incluye detalles bordados y el escudo oficial de la época.",
    precioActual: "$89.990",
    precioAnterior: "$109.990",
    imagen: "/Imagenes/camiseta-1997.jpg",
    alt: "Camiseta Local Colo-Colo 1997",
    etiqueta: "Vintage",
    categoria: "vestuario",
    tallasDisponibles: ["S", "M", "L", "XL"],
    stock: 15,
    caracteristicas: ["Material: 100% Poliéster", "Escudo bordado", "Edición limitada"]
  },
  {
    id: 2,
    nombre: "Camiseta Visita 2006",
    descripcion: "Camiseta de visita temporada 2006. Perfecto estado, tallas disponibles.",
    descripcionLarga: "La camiseta de visita de la temporada 2006, caracterizada por su diseño elegante y colores representativos del club.",
    precioActual: "$75.000",
    precioAnterior: "",
    imagen: "/Imagenes/camiseta-2006.jpg",
    alt: "Camiseta Visita Colo-Colo 2006",
    etiqueta: "Clásica",
    categoria: "vestuario",
    tallasDisponibles: ["M", "L", "XL"],
    stock: 8,
    caracteristicas: ["Estado: Excelente", "Tallas limitadas", "Color blanco tradicional"]
  },
  {
    id: 3,
    nombre: "Foto Autografiada Matías Fernández",
    descripcion: "Fotografía oficial autografiada por Matías Fernández. Certificado incluido.",
    descripcionLarga: "Fotografía profesional de Matías Fernández en su etapa en Colo Colo, autografiada personalmente por el jugador.",
    precioActual: "$120.000",
    precioAnterior: "",
    imagen: "/Imagenes/foto-matias.jpg",
    alt: "Foto autografiada de Matías Fernández",
    etiqueta: "Exclusivo",
    categoria: "accesorios",
    tallasDisponibles: [], // Agregado para consistencia
    stock: 5,
    caracteristicas: ["Certificado de autenticidad", "Marco protector UV"]
  },
  {
      id: 4,
      nombre: "Camiseta 2024 Firmada por Vidal",
      descripcion: "Camiseta local temporada 2024 firmada por Arturo Vidal. Solo 50 unidades.",
      descripcionLarga: "Camiseta oficial de la temporada 2024 firmada personalmente por Arturo Vidal. Edición limitada.",
      precioActual: "$150.000",
      precioAnterior: "$180.000",
      imagen: "/Imagenes/camiseta-vidal.jpg",
      alt: "Camiseta 2024 firmada por Arturo Vidal",
      etiqueta: "Edición Limitada",
      categoria: "vestuario",
      tallasDisponibles: ["Única"],
      stock: 50,
      caracteristicas: ["Firmada por Arturo Vidal", "Caja coleccionable"]
  },
  {
      id: 5,
      nombre: "Libro: Historia de Colo-Colo",
      descripcion: "Edición especial con fotos históricas y relatos.",
      descripcionLarga: "Este libro recopila la rica historia del Club Social y Deportivo Colo Colo.",
      precioActual: "$45.000",
      precioAnterior: "",
      imagen: "/Imagenes/libro-historia.jpg",
      alt: "Libro Historia de Colo-Colo",
      etiqueta: "Coleccionista",
      categoria: "libros",
      tallasDisponibles: [],
      stock: 25,
      caracteristicas: ["Tapa dura", "200+ fotografías"]
  },
  {
      id: 6,
      nombre: "Figura Iván Zamorano Edición Especial",
      descripcion: "Figura coleccionable de Iván Zamorano. Altura: 25cm.",
      descripcionLarga: "Figura coleccionable de alta calidad que representa a Iván 'Bam Bam' Zamorano.",
      precioActual: "$65.000",
      precioAnterior: "",
      imagen: "/Imagenes/figura-zamorano.png",
      alt: "Figura de Iván Zamorano",
      etiqueta: "Nuevo",
      categoria: "figuras",
      tallasDisponibles: [],
      stock: 12,
      caracteristicas: ["Altura: 25cm", "Pintura a mano"]
  },
  {
      id: 7,
      nombre: "Camiseta Edición Especial 2023",
      descripcion: "Talla L, oficial, firma de jugadores",
      descripcionLarga: "Camiseta edición especial 2023 con firmas del plantel completo.",
      precioActual: "$45.000",
      precioAnterior: "$90.000",
      imagen: "/Imagenes/camiseta-especial-2023.jpg",
      alt: "Camiseta Edición Especial 2023",
      etiqueta: "Oferta",
      categoria: "vestuario",
      tallasDisponibles: ["S", "M", "L", "XL"],
      stock: 20,
      caracteristicas: ["Firmas del plantel", "Material técnico"]
  },
  {
      id: 8,
      nombre: "Bandera Oficial Colo Colo",
      descripcion: "1.5x1m, material resistente",
      descripcionLarga: "Bandera oficial del Club Social y Deportivo Colo Colo.",
      precioActual: "$25.000",
      precioAnterior: "$50.000",
      imagen: "/Imagenes/bandera-oficial.jpg",
      alt: "Bandera Oficial Colo Colo",
      etiqueta: "Nuevo",
      categoria: "accesorios",
      tallasDisponibles: [],
      stock: 30,
      caracteristicas: ["Tamaño: 1.5x1m", "Resistente al agua"]
  },
  {
      id: 9,
      nombre: "Figura de Arturo Vidal",
      descripcion: "Edición coleccionable, 25cm",
      descripcionLarga: "Figura coleccionable de Arturo Vidal en pose característica.",
      precioActual: "$30.000",
      precioAnterior: "$60.000",
      imagen: "/Imagenes/figura-vidal.jpg",
      alt: "Figura de Arturo Vidal",
      etiqueta: "Coleccionista",
      categoria: "figuras",
      tallasDisponibles: [],
      stock: 18,
      caracteristicas: ["Edición coleccionable", "Base incluida"]
  },
  {
      id: 10,
      nombre: "Pack Camiseta + Bufanda",
      descripcion: "Combo especial temporada 2023",
      descripcionLarga: "Pack especial que incluye la camiseta oficial de la temporada 2023 más una bufanda.",
      precioActual: "$60.000",
      precioAnterior: "$120.000",
      imagen: "/Imagenes/pack-camiseta-bufanda.jpg",
      alt: "Pack Camiseta + Bufanda",
      etiqueta: "Combo",
      categoria: "vestuario",
      tallasDisponibles: ["S", "M", "L", "XL"],
      stock: 10,
      caracteristicas: ["Camiseta oficial", "Combo especial"]
  },
  {
      id: 11,
      nombre: "Taza Oficial Colo Colo",
      descripcion: "Cerámica, diseño exclusivo",
      descripcionLarga: "Taza oficial del Club Social y Deportivo Colo Colo.",
      precioActual: "$12.000",
      precioAnterior: "$24.000",
      imagen: "/Imagenes/taza-oficial.jpg",
      alt: "Taza Oficial Colo Colo",
      etiqueta: "Accesorio",
      categoria: "accesorios",
      tallasDisponibles: [],
      stock: 40,
      caracteristicas: ["Capacidad: 350ml", "Material: Cerámica"]
  }
];

router.get("/", (req, res) => {
  res.json(productos);
});

router.get("/:id", (req, res) => {
   const productoEncontrado = productos.find(p => p.id === parseInt(req.params.id));
    if (productoEncontrado) {
      res.json(productoEncontrado);
    } else {
      res.status(404).json({message: "Producto no encontrado"})
    }
});


router.post("/", checkToken, (req, res) => {
  // Validamos usando las llaves correctas de TU data (nombre, precioActual, etc)
  // Puedes agregar más campos obligatorios si quieres
  if (req.body.nombre && req.body.precioActual && req.body.imagen) {
    const newProduct = {
      id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1, // ID autoincremental seguro
      nombre: req.body.nombre,
      descripcion: req.body.descripcion || "Sin descripción",
      descripcionLarga: req.body.descripcionLarga || "",
      precioActual: req.body.precioActual,
      precioAnterior: req.body.precioAnterior || "",
      imagen: req.body.imagen,
      alt: req.body.alt || req.body.nombre,
      etiqueta: req.body.etiqueta || "Nuevo",
      categoria: req.body.categoria || "General",
      tallasDisponibles: req.body.tallasDisponibles || [],
      stock: req.body.stock || 0,
      caracteristicas: req.body.caracteristicas || []
    };
    productos.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ error: "Faltan datos obligatorios (nombre, precioActual, imagen)" });
  }
});

router.put("/:id", checkToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    // Actualizamos solo los campos que vengan en el body
    productos[index] = {
      ...productos[index], // Mantiene datos viejos
      ...req.body          // Sobrescribe con datos nuevos
    };
    // IMPORTANTE: Aseguramos que el ID no cambie
    productos[index].id = id; 

    res.status(200).json({ message: "Producto actualizado", producto: productos[index] });
  } else {
    res.status(404).json({ message: "Producto no encontrado para actualizar" });
  }
});

router.delete("/:id", checkToken, (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = productos.length;
  
  productos = productos.filter(p => p.id !== id);

  if (productos.length < initialLength) {
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado para eliminar" });
  }
});

export default router;