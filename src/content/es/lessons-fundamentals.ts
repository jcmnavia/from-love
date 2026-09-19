import type { Lesson } from '../types'

export const FUNDAMENTAL_LESSONS: Lesson[] = [
  // ---------------------------------------------------------------- cancha
  {
    id: 'court-anatomy',
    section: 'court',
    title: 'Anatomía de la cancha: cada línea y cada zona',
    summary: 'Las dimensiones exactas de una cancha de tenis, cómo se llama cada línea y por qué los números importan para cómo te mueves y adónde apuntas.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Una cancha de tenis es un rectángulo de **23,77 m de largo** (78 ft) y **8,23 m de ancho** para individuales (27 ft) o **10,97 m de ancho** para dobles (36 ft). La red la divide en dos mitades de 11,885 m cada una. Todas las demás líneas están a una distancia fija de la red o de las líneas laterales, así que una vez que conoces cuatro o cinco números puedes imaginarte toda la cancha.\n\nLas Reglas de Tenis de la ITF fijan estos números. Las líneas miden entre 2,5 cm y 5 cm de ancho, salvo la línea de fondo, que puede llegar a 10 cm. Todas las líneas cuentan como parte de la cancha que delimitan, y por eso una pelota que toca la línea es buena.',
      },
      {
        type: 'table',
        columns: ['Línea o zona', 'Dónde está', 'Dimensión'],
        rows: [
          ['Línea de fondo', 'El borde trasero de cada mitad', '11,885 m de la red, 10,97 m de ancho (dobles)'],
          ['Línea lateral de individuales', 'Línea larga interior', '8,23 m entre sí, 4,115 m del centro'],
          ['Línea lateral de dobles', 'Línea larga exterior', '10,97 m entre sí, 5,485 m del centro'],
          ['Pasillo de dobles', 'Entre las dos líneas laterales', '1,37 m de ancho, en juego solo en dobles'],
          ['Línea de saque', 'Paralela a la red', '6,40 m de la red, va entre las líneas laterales de individuales'],
          ['Línea central de saque', 'Divide los dos cuadros de saque', '6,40 m de largo, de la red a la línea de saque'],
          ['Cuadro de saque', 'De la red a la línea de saque, de la línea central a la lateral de individuales', '6,40 m x 4,115 m (26,3 m²)'],
          ['Tierra de nadie (fondo de la cancha)', 'De la línea de saque a la línea de fondo', '5,485 m de fondo x 8,23 m de ancho'],
          ['Marca central', 'Mitad de cada línea de fondo, apuntando hacia adentro', '10 cm de largo, 5 cm de ancho'],
        ],
      },
      {
        type: 'text',
        body: 'La **red** mide 0,914 m (3 ft) de alto en el centro, sujeta hacia abajo por una cincha blanca de 5 cm, y 1,07 m (3 ft 6 in) en los postes. Los postes están a 0,914 m por fuera de cada línea lateral de dobles, así que la red mide 12,8 m en total. Cuando se juega individuales en una cancha de dobles, se colocan dos **palos de individuales** de 1,07 m de alto a 0,914 m por fuera de cada línea lateral de individuales para levantar la red a la altura correcta ahí. La banda blanca de la parte superior mide 5–6,35 cm.\n\nEsos 15 cm de caída de poste a centro son la razón por la que los tiros cruzados son más seguros que los paralelos: la red es más baja donde la cruza una pelota cruzada y, además, la diagonal es más larga (unos 25,4 m de esquina a esquina frente a 23,77 m en línea recta).',
      },
      {
        type: 'callout',
        title: 'Espacio libre: la cancha es más grande que las líneas',
        body: 'La ITF recomienda al menos 6,40 m de espacio libre detrás de cada línea de fondo y 3,66 m por fuera de cada línea lateral de dobles para el juego de club, lo que da un área total de juego de 36,57 m x 18,29 m. Los torneos del circuito usan 8,23 m detrás y 4,57 m a los lados. Cuando elijas una cancha para practicar, revisa el espacio libre: una cerca trasera muy cerca te enseña a pararte demasiado pegado a la línea de fondo.',
      },
      {
        type: 'list',
        items: [
          'Lado de iguales: la mitad derecha de cada extremo mirando a la red. Los saques empiezan aquí a 0-0 y en cada punto par.',
          'Lado de ventaja: la mitad izquierda. Los saques van aquí en los puntos impares.',
          'La T: donde la línea de saque se cruza con la línea central de saque. Un saque «a la T» apunta a este punto.',
          'Saque abierto: un saque dirigido cerca de la línea lateral de individuales del cuadro de saque.',
          'Saque al cuerpo: un saque dirigido a la cadera del receptor.',
          'Los aproximadamente 2,5 m entre la línea de saque y donde caen la mayoría de las pelotas de peloteo es donde te quedas «corto»; una pelota dentro del cuadro de saque es una pelota corta para atacar.',
        ],
      },
      {
        type: 'text',
        body: 'Uso práctico de los números: desde el centro de la línea de fondo hay 4,115 m hasta cada línea lateral de individuales, más o menos dos pasos grandes y una zancada. Un saque desde la marca central recorre un mínimo de 18,3 m hasta la línea de saque contraria por la T y unos 19 m hasta la esquina abierta. Una buena posición de espera tras una pelota de peloteo está a 1 m detrás de la línea de fondo, un poco hacia el lado de la marca central opuesto a donde acabas de golpear, porque la respuesta natural del rival es cruzada.',
      },
    ],
  },
  {
    id: 'court-surfaces-compared',
    section: 'court',
    title: 'Superficies de cancha comparadas',
    summary: 'Cómo las canchas duras, de polvo de ladrillo, de césped y cubiertas cambian la pelota, y cómo adaptar tu juego de pies, tu selección de golpes y tus zapatillas a cada una.',
    level: 'beginner',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'El mismo golpe se comporta distinto en cada superficie porque la cancha cambia dos cosas: **cuánta velocidad conserva la pelota** después del bote y **qué tan alto bota**. La fricción entre pelota y superficie frena la pelota y la eleva; una superficie lisa y firme la deja deslizarse baja. La ITF mide esto como Court Pace Rating, desde la categoría 1 (lenta, 29 o menos) hasta la categoría 5 (rápida, 45 o más).',
      },
      {
        type: 'table',
        columns: ['Superficie', 'Velocidad', 'Bote', 'Duración del peloteo', 'Adáptate así'],
        rows: [
          ['Polvo de ladrillo', 'Lenta (CPR 1–2)', 'Alto y pesado', 'Largo, 8–15 golpes', 'Añade topspin y altura, desliza hacia los golpes, ten paciencia, usa la dejada'],
          ['Dura', 'Media (CPR 3–4)', 'Medio, muy parejo', 'Medio, 4–8 golpes', 'Toma la pelota temprano, saca fuerte, frena y arranca con split steps'],
          ['Césped', 'Rápida (CPR 4–5)', 'Bajo y deslizante', 'Corto, 2–5 golpes', 'Flexiona más, golpea plano y cortado, ataca la red, acorta los pasos'],
          ['Dura cubierta', 'Media-rápida', 'Medio-bajo', 'Medio-corto', 'Aplana el saque, apunta más cerca de las líneas, confía en el lanzamiento (sin viento)'],
        ],
      },
      {
        type: 'steps',
        steps: [
          { title: 'Entra y prueba el bote', body: 'Antes de calentar, bota una pelota con fuerza y observa qué tan alto vuelve y cuánto se desliza. Luego pega cinco golpes de fondo desde la línea de fondo a tu altura normal y fíjate si caen cortos (cancha lenta) o largos (cancha rápida).' },
          { title: 'Ajusta tu margen sobre la red', body: 'En polvo de ladrillo añade medio metro de altura sobre la red y haz un swing más ascendente. En césped y canchas cubiertas rápidas, aplana el arco y apunta un poco más corto porque la pelota va a correr.' },
          { title: 'Ajusta tu posición', body: 'Párate un metro más atrás en polvo de ladrillo para darle tiempo al bote alto a que baje, y un paso más cerca de la línea de fondo en césped y canchas duras rápidas para tomar la pelota antes de que muera bajo tus rodillas.' },
          { title: 'Ajusta tu movimiento', body: 'En polvo de ladrillo aprende a deslizar: planta el pie exterior y deja que se deslice hacia el golpe. En canchas duras frena con una base ancha y un split step. En césped acorta la zancada y mantén las rodillas flexionadas; los giros bruscos provocan resbalones.' },
        ],
      },
      {
        type: 'callout',
        title: 'Las zapatillas son específicas por superficie por una razón',
        body: 'Las zapatillas de arcilla tienen una suela completa en espiga que agarra al plantar y te deja deslizar a propósito. Las de cancha dura tienen una suela resistente y más amortiguación porque la cancha no cede. Las de césped tienen suela con tacos pequeños y suelen ser obligatorias en los clubes de césped. Bajo techo, las suelas no deben marcar. Usar la zapatilla equivocada es el camino más rápido a un tobillo torcido.',
      },
      {
        type: 'text',
        body: 'Las empuñaduras y las superficies van de la mano. Las derechas semioeste y oeste adoran el polvo de ladrillo porque el bote alto cae en su zona de comodidad. Las empuñaduras este y el slice cobran vida en césped, donde la pelota se queda baja. Un jugador con juego completo cambia muy poco entre superficies; un especialista tiene que trabajar mucho más. Aprender en polvo de ladrillo tiende a construir paciencia y juego de pies; aprender en cancha dura tiende a construir técnica limpia y tenis de primer golpe. Si tienes acceso a ambas, alterna.',
      },
      { type: 'link', to: '/learn/courts', label: 'Explora cada superficie en detalle' },
    ],
  },
  {
    id: 'reading-the-court',
    section: 'court',
    title: 'Leer la cancha: zonas de defensa, neutral y ataque',
    summary: 'Dónde te paras decide lo que puedes hacer. Aprende las tres zonas de profundidad, qué golpear desde cada una y hacia dónde recuperar tras cada golpe.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Los entrenadores dividen cada mitad de la cancha en tres zonas de profundidad. **Defensa** es detrás de la línea de fondo, normalmente 1–3 m atrás. **Neutral** es sobre la línea de fondo o justo dentro, hasta aproximadamente un metro detrás de la línea de saque: la tierra de nadie donde se golpean la mayoría de las pelotas de peloteo. **Ataque** es dentro de la línea de saque, desde media cancha hasta la red.\n\nLa zona en la que estás al golpear te dice qué golpe es sensato. Desde defensa, tu trabajo es devolver la pelota profunda, alta y segura. Desde neutral, construyes el punto con dirección y profundidad. Desde ataque, defines: subida, volea o remate.',
      },
      {
        type: 'table',
        columns: ['Zona', 'Dónde estás', 'Objetivo', 'Golpes típicos', 'Blanco'],
        rows: [
          ['Defensa', '1–3 m detrás de la línea de fondo, a menudo desplazado a lo ancho', 'Sobrevivir y neutralizar', 'Topspin alto y pesado, slice profundo, globo', 'Profundo al medio o profundo cruzado, 1 m dentro de la línea de fondo'],
          ['Neutral', 'Línea de fondo hasta 1 m dentro de ella', 'Construir el punto, mover al rival', 'Topspin de peloteo, ángulos cruzados, cambio de dirección', 'Profundo a las esquinas, 1–1,5 m dentro de las líneas'],
          ['Ataque', 'Dentro de la línea de saque', 'Terminar el punto', 'Golpe de subida, volea con swing, volea, dejada, smash', 'Cancha abierta, o detrás del rival que corre'],
        ],
      },
      {
        type: 'text',
        body: 'La pelota del rival te dice qué zona esperar. Una pelota corta que cae dentro de la línea de saque te invita a la zona de ataque: avanza a través de la pelota, no la esperes. Una pelota profunda y pesada te empuja a la defensa: acéptalo, golpea alto y profundo y recupera. La mayoría de los principiantes se equivocan en una dirección: o nunca avanzan en las pelotas cortas, o intentan atacar desde tres metros detrás de la línea de fondo.\n\nUna regla simple: **intenta un tiro ganador solo desde la zona de ataque**. Desde neutral, golpea a un blanco grande y haz mover al rival. Desde defensa, mete la pelota.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Recupera hacia el centro de las respuestas posibles', body: 'Después de golpear, no corras a la marca central. Bisecta el ángulo: si golpeaste cruzado desde la esquina de la derecha, el rival puede pegar cruzado cerrado o paralelo, así que tu punto de recuperación está a 1 m del centro hacia el lado de la derecha. Si golpeaste al medio, recupera al centro.' },
          { title: 'Recupera a la profundidad correcta', body: 'En una cancha lenta o contra un pegador pesado, recupera 1–1,5 m detrás de la línea de fondo. En una cancha rápida o contra un jugador que solo empuja, recupera sobre la línea de fondo. Nunca recuperes hacia adelante a tierra de nadie salvo que estés siguiendo un golpe de subida a la red.' },
          { title: 'Split step cuando el rival golpea', body: 'Aterriza con ambos pies una fracción antes del contacto para poder impulsarte hacia cualquier lado. Recuperar tarde y quedarse plantado es el error de movimiento más común a nivel de club.' },
          { title: 'En la red, recupera al medio de la red', body: 'Después de una volea, da un paso lateral hacia el centro de la red y ligeramente hacia el lado al que golpeaste, para cubrir la respuesta paralela, que es la que llega más rápido.' },
        ],
      },
      {
        type: 'callout',
        title: 'La regla del tercio',
        body: 'Divide el ancho de la cancha en tercios. Si estás en un tercio exterior y desequilibrado, golpea cruzado: la red es más baja, la cancha es más larga y tu recuperación es más corta. Cambia de dirección hacia la paralela solo desde el tercio central o cuando estés bien plantado y dentro de la línea de fondo. Cambiar de dirección en carrera desde un tercio exterior es el golpe de mayor riesgo del tenis.',
      },
      {
        type: 'text',
        body: 'Mira un partido profesional con las zonas en mente. Verás que los jugadores pasan el 70–80 % del tiempo en neutral y defensa y, sin embargo, casi todos los tiros ganadores y golpes forzados se pegan desde dentro de la línea de fondo. La transición a la zona de ataque ocurre con una pelota corta, un segundo saque débil o una devolución flotada. Leer la cancha es, en realidad, reconocer esos momentos una fracción antes que tu rival.',
      },
    ],
  },

  // ---------------------------------------------------------------- pelotas
  {
    id: 'ball-types-and-stages',
    section: 'balls',
    title: 'Tipos de pelota y etapas: roja, naranja, verde, amarilla',
    summary: 'Por qué el tenis usa pelotas más lentas y ligeras y canchas más pequeñas para quienes aprenden, cómo es cada etapa y cuándo subir de nivel.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Una pelota amarilla estándar bota a 135–147 cm cuando se deja caer desde 254 cm sobre hormigón. En una cancha completa eso está por encima de la cabeza de un niño de seis años y por encima del hombro de la mayoría de los de nueve. Los niños que aprenden con ella desarrollan compensaciones: empuñaduras extremas, sin terminación, miedo a la pelota y tendencia a quedarse atrás y tirar globos.\n\nLa campaña **Tennis Play and Stay** de la ITF, lanzada en 2007, corrigió esto con tres pelotas más lentas y dos canchas más pequeñas. La regla general es que la pelota no debe botar más alto que la cadera del jugador para que pueda hacer un swing normal desde el principio.',
      },
      {
        type: 'table',
        columns: ['Etapa', 'Pelota', 'Tamaño vs estándar', 'Velocidad vs estándar', 'Cancha', 'Red', 'Edad habitual'],
        rows: [
          ['Etapa 3', 'Roja (espuma o fieltro)', 'Fieltro hasta 15 % más grande; espuma 8–9 cm', '75 % más lenta', '11 m x 5,5 m', '0,80 m', '5–8'],
          ['Etapa 2', 'Naranja', 'Mismo tamaño, más ligera', '50 % más lenta', '18 m x 6,5 m', '0,80 m', '8–10'],
          ['Etapa 1', 'Verde', 'Mismo tamaño, algo más ligera', '25 % más lenta', 'Completa 23,77 m x 8,23 m', '0,914 m', '9–12'],
          ['Estándar', 'Amarilla', '6,54–6,86 cm, 56–59,4 g', 'Velocidad completa', 'Cancha completa', '0,914 m', '11 en adelante'],
        ],
      },
      {
        type: 'text',
        body: 'La **cancha roja** mide 11 m de largo y 5,5 m de ancho, que es el ancho de un cuadro de saque duplicado: la mayoría de los clubes marca dos o tres canchas rojas a lo ancho de una cancha completa con la red a 0,80 m o una minirred portátil. La **cancha naranja** mide 18 m de largo, de una zona de línea de saque a la otra extendida unos 2,6 m, y 6,5 m de ancho; normalmente se marca con líneas móviles dentro de una cancha completa. La **cancha verde** es la cancha completa con la red normal.\n\nCada cancha está escalada para que un niño cubra la misma distancia relativa que un adulto en una cancha completa. Por eso el juego de pies y la táctica aprendidos en cada etapa se transfieren.',
      },
      {
        type: 'callout',
        title: 'Subir de etapa es cuestión de habilidades, no de cumpleaños',
        body: 'Un jugador está listo para la siguiente etapa cuando puede pelotear 10–20 pelotas de forma cooperativa, sacar por encima de la cabeza dentro del cuadro más veces de las que falla y su punto de bote se mantiene a la altura del hombro o por debajo en la nueva cancha. Los entrenadores suelen mantener a un jugador en una etapa para la competición mientras introducen la siguiente pelota en la práctica. La competición sub-10 en la mayoría de los países se juega con pelotas naranjas o verdes por reglamento.',
      },
      {
        type: 'list',
        items: [
          'Los adultos también pueden usar las etapas. Las pelotas rojas son excelentes para aprender voleas a corta distancia; las naranjas para aprender a construir un punto; las verdes para un jugador que vuelve con el timing oxidado.',
          'Las pelotas rojas de espuma son más silenciosas y seguras bajo techo; las rojas de fieltro son mejores al aire libre porque resisten el viento.',
          'Las pelotas de etapa están marcadas por la ITF: la verde tiene un punto verde sólido, la naranja es naranja y amarilla o amarilla con un punto naranja, la roja es roja y amarilla o amarilla con un punto rojo.',
          'Existen versiones sin presión para todas las etapas y son la elección habitual para los canastos de enseñanza.',
        ],
      },
    ],
  },
  {
    id: 'choosing-and-caring-for-balls',
    section: 'balls',
    title: 'Elegir y cuidar las pelotas',
    summary: 'Presurizadas frente a sin presión, regular frente a extra duty, cómo saber cuándo una pelota está muerta, pelotas de altura y cuántas llevar a la práctica.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Una pelota **presurizada** tiene un núcleo hueco de goma lleno de aire a unos 12 psi por encima de la presión atmosférica. Se siente viva y ligera, y con esto se juegan todos los partidos. La contrapartida es que el gas se filtra a través de la goma: un tubo pierde bote notable dos a cuatro semanas después de abrirse, aunque las pelotas se queden en el bolso.\n\nUna pelota **sin presión** tiene un núcleo de goma más grueso y rígido y ninguna presión interna. Bota dentro del mismo rango ITF pero se siente más dura y algo más pesada, y se mantiene así durante meses. Es la pelota correcta para canastos, máquinas lanzapelotas y práctica en solitario contra la pared.',
      },
      {
        type: 'table',
        columns: ['Pelota', 'Ideal para', 'Vida útil', 'Costo por pelota'],
        rows: [
          ['Presurizada, extra duty', 'Canchas duras al aire libre, partidos', '2–4 semanas una vez abierta, 1–3 sesiones de pegar fuerte', 'Unos 1,5–3 euros'],
          ['Presurizada, regular duty', 'Polvo de ladrillo, cubierta, césped, partidos', '2–4 semanas una vez abierta, el fieltro se mantiene más fino', 'Unos 1,5–3 euros'],
          ['Sin presión', 'Canastos, máquinas lanzapelotas, ejercicios', '6–12 meses; el fieltro se gasta antes de que muera el bote', 'Unos 1–2 euros al por mayor'],
          ['De altura (tipo 3)', 'Canchas por encima de 1.219 m', 'Como la presurizada', 'Unos 2–3 euros'],
        ],
      },
      {
        type: 'steps',
        steps: [
          { title: 'Prueba de apretar', body: 'Sostén la pelota entre el pulgar y los dedos y apriétala fuerte. Una pelota nueva cede unos 5 mm y vuelve con firmeza. Si tu pulgar se hunde con facilidad o la pelota se siente blanda por todos lados, está muerta.' },
          { title: 'Prueba de caída', body: 'Déjala caer desde la altura de la cabeza junto a una pelota nueva. Si bota notablemente más bajo, retírala al canasto de práctica. Oficialmente una pelota debe volver a 135–147 cm desde una caída de 254 cm.' },
          { title: 'Revisión del fieltro', body: 'Zonas peladas o un fieltro brillante y apelmazado significan que la pelota volará rápido e impredecible y no agarrará en tus cuerdas para el efecto. Un fieltro esponjado y pesado (habitual en polvo de ladrillo) hace la pelota lenta y cansadora de golpear.' },
          { title: 'Escucha', body: 'Una pelota muerta hace un golpe sordo en lugar de un estallido seco. Los jugadores del circuito cambian pelotas después de los primeros 7 juegos y luego cada 9 porque la diferencia es así de audible.' },
        ],
      },
      {
        type: 'callout',
        title: 'Jugar en altura',
        body: 'Por encima de unos 1.219 m (4.000 ft) el aire más delgado permite que una pelota normal vuele más rápido y bote más alto. Las pelotas ITF tipo 3 de altura tienen un rebote menor (122–135 cm al probarse a nivel del mar), así que allá arriba juegan normal. Las reglas también permiten pelotas sin presión en altura si se han aclimatado al menos 60 días en la sede. Si viajas desde el nivel del mar a una ciudad de montaña, compra pelotas locales y prepárate para acortar tus swings el primer día.',
      },
      {
        type: 'list',
        items: [
          'Para una práctica de peloteo con un compañero, tres o cuatro pelotas nuevas son suficientes; con más, te pasas la sesión recogiendo.',
          'Para práctica de saque o ejercicios con lanzador, un canasto de 50–75 pelotas sin presión ahorra tiempo y dinero.',
          'Para un partido, abre un tubo nuevo de tres o cuatro. Las ligas de club suelen exigir pelotas nuevas para cada partido.',
          'Guarda las pelotas fuera del sol y no en un auto caliente; el calor acelera la pérdida de presión y reseca el fieltro.',
          'Las pelotas presurizadas se conservan casi indefinidamente en un tubo sellado, así que comprar cajas al por mayor está bien.',
          'Las pelotas presurizadas viejas siguen sirviendo para perros, patas de silla y, más útil, para enseñar voleas y dejadas, donde una pelota muerta es una ventaja.',
        ],
      },
    ],
  },

  // -------------------------------------------------------------- conteo
  {
    id: 'how-a-point-is-scored',
    section: 'scoring',
    title: 'Cómo se cuenta un punto: cero, 15, 30, 40',
    summary: 'El vocabulario de un juego de tenis, cómo funcionan iguales y ventaja, por qué es 40 y no 45, y cómo anunciar el marcador correctamente.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Un juego es una carrera a cuatro puntos, pero los puntos no se cuentan 1, 2, 3, 4. Se llaman **cero** (love), **15**, **30**, **40** y **juego**. Para ganar un juego necesitas cuatro puntos y un margen de dos. Si ambos jugadores llegan a 40 el marcador es **iguales** (deuce), y desde ahí un jugador debe ganar dos puntos seguidos: el primero le da la **ventaja**, el segundo le da el juego. Si el jugador con ventaja pierde el siguiente punto, el marcador vuelve a iguales, y esto puede seguir indefinidamente.',
      },
      {
        type: 'table',
        columns: ['Puntos ganados por el sacador', 'Puntos ganados por el receptor', 'Marcador anunciado'],
        rows: [
          ['0', '0', 'Cero iguales'],
          ['1', '0', '15–cero'],
          ['1', '1', '15 iguales'],
          ['2', '1', '30–15'],
          ['2', '3', '30–40'],
          ['3', '3', 'Iguales (40 iguales)'],
          ['4', '3', 'Ventaja sacador (ad in)'],
          ['3', '4', 'Ventaja receptor (ad out)'],
          ['4', '2', 'Juego'],
        ],
      },
      {
        type: 'callout',
        title: '¿Por qué 40 y no 45?',
        body: 'La historia más aceptada es que los jugadores franceses medievales llevaban el marcador en la esfera de un reloj, moviendo una aguja un cuarto de vuelta por punto: 15, 30, 45, 60 para el juego. Cuando llegó la regla de la ventaja, el 45 se acortó a 40 para que la ventaja pudiera mostrarse en 50 y el juego en 60. «Love» para el cero probablemente viene del francés l’oeuf, el huevo, por su forma, aunque algunos prefieren la idea de jugar «por amor» cuando no tienes nada. «Deuce» viene del francés à deux, dos puntos necesarios.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Primero el marcador del sacador, siempre', body: 'El sacador anuncia el marcador antes de cada saque, sus propios puntos primero. Si estás sacando y vas perdiendo 15–30, dices «15–30», no «30–15». Es una regla del juego, no solo cortesía.' },
          { title: 'Dilo lo bastante fuerte para que se oiga al otro lado de la red', body: 'Anunciar el marcador en voz alta evita casi todas las discusiones de conteo. Si tú y tu rival no coinciden, vuelvan al último marcador en el que ambos estén de acuerdo y sigan desde ahí.' },
          { title: 'Anuncia el marcador de juegos al inicio de cada juego', body: 'Antes del primer punto de un juego el sacador anuncia los juegos, de nuevo los suyos primero: «3–2» significa que el sacador va ganando tres juegos a dos. Algunos jugadores también dicen «primer set».' },
          { title: 'En iguales, anuncia la ventaja por nombre', body: 'Di «ventaja sacador» o «ad in» cuando va ganando el sacador, «ventaja receptor» o «ad out» cuando va ganando el receptor. Nombrar al jugador evita confusiones en dobles.' },
        ],
      },
      {
        type: 'text',
        body: 'Dos variantes que te vas a encontrar. El **punto de oro** (no-ad) elimina la ventaja: en iguales se juega un único punto decisivo y el receptor elige de qué lado recibir (en dobles mixtos, el receptor del mismo sexo que el sacador). Se usa en la mayoría de los dobles a nivel de circuito, en World TeamTennis y en muchas ligas de club para controlar la duración de los partidos. **Ad in / ad out** es solo la forma informal de decir quién tiene la ventaja. Todo lo demás del juego es igual.',
      },
    ],
  },
  {
    id: 'sets-tiebreaks-and-match-formats',
    section: 'scoring',
    title: 'Sets, tie-breaks y formatos de partido',
    summary: 'Cómo los juegos se convierten en sets y partidos, el procedimiento exacto del tie-break, el tie-break de partido a 10 puntos y los formatos acortados que verás en los clubes.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Un **set** lo gana el primer jugador que llega a seis juegos con un margen de dos: 6–4 o 7–5 ganan un set, 6–5 no. Si el set llega a 6–6, se juega un **tie-break** y el ganador se lleva el set 7–6. Los sets que continúan hasta que alguien lidera por dos juegos sin tie-break se llaman sets con ventaja y hoy son raros.\n\nUn **partido** es al mejor de tres sets (el primero en ganar dos) en casi todos los niveles, incluidos los partidos femeninos de Grand Slam y todos los torneos ATP y WTA. Los individuales masculinos en los cuatro Grand Slams y los partidos del día de la final de la Copa Davis son al mejor de cinco sets (el primero en ganar tres).',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Quién saca primero', body: 'El jugador al que le tocaba sacar el siguiente juego saca el primer punto del tie-break, desde el lado de iguales. Los puntos se cuentan 1, 2, 3, no 15, 30, 40.' },
          { title: 'Luego dos saques cada uno', body: 'Después del primer punto, el rival saca los puntos 2 y 3, empezando desde el lado de ventaja y luego el de iguales. Los jugadores alternan entonces cada dos puntos, empezando siempre el par desde el lado de ventaja.' },
          { title: 'Cambio de lado cada seis puntos', body: 'Después de los puntos 6, 12, 18 y así sucesivamente los jugadores cambian de lado sin sentarse. No hay descanso a los 6 puntos; hay un cambio de lado normal al final del tie-break.' },
          { title: 'El primero a 7, ganando por 2', body: 'El tie-break se gana a 7 puntos con un margen de dos: 7–5 gana, 7–6 no, así que continúa 8–6, 9–7 y así sucesivamente. El set se registra como 7–6.' },
          { title: 'Siguiente set', body: 'El jugador que recibió el primer punto del tie-break saca el primer juego del siguiente set. Se cambia de lado después del primer juego del nuevo set como es normal.' },
        ],
      },
      {
        type: 'text',
        body: 'El **tie-break de partido a 10 puntos** (a menudo llamado super tie-break) sigue exactamente el mismo procedimiento pero se juega a 10 puntos con un margen de dos. Se usa en lugar de un tercer set completo en la mayoría de los eventos de dobles y en muchos partidos de club, donde cuenta como el set decisivo y se escribe 1–0 (10–7).\n\nDesde 2022 **los cuatro Grand Slams** juegan un tie-break a 10 puntos a 6–6 en el set final (tercer set para mujeres, quinto para hombres). Antes cada grande tenía un final distinto: Wimbledon jugaba un tie-break a 12–12, el US Open un tie-break a 7 puntos a 6–6, Roland Garros un set con ventaja sin tie-break y el Abierto de Australia un tie-break a 10 puntos desde 2019.',
      },
      {
        type: 'table',
        columns: ['Formato', 'Cómo funciona', 'Dónde lo encuentras'],
        rows: [
          ['Al mejor de 3 sets con tie-break', 'El primero en ganar dos sets, tie-break a 7 puntos a 6–6 en cada set', 'Individuales del circuito, la mayoría de partidos de club y junior'],
          ['Al mejor de 5 sets con tie-break', 'El primero en ganar tres sets, tie-break a 10 puntos a 6–6 en el quinto', 'Individuales masculinos de Grand Slam'],
          ['Dos sets y tie-break de partido', 'Dos sets con tie-break; un tie-break a 10 puntos reemplaza el tercer set', 'Dobles del circuito, ligas de club, muchos eventos junior'],
          ['Punto de oro (no-ad)', 'Un punto decisivo en iguales; el receptor elige el lado', 'Dobles del circuito, tenis universitario de EE. UU., ligas sociales'],
          ['Fast4', 'El primero a 4 juegos, punto de oro, tie-break a 3–3, los lets se juegan, al mejor de 3 o 5 sets cortos', 'Noches de club, eventos de Tennis Australia, algunos ITF junior'],
          ['Pro set', 'Un set largo, el primero a 8 (o 10) juegos por dos, tie-break a 8–8', 'Partidos de práctica, dobles universitarios, torneos rápidos de club'],
          ['Sets cortos', 'El primero a 4 juegos con tie-break a 4–4 (o 3–3), a menudo con un tie-break de partido como set decisivo', 'Competición de pelota roja, naranja y verde'],
        ],
      },
      {
        type: 'callout',
        title: 'Llevar la cuenta en un tie-break',
        body: 'Los marcadores de tie-break confunden a todos. Dos hábitos lo arreglan: el sacador anuncia el marcador de puntos antes de cada saque («4–3»), y ambos jugadores recuerdan un ancla: quien sacó el primer punto del tie-break vuelve a sacar cuando el total de puntos es impar (1, 3, 5, 7) después del primer punto. Si hay dudas, cuenta hacia atrás: el par de saques siempre empieza desde el lado de ventaja.',
      },
      { type: 'link', to: '/learn/scoring', label: 'Practica con el marcador interactivo' },
    ],
  },

  // ---------------------------------------------------------------- reglas
  {
    id: 'serving-rules',
    section: 'rules',
    title: 'Reglas del saque',
    summary: 'Dónde pararte, dónde debe caer el saque, faltas, lets, faltas de pie, el orden de saque y cómo el sorteo decide quién empieza.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Antes de cada punto el sacador se para **detrás de la línea de fondo** (ambos pies, sin tocarla) y **entre las prolongaciones imaginarias de la marca central y la línea lateral de individuales** (la de dobles en dobles). Desde ahí el saque debe golpearse antes de que la pelota bote y debe caer en el **cuadro de saque diagonalmente opuesto**: quien saca desde el lado de iguales saca al cuadro de iguales del receptor, quien saca desde el lado de ventaja al cuadro de ventaja.\n\nLa pelota solo puede lanzarse o soltarse con la mano. Puedes sacar por debajo, y puedes dejar caer la pelota sin hacer el swing (un lanzamiento que no golpeas no es falta). Una vez que haces el swing y fallas, es falta.',
      },
      {
        type: 'list',
        items: [
          'Primer punto del juego: saca desde la derecha de la marca central (lado de iguales). Segundo punto: desde la izquierda (lado de ventaja). Sigue alternando durante todo el juego, incluidos iguales y ventaja.',
          'Tienes dos saques por punto. Una primera falta te da un segundo saque; una segunda falta es doble falta y el receptor gana el punto.',
          'El receptor puede pararse donde quiera, dentro o fuera de la cancha, pero debe dejar botar el saque antes de golpearlo.',
          'El receptor debe estar listo. Si sacas cuando claramente no lo está y no intenta devolver, el saque se repite. Si intenta devolver, estaba listo.',
          'En dobles, el compañero del sacador y el compañero del receptor pueden pararse donde quieran en su lado, incluso dentro de la cancha.',
        ],
      },
      {
        type: 'table',
        columns: ['Situación', 'Decisión', 'Qué pasa'],
        rows: [
          ['El saque cae fuera del cuadro correcto, o toca la red y cae fuera', 'Falta', 'Segundo saque, o punto perdido si era el segundo saque'],
          ['El saque toca la red, la cincha o la banda y cae en el cuadro correcto', 'Let', 'El saque se repite; un let en un segundo saque da otro segundo saque'],
          ['El saque toca la red y golpea al receptor o a su compañero antes de caer', 'Let', 'Se repite el saque'],
          ['El saque golpea al receptor o su ropa antes de botar (sin tocar la red)', 'Punto para el sacador', 'El receptor pierde el punto aunque el saque fuera claramente afuera'],
          ['El saque golpea al compañero de dobles del sacador', 'Falta', 'Cuenta como falta'],
          ['El saque golpea el poste de la red o el palo de individuales y cae dentro', 'Falta', 'A diferencia de una pelota de peloteo, un saque que toca un poste o palo es siempre falta'],
          ['Pelota lanzada y atrapada, o dejada caer sin hacer el swing', 'Sin falta', 'Vuelve a sacar con el mismo saque'],
        ],
      },
      {
        type: 'callout',
        title: 'Faltas de pie',
        body: 'Durante el movimiento de saque, desde el inicio del swing hasta que la raqueta golpea la pelota, el sacador no debe: tocar la línea de fondo ni la cancha con ningún pie; tocar el suelo por fuera de la prolongación imaginaria de la línea lateral; tocar la prolongación imaginaria de la marca central con ningún pie; ni cambiar de posición caminando o corriendo (los pequeños ajustes de pies están bien). Saltar está permitido siempre que despegues desde detrás de la línea; aterrizar dentro de la cancha tras el contacto está bien. Los jugadores de club cometen falta de pie constantemente al deslizar el pie delantero sobre la línea, así que grábate una vez.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Gira la raqueta o lanza una moneda', body: 'Antes del calentamiento, un jugador gira su raqueta y el otro dice si el logo cae arriba o abajo (o «liso o rugoso» en marcos antiguos). El ganador del sorteo elige.' },
          { title: 'Elige una de tres opciones', body: 'El ganador puede elegir sacar o recibir primero (el perdedor entonces elige el lado), elegir el lado (el perdedor entonces elige sacar o recibir), o hacer que el rival elija primero.' },
          { title: 'Considera las condiciones', body: 'Elegir recibir es habitual cuando el sol o el viento dan en la cara de un jugador: te quedas con el lado bueno y aun así sacas segundo. En un día con viento, elegir el lado puede importar más que el saque.' },
          { title: 'Luego calienta', body: 'El sorteo ocurre antes del calentamiento para que ambos jugadores puedan calentar saques desde el lado correcto. El calentamiento es de cinco minutos en la mayoría de los eventos.' },
        ],
      },
      {
        type: 'text',
        body: 'Orden de saque: los jugadores alternan sacando juegos completos durante todo el partido. Al inicio de cada nuevo set la secuencia simplemente continúa, así que el jugador que recibió el último juego del set anterior saca el primer juego del siguiente. Si un jugador saca fuera de turno, el sacador correcto toma el relevo en cuanto se nota el error, pero todos los puntos ya jugados cuentan; una única falta ya sacada se anula.',
      },
    ],
  },
  {
    id: 'during-the-point',
    section: 'rules',
    title: 'Durante el punto: qué es bueno, qué es malo, qué pierde el punto',
    summary: 'Las decisiones que surgen en cada partido: líneas, botes, tocar o pasar por encima de la red, elementos fijos, obstrucción, el doble bote, los dobles golpes y las pelotas que vuelven con efecto.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Lo básico es simple. La pelota debe golpearse **antes de que bote dos veces** en tu lado, debe cruzar la red (o pasar por fuera del poste de la red, lo cual es legal siempre que caiga dentro), y debe caer **dentro de la cancha o sobre una línea**. Cualquier parte de la pelota que toque cualquier parte de la línea es buena. La línea pertenece a la cancha que delimita, así que una pelota que toca el borde exterior de la línea de fondo es buena, y un saque que roza la línea de saque es bueno.\n\nUna pelota que cae dentro y luego va a cualquier parte, por encima de la cerca o a la red, ya ganó su punto. Solo importa el primer bote.',
      },
      {
        type: 'table',
        columns: ['Qué pasó', 'Decisión'],
        rows: [
          ['La pelota bota dos veces antes de que la golpees (un «doble bote»)', 'Pierdes el punto, aunque luego pegues un gran golpe'],
          ['Tú, tu raqueta o tu ropa tocan la red, la cincha, la banda o el lado del rival mientras la pelota está en juego', 'Pierdes el punto'],
          ['Golpeas la pelota antes de que haya cruzado la red', 'Pierdes el punto; la terminación puede cruzar la red después de un contacto legal'],
          ['La pelota vuelve con efecto por encima de la red hacia el lado de quien la golpeó después de caer dentro', 'Puedes pasar por encima y golpearla, pero no debes tocar la red ni la cancha del rival'],
          ['Tu golpe toca el poste de la red, el palo de individuales o el cable de la red y cae dentro', 'Pelota buena, se sigue jugando (un saque que hace esto es falta)'],
          ['La pelota toca un elemento fijo (cerca, silla del juez, luz, techo) antes de caer', 'El jugador que la golpeó pierde el punto'],
          ['La pelota toca un elemento fijo después de caer dentro', 'El jugador que la golpeó gana el punto'],
          ['Golpeas la pelota dos veces en un único swing continuo (doble golpe)', 'Legal si fue un movimiento único e involuntario; los dobles golpes deliberados pierden el punto'],
          ['Atrapas la pelota o te toca, aunque claramente fuera afuera', 'Pierdes el punto; solo el bote decide si una pelota es mala'],
          ['Golpeas la pelota por fuera del poste de la red, por debajo de la altura de la red, y cae dentro', 'Pelota buena'],
          ['Lanzas la raqueta a la pelota y la golpeas', 'Pierdes el punto; la raqueta debe estar en tu mano'],
        ],
      },
      {
        type: 'callout',
        title: 'Obstrucción',
        body: 'Una obstrucción es cualquier cosa que impida a tu rival jugar el punto. Si es deliberada (gritar, agitar los brazos, patalear, hablar durante un peloteo) el infractor pierde el punto. Si es involuntaria y fuera de tu control (se te cae la gorra, se te cae una pelota del bolsillo, entra una pelota de otra cancha) el punto se repite como let, pero solo la primera vez: una gorra o pelota que sigue cayéndose se convierte en obstrucción deliberada. Los gruñidos no son obstrucción salvo que un oficial los considere excesivos.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Canta tu lado, no el de ellos', body: 'Tú cantas las pelotas que caen en tu lado de la red. No puedes cantar tu propio golpe afuera en el lado del rival, y no deberías cantar su lado en absoluto. Si ves claramente que tu propio golpe cae afuera y ellos lo dan bueno, sé honesto: díselo.' },
          { title: 'Canta con rapidez y claridad', body: 'Una pelota afuera debe cantarse de inmediato, antes de que la pelota sea devuelta o antes de que tu devolución caiga. Di «afuera» o levanta un dedo, y si no estás seguro, la pelota es buena. La duda siempre favorece al rival.' },
          { title: 'Canta tus propias faltas', body: 'Si tocas la red, haces un doble bote o un doble golpe deliberado, dilo. El rival a menudo no puede verlo desde el otro lado de la cancha.' },
          { title: 'Let cuando entra una pelota', body: 'Si una pelota de otra cancha entra a la tuya durante el punto, cualquier jugador puede cantar «let» de inmediato y el punto se repite, con primer saque. Espera a que la pelota realmente interfiera o a que un jugador la vea; no puedes cantarlo después de que termina el punto.' },
        ],
      },
      {
        type: 'text',
        body: 'Las marcas de la pelota en polvo de ladrillo se pueden inspeccionar. Si no están de acuerdo con una decisión en polvo de ladrillo, el jugador que cantó muestra la marca; si la marca no es clara o es la marca equivocada, la pelota es buena. En canchas duras no hay marcas, así que la decisión se mantiene salvo que quien cantó cambie de opinión. Si cantas una pelota afuera y luego te das cuenta de que era buena, pierdes el punto (no puedes repetirlo) salvo que el golpe del rival fuera tan bueno que no podrías haberlo devuelto de todos modos, en cuyo caso también es punto de él. En cualquier caso, cantar mal una pelota afuera es tu pérdida.',
      },
    ],
  },
  {
    id: 'changeovers-and-timing',
    section: 'rules',
    title: 'Cambios de lado y tiempos',
    summary: 'Cuándo cambiar de lado, cuánto tiempo tienes entre puntos, en los cambios de lado y entre sets, y cómo funcionan el calentamiento y el reloj de saque.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'Los jugadores **cambian de lado después del primer, tercer y cada juego impar siguiente de cada set**, y al final de un set si el número total de juegos de ese set es impar. Si el total es par, cambian después del primer juego del siguiente set. En un tie-break cambian cada seis puntos sin sentarse. Cambiar de lado compensa las diferencias de sol, viento e iluminación.\n\nTruco para contar: suma los juegos del set actual. Total impar, cambio de lado. 3–2 son cinco juegos, así que cambias. 4–2 son seis, así que te quedas.',
      },
      {
        type: 'table',
        columns: ['Momento', 'Tiempo permitido', 'Notas'],
        rows: [
          ['Calentamiento', '5 minutos', 'Estándar de Grand Slam y circuito; algunos eventos de club permiten 10. La práctica de saque va dentro de los cinco minutos, sin «el primero que entre» después.'],
          ['Entre puntos', '25 segundos', 'Máximo según las Reglas de Tenis de la ITF. En la ATP, la WTA y los Slams se muestra en un reloj de saque que arranca cuando termina el punto anterior; una infracción cuesta una advertencia y luego una falta (sacador) o un punto (receptor).'],
          ['Cambio de lado tras juegos impares', '90 segundos', 'Desde el final del último punto hasta el inicio del siguiente. No hay descanso de cambio de lado después del primer juego de un set ni durante un tie-break.'],
          ['Descanso entre sets', '120 segundos', 'Dos minutos al final de cada set, se cambie de lado o no.'],
          ['Pausa para el baño', 'Una por partido (al mejor de 3), 3 minutos', 'Se toma en un descanso entre sets en el circuito; el cambio de ropa añade 2 minutos. Las reglas de club varían.'],
          ['Tiempo médico', '3 minutos de tratamiento', 'Una vez por lesión, tras evaluación del fisio. No por calambres solos en la ATP.'],
          ['Descanso entre sets (algunos eventos junior)', '10 minutos después del tercer set', 'Permitido en junior al mejor de 5 y en algunas normativas de calor.'],
        ],
      },
      {
        type: 'callout',
        title: 'Juego continuo',
        body: 'La regla detrás de todos estos números es que el juego debe ser continuo. No puedes salir de la cancha entre juegos salvo en un cambio de lado o descanso entre sets, no puedes descansar ni recibir instrucciones entre puntos, y el receptor debe jugar al ritmo razonable del sacador. En el tenis de club sin reloj de saque, un buen hábito es estar en la línea de fondo y listo para sacar en 20 segundos y nunca beber salvo en un cambio de lado.',
      },
      {
        type: 'list',
        items: [
          'El coaching desde la tribuna con señas o palabras breves está permitido ahora en la ATP y la WTA y en los Grand Slams (desde 2023), pero solo cuando el jugador está en el mismo extremo de la cancha y no durante un punto.',
          'Las reglas de calor permiten una pausa de 10 minutos entre el segundo y el tercer set (mujeres) o el tercero y el cuarto (hombres) en los Slams cuando se supera el índice de estrés térmico.',
          'Si el juego se suspende por lluvia, el partido se reanuda con el marcador exacto y el mismo sacador; se permite un nuevo calentamiento tras una demora de 15 minutos o más.',
          'Las pelotas se cambian después de los primeros 7 juegos y luego cada 9 en el circuito, coincidiendo con un cambio de lado; el calentamiento cuenta como dos juegos de desgaste.',
        ],
      },
    ],
  },
  {
    id: 'doubles-rules',
    section: 'rules',
    title: 'Reglas de dobles',
    summary: 'La cancha más ancha, cómo se fija el orden de saque y recepción para un set, la regla de un solo compañero en la devolución y las formaciones estándar, incluidas la australiana y la formación en I.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'El dobles se juega en la cancha completa de **10,97 m de ancho**: los pasillos están en juego para todos los golpes **excepto el saque**, que debe seguir cayendo en el cuadro de saque normal. Los postes de la red son los de dobles, así que no hay palos de individuales. Todo lo relativo al conteo es igual que en individuales, aunque la mayoría del dobles se juega con punto de oro y un tie-break de partido a 10 puntos en lugar del tercer set.\n\nAl inicio de cada set la pareja que saca elige qué compañero saca primero, y la pareja que recibe elige qué compañero recibe en el lado de iguales y cuál en el de ventaja. Ambas elecciones quedan fijas para todo el set.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Rotación de saque', body: 'Las parejas alternan los juegos de saque. Dentro de una pareja, los compañeros también alternan, así que a lo largo de cuatro juegos el orden es A, C, B, D (A y B son una pareja). Un jugador que sacó en el primer juego de un set vuelve a sacar en el tercero y el quinto. El orden solo puede cambiarse al inicio de un nuevo set.' },
          { title: 'Orden de recepción', body: 'El compañero que recibe en el lado de iguales recibe todos los puntos que se juegan en ese lado durante todo el set, y lo mismo para el lado de ventaja. No pueden cambiar de lado a mitad de set, ni siquiera en iguales.' },
          { title: 'La regla de un solo compañero en la devolución', body: 'Solo el receptor designado puede golpear la devolución del saque. Si el saque toca al compañero del receptor antes de botar, la pareja que saca gana el punto (salvo que primero haya tocado la red, lo que es let). Después de la devolución, cualquiera de los dos puede golpear cualquier pelota, incluidas dos seguidas por el mismo compañero.' },
          { title: 'Orden en el tie-break', body: 'La misma rotación continúa en el tie-break: el jugador al que le toca sacar saca el primer punto, luego el siguiente sacador de los rivales saca dos, y así sucesivamente. El orden puede cambiarse para un tie-break de partido solo si se trata como un nuevo set (lo es, en las reglas de la ITF).' },
          { title: 'Sacar fuera de orden', body: 'Si saca el compañero equivocado, el correcto toma el relevo en cuanto se nota. Los puntos se mantienen; una falta ya sacada se anula. Si la pareja receptora cambia de lado por error, se quedan así hasta el final de ese juego y luego vuelven al orden correcto.' },
        ],
      },
      {
        type: 'table',
        columns: ['Formación', 'Dónde se ubica el compañero del sacador', 'Por qué usarla'],
        rows: [
          ['Estándar (uno arriba, uno atrás)', 'En la red, en la mitad opuesta al sacador, a 1 m dentro de la línea de saque y a mitad de camino entre la línea central y la lateral de individuales', 'Cubre la devolución cruzada natural y deja que el jugador de red intercepte. La opción por defecto para la mayoría de los puntos.'],
          ['Australiana', 'En la red, en la misma mitad que el sacador, así que ambos compañeros empiezan del mismo lado', 'Le quita al receptor su devolución cruzada favorita; lo obliga a ir paralelo hacia la cancha abierta, que es más difícil. Buena contra un receptor con una cruzada fuerte.'],
          ['Formación en I', 'Agachado sobre la línea central en la red, directamente frente al sacador, y moviéndose a izquierda o derecha según una señal acordada al golpearse el saque', 'Disimula hacia dónde va el jugador de red. Excelente en segundos saques y para romper el ritmo de un receptor. Requiere señas y confianza.'],
          ['Ambos atrás', 'Ambos en la línea de fondo', 'Una disposición defensiva contra un gran sacador o un jugador de red que intercepta; la pareja receptora también la usa cuando la devolución está siendo cazada en la red.'],
        ],
      },
      {
        type: 'callout',
        title: 'Señas detrás de la espalda',
        body: 'El jugador de red le hace señas al sacador antes de cada punto con los dedos detrás de la espalda: hacia dónde debe ir el saque (un dedo para la T, dos para abierto, puño para el cuerpo) y si va a interceptar (cruzarse) o quedarse. El sacador confirma con un «sí» o «no» en voz baja. Hacer señas es legal y todas las buenas parejas lo hacen, pero hablar durante el punto solo se permite si no obstruye a los rivales, así que limítalo a avisos cortos como «tuya», «mía», «cambio» y «déjala».',
      },
      {
        type: 'list',
        items: [
          'Una pelota golpeada por una pareja que toca a cualquiera de los compañeros o su raqueta antes de caer les hace perder el punto, aunque ese compañero estuviera fuera de la cancha.',
          'Los compañeros no pueden golpear ambos la pelota en el mismo golpe. Un golpe en que ambas raquetas tocan la pelota pierde el punto.',
          'Cualquiera de los compañeros puede cantar las líneas y el marcador. Una disputa se resuelve con el acuerdo de los dos compañeros; si no coinciden, la pelota es buena.',
          'En dobles mixtos con punto de oro, el punto decisivo se saca al receptor del mismo sexo que el sacador.',
          'El compañero del sacador puede pararse donde quiera, pero si el saque lo golpea es falta.',
        ],
      },
    ],
  },

  // ------------------------------------------------------------ etiqueta
  {
    id: 'court-etiquette',
    section: 'etiquette',
    title: 'Etiqueta en la cancha',
    summary: 'Las reglas no escritas que mantienen un partido amistoso: cantar las líneas con honestidad, anunciar el marcador, cruzar detrás de las canchas, pelotas perdidas, ruido y el apretón de manos.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Casi todo el tenis que vas a jugar en tu vida no tiene juez. El juego solo funciona porque cada jugador arbitra su propio lado de la red y le da al rival el beneficio de la duda. Las reglas de etiqueta de abajo son cómo se construye y se mantiene esa confianza. La mayoría también están escritas en el Código de Conducta de la ITF para partidos sin arbitraje, así que son reglas tanto como buenos modales.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Canta tus líneas con honestidad y generosidad', body: 'Eres responsable de cada pelota que cae en tu lado. Si no la viste claramente afuera, es buena. Canta «afuera» de inmediato y en voz alta, o levanta un dedo; una decisión tardía o dubitativa significa que la pelota fue buena. Nunca cantes el lado del rival, y si ves que tu propio golpe cae afuera y ellos lo juegan, díselo.' },
          { title: 'Anuncia el marcador antes de cada saque', body: 'El sacador anuncia el marcador de juegos al inicio de cada juego y el de puntos antes de cada punto, los suyos primero. Dilo lo bastante fuerte para que el receptor lo oiga a 24 metros. Esto solo evita la mayoría de las discusiones.' },
          { title: 'Espera antes de cruzar detrás de una cancha', body: 'Nunca camines detrás de una cancha mientras se juega un punto. Espera en la puerta o la cerca hasta que termine el punto, luego cruza rápido durante la pausa. Lo mismo aplica al salir de tu propia cancha.' },
          { title: 'Devuelve las pelotas perdidas entre puntos', body: 'Si una pelota de la cancha vecina entra a la tuya, espera a que termine su punto y luego ruédala o golpéala suavemente hacia el sacador, no al medio de un peloteo. Si tu pelota entra a su cancha, espera a que termine su punto y pídela con cortesía («gracias» con la mano levantada es la señal universal).' },
          { title: 'Silencio durante los puntos', body: 'Nada de hablar, moverse detrás de la línea de fondo ni hacer ruido con la raqueta mientras hay un peloteo en la cancha de al lado. En tu propia cancha, no hables durante el punto salvo por los avisos cortos de dobles.' },
          { title: 'Da la mano al final', body: 'Ganes o pierdas, encuéntrense en la red, den la mano (o choquen raquetas) y digan «buen partido». En dobles, los cuatro jugadores se dan la mano. Agradece al juez si lo hay.' },
        ],
      },
      {
        type: 'callout',
        title: 'Entra una pelota durante tu punto: canta let',
        body: 'Cuando una pelota perdida entra a tu cancha a mitad de peloteo, cualquiera de los dos dice «let» de inmediato y el punto se repite con primer saque. Si ves la pelota pero decides seguir jugando, no puedes cantar let después de perder el punto. Si entra una pelota entre el primer y el segundo saque, el sacador recupera los dos saques en la mayoría de los códigos porque se interrumpió su ritmo.',
      },
      {
        type: 'list',
        items: [
          'Calienta con tu rival, no contra él: pega pelotas de peloteo al medio para que ambos se suelten. El calentamiento no es el primer set.',
          'Pásale las pelotas al sacador de forma que pueda atraparlas: un bote a la mano o un rodado suave, nunca un golpe fuerte ni un globo.',
          'Saca solo cuando el receptor te esté mirando y esté listo. Levanta una pelota para mostrar que vas a sacar.',
          'Si una pelota es injugable (una pelota rota, un saque claramente afuera que bota hacia ti), atrápala y dilo; no la estrelles contra la cerca.',
          'No celebres los errores del rival. Celebra tus propios tiros ganadores con discreción.',
          'Trae pelotas, llega puntual y deja la cancha como la encontraste: barre y pasa la red en polvo de ladrillo, recoge tus pelotas y tu basura, cierra la puerta.',
          'Usa zapatillas adecuadas. Las de correr dañan el polvo de ladrillo y el césped y están prohibidas en la mayoría de los clubes.',
          'En la práctica, si pegas una pelota que sabes que fue afuera pero tu compañero no la vio, di «afuera, perdón» y sigue.',
        ],
      },
      {
        type: 'text',
        body: 'Cuando hay una disputa real, el proceso es tranquilo: detén el juego, di lo que viste, escucha lo que vio el otro y, si no logran ponerse de acuerdo, la pelota es buena y el punto es para el jugador que estaba cantando su lado. Las malas decisiones persistentes se manejan pidiendo un juez itinerante si lo hay, no cantando sus pelotas afuera en represalia. En tu club te recordarán mucho más por cómo cantas las líneas que por cómo pegas la derecha.',
      },
    ],
  },
]
