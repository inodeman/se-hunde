export type Ken = "a" | "b" | "c" | "d";

export type Scene = {
  id: string;
  title: string;
  kicker: string;
  narration: string;
  image: string;
  audio: string;
  video?: string;
  ken: Ken;
};

export const FILM = {
  title: "Se hunde: la ciudad que los satélites ven caer",
  short: "Se hunde",
  channel: "VASO",
  channelLine: "Documental del agua y del suelo",
  blurb:
    "La Ciudad de México no se cae de un día para otro. Se arruga. Un satélite acaba de medir el movimiento, el número de cincuenta centímetros al año no significa lo que dicen las redes, y el lago que se borró durante cuatrocientos años empezó a asomarse otra vez.",
};

export const SOURCES = [
  {
    name: "Chaussard et al., 2021",
    detail:
      "Journal of Geophysical Research: Solid Earth. Pico cercano a 50 cm/año en un punto del vaso, y hundimientos acumulados.",
  },
  {
    name: "Cigna y Tapete, 2021",
    detail:
      "Catedral entre 1 y 9 cm/año; picos de Iztapalapa y Nezahualcóyotl cerca de 39 cm/año.",
  },
  {
    name: "NISAR, NASA e ISRO",
    detail:
      "Lecturas de octubre 2025 a enero 2026: zonas urbanas bajando más de 2 cm al mes. Reportes de prensa, sep–oct 2026.",
  },
  {
    name: "Parque Ecológico Lago de Texcoco",
    detail:
      "Apertura permanente en enero de 2026. Unas 14,000 ha; entre 2,200 y más de 4,500 ha de agua abierta.",
  },
  {
    name: "Balance hídrico de la ZMVM",
    detail:
      "Déficit subterráneo de 938 hm³/año, 11 de 16 acuíferos en déficit, estrés de 128.6% en 2023. Nota del 1 de octubre de 2026.",
  },
  {
    name: "Túnel Emisor Oriente",
    detail: "En operación desde 2019. 62.5 km hasta Hidalgo.",
  },
] as const;

