import express from "express";
import checkToken from "../middlewares/checkToken.js";
const router = express.Router();

const productos = [
    {
      id: 1,
      nombre: "Camiseta Local 1997",
      descripcion: "Camiseta oficial de local temporada 1997. Edición especial conmemorativa.",
      precioActual: "$89.990",
      precioAnterior: "$109.990",
      imagen: "/Imagenes/camiseta-1997.jpg",
      alt: "Camiseta Local Colo-Colo 1997",
      etiqueta: "Vintage",
      categoria: "vestuario"
    },
    {
      id: 2,
      nombre: "Camiseta Visita 2006",
      descripcion: "Camiseta de visita temporada 2006. Perfecto estado, tallas disponibles.",
      precioActual: "$75.000",
      precioAnterior: "",
      imagen: "/Imagenes/camiseta-2006.jpg",
      alt: "Camiseta Visita Colo-Colo 2006",
      etiqueta: "Clásica",
      categoria: "vestuario"
    },
    {
      id: 3,
      nombre: "Foto Autografiada Matías Fernández",
      descripcion: "Fotografía oficial autografiada por Matías Fernández. Certificado de autenticidad incluido.",
      precioActual: "$120.000",
      precioAnterior: "",
      imagen: "/Imagenes/foto-matias.jpg",
      alt: "Foto autografiada de Matías Fernández",
      etiqueta: "Exclusivo",
      categoria: "accesorios"
    },
    {
      id: 4,
      nombre: "Camiseta 2024 Firmada por Vidal",
      descripcion: "Camiseta local temporada 2024 firmada por Arturo Vidal. Solo 50 unidades disponibles.",
      precioActual: "$150.000",
      precioAnterior: "$180.000",
      imagen: "/Imagenes/camiseta-vidal.jpg",
      alt: "Camiseta 2024 firmada por Arturo Vidal",
      etiqueta: "Edición Limitada",
      categoria: "vestuario"
    },
    {
      id: 5,
      nombre: "Libro: Historia de Colo-Colo",
      descripcion: "Edición especial con fotos históricas y relatos de los momentos más importantes del club.",
      precioActual: "$45.000",
      precioAnterior: "",
      imagen: "/Imagenes/libro-historia.jpg",
      alt: "Libro Historia de Colo-Colo",
      etiqueta: "Coleccionista",
      categoria: "libros"
    },
    {
      id: 6,
      nombre: "Figura Iván Zamorano Edición Especial",
      descripcion: "Figura coleccionable de Iván Zamorano con uniforme de Colo-Colo. Altura: 25cm.",
      precioActual: "$65.000",
      precioAnterior: "",
      imagen: "/Imagenes/figura-zamorano.png",
      alt: "Figura de Iván Zamorano",
      etiqueta: "Nuevo",
      categoria: "figuras"
    },
    {
      id: 7,
      nombre: "Camiseta Edición Especial 2023",
      descripcion: "Talla L, oficial, firma de jugadores",
      precioActual: "$45.000",
      precioAnterior: "$90.000",
      imagen: "/Imagenes/camiseta-especial-2023.jpg",
      alt: "Camiseta Edición Especial 2023",
      etiqueta: "Oferta",
      categoria: "vestuario"
    },
    {
      id: 8,
      nombre: "Bandera Oficial Colo Colo",
      descripcion: "1.5x1m, material resistente",
      precioActual: "$25.000",
      precioAnterior: "$50.000",
      imagen: "/Imagenes/bandera-oficial.jpg",
      alt: "Bandera Oficial Colo Colo",
      etiqueta: "Nuevo",
      categoria: "accesorios"
    },
    {
      id: 9,
      nombre: "Figura de Arturo Vidal",
      descripcion: "Edición coleccionable, 25cm",
      precioActual: "$30.000",
      precioAnterior: "$60.000",
      imagen: "/Imagenes/figura-vidal.jpg",
      alt: "Figura de Arturo Vidal",
      etiqueta: "Coleccionista",
      categoria: "figuras"
    },
    {
      id: 10,
      nombre: "Pack Camiseta + Bufanda",
      descripcion: "Combo especial temporada 2023",
      precioActual: "$60.000",
      precioAnterior: "$120.000",
      imagen: "/Imagenes/pack-camiseta-bufanda.jpg",
      alt: "Pack Camiseta + Bufanda",
      etiqueta: "Combo",
      categoria: "vestuario"
    },
    {
      id: 11,
      nombre: "Taza Oficial Colo Colo hola",
      descripcion: "Cerámica, diseño exclusivo",
      precioActual: "$12.000",
      precioAnterior: "$24.000",
      imagen: "/Imagenes/taza-oficial.jpg",
      alt: "Taza Oficial Colo Colo",
      etiqueta: "Accesorio",
      categoria: "accesorios"
    }
  ];

//router.use(checkToken);

router.get("/", (req, res) => {
  res.json(productos);
});

router.post("/", (req, res) => {
  if (req.body.name && req.body.price && req.body.image && req.body.description) {
    const newProduct = {
      id: productos.length + 1,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    };
    productos.push(newProduct);

    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ error: "Faltan datos obligatorios" });
  }
});

export default router;
