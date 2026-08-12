const DEMO_OFFERS = [
  {id:1,name:"Notebook 15,6” Ryzen 5 16GB / 512GB SSD",brand:"NovaTech",category:"Tecnología",store:"TecnoStore",price:499990,originalPrice:699990,emoji:"💻",colors:["#1d4ed8","#111827"]},
  {id:2,name:"Notebook 14” Core i5 8GB / 512GB SSD",brand:"Andes",category:"Tecnología",store:"DigitalShop",price:429990,originalPrice:569990,emoji:"💻",colors:["#0f766e","#172554"]},
  {id:3,name:"Audífonos Bluetooth con cancelación de ruido",brand:"Wave",category:"Tecnología",store:"TecnoStore",price:39990,originalPrice:69990,emoji:"🎧",colors:["#7c3aed","#1f2937"]},
  {id:4,name:"Audífonos inalámbricos compactos",brand:"Pulse",category:"Tecnología",store:"ClickMarket",price:21990,originalPrice:34990,emoji:"🎧",colors:["#be123c","#1f2937"]},
  {id:5,name:"Tablet 10,5” 128GB WiFi",brand:"Orbit",category:"Tecnología",store:"DigitalShop",price:179990,originalPrice:249990,emoji:"📱",colors:["#0369a1","#312e81"]},
  {id:6,name:"Monitor IPS 24” Full HD 100Hz",brand:"ViewOne",category:"Tecnología",store:"ClickMarket",price:89990,originalPrice:139990,emoji:"🖥️",colors:["#0f766e","#1e293b"]},
  {id:7,name:"Teclado y mouse inalámbricos",brand:"KeyGo",category:"Tecnología",store:"TecnoStore",price:18990,originalPrice:29990,emoji:"⌨️",colors:["#475569","#111827"]},
  {id:8,name:"Impresora multifuncional WiFi",brand:"PrintLab",category:"Tecnología",store:"DigitalShop",price:129990,originalPrice:189990,emoji:"🖨️",colors:["#334155","#0f172a"]},

  {id:9,name:"Mochila urbana para notebook 15,6”",brand:"Nomad",category:"Accesorios",store:"UrbanMarket",price:24990,originalPrice:39990,emoji:"🎒",colors:["#9a3412","#292524"]},
  {id:10,name:"Mochila impermeable 22 L",brand:"Trail",category:"Accesorios",store:"UrbanMarket",price:28990,originalPrice:44990,emoji:"🎒",colors:["#166534","#1f2937"]},
  {id:11,name:"Botella térmica 750 ml",brand:"North",category:"Accesorios",store:"CasaClick",price:12990,originalPrice:19990,emoji:"🧴",colors:["#0369a1","#0f172a"]},
  {id:12,name:"Lámpara LED de escritorio regulable",brand:"Luma",category:"Hogar",store:"CasaClick",price:17990,originalPrice:29990,emoji:"💡",colors:["#a16207","#1f2937"]},

  {id:13,name:"Juego de sábanas 2 plazas",brand:"Nube",category:"Hogar",store:"CasaClick",price:22990,originalPrice:39990,emoji:"🛏️",colors:["#7c3aed","#312e81"]},
  {id:14,name:"Organizador modular 6 compartimentos",brand:"Ordena",category:"Hogar",store:"HomeBox",price:19990,originalPrice:31990,emoji:"🗄️",colors:["#92400e","#292524"]},
  {id:15,name:"Hervidor eléctrico 1,7 L",brand:"Calor",category:"Hogar",store:"HomeBox",price:14990,originalPrice:24990,emoji:"🫖",colors:["#b91c1c","#1f2937"]},
  {id:16,name:"Aspiradora compacta 2 en 1",brand:"CleanGo",category:"Hogar",store:"HomeBox",price:49990,originalPrice:79990,emoji:"🧹",colors:["#0369a1","#1e293b"]},

  {id:17,name:"Zapatillas urbanas unisex",brand:"Step",category:"Ropa y calzado",store:"UrbanMarket",price:29990,originalPrice:49990,emoji:"👟",colors:["#be123c","#312e81"]},
  {id:18,name:"Zapatillas running ligeras",brand:"RunWay",category:"Ropa y calzado",store:"SportBox",price:38990,originalPrice:64990,emoji:"👟",colors:["#059669","#1e3a8a"]},
  {id:19,name:"Polerón básico con cierre",brand:"Daily",category:"Ropa y calzado",store:"UrbanMarket",price:18990,originalPrice:29990,emoji:"🧥",colors:["#475569","#111827"]},
  {id:20,name:"Chaqueta impermeable liviana",brand:"South",category:"Ropa y calzado",store:"SportBox",price:44990,originalPrice:69990,emoji:"🧥",colors:["#1d4ed8","#164e63"]},

  {id:21,name:"Balón de básquetbol tamaño 7",brand:"Court",category:"Deporte",store:"SportBox",price:14990,originalPrice:23990,emoji:"🏀",colors:["#c2410c","#431407"]},
  {id:22,name:"Mat de ejercicio antideslizante",brand:"Move",category:"Deporte",store:"SportBox",price:13990,originalPrice:21990,emoji:"🧘",colors:["#7c3aed","#164e63"]},
  {id:23,name:"Set de bandas elásticas de resistencia",brand:"Move",category:"Deporte",store:"SportBox",price:9990,originalPrice:16990,emoji:"🏃",colors:["#15803d","#1f2937"]},
  {id:24,name:"Bolso deportivo 35 L",brand:"Court",category:"Deporte",store:"UrbanMarket",price:19990,originalPrice:31990,emoji:"👜",colors:["#1e40af","#1f2937"]},

  {id:25,name:"Novela juvenil de misterio",brand:"Ediciones Sur",category:"Libros",store:"LibroBox",price:9990,originalPrice:15990,emoji:"📚",colors:["#7c2d12","#312e81"]},
  {id:26,name:"Atlas ilustrado de ciencia",brand:"Ediciones Sur",category:"Libros",store:"LibroBox",price:16990,originalPrice:24990,emoji:"📘",colors:["#0369a1","#14532d"]},
  {id:27,name:"Cuaderno premium tapa dura",brand:"PaperLab",category:"Papelería",store:"LibroBox",price:5990,originalPrice:8990,emoji:"📓",colors:["#be185d","#312e81"]},
  {id:28,name:"Set 24 lápices de colores",brand:"Colori",category:"Papelería",store:"LibroBox",price:7990,originalPrice:12990,emoji:"✏️",colors:["#ea580c","#4c1d95"]},
  {id:29,name:"Planificador semanal magnético",brand:"PaperLab",category:"Papelería",store:"CasaClick",price:6990,originalPrice:10990,emoji:"🗓️",colors:["#0f766e","#1e3a8a"]},
  {id:30,name:"Calculadora científica escolar",brand:"Numera",category:"Papelería",store:"LibroBox",price:13990,originalPrice:19990,emoji:"🧮",colors:["#475569","#0f172a"]},

  {id:31,name:"Juego de construcción 500 piezas",brand:"Blocky",category:"Juguetes",store:"FamilyShop",price:19990,originalPrice:34990,emoji:"🧱",colors:["#dc2626","#2563eb"]},
  {id:32,name:"Puzzle 1000 piezas paisaje austral",brand:"SurPuzzle",category:"Juguetes",store:"FamilyShop",price:9990,originalPrice:15990,emoji:"🧩",colors:["#0f766e","#7c3aed"]},
  {id:33,name:"Juego de mesa de estrategia familiar",brand:"MesaSur",category:"Juguetes",store:"FamilyShop",price:17990,originalPrice:29990,emoji:"🎲",colors:["#b45309","#4c1d95"]},
  {id:34,name:"Set de arte y dibujo 80 piezas",brand:"Colori",category:"Juguetes",store:"FamilyShop",price:14990,originalPrice:23990,emoji:"🎨",colors:["#db2777","#7c3aed"]},

  {id:35,name:"Mouse inalámbrico silencioso",brand:"KeyGo",category:"Tecnología",store:"ClickMarket",price:9990,originalPrice:16990,emoji:"🖱️",colors:["#475569","#1e3a8a"]},
  {id:36,name:"Parlante Bluetooth portátil",brand:"Wave",category:"Tecnología",store:"TecnoStore",price:24990,originalPrice:39990,emoji:"🔊",colors:["#7c3aed","#be123c"]}
];

if (typeof module !== "undefined" && module.exports) module.exports = DEMO_OFFERS;
