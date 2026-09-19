import type { Lesson } from '../types'

export const EQUIPMENT_LESSONS: Lesson[] = [
  // ------------------------------------------------------------- raquetas
  {
    id: 'racquet-anatomy-and-specs',
    section: 'racquets',
    title: 'Anatomía y especificaciones de la raqueta',
    summary: 'Tamaño de cabeza, longitud, peso, swingweight, balance, rigidez, ancho de perfil y patrón de encordado: qué significa cada número y cómo cambia la forma en que juega la raqueta.',
    level: 'beginner',
    minutes: 9,
    blocks: [
      {
        type: 'text',
        body: 'Una raqueta tiene una **cabeza** (el aro que sostiene las cuerdas), un **corazón** (el triángulo abierto donde se unen los dos lados del marco), un **cuello**, un **mango** envuelto en un grip y un **tapón** en el extremo. El **perfil** es la sección transversal del marco; los ojales son la tira de plástico por donde pasan las cuerdas y el protector cubre la parte superior de la cabeza. Las reglas permiten un marco de hasta 73,7 cm (29 in) de largo y 31,7 cm (12,5 in) de ancho, con un área encordada de no más de 39,4 cm de largo ni 29,2 cm de ancho.\n\nCada especificación de abajo es un compromiso entre potencia, control, maniobrabilidad y comodidad. No existe la mejor raqueta, solo la que mejor se ajusta a tu swing.',
      },
      {
        type: 'table',
        columns: ['Especificación', 'Rango típico', 'El extremo bajo significa', 'El extremo alto significa'],
        rows: [
          ['Tamaño de cabeza', '93–118 sq in (600–761 cm²); 100 sq in = 645 cm²', 'Más control y sensación, punto dulce más pequeño', 'Más potencia y tolerancia, más torsión en golpes descentrados'],
          ['Longitud', '68,6 cm (27 in) estándar, hasta 73,7 cm (29 in) legal', 'Más rápida de mover, mejor en la red', 'Más palanca y alcance en el saque, más lenta de maniobrar'],
          ['Peso estático (sin encordar)', '255–340 g; añade unos 15–18 g por cuerdas y overgrip', 'Fácil de mover rápido y en sesiones largas, más vibración', 'Más estabilidad y empuje, menos vibración al brazo, más esfuerzo'],
          ['Swingweight', '280–345 (encordada); 320 es medio', 'Ágil, alta velocidad de cabeza de raqueta', 'Pesada a través de la pelota, estable ante la velocidad, cansadora'],
          ['Balance', '30,5–35 cm desde el tapón; neutro = 34,3 cm; 1 punto = 3,175 mm (1/8 in)', 'Al mango (HL): más control y maniobrabilidad', 'A la cabeza (HH): más potencia con un marco ligero'],
          ['Rigidez (RA)', '55–75', 'Flexible: más comodidad y sensación, menos potencia', 'Rígida: más potencia, más seca, más dura para el brazo'],
          ['Ancho de perfil', '17–30 mm', 'Fino: flexible, preciso, menos potencia', 'Grueso: rígido y potente, más resistencia aerodinámica'],
          ['Patrón de encordado', '16x18 a 18x20', 'Abierto (16x19): más efecto y potencia, las cuerdas se mueven y se rompen antes', 'Denso (18x20): más control y durabilidad, más plano, más predecible'],
        ],
      },
      {
        type: 'text',
        body: 'El **tamaño de cabeza** se expresa en pulgadas cuadradas; 1 sq in son 6,45 cm². Midsize es 85–95 sq in, mid-plus 96–104, oversize 105 en adelante. Casi todas las raquetas de adulto de hoy están entre 97 y 100 sq in porque ese es el punto dulce entre tolerancia y control.\n\nEl **balance** se mide desde el tapón hasta el punto donde la raqueta se equilibra sobre un riel. Una raqueta de 68,6 cm se equilibra de forma neutra a 34,3 cm. Cada 3,175 mm (1/8 in) hacia el mango es un punto de balance al mango, así que un marco equilibrado a 32 cm está unos 7 puntos HL. Los marcos de jugador están 6–12 pts HL; los marcos ligeros de potencia son neutros o con balance a la cabeza para seguir llevando masa a través de la pelota.',
      },
      {
        type: 'callout',
        title: 'El swingweight le gana al peso estático',
        body: 'Dos raquetas pueden pesar ambas 300 g y sentirse completamente distintas, porque lo que tu brazo siente es el swingweight: cómo se distribuye la masa a lo largo del marco, medido en una máquina y expresado como un número sin unidades. Una raqueta de 300 g con balance a la cabeza puede sentirse más pesada al mover que una de 315 g al mango. Por debajo de 300 tienes agilidad y velocidad, 310–330 es donde cae la mayoría de los adultos, y por encima de 335 necesitas hombros fuertes. Si pruebas raquetas, pide en la tienda el swingweight, no solo el peso.',
      },
      {
        type: 'text',
        body: 'La **rigidez** es el número RA de una máquina Babolat RDC, que mide cuánto se flexiona el marco bajo carga. Los marcos de potencia modernos como la Babolat Pure Drive están en 70–72 RA; la Wilson Blade 98 está en unos 62; los marcos flexibles antiguos estaban en los 50. Un marco más rígido devuelve más energía a la pelota, pero también pasa más vibración a tu codo. Los jugadores con problemas de brazo deberían quedarse en 65 o menos y usar una cuerda blanda.\n\nEl **ancho de perfil** va de la mano con la rigidez: un perfil de 21 mm es fino y flexible, uno de 26 mm es grueso y rígido. Los perfiles variables (23–26–23 mm) intentan combinar ambos.',
      },
      {
        type: 'list',
        items: [
          '16x19 significa 16 cuerdas verticales (a lo largo) y 19 horizontales. Los huecos más anchos dejan que la pelota se hunda y que las cuerdas vuelvan de golpe, añadiendo efecto y una salida más viva; la contrapartida es un desgaste más rápido de las cuerdas y algo menos de control direccional.',
          '18x20 mete más cuerdas en la misma cabeza, dando una respuesta más plana y controlada y mejor vida de las cuerdas, pero menos efecto y una sensación más rígida. Preferido por los jugadores planos y por quienes toman la pelota temprano.',
          'Los patrones 16x18 y 16x16 (Wilson Spin, Prince Textreme) llevan el efecto más lejos, a costa de una rotura de cuerdas muy rápida.',
          'El tamaño de grip se mide alrededor del mango: las tallas europeas 0–5 corresponden a las de EE. UU. de 4 in a 4 5/8 in (100–118 mm de circunferencia). La mayoría de los hombres usa 3 (4 3/8 in), la mayoría de las mujeres 2 (4 1/4 in).',
          'Los jugadores del circuito casi siempre personalizan: cinta de plomo a las 3 y las 9 para estabilidad, silicona en el mango para peso y un grip de cuero para desplazar el balance. El servicio de «matching» de una tienda puede ajustar dos marcos a especificaciones idénticas.',
        ],
      },
    ],
  },
  {
    id: 'choosing-your-first-racquet',
    section: 'racquets',
    title: 'Elegir tu primera raqueta',
    summary: 'Una especificación de partida clara para adultos principiantes, la tabla de longitudes junior, cómo probar bien y los errores que cuestan dinero o codos.',
    level: 'beginner',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Para un adulto principiante casi todos los entrenadores dan la misma respuesta: **cabeza de 100 sq in, 280–300 g sin encordar, patrón 16x19, longitud estándar de 68,6 cm, balance alrededor de 32–33 cm (4–7 pts al mango), rigidez 65–70 RA**. Esta es la categoría tweener: Babolat Pure Drive y Pure Aero, Wilson Clash y Blade 100, Head Speed y Extreme MP, Yonex EZONE 100, Tecnifibre TF-X1. La mayoría de las marcas también vende una versión «Team» o «Lite» de 270–285 g, una buena elección para adultos pequeños y adolescentes.\n\nLa tentación es ir más ligero y más grande para tener potencia fácil. Resístela: un marco de 250 g y 110 sq in se siente maravilloso durante un mes, luego frena tu técnica y te lastima el brazo.',
      },
      {
        type: 'table',
        columns: ['Jugador', 'Cabeza', 'Peso sin encordar', 'Patrón', 'Por qué'],
        rows: [
          ['Adulto principiante, contextura media', '100 sq in', '285–300 g', '16x19', 'Suficiente masa para estabilidad, lo bastante ligera para aprender un swing completo'],
          ['Adulto principiante, pequeño o mayor, o con problemas de brazo', '100–105 sq in', '270–285 g, RA menor de 66', '16x19', 'Más fácil de mover, más tolerante, sensación más suave'],
          ['Adulto principiante que jugó otros deportes de raqueta', '98–100 sq in', '295–305 g', '16x19', 'Ya tiene velocidad de swing y timing; puede manejar más masa'],
          ['Adolescente de 13–16 pasando a tamaño completo', '100 sq in', '270–290 g', '16x19', 'Crece con ella; evita los marcos de jugador pesados hasta los 16+'],
          ['Niño menor de 12', 'Longitudes junior 19–26 in', '170–250 g encordada', 'Encordada de fábrica', 'Talla por altura y etapa de pelota, no por ambición'],
        ],
      },
      {
        type: 'text',
        body: 'Los juniors se tallan por **altura primero, edad segundo**: 19 in por debajo de 100 cm, 21 in para 100–115 cm, 23 in para 115–125 cm, 25 in para 125–140 cm, 26 in para 140–150 cm y un marco de adulto de 27 in desde unos 150 cm. Comprobación rápida: con el niño de pie y la raqueta colgando recta del mango, la cabeza debe apenas llegar al suelo. Codo flexionado significa demasiado larga; bien separada del suelo significa demasiado corta.\n\nAjusta la raqueta a la etapa de pelota: 19–23 in con roja, 23–25 in con naranja, 25–26 in con verde. El aluminio está bien hasta 23 in; desde 25 in elige compuesto de grafito si el niño juega más de una vez por semana.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Prueba antes de comprar', body: 'La mayoría de las tiendas especializadas presta dos o tres marcos por una semana por una pequeña tarifa que se descuenta de la compra. Llévalos todos a la misma sesión y pega los mismos golpes con cada uno: 20 derechas, 20 reveses, 10 saques, algunas voleas. Anota con cuál pegas profundo sin esfuerzo y con cuál sientes la pelota.' },
          { title: 'Acierta con el tamaño de grip', body: 'Mide desde el pliegue medio de tu palma hasta la punta del dedo anular. Esa longitud en pulgadas (normalmente 4 1/8 a 4 5/8) es tu tamaño de grip. Entre tallas, elige la menor y añade un overgrip, que suma unos 1/16 in.' },
          { title: 'Hazla encordar para ti', body: 'Las cuerdas de fábrica son tripa sintética barata a una tensión desconocida. Pide un multifilamento o tripa sintética a 23–24 kg (50–53 lb), nunca poliéster para un principiante. Una cuerda nueva y más blanda hace cualquier marco más tolerante.' },
          { title: 'Compra una, no dos', body: 'No necesitas un segundo marco idéntico hasta que rompas cuerdas a mitad de partido, lo que para un principiante casi nunca pasa. Gasta ese dinero en una clase.' },
        ],
      },
      {
        type: 'callout',
        title: 'Qué no hacer',
        body: 'No compres la raqueta de un profesional porque te gusta el jugador: el marco que promociona raramente es el que usa, y la versión comercial de un marco de jugador es más pesada y menos tolerante de lo que un principiante necesita. No compres una raqueta de supermercado de 20 euros para un adulto: el marco de aluminio y las cuerdas muertas hacen que la pelota se sienta como una piedra y fomentan swings rígidos y solo de brazo. No compres por una foto sin revisar el peso sin encordar y el tamaño de grip; ambos están impresos en el interior del corazón.',
      },
      { type: 'link', to: '/learn/racquets', label: 'Compara tipos de raqueta, tallas junior y cuerdas' },
    ],
  },
  {
    id: 'strings-tension-and-restringing',
    section: 'racquets',
    title: 'Cuerdas, tensión y reencordado',
    summary: 'Los tipos de cuerda en una tabla, cómo la tensión cambia potencia y control, cuándo reencordar, por qué el poliéster es solo para jugadores avanzados y cómo mantener sano tu brazo.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Las cuerdas son la única parte de la raqueta que toca la pelota, y se desgastan. Los fabricantes imprimen un rango de tensión recomendado en el marco, normalmente **22–27 kg (48–60 lb)**. Dentro de ese rango, **menos tensión da más potencia, más efecto y más comodidad**, porque las cuerdas se deforman más y retienen la pelota más tiempo; **más tensión da más control** porque la pelota sale del encordado más rápido y de forma más predecible. Las diferencias son reales pero menores de lo que la gente cree: 2 kg es más o menos el cambio más pequeño que la mayoría puede sentir.\n\nLa mayoría de los jugadores de club rinde bien entre 23 y 25 kg (50–55 lb) con una cuerda de nailon. El poliéster debe encordarse 2–4 kg por debajo de lo que encordarías un nailon, porque es más rígido.',
      },
      {
        type: 'table',
        columns: ['Cuerda', 'Sensación y potencia', 'Efecto', 'Durabilidad', 'Comodidad', 'Para quién', 'Tensión'],
        rows: [
          ['Tripa natural', 'La más blanda, la más potente, la que mejor mantiene la tensión', 'Medio', 'Media, odia el agua', 'La mejor', 'Jugadores de sensación, quienes sufren del brazo, verticales de híbrido', '23–27 kg'],
          ['Multifilamento', 'Blanda y viva, similar a la tripa', 'Medio', 'Baja–media, se deshilacha', 'Excelente', 'Principiantes, jugadores de club, dolor de brazo', '23–26 kg'],
          ['Tripa sintética', 'Crujiente, potencia media, barata', 'Medio', 'Media', 'Buena', 'Principiantes, juniors, presupuesto ajustado', '23–26 kg'],
          ['Poliéster', 'Firme, poca potencia, muy controlado', 'El máximo', 'Muy alta, pero muere en 10–20 horas', 'Pobre', 'Avanzados de swing rápido, rompedores de cuerdas', '20–25 kg'],
          ['Híbrido', 'Entre las dos cuerdas usadas', 'Alto con verticales de poli', 'Buena', 'Buena con verticales de tripa o multi', 'Intermedios y avanzados', 'Poli 1–2 kg por debajo de la cuerda blanda'],
        ],
      },
      {
        type: 'callout',
        title: 'Con qué frecuencia reencordar',
        body: 'La regla clásica: reencorda tantas veces al año como juegas por semana. Juegas dos veces por semana, reencorda dos veces al año, como mínimo. Eso cubre las cuerdas de nailon, que pierden tensión gradualmente y se vuelven muertas y sin respuesta mucho antes de romperse. El poliéster es distinto: pierde tensión rápido y debe cortarse tras 10–20 horas de juego, aunque pueda durar meses sin romperse. Una cuerda que lleva un año en el marco está jugando al menos un 10–15 % por debajo de la tensión que pediste.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Nota las señales', body: 'Las verticales ya no vuelven derechas tras un golpe y quedan torcidas. La pelota empieza a irse larga sin cambios en tu swing. El sonido pasa de un «ping» a un golpe sordo. Las muescas donde las verticales cruzan las horizontales son tan profundas que enganchan una uña.' },
          { title: 'Elige la cuerda', body: 'Principiantes y cualquiera con dolor de brazo: multifilamento o tripa sintética. Jugadores intermedios que quieren más efecto: un híbrido con verticales de poli y una horizontal blanda, o al revés. Jugadores avanzados con swings rápidos que rompen el nailon en una semana: poliéster completo a baja tensión, aceptando que hay que reemplazarlo a menudo.' },
          { title: 'Elige la tensión', body: 'Empieza en el medio del rango del marco, por ejemplo 24 kg. Si la pelota se va larga y ya haces el swing completo, sube 1 kg. Si te falta profundidad o el marco se siente duro, baja 1 kg. Escribe la cuerda y la tensión en el marco con un marcador para poder comparar la próxima vez.' },
          { title: 'Pide consistencia al encordador', body: 'Un buen encordador usa una máquina electrónica de tracción constante y registra tu cuerda, tensión y fecha. Haz encordar ambas raquetas en la misma máquina y, si vas en serio, el mismo día, porque una cuerda nueva juega distinto que una de hace una semana.' },
        ],
      },
      {
        type: 'text',
        body: '**El poliéster es solo para jugadores avanzados.** La rigidez del poli es lo que le da control y su retorno de golpe es lo que da el efecto pesado, pero solo funciona a alta velocidad de cabeza de raqueta. Un principiante que hace el swing lento con poli obtiene un encordado muerto y sin potencia que transmite la vibración directo al codo, y luego compensa forzando la pelota con el brazo. Los entrenadores de juniors y la mayoría de las guías de medicina deportiva recomiendan nada de poliéster por debajo de unos 13 años, y nunca en una raqueta rígida para un jugador con historial de dolor de brazo.\n\nSi quieres el efecto del poli a nivel de club, usa un híbrido: verticales de poli con una horizontal blanda de multifilamento, encordado 2 kg por debajo de lo que encordarías el nailon.',
      },
      {
        type: 'list',
        items: [
          'El codo de tenista lo causan la vibración repetida y los golpes descentrados, no un único factor. La configuración más amable es un marco flexible (RA menor de 65) de 300 g o más, un multifilamento o tripa a 22–24 kg, un tamaño de grip correcto y una empuñadura relajada.',
          'Un antivibrador cambia el sonido, no la vibración: los estudios muestran casi ningún efecto sobre la vibración que llega al brazo. Usa uno si te gusta el sonido.',
          'No encordes por encima del rango recomendado; los marcos pueden rajarse y las garantías se anulan.',
          'Las cuerdas pierden alrededor de un 10 % de su tensión en las primeras 24 horas tras el encordado, y luego lentamente. Una cuerda preestirada (la tripa y los multifilamentos suelen preestirarse por el encordador) pierde menos.',
          'Lleva un set de repuesto de tu cuerda en el bolso para que el encordador pueda replicarla exactamente, y nunca dejes una raqueta en un auto caliente: el calor ablanda las cuerdas y debilita el marco.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- empuñaduras
  {
    id: 'how-to-hold-the-racquet',
    section: 'grips',
    title: 'Cómo sostener la raqueta',
    summary: 'Los ocho biseles, el método del nudillo base y la almohadilla del talón para encontrar cualquier empuñadura, el dedo gatillo, cuánto apretar y cómo comprobar tu tamaño de grip.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'El mango de una raqueta es un octágono con **ocho biseles**. Sostén la raqueta de canto, cuerdas perpendiculares al suelo, y mira el tapón desde arriba. El bisel plano de arriba es el **bisel 1**. Para un diestro, cuenta en sentido horario: 2 es la diagonal superior derecha, 3 el lado derecho, 4 la diagonal inferior derecha, 5 la parte inferior, 6 la diagonal inferior izquierda, 7 el lado izquierdo y 8 la diagonal superior izquierda. Los zurdos cuentan en sentido antihorario, así que cada empuñadura se refleja.\n\nCada empuñadura se define por el bisel en el que descansan dos partes de tu mano: el **nudillo base del dedo índice** (donde el dedo se une a la palma) y la **almohadilla del talón** (la parte carnosa en la base de la palma bajo el meñique).',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Encuentra tus dos referencias', body: 'Abre la mano con la que golpeas. Toca el nudillo en la base de tu dedo índice; esa es la referencia uno. Luego presiona la almohadilla en el exterior de tu palma bajo el meñique; esa es la referencia dos, la almohadilla del talón. Cuando ambas descansan planas sobre el mismo bisel, la empuñadura está limpia.' },
          { title: 'Coloca el nudillo del índice', body: 'Apoya la raqueta de canto y coloca el nudillo base del índice sobre el bisel objetivo: 2 para continental, 3 para este de derecha, 4 para semioeste, 1 para este de revés. No envuelvas los dedos todavía.' },
          { title: 'Coloca la almohadilla del talón en el mismo bisel', body: 'Desliza la almohadilla del talón sobre el mismo número de bisel. Esto alinea tu palma con la cara de la raqueta. Si la almohadilla está en un bisel distinto al del nudillo, la empuñadura está torcida y la cara será difícil de controlar.' },
          { title: 'Separa los dedos, dedo gatillo arriba', body: 'Envuelve los dedos con un hueco entre el índice y el medio, el índice extendido ligeramente hacia arriba del mango como un gatillo. El meñique queda en el extremo mismo del mango, incluso parcialmente sobre el tapón, para máxima palanca.' },
          { title: 'Comprueba la V', body: 'La V que forman tu pulgar y tu índice apunta a algún punto de la parte superior del mango. Para continental apunta al borde izquierdo del bisel 1; para este de derecha al borde derecho; para semioeste hacia el bisel 2.' },
        ],
      },
      {
        type: 'callout',
        title: 'Presión de empuñadura: 3 sobre 10',
        body: 'Sostén la raqueta como si sostuvieras un pajarito o un tubo de pasta de dientes sin la tapa. En una escala de 1 a 10, esperar en la posición de espera y hacer el swing debería ser un 3. La empuñadura se firma hasta un 6 o 7 solo en el momento del contacto y luego vuelve a relajarse. Una empuñadura apretada frena la raqueta, bloquea la muñeca, mata la sensación y es una de las principales causas de codo de tenista. Si tu antebrazo está cansado tras una hora, estás apretando demasiado.',
      },
      {
        type: 'text',
        body: 'El **tamaño de grip** es la circunferencia del mango, expresada en pulgadas en EE. UU. (de 4 in a 4 5/8 in) o como tallas 0 a 5 en Europa. Dos formas de medirlo.\n\n**Método de la regla.** Abre plana la mano con la que golpeas y mide desde el pliegue medio de tu palma hasta la punta del dedo anular. Esa distancia es tu tamaño de grip, normalmente 4 1/8 a 4 5/8 in (10,5–11,7 cm); mira la tabla de abajo para las conversiones.\n\n**Prueba del dedo índice.** Sostén la raqueta en una empuñadura este de derecha y desliza el índice de la otra mano en el hueco entre las puntas de tus dedos y el talón de tu palma. Debe entrar justo. Si sobra espacio, es demasiado grande; si no entra, es demasiado pequeño.',
      },
      {
        type: 'table',
        columns: ['Talla europea', 'Talla EE. UU.', 'Circunferencia', 'Típica para'],
        rows: [
          ['0', '4 in', '100–103 mm', 'Juniors que pasan a un marco de tamaño completo'],
          ['1', '4 1/8 in', '103–106 mm', 'Manos pequeñas, muchas mujeres'],
          ['2', '4 1/4 in', '106–110 mm', 'La mayoría de las mujeres, hombres de manos pequeñas'],
          ['3', '4 3/8 in', '110–113 mm', 'La mayoría de los hombres'],
          ['4', '4 1/2 in', '113–118 mm', 'Manos grandes'],
          ['5', '4 5/8 in', '118–120 mm', 'Manos muy grandes; raramente en stock'],
        ],
      },
      {
        type: 'list',
        items: [
          'Entre tallas, elige la menor y añade un overgrip. Un overgrip suma unos 1/16 in (1,5 mm) y un grip de reemplazo unos 1/8 in.',
          'Un grip demasiado pequeño te hace apretar más para evitar que la raqueta gire, lo que carga el antebrazo. Un grip demasiado grande frena la acción de muñeca en el saque y vuelve torpes los cambios de empuñadura.',
          'Cambia el overgrip cuando se ponga brillante o resbaloso; un overgrip nuevo te permite sostener la raqueta más suelta.',
          'Un grip de reemplazo de cuero da biseles más marcados, lo que facilita sentir los cambios de empuñadura al tacto.',
        ],
      },
    ],
  },
  {
    id: 'which-grip-for-which-stroke',
    section: 'grips',
    title: 'Qué empuñadura para cada golpe',
    summary: 'Un mapa de cada golpe a su empuñadura habitual, con los números de bisel y la razón por la que cada empuñadura se ajusta a su función.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Necesitas tres empuñaduras para jugar todo el juego: **continental** para todo lo que ocurre en la red y por encima de la cabeza, una **empuñadura de derecha** (este o semioeste para la mayoría) y una **empuñadura de revés** (este de revés para un revés a una mano, o continental más una este con la mano izquierda para un revés a dos manos). Todas las demás empuñaduras son variaciones de estas. La tabla de abajo da las elecciones estándar para un diestro, con los números de bisel para el nudillo base del índice y la almohadilla del talón.',
      },
      {
        type: 'table',
        columns: ['Golpe', 'Empuñadura estándar', 'Bisel (nudillo/talón)', 'Alternativas', 'Por qué esta empuñadura'],
        rows: [
          ['Derecha', 'Semioeste', '4/4', 'Este (3/3), oeste (5/5)', 'Lo bastante cerrada para el topspin, lo bastante abierta para atravesar la pelota'],
          ['Revés a dos manos', 'Mano derecha continental, mano izquierda este de derecha', '2/2 derecha, 7/7 izquierda', 'Mano derecha este de revés (1/1), mano izquierda semioeste (6/6)', 'La mano izquierda da el swing, la derecha dirige y suelta con facilidad para el slice'],
          ['Revés a una mano', 'Este de revés', '1/1', 'Este extrema de revés (8/8)', 'Pone el dorso de la mano detrás de la pelota para una cara vertical'],
          ['Saque', 'Continental', '2/2', 'Ligeramente hacia este de revés para saques con kick', 'Libera la muñeca para pronar y permite cortado, kick y plano con una sola empuñadura'],
          ['Devolución', 'Empuñadura de peloteo de derecha o revés', 'Como en el peloteo', 'Continental para devoluciones con chip ante un gran saque', 'Preparación corta, la misma empuñadura con la que peloteas, así no se pierde tiempo cambiando'],
          ['Slice (derecha o revés)', 'Continental', '2/2', 'Este de revés para un revés cortado más firme', 'La cara abierta se desliza bajo la pelota de forma natural'],
          ['Volea de derecha', 'Continental', '2/2', 'Ligeramente hacia este de derecha para principiantes', 'Una empuñadura cubre ambas voleas; cara abierta para el efecto cortado y el toque'],
          ['Volea de revés', 'Continental', '2/2', 'Este de revés para una volea más seca', 'La misma empuñadura que la volea de derecha, así no hay cambio en la red'],
          ['Volea con swing', 'Semioeste o este de derecha', '4/4 o 3/3', 'Empuñadura de dos manos en el lado del revés', 'Es un golpe de fondo pegado en el aire, así que usa tu empuñadura de fondo'],
          ['Smash', 'Continental', '2/2', 'Ninguna', 'El mismo movimiento que el saque; la muñeca latiguea y prona'],
          ['Smash de espaldas (tijera, por encima del hombro)', 'Continental', '2/2', 'Ninguna', 'La única empuñadura que te deja devolver la pelota por encima de la cabeza con un golpe de muñeca'],
          ['Dejada', 'Continental', '2/2', 'Este de derecha en el lado de la derecha, disimulada desde una empuñadura de peloteo', 'Cara abierta, manos suaves y efecto cortado para matar el bote'],
          ['Tweener', 'Continental', '2/2', 'Ninguna', 'Raqueta entre las piernas con cara abierta; no hay otra opción'],
        ],
      },
      {
        type: 'callout',
        title: 'La continental es la empuñadura que no puedes saltarte',
        body: 'Los principiantes evitan la continental porque la volea de derecha se siente débil y el saque se siente raro durante un par de semanas. Saltársela pone un techo a tu juego: un saque con empuñadura de derecha no puede pronar, así que nunca gana velocidad ni efecto, y una volea con empuñadura de derecha tiene que pegarse con un swing de brazo. Pasa dos semanas haciendo cada saque y cada volea en continental y se vuelve automática. Todos los profesionales sacan, volean y rematan con ella.',
      },
      {
        type: 'text',
        body: 'Cómo decidir entre este y semioeste en la derecha: si aprendiste en una cancha rápida, tomas la pelota temprano y te gusta pegar plano, la este (3/3) se sentirá bien. Si juegas en polvo de ladrillo o canchas duras lentas, enfrentas botes altos y quieres margen con el topspin, la semioeste (4/4) es el estándar moderno y lo que la mayoría de los entrenadores enseña. La oeste (5/5) es una elección de especialista para jugadores de topspin muy pesado y dificulta las pelotas bajas y los cambios de empuñadura.\n\nEn el revés, el de dos manos es más fácil de aprender y más fuerte para la mayoría de los juniors y adultos. El de una mano da más alcance y un slice natural, pero necesita un antebrazo más fuerte y una preparación más temprana.',
      },
      { type: 'link', to: '/learn/grips', label: 'Mira cada empuñadura en el mango 3D' },
    ],
  },
  {
    id: 'changing-grips-quickly',
    section: 'grips',
    title: 'Cambiar de empuñadura con rapidez',
    summary: 'Cómo la mano no dominante gira la raqueta durante el giro de unidad para que los cambios de empuñadura sean automáticos, más un ejercicio sencillo para que ocurra sin pensar.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Nadie cambia de empuñadura soltando y volviendo a agarrar con la mano que golpea. **La mano no dominante hace el trabajo.** En la posición de espera descansa sobre el corazón de la raqueta, sosteniendo la mayor parte del peso, para que la mano que golpea pueda quedarse suave (esa presión de 3 sobre 10). Cuando reconoces derecha o revés e inicias el **giro de unidad** (hombros y caderas girando juntos), la mano no dominante rota la raqueta al nuevo bisel mientras la mano que golpea simplemente se relaja y la deja girar. Para cuando los hombros han girado, la empuñadura está lista.\n\nPor eso importa una empuñadura suelta: una mano tensa no puede dejar rotar el mango.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Posición de espera con empuñadura neutra', body: 'Espera entre continental y este de derecha (bisel 2 a 3) con la mano izquierda en el corazón. Algunos jugadores esperan en su empuñadura de derecha; cualquiera está bien siempre que la mano izquierda esté en el corazón cargando la raqueta.' },
          { title: 'Lee la pelota temprano', body: 'Decide derecha o revés cuando la pelota sale de la raqueta del rival, no cuando bota. El cambio de empuñadura debe estar terminado antes de que la pelota cruce la red.' },
          { title: 'Gira los hombros y rota la raqueta a la vez', body: 'Para una derecha, la mano izquierda gira el marco para que la mano que golpea se deslice al bisel 4 (semioeste) mientras los hombros giran a la derecha. Para un revés a una mano, la mano izquierda lleva la raqueta atrás y la gira para que la mano que golpea caiga en el bisel 1. Para un revés a dos manos, la mano izquierda baja al mango por encima de la derecha en su empuñadura este.' },
          { title: 'Suelta la mano izquierda en el momento justo', body: 'En la derecha la mano izquierda deja el corazón cuando la raqueta empieza a ir hacia adelante y señala la pelota o la cerca lateral para equilibrar. En el revés a una mano se queda en el corazón hasta que la raqueta empieza a ir hacia adelante, lo que mantiene los hombros cerrados.' },
          { title: 'Vuelve a neutro', body: 'Después de la terminación, atrapa el corazón con la mano izquierda mientras recuperas. Esto devuelve la raqueta a la posición de espera y prepara el siguiente cambio.' },
        ],
      },
      {
        type: 'callout',
        title: 'En la red no hay cambio',
        body: 'Voleas, medias voleas y smashes usan todos la continental, así que una vez que dejas la línea de fondo tu empuñadura debería quedarse fija. La única excepción en la red es la volea con swing ante una pelota lenta y alta que flota, donde tienes tiempo de cambiar a tu empuñadura de derecha. Si te descubres cambiando de empuñadura en la red en un intercambio rápido, probablemente estés voleando con empuñadura de derecha y necesites pasar tiempo en continental.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Ejercicio 1: cambios en sombra', body: 'Sin pelota. Párate en posición de espera. Un compañero (o tú, contando) dice «derecha» o «revés» al azar. Giro de unidad y cambio de empuñadura, congela, comprueba el bisel con los ojos, vuelve a la espera. 3 series de 20 avisos. Luego hazlo con los ojos cerrados y comprueba al tacto.' },
          { title: 'Ejercicio 2: lanzamientos alternos', body: 'Un compañero lanza alternando derecha, revés, derecha desde la línea de saque a un ritmo cómodo. Golpeas cada una con la empuñadura correcta y dices en voz alta el bisel en el que estás al golpear. 3 series de 10 pelotas, luego lanzamientos al azar.' },
          { title: 'Ejercicio 3: de fondo a red', body: 'Pega dos golpes de fondo (uno de cada lado), luego sube a por dos voleas, luego vuelve a por dos golpes de fondo. Obliga al cambio a continental al avanzar y de vuelta a una empuñadura de peloteo al retroceder. 5 repeticiones.' },
          { title: 'Ejercicio 4: saque más uno', body: 'Saca en continental, luego reacciona a la devolución con una derecha o un revés. El cambio de continental a tu empuñadura de peloteo durante el split step después del saque es uno que la mayoría de los jugadores de club se pierde; este ejercicio lo corrige.' },
        ],
      },
      {
        type: 'text',
        body: 'Errores comunes: apretar demasiado para que el mango no rote; hacer el cambio solo con la mano que golpea, lo que es lento y hace que la cara de la raqueta se abra; y esperar al bote para decidir. Si llegas tarde en el revés más que en la derecha, el problema es casi siempre un cambio de empuñadura tardío, no el swing. Graba un peloteo desde atrás y observa la mano izquierda: en un buen jugador nunca está ociosa.',
      },
    ],
  },
]