export const SCENES: Scene[] = [
  {
    id: "s01",
    title: "El satélite",
    kicker: "NISAR · oct 2025 – ene 2026",
    ken: "a",
    image: "/film/s01.jpg",
    audio: "/film/s01.mp3",
    video: "/film/c01.mp4",
    narration:
      "Desde octubre de dos mil veinticinco, un satélite compartido por la NASA y por la India mira el Valle de México sin que las nubes le estorben. No busca una postal. Busca movimiento. Entre octubre y enero, en algunos puntos del oriente, el suelo bajó más de dos centímetros en un solo mes. No hubo un temblor que lo explique. No es una metáfora. Es arcilla de lago cerrándose debajo de una metrópoli de más de veinte millones de personas. En los siguientes minutos vamos a bajar ahí: de dónde sale el hundimiento, qué cifra se volvió mentira de titular, qué parte ya no tiene regreso, y qué fragmento del lago empezó a volver en dos mil veintiséis. Conviene decirlo ya: no toda la ciudad baja a la misma velocidad. El piso que parece quieto no lo está.",
  },
  {
    id: "s13",
    title: "Desde la órbita",
    kicker: "Radar que mide centímetros",
    ken: "b",
    image: "/film/s13.jpg",
    audio: "/film/s13.mp3",
    narration:
      "El satélite no trae una cinta métrica. Trae radar. Manda una onda larga, de las que atraviesan nube y humo, y mide cuánto tarda en regresar. Lo hace una vez. Semanas después, lo hace otra. Si el suelo se movió, aunque sea un centímetro, el viaje de la onda cambia. Esa diferencia, repetida sobre todo el valle, se vuelve un mapa: dónde bajó, dónde casi no, dónde el hundimiento ya es viejo y sigue solo. El nombre de laboratorio es interferometría. La idea cabe en una frase. Dos retratos del mismo lugar, comparados hasta el milímetro. Nisar, la misión compartida de la NASA y de la India, hizo exactamente eso entre octubre de dos mil veinticinco y enero de dos mil veintiséis. Por eso la frase honesta no es que la ciudad entera se cae medio metro cada año. La frase honesta es que hay zonas, visibles desde la órbita, bajando más de dos centímetros en un mes, y otras que se mueven mucho menos. Tres meses de radar no borran sesenta años de niveles en la calle. Sirven para otra cosa: para que el hundimiento deje de ser una opinión de redes. Ya es una imagen. Y cuando la imagen es de una colonia, y no de un promedio nacional, la conversación cambia de tono.",
  },
  {
    id: "s02",
    title: "El número que miente",
    kicker: "El pico no es el promedio",
    ken: "b",
    image: "/film/s02.jpg",
    audio: "/film/s02.mp3",
    narration:
      "El dato que viaja por las redes dice cincuenta centímetros al año. El número existe, y casi siempre se cuenta mal. Ese pico se midió en un solo punto del vaso seco, al oeste de la laguna Nabor Carrillo, más en el Estado de México que en el corazón de la capital. En el Centro Histórico, donde la gente fotografía la catedral, la baja anda más cerca de uno a nueve centímetros al año, y lleva así unas seis décadas. Iztapalapa y Nezahualcóyotl alcanzan picos de alrededor de treinta y nueve centímetros. La diferencia importa. Una ciudad que baja pareja se puede renivelar. Una ciudad que se arruga parte banquetas, tuberías y casas. El titular usa el máximo. La vida ocurre en el mapa.",
  },
  {
    id: "s03",
    title: "La isla",
    kicker: "1521 · una ciudad en el lago",
    ken: "c",
    image: "/film/s03.jpg",
    audio: "/film/s03.mp3",
    video: "/film/c03.mp4",
    narration:
      "Antes de mil quinientos veintiuno esto no era un valle vacío esperando calles. Era agua. Tenochtitlan estaba en una isla del lago de Texcoco, amarrada a la orilla por calzadas, alimentada por chinampas. La ciudad no le hacía la guerra al lago. Lo usaba de camino, de defensa y de esponja. Había inundaciones, sí, y también una ingeniería que convivía con el nivel del agua en lugar de declararle la guerra. Los volcanes cerraban el horizonte. Las trajineras no eran un recuerdo: eran tráfico. Fundar aquí no fue el error. El error fue el que vino después, cuando alguien decidió que un lago era un defecto que había que borrar del mapa.",
  },
  {
    id: "s04",
    title: "Secar el vaso",
    kicker: "Del tajo de Nochistongo al Gran Canal",
    ken: "d",
    image: "/film/s04.jpg",
    audio: "/film/s04.mp3",
    narration:
      "Las inundaciones del siglo dieciséis asustaron a la ciudad colonial. La estrategia se volteó por completo. Ya no se trataba de vivir con el lago, sino de sacarlo. Vino el tajo de Nochistongo, en el diecisiete. Vinieron siglos de zanjas. Y cerca de mil novecientos, el Gran Canal del Desagüe terminó el trabajo que los virreyes habían empezado. Contra la inundación, funcionó. Contra la sed, fue un desastre lento. Al irse el lago se fue también la reserva que estaba a la vista. La ciudad creció encima de un fondo blando y, para beber, hizo lo único que parecía quedar: perforar ese fondo y sacarle el agua que todavía lo sostenía.",
  },
  {
    id: "s05",
    title: "La esponja",
    kicker: "La arcilla que ya no se levanta",
    ken: "b",
    image: "/film/s05.jpg",
    audio: "/film/s05.mp3",
    narration:
      "Debajo del vaso hay arcilla fina, nacida en el lago, llena de poros y de agua. Mientras el acuífero empuja, esos poros se mantienen abiertos, como una esponja inflada. Cada pozo que saca más de lo que la lluvia repone suelta esa presión. La arcilla se aplasta. El suelo baja. Y no baja como una tabla: baja donde la arcilla es más gruesa y donde durante décadas se extrajo más. Aquí está la frase que los titulares evitan. Un estudio de dos mil veintiuno mostró que, en las zonas más rápidas, el hundimiento ya no sigue el ritmo de los pozos de hoy. Es compactación vieja. Aunque mañana se cerraran todos los pozos, una parte del daño no vuelve a levantarse.",
  },
  {
    id: "s06",
    title: "La catedral",
    kicker: "7.5 m en el centro · 1940–1985",
    ken: "a",
    image: "/film/s06.jpg",
    audio: "/film/s06.mp3",
    narration:
      "Por eso la Catedral Metropolitana no está derecha, y no alcanza con echarle la culpa al siglo diecisiete. Entre mil novecientos cuarenta y mil novecientos ochenta y cinco, el centro acumuló cerca de siete metros y medio de hundimiento. El templo se inclinó porque un lado del suelo cedió más que el otro. Los ingenieros la han apuntalado, nivelado e inyectado. Sigue en pie, que no es poca cosa. También sigue bajando, despacio, con una constancia de reloj. Si caminas el Zócalo y el piso te parece firme, recuerda la medida: centímetros al año no se sienten en los pies. Se sienten en las puertas que ya no cierran y en las grietas que nadie recuerda haber visto el año pasado.",
  },
  {
    id: "s07",
    title: "La grieta",
    kicker: "El suelo blando amplifica",
    ken: "c",
    image: "/film/s07.jpg",
    audio: "/film/s07.mp3",
    video: "/film/c07.mp4",
    narration:
      "En el oriente la imagen cambia de escala. Ya no es un templo. Es una casa partida, una banqueta que no coincide con la puerta, una tubería torcida que pierde el agua que costó tanto subir. El suelo blando del antiguo lago, además, cambia la forma en que pega un sismo. En mil novecientos ochenta y cinco y otra vez en dos mil diecisiete, el epicentro estaba lejos. El daño en la ciudad lo amplificó el tipo de tierra: un colchón de arcilla exprimida no se mueve como la roca. La grieta de la foto no es el desastre entero. Es la factura, escrita en el piso, de un lago al que se le quitó el agua y se le puso encima una ciudad.",
  },
  {
    id: "s08",
    title: "El canal que sube",
    kicker: "62.5 km · Túnel Emisor Oriente",
    ken: "d",
    image: "/film/s08.jpg",
    audio: "/film/s08.mp3",
    narration:
      "El Gran Canal se deformó tanto que hay tramos donde el agua ya no sabe bajar. Hay que bombearla hacia arriba para que la gravedad vuelva a servir. Piénsalo: un drenaje que corre cuesta arriba, en la ciudad que se construyó precisamente para que el agua se fuera. El Túnel Emisor Oriente, terminado en dos mil diecinueve, recorre sesenta y dos kilómetros y medio hasta Hidalgo. Alivia inundaciones. No devuelve el lago. Y en los mapas nuevos de radar, el aeropuerto de la ciudad aparece entre las manchas que más rápido se mueven. Una pista exige un suelo que no cambie de altura. Encima del vaso, esa exigencia se paga cada año en reparaciones.",
  },
  {
    id: "s09",
    title: "Mil estadios",
    kicker: "−938 hm³ al año",
    ken: "a",
    image: "/film/s09.jpg",
    audio: "/film/s09.mp3",
    narration:
      "El agua que falta también tiene cifra, y es de este año. Un balance del Valle de México reportado al empezar octubre de dos mil veintiséis marcó un déficit subterráneo de más de novecientos treinta y ocho hectómetros cúbicos al año. Traducido como lo tradujo la nota: casi mil veces el volumen del estadio universitario. Cada año. Debajo de la ciudad. Once de los dieciséis acuíferos del sistema están en déficit. Seis se clasifican como sobreexplotados. Los más críticos: Valle de México, Cuautitlán-Pachuca, Texcoco y Valle de Toluca. En dos mil veintitrés el estrés hídrico llegó a ciento veintiocho por ciento. Eso significa una sola cosa. Se saca más de lo que el ciclo alcanza a devolver.",
  },
  {
    id: "s10",
    title: "Lo que no regresa",
    kicker: "Compactación irreversible",
    ken: "b",
    image: "/film/s10.jpg",
    audio: "/film/s10.mp3",
    narration:
      "En el punto más extremo, los modelos hablan de cerca de treinta y nueve metros acumulados entre mil novecientos cincuenta y dos mil veinte. No es el promedio de tu colonia y no debe usarse como susto de portada. Es el techo de un solo lugar, y sirve para entender la escala del error. En el centro, la cuenta medida de mediados de siglo ya iba por varios metros. La ciudad respondió como sabe: bombeando el drenaje hacia arriba, corrigiendo templos, discutiendo aeropuertos. El aeropuerto que se proyectó sobre el vaso de Texcoco se canceló, entre otras razones, porque ese suelo no perdona una pista quieta. El suelo guarda memoria. Cada litro de más que se le quitó sigue escrito en la altura de las calles.",
  },
  {
    id: "s11",
    title: "El lago que vuelve",
    kicker: "Enero 2026 · Texcoco",
    ken: "c",
    image: "/film/s11.jpg",
    audio: "/film/s11.mp3",
    video: "/film/c11.mp4",
    narration:
      "Hay una escena de este mismo año que no es de alarma. En enero de dos mil veintiséis abrió de forma permanente el Parque Ecológico Lago de Texcoco. Son alrededor de catorce mil hectáreas del vaso viejo. En temporada seca quedan cerca de dos mil doscientas hectáreas de agua abierta. Cuando llueve, pueden pasar de cuatro mil quinientas. No es la Tenochtitlan de los códices. Es un fragmento, con aves, con tule, con una orilla que vuelve a reflejar el cielo. También es una confesión de la ingeniería mexicana, dicha en voz baja: el lago no era el problema. Secarlo, sí. Devolverle aunque sea un pedazo es la primera frase honesta en cuatrocientos años.",
  },
  {
    id: "s12",
    title: "Sobre un lago",
    kicker: "Cuatrocientos años",
    ken: "d",
    image: "/film/s12.jpg",
    audio: "/film/s12.mp3",
    narration:
      "Llevas unos diez minutos sobre una decisión de cuatro siglos. No se deshace con un video, ni con un pozo nuevo, ni con culpar solo al clima. El hundimiento de la Ciudad de México nació de secar un lago y luego beberse el acuífero que sostenía la arcilla. Parte de esa compactación ya es permanente. Lo que sí se puede cambiar es lo de adelante: dejar de tratar el agua subterránea como si fuera infinita, reparar las fugas que se llevan una tajada enorme de lo que sí se extrae, y devolverle al vaso algo de la superficie que se le quitó. La ciudad no se cae mañana. Se hunde hoy, desigual, y ya se ve desde el espacio. La pregunta no es si el satélite exagera. Es si vamos a seguir parados sobre un lago que ya no está, fingiendo que el piso es piedra.",
  },
];
