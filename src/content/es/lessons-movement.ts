import type { Lesson } from '../types'

export const MOVEMENT_LESSONS: Lesson[] = [
  // ---------------------------------------------------------------- juego de pies
  {
    id: 'why-footwork-decides-everything',
    section: 'footwork',
    title: 'Por qué el juego de pies lo decide todo',
    summary: 'La mayoría de los malos golpes no son malos swings. Son buenos swings desde el lugar equivocado, en el momento equivocado.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'Mira a un jugador de club fallar una derecha y normalmente culparás al brazo. Míralo otra vez en cámara lenta y verás el problema real: seguía moviéndose en el contacto, o estaba demasiado cerca de la pelota, o se estiraba porque llegó un paso tarde. El swing estaba bien. Los pies pusieron al swing en una posición imposible.\n\nLos profesionales golpean en equilibrio casi siempre, y la razón no es el talento. Dan más pasos que tú, más cortos, y los empiezan antes. El juego de pies es la parte del tenis que casi nadie practica y casi todos necesitan.',
      },
      {
        type: 'callout',
        title: 'La regla general',
        body: 'Una pelota bien golpeada necesita tres cosas de tus pies: llegar temprano, frenar en equilibrio y salir de inmediato. Si falta cualquiera de ellas, el golpe tiene que compensar y tu regularidad cae.',
      },
      {
        type: 'text',
        body: 'Moverse en tenis no es correr. Un punto es una cadena de arranques cortos, en su mayoría laterales, de dos a cuatro metros cada uno, con una frenada fuerte y un cambio de dirección al final de cada uno. Las investigaciones sobre partidos profesionales sitúan el punto promedio en 5 a 8 segundos con unos cuatro cambios de dirección, y menos del 10 % de la carrera es en línea recta.\n\nPor eso el entrenamiento del juego de pies es algo aparte. Trotar o incluso esprintar no te enseñará a desacelerar en una posición ancha, cargar la pierna exterior y salir empujando desde ella.',
      },
      {
        type: 'list',
        items: [
          '**Split step** cuando el rival golpea, para que ya estés despegado del suelo y listo para salir.',
          '**Primer paso** explosivo y en la dirección correcta, impulsado por el pie más alejado de la pelota.',
          '**Pasos de ajuste** cortos y rápidos al llegar, para que el contacto ocurra a la distancia correcta.',
          '**Base equilibrada** en el contacto, lo bastante ancha para rotar contra ella.',
          '**Recuperación** que empieza en el instante en que la pelota sale de tus cuerdas, con pasos laterales o cruzados hacia el punto correcto.',
        ],
      },
      {
        type: 'text',
        body: 'Cada lección de esta sección trata un eslabón de esa cadena. Empieza por el split step, porque todo lo que viene después depende de llegar a tiempo, y el tiempo es lo único que el juego de pies realmente puede comprarte.',
      },
      {
        type: 'link',
        to: '/learn/footwork',
        label: 'Explora los ejercicios de juego de pies',
      },
    ],
  },
  {
    id: 'the-split-step',
    section: 'footwork',
    title: 'El split step',
    summary: 'Un pequeño salto, sincronizado con el contacto de tu rival, que convierte una salida parada en una salida lanzada.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Un cuerpo quieto es difícil de poner en marcha. Los músculos necesitan estirarse un poco antes de poder contraerse con fuerza, y unos pies plantados planos en el suelo no pueden empujar en ninguna dirección. El split step (paso de ajuste) resuelve ambos problemas en una fracción de segundo: saltas apenas del suelo, aterrizas más ancho de lo que empezaste con las rodillas flexionadas, y el estiramiento de tus piernas se convierte en el resorte de tu primer paso.\n\nTodo buen jugador lo hace antes de cada pelota, incluidas las que vienen directo hacia él. No es una reacción a dónde va la pelota. Ocurre antes de que lo sepas.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Empieza en posición de espera',
            body: 'Pies algo más abiertos que los hombros, peso adelante sobre la punta de los pies, rodillas relajadas, raqueta al frente con la mano no dominante sosteniendo el corazón.',
          },
          {
            title: 'Salta cuando empieza el swing',
            body: 'Cuando veas que la raqueta del rival empieza a ir hacia adelante, impúlsate con ambos pies. El salto es pequeño, unos centímetros. Tu cabeza apenas debería subir.',
          },
          {
            title: 'Aterriza en el contacto',
            body: 'Intenta aterrizar cuando el rival hace contacto con la pelota. En ese momento verás hacia dónde va, y tus piernas estarán cargadas y listas.',
          },
          {
            title: 'Aterriza ancho, impúlsate con el pie lejano',
            body: 'Los pies aterrizan un poco más abiertos de lo que despegaron, rodillas flexionadas, peso adelante. El pie más alejado de la pelota te impulsa hacia ella.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'El timing importa más que la altura',
        body: 'Los estudios de jugadores de élite con plataformas de fuerza muestran que aterrizan a menos de una décima de segundo del contacto del rival y ya se están moviendo dos décimas después. Si aterrizas temprano tienes que volver a cargar; si aterrizas tarde, has desperdiciado el salto. Mira la raqueta, no la pelota.',
      },
      {
        type: 'table',
        columns: ['Situación', 'Ajuste del split step'],
        rows: [
          ['Devolver un saque rápido', 'Sincroniza el salto con el lanzamiento en su punto más alto, aterriza cuando la raqueta toca la pelota'],
          ['Subir a la red', 'Haz el split donde estés cuando el rival haga el swing, incluso a media carrera, y luego sigue avanzando'],
          ['En la red en dobles', 'Split pequeño y rápido con el peso adelante, listo para interceptar o cubrir el pasillo'],
          ['Muy atrás de la línea de fondo', 'Aterrizaje más ancho, algo más de flexión de rodillas, necesitarás un primer paso más grande'],
        ],
      },
      {
        type: 'text',
        body: 'El error más común es hacer el split demasiado pronto y luego quedarse plantado esperando la pelota, lo cual es peor que no hacerlo. El segundo es saltar demasiado alto, lo que cuesta tiempo en el aire. Piénsalo como descargar peso en lugar de saltar, y practícalo contra una pared o con un compañero que finja swings hasta que el timing sea automático.',
      },
      {
        type: 'link',
        to: '/studio/split-step',
        label: 'Mira el split step en el estudio 3D',
      },
    ],
  },
  {
    id: 'stances-explained',
    section: 'footwork',
    title: 'Las posiciones de pies explicadas',
    summary: 'Neutra, semiabierta, abierta y cerrada: para qué sirve cada una, y por qué importa golpear desde la pierna exterior.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Tu posición de pies es la ubicación de tus pies respecto a la línea de fondo en el contacto. Determina cuánto puedes rotar, qué tan rápido puedes recuperar y qué tan bien puedes manejar una pelota abierta, corta o profunda. No hay una única posición correcta. Los buenos jugadores usan las cuatro en un mismo punto, y la elección la hace la pelota que llega, no la preferencia.\n\nTodos los ejemplos de abajo son para una derecha de diestro. Refléjalos para el revés y para los zurdos.',
      },
      {
        type: 'table',
        columns: ['Posición', 'Pies en el contacto', 'Ideal para', 'Cuidado con'],
        rows: [
          ['Neutra (cuadrada)', 'El pie izquierdo da un paso hacia la red, pies más o menos alineados con el blanco', 'Golpes de subida, pelotas cortas, slice, revés a una mano, principiantes aprendiendo la transferencia de peso', 'Lenta para recuperar, difícil rotar en pelotas abiertas'],
          ['Semiabierta', 'Pie izquierdo ligeramente adelante y al costado, caderas a unos 45 grados de la red', 'La derecha y el revés a dos manos de peloteo por defecto', 'Puede degenerar en abierta completa cuando eres perezoso con el pie delantero'],
          ['Abierta', 'Pies paralelos a la línea de fondo, peso cargado en la pierna derecha (exterior)', 'Pelotas abiertas, pelotas rápidas, cuando no hay tiempo de dar el paso, topspin agresivo', 'Debes cargar bien la pierna exterior o terminas golpeando solo con el brazo'],
          ['Cerrada', 'El pie izquierdo cruza más allá de la línea del pie derecho hacia la línea lateral', 'Correr a por una derecha muy abierta, algunos reveses a una mano', 'Bloquea la rotación de las caderas, evítala en una derecha normal'],
        ],
      },
      {
        type: 'text',
        body: 'La idea que las une a todas es **golpear desde la pierna exterior**. Cualquiera sea la posición, la pierna más alejada de la red y más cercana a la pelota, la derecha en una derecha, tiene que estar flexionada y cargada antes del swing. Esa pierna es tu motor. Almacena la energía al bajar y la libera como rotación al subir.\n\nUn jugador que se estira hacia una pelota abierta con la pierna exterior recta no puede rotar, no puede empujar para recuperar y normalmente le pega con el marco. Un jugador que planta esa pierna, se hunde en ella y se impulsa hacia arriba golpeará con potencia y estará a mitad de camino del centro antes de que la pelota caiga.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Primero la neutra',
            body: 'Aprende a golpear dando el paso hacia la pelota con el pie delantero. Enseña la transferencia de peso del pie de atrás al de adelante, y sigue siendo la elección correcta para subidas y pelotas cortas.',
          },
          {
            title: 'Añade la semiabierta',
            body: 'Deja de cruzar tanto el paso. Deja que el pie delantero caiga adelante y al costado. Ahora deberías poder rotar las caderas por completo y recuperar más rápido.',
          },
          {
            title: 'Abierta cuando te obliguen',
            body: 'En pelotas que te abren o llegan rápido, planta la pierna exterior y golpea sin dar el paso. La recuperación es un empuje directo desde esa pierna.',
          },
          {
            title: 'Cerrada solo cuando estés estirado',
            body: 'Si una derecha es tan abierta que debes correr más allá de ella, el último paso cruzará de forma natural. Acéptalo, pega un golpe defensivo y vuelve.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Diferencias en el revés',
        body: 'El revés a dos manos se comporta como la derecha y está cómodo en posiciones semiabierta o abierta. El revés a una mano necesita los hombros más de lado para proteger el brazo que golpea, así que la neutra o ligeramente cerrada es lo normal y la posición abierta es rara.',
      },
      {
        type: 'link',
        to: '/studio/forehand',
        label: 'Compara las posiciones de pies en la derecha en el estudio 3D',
      },
    ],
  },
  {
    id: 'recovery-and-court-positioning',
    section: 'footwork',
    title: 'Recuperación y colocación en la cancha',
    summary: 'Dónde pararte después de golpear, y cómo llegar ahí. La respuesta casi nunca es la marca central.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'En el instante en que la pelota sale de tus cuerdas, el punto se convierte en un problema de geometría. Tu rival puede golpear a un rango de lugares, y tú quieres pararte donde los dos extremos, el cruzado más cerrado y el paralelo más fuerte, estén igual de lejos. Ese punto es la **bisectriz** del ángulo de sus golpes posibles.\n\nNo es el centro de la cancha. Cuando tu rival está desplazado a lo ancho, su opción cruzada es mucho más cerrada que su opción paralela, así que la bisectriz se desplaza hacia el lado cruzado.',
      },
      {
        type: 'callout',
        title: 'La versión práctica',
        body: 'Después de golpear cruzado, recupera hasta un metro más allá de la marca central hacia el lado desde el que golpeaste. Después de golpear paralelo, tienes que cruzar del todo, más allá de la marca central hacia el otro lado, porque la respuesta cruzada a la cancha abierta es ahora la mayor amenaza.',
      },
      {
        type: 'table',
        columns: ['Distancia a recuperar', 'Juego de pies', 'Por qué'],
        rows: [
          ['Menos de 2 metros', 'Pasos laterales', 'Te mantiene de frente a la red, puedes frenar y cambiar de dirección al instante'],
          ['2 a 4 metros', 'Uno o dos pasos cruzados, luego pasos laterales', 'Cubre terreno rápido; los pasos laterales al final te permiten hacer el split step a tiempo'],
          ['Más de 4 metros o un globo', 'Gira y corre, luego pasos laterales para colocarte', 'Hacer pasos laterales en distancias largas es lento y agotador; esprinta y vuelve a ponerte de frente'],
        ],
      },
      {
        type: 'text',
        body: 'La profundidad importa tanto como el ancho. Si tu golpe fue profundo y pesado, puedes mantener la línea de fondo o incluso dar un paso adentro, ya que es poco probable que la respuesta sea agresiva. Si tu golpe fue corto o flotó, retrocede uno o dos pasos detrás de la línea de fondo para ganar tiempo.\n\nEntre lo uno y lo otro, mantén los ojos en el rival mientras recuperas en lugar de admirar tu propio golpe. Su preparación te dice adónde va la pelota antes de que la golpee, y ese medio segundo vale más que cualquier cantidad de velocidad.',
      },
      {
        type: 'list',
        items: [
          'La recuperación empieza en tu terminación, no cuando la pelota bota en el otro lado.',
          'Llega a la posición antes de que el rival golpee, luego haz el split step. Llegar cuando golpea es demasiado tarde.',
          'Nunca recuperes con la espalda a la red. De espaldas no puedes leer el golpe.',
          'Si no puedes llegar a la bisectriz a tiempo, al menos frena y haz el split. Un split tardío desde el lugar equivocado le gana a ningún split.',
        ],
      },
      {
        type: 'link',
        to: '/studio/shuffle',
        label: 'Mira los pasos laterales y el paso cruzado en el estudio 3D',
      },
    ],
  },
  {
    id: 'moving-forward-and-back',
    section: 'footwork',
    title: 'Moverse hacia adelante y hacia atrás',
    summary: 'Pasos de subida para entrar, el paso atrás y el paso cruzado para retroceder, y por qué nunca deberías correr de espaldas.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'La mayoría de la práctica de juego de pies es lateral, pero los puntos que ganas y pierdes de forma más decisiva son aquellos en que avanzas para definir o retrocedes para sobrevivir. Ambas direcciones tienen un juego de pies específico, y en ambas es fácil equivocarse.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Lee la pelota corta temprano',
            body: 'La señal es el contacto del rival, no el bote. Si llega tarde, está encerrado o golpea desde el pie de atrás, la pelota probablemente vendrá corta. Empieza a moverte cuando golpea.',
          },
          {
            title: 'Corre y luego frena hacia el golpe',
            body: 'Cubre los primeros metros corriendo. Al acercarte, acorta los pasos para que los últimos dos o tres sean pasos cortos de ajuste que fijen tu distancia.',
          },
          {
            title: 'Atraviesa la pelota con un paso carioca o en carrera',
            body: 'En una subida de derecha, golpea cuando cae tu pie delantero, o usa un carioca (el pie de atrás cruzando por detrás del de adelante) en el revés cortado para seguir avanzando a través del contacto.',
          },
          {
            title: 'No te detengas tras el contacto',
            body: 'Sigue hacia la red, haz el split cuando el rival haga el swing, luego muévete en diagonal hacia la volea. Un jugador que se detiene a admirar su subida es superado con un passing.',
          },
        ],
      },
      {
        type: 'text',
        body: 'Retroceder es donde la mayoría de los jugadores pierde tiempo, porque el instinto dice correr de espaldas. Correr de espaldas es lento, inestable y te deja mirando a la red sin forma de ver adónde vas. Cuando la pelota pasa por encima de tu cabeza, o te empuja al fondo una pelota pesada, gira.\n\nPara un globo, el movimiento es el **paso atrás**: da un paso directo hacia atrás con el pie del lado hacia el que va la pelota, lo que gira tus caderas de lado al mismo tiempo. Desde ahí usa **pasos cruzados**, llevando la pierna delantera por delante del cuerpo, para cubrir terreno manteniendo los hombros girados y la pelota a la vista por encima de tu hombro delantero.',
      },
      {
        type: 'callout',
        title: 'Señala la pelota',
        body: 'En el remate, levanta el brazo no dominante y señala la pelota mientras retrocedes. Mantiene tus hombros de lado, le da a tus ojos una referencia y evita que te quedes debajo de la pelota en lugar de detrás de ella.',
      },
      {
        type: 'list',
        items: [
          'Sube con una pelota corta que puedas golpear a la altura de la red o más arriba. Corta y baja es para una dejada o un slice controlado, no para una carga.',
          'Sigue la línea de tu golpe de subida hacia la red; cierra el pasillo de passing más fácil.',
          'En el paso atrás, el primer paso va hacia atrás y al costado, nunca directo hacia atrás.',
          'Si un globo realmente te pasa, gira por completo y esprinta, luego déjalo botar y juega un smash tras el bote o un globo defensivo.',
        ],
      },
      {
        type: 'link',
        to: '/studio/smash',
        label: 'Estudia el juego de pies del remate en el estudio 3D',
      },
    ],
  },

  // ------------------------------------------------------------ coordinación
  {
    id: 'hand-eye-coordination-for-juniors',
    section: 'coordination',
    title: 'Coordinación ojo-mano para juniors',
    summary: 'Por qué los 5 a 9 años son una ventana, por qué los juegos le ganan a los ejercicios y cómo la cancha de pelota roja hace que todo funcione.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Entre los cinco y los nueve años, aproximadamente, el sistema nervioso de los niños es extraordinariamente bueno aprendiendo a coordinar ojos, manos y pies. Los entrenadores a veces lo llaman la edad de oro del aprendizaje motor. Las habilidades adquiridas en esta ventana, como seguir una pelota en movimiento y moverse para interceptarla, se vuelven automáticas de un modo que es mucho más difícil de lograr después.\n\nLas habilidades que importan no son específicas del tenis. Atrapar, lanzar, equilibrarse, saltar y golpear son la materia prima. Un niño que puede atrapar una pelota que bota con cualquiera de las dos manos aprenderá una derecha en una fracción del tiempo que le toma a un niño que no puede.',
      },
      {
        type: 'callout',
        title: 'Juegos, no ejercicios',
        body: 'Un niño de seis años no va a hacer diez repeticiones de nada porque sí. Cada ejercicio de coordinación debería ser un juego con puntaje, una carrera, un compañero o una historia. El tenis está escondido dentro de la diversión. Si un niño se aburre, el ejercicio está mal, no el niño.',
      },
      {
        type: 'table',
        columns: ['Etapa', 'Pelota', 'Cancha', 'Edades típicas', 'Qué les permite hacer'],
        rows: [
          ['Roja (etapa 3)', 'Espuma o fieltro, un 75 % más lenta, más grande', '11 a 12 m de largo, red a 80 cm, raqueta de 17 a 21 pulgadas', '5 a 8', 'Pelotear con golpes reales y jugar puntos desde la primera clase'],
          ['Naranja (etapa 2)', 'Un 50 % más lenta', '18 m de largo, red a 80 cm, raqueta de 23 a 25 pulgadas', '8 a 10', 'Aprender efecto, dirección, saque y táctica simple'],
          ['Verde (etapa 1)', 'Un 25 % más lenta', 'Cancha completa, red estándar, raqueta de 25 a 26 pulgadas', '9 a 11', 'Jugar tenis en cancha completa con tiempo para desarrollar la técnica'],
        ],
      },
      {
        type: 'text',
        body: 'El marco Tennis Play and Stay de la ITF existe porque una pelota estándar en una cancha completa es físicamente imposible para un niño pequeño. Bota por encima de su cabeza y la cancha es demasiado grande para cubrirla. La pelota roja bota a la altura de la cintura, se mueve lo bastante lento para seguirla, y la cancha pequeña significa que un niño realmente puede pelotear, que es lo único que hace que vuelva.\n\nNo apures a los niños por las etapas. Un jugador que puede dominar puntos de pelota roja con buena técnica está construyendo mucho más que uno que sobrevive en una cancha naranja.',
      },
      {
        type: 'list',
        items: [
          'Lanzar y atrapar con ambas manos, luego con una, luego tras un bote.',
          'Equilibrar una pelota sobre la raqueta caminando, luego corriendo, luego zigzagueando entre conos.',
          'Arriba y abajo con la raqueta, contando rachas.',
          'Juegos de reacción: el compañero suelta una pelota, atrápala tras un bote.',
          'Peloteos simples sobre una red baja o una línea en el suelo, cooperativos, contando cuántos seguidos.',
        ],
      },
      {
        type: 'link',
        to: '/learn/balls',
        label: 'Aprende más sobre las etapas de pelota y las tallas de raqueta junior',
      },
    ],
  },
  {
    id: 'balance-and-body-awareness',
    section: 'coordination',
    title: 'Equilibrio y conciencia corporal',
    summary: 'La habilidad oculta bajo cada golpe: saber dónde está tu cuerpo y mantenerlo estable mientras todo lo demás se mueve.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'El equilibrio no es quedarse quieto. En tenis significa mantener la cabeza estable y tu centro de masa sobre tu base mientras corres, frenas, rotas y haces el swing. Mira a los mejores jugadores en cámara lenta y la cabeza apenas se mueve durante el golpe, incluso cuando el resto del cuerpo hace algo violento.\n\nLa conciencia corporal, o propiocepción, es el sentido que te dice dónde están tus extremidades sin mirar. Es lo que te permite golpear una pelota detrás de ti, ajustar una volea en el último momento o aterrizar de un saque sin caerte. Ambas mejoran rápido con la práctica, a cualquier edad.',
      },
      {
        type: 'list',
        items: [
          '**Equilibrio a una pierna**: párate sobre un pie 30 segundos, luego con los ojos cerrados, luego atrapando una pelota.',
          '**Swings en sombra a una pierna**: derecha sobre la pierna derecha, revés sobre la izquierda. Termina en equilibrio.',
          '**Avión**: inclínate hacia adelante sobre una pierna con los brazos abiertos y la otra pierna extendida atrás, mantén 10 segundos.',
          '**Zancadas caminando con giro**: da un paso a zancada y rota el torso hacia la pierna delantera.',
          '**Juego de la estatua**: simula un golpe y congélate en la terminación. Un compañero intenta desequilibrarte con un empujón suave.',
        ],
      },
      {
        type: 'callout',
        title: 'Cabeza quieta, ojos nivelados',
        body: 'La clave de equilibrio más simple en tenis es mantener la cabeza quieta a través del contacto. Si tu cabeza rebota, tus ojos pierden la pelota y tu cuerpo compensa. Practica golpear imaginando un vaso de agua en equilibrio sobre tu cabeza.',
      },
      {
        type: 'text',
        body: 'Para los niños, el trabajo de equilibrio va en cada calentamiento: saltitos, saltos a la cuerda, caminar sobre una línea, juegos de estatua, caminatas de animales. Para los adultos, va en el mismo lugar. Un minuto de trabajo a una pierna antes de jugar hace más por la estabilidad de tu tobillo que cualquier tobillera, y no cuesta nada.\n\nLa recompensa no es solo prevenir lesiones. Un jugador que puede frenar en equilibrio puede golpear en equilibrio, y golpear en equilibrio es de donde sale la regularidad.',
      },
      {
        type: 'link',
        to: '/learn/footwork',
        label: 'Ejercicios de coordinación para juniors y adultos',
      },
    ],
  },

  // ----------------------------------------------------------------- condición física
  {
    id: 'warm-up-and-cool-down',
    section: 'fitness',
    title: 'Calentamiento y vuelta a la calma',
    summary: 'Ocho a diez minutos que te hacen jugar mejor y lesionarte menos. Sáltatelos y lo pagarás después.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'El viejo calentamiento de dos minutos de minitenis y unos estiramientos estáticos no prepara tu cuerpo para el primer sprint a una pelota abierta. Los músculos fríos producen menos fuerza y se estiran con menos seguridad, y los primeros juegos de la mayoría de los partidos amateur se pierden antes de que el cuerpo esté listo.\n\nUn calentamiento adecuado es **dinámico**: movimiento continuo que eleva el pulso y la temperatura, lleva cada articulación por los rangos que el tenis va a exigir y termina con los movimientos específicos del deporte. Ocho a diez minutos son suficientes.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Sube el pulso (2 a 3 minutos)',
            body: 'Trote suave alrededor de la cancha, luego pasos laterales, carioca y trote hacia atrás a lo largo de la línea de fondo. Deberías estar caliente y respirando algo más fuerte.',
          },
          {
            title: 'Moviliza (3 a 4 minutos)',
            body: 'Zancadas caminando con giro de torso, balanceos de pierna hacia adelante y al costado, círculos de cadera, círculos de brazos en ambos sentidos, rotaciones de tronco con la raqueta cruzada sobre el pecho, círculos de muñeca y tobillo.',
          },
          {
            title: 'Activa (2 minutos)',
            body: 'Saltos a la cuerda, rodillas altas, talones a los glúteos, unos saltos laterales y split steps. Añade rotaciones externas con banda para el hombro si vas a sacar.',
          },
          {
            title: 'Específico (2 a 3 minutos)',
            body: 'Swings en sombra de cada golpe a velocidad creciente, luego minitenis dentro de los cuadros de saque, moviendo los pies, antes de retroceder a la línea de fondo.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Deja los estiramientos estáticos para después',
        body: 'Mantener estiramientos de 30 segundos antes de jugar reduce ligeramente la potencia y no baja el riesgo de lesión. Muévete en su lugar. Los estiramientos estáticos largos van en la vuelta a la calma, cuando ayudan a restaurar el rango de movimiento.',
      },
      {
        type: 'text',
        body: 'La vuelta a la calma es más corta y más fácil de saltarse, y exactamente por eso la mayoría de los jugadores nunca se recupera bien. Cinco minutos de caminata o trote suave dejan que el pulso baje gradualmente. Síguelos con estiramientos estáticos de 20 a 30 segundos cada uno para pantorrillas, isquiotibiales, flexores de cadera, cuádriceps, glúteos, pecho y la parte posterior del hombro.\n\nLuego bebe, come algo dentro de la hora siguiente y, si jugaste un partido largo, sigue moviéndote con suavidad el resto del día en lugar de sentarte durante horas.',
      },
      {
        type: 'list',
        items: [
          'Calienta antes de la práctica igual que antes de los partidos. Las lesiones ocurren en el entrenamiento con más frecuencia que en el juego.',
          'Con frío, añade dos minutos a la sección de subir el pulso y mantén una capa de ropa hasta que estés sudando.',
          'Nunca saques a máxima velocidad hasta haber pegado al menos 15 saques progresivos desde la línea de saque y la línea de fondo.',
          'Una vuelta a la calma corta después de cada sesión suma mucha menos rigidez a lo largo de una temporada.',
        ],
      },
    ],
  },
  {
    id: 'strength-for-tennis',
    section: 'fitness',
    title: 'Fuerza para el tenis',
    summary: 'Qué entrenar y por qué: piernas, core antirrotación, hombro posterior y las tres lesiones que intentas evitar.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'La potencia en tenis viene del suelo. Las piernas cargan e impulsan, las caderas y el tronco rotan y transfieren, el hombro y el brazo entregan la raqueta al final. El entrenamiento de fuerza para tenis sigue esa cadena, y tiene menos que ver con levantar pesado y más con ser fuerte en las posiciones en que el deporte te pone: una zancada lateral profunda, una pierna cargada, un tronco girado, un brazo por encima de la cabeza.\n\nDos sesiones semanales de 40 minutos son suficientes para la mayoría de los jugadores de club. Tres fuera de temporada si compites.',
      },
      {
        type: 'table',
        columns: ['Zona', 'Por qué importa', 'Mejores ejercicios'],
        rows: [
          ['Piernas y caderas', 'Cada golpe empieza con una pierna cargada, cada frenada es una desaceleración a una pierna', 'Sentadillas búlgaras, zancadas laterales, peso muerto rumano, sentadillas a una pierna, saltos laterales'],
          ['Core (antirrotación)', 'El tronco tiene que resistir y luego liberar la rotación sin que la columna cargue', 'Press Pallof, plancha con alcance, plancha lateral, dead bug, lanzamientos rotacionales con balón medicinal'],
          ['Hombro posterior', 'Sacar sobrecarga la parte delantera del hombro; la trasera tiene que seguir el ritmo para proteger la articulación', 'Rotaciones externas con banda, jalones a la cara, Y y T en prono, remos'],
          ['Antebrazo y agarre', 'Absorbe el impacto en cada pelota, protege el codo', 'Flexiones de extensores de muñeca, extensión excéntrica de muñeca, paseo del granjero, escurrir una toalla'],
          ['Pantorrillas y tobillos', 'Miles de pequeños saltos y empujes por partido', 'Elevaciones de pantorrilla, saltos a una pierna, trabajo en tabla de equilibrio'],
        ],
      },
      {
        type: 'text',
        body: 'Las tres lesiones que explican la mayoría del tiempo de tenis perdido son el codo de tenista, el dolor de hombro y los esguinces de tobillo. Las tres son en gran medida prevenibles, y la prevención es el mismo trabajo de fuerza de arriba hecho con constancia.\n\nEl **codo de tenista** (epicondilitis lateral) es una sobrecarga de los tendones extensores de la muñeca donde se insertan en la parte externa del codo. Normalmente lo causan un contacto tardío, una raqueta rígida con cuerdas tensas o un grip demasiado pequeño, y lo empeoran unos músculos del antebrazo débiles. La extensión excéntrica de muñeca, bajar lentamente un peso ligero con la palma hacia abajo, es el ejercicio con más respaldo tanto para la prevención como para la rehabilitación.',
      },
      {
        type: 'text',
        body: 'El **dolor de hombro** en tenistas casi siempre tiene que ver con el manguito rotador y los músculos que controlan el omóplato. Sacar crea un gran desequilibrio: los músculos que aceleran el brazo se fortalecen, los que lo frenan no. Las rotaciones externas con banda y el trabajo escapular antes de cada sesión de saque cierran esa brecha.\n\nLos **esguinces de tobillo** ocurren en frenadas fuertes y cambios de dirección, normalmente con fatiga. El equilibrio a una pierna, los saltos laterales con aterrizaje fijado y la fuerza de pantorrilla son la protección. Las zapatillas de tenis adecuadas con soporte lateral también importan. Las de correr están hechas para una sola dirección y se doblan con facilidad.',
      },
      {
        type: 'callout',
        title: 'La fuerza no te hace más lento',
        body: 'A veces los jugadores temen que levantar pesas los vuelva rígidos o voluminosos. Dos sesiones semanales del trabajo aquí descrito no añadirán tamaño apreciable. Te harán más rápido saliendo de las esquinas, más difícil de lesionar y más fuerte en el tercer set.',
      },
      {
        type: 'list',
        items: [
          'Entrena piernas y core en la misma sesión, el cuidado del hombro como una rutina diaria corta.',
          'Dos a tres series de 8 a 12 repeticiones para fuerza, 12 a 15 para los músculos pequeños del hombro.',
          'Nunca levantes pesado el día antes de un partido. Trabajo ligero y rápido o descanso.',
          'Si algo duele durante un golpe, para y ve a un fisio. Jugar con dolor de codo u hombro convierte semanas en meses.',
        ],
      },
      {
        type: 'link',
        to: '/learn/fitness',
        label: 'Ejercicios físicos con instrucciones completas',
      },
    ],
  },
  {
    id: 'endurance-and-speed',
    section: 'fitness',
    title: 'Resistencia y velocidad',
    summary: 'El tenis es esfuerzos cortos y descansos cortos, repetidos durante horas. Entrena eso, no maratones.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Un punto de tenis dura, en promedio, entre 5 y 8 segundos. Luego tienes unos 20 segundos antes del siguiente, y 90 segundos en los cambios de lado. Un partido a tres sets puede durar dos horas, pero la pelota está en juego solo 15 a 20 minutos de ese tiempo. El resto es caminar, respirar y pensar.\n\nAsí que la exigencia es una mezcla extraña: sprints repetidos y cambios de dirección a máxima intensidad, separados por recuperaciones cortas, durante muchísimo tiempo. La relación trabajo-descanso es aproximadamente **1:3**, y la condición física que importa es la capacidad de producir el mismo primer paso explosivo en el tercer set que en el primero.',
      },
      {
        type: 'table',
        columns: ['Cualidad', 'Qué hace por ti', 'Cómo entrenarla'],
        rows: [
          ['Agilidad y velocidad del primer paso', 'Llegar a más pelotas, llegar antes, golpear en equilibrio', 'Ejercicio de la araña, ejercicios con conos, caídas de reacción, idas y vueltas cortas con recuperación completa'],
          ['Capacidad de sprints repetidos', 'Seguir explosivo a medida que avanza el partido', 'Carreras por intervalos de 15 a 20 segundos de trabajo, 20 a 40 de descanso, en bloques de un juego'],
          ['Base aeróbica', 'Recuperar más rápido entre puntos y entre partidos', 'Dos sesiones semanales de 30 a 40 minutos de carrera, bicicleta o natación suaves fuera de temporada'],
          ['Potencia y elasticidad', 'Saque más rápido, golpes de fondo más fuertes, saltos más rápidos', 'Salto a la cuerda, saltos, lanzamientos con balón medicinal, pliometría de bajo volumen'],
        ],
      },
      {
        type: 'callout',
        title: 'Agilidad por encima de lo aeróbico',
        body: 'Las carreras largas y continuas construyen una base, pero no le enseñan a tu cuerpo a frenar, cargar y cambiar de dirección. Si tienes poco tiempo, dedícalo a trabajo de intervalos y agilidad que imite los puntos. Un jugador que puede esprintar y frenar bien en el tercer set le gana a uno que puede trotar una hora.',
      },
      {
        type: 'text',
        body: 'Una estructura semanal simple para un jugador de club competitivo: una sesión de agilidad con conos y trabajo de reacción, una sesión de intervalos con el patrón 20 de trabajo y 20 de descanso durante cuatro o cinco juegos simulados, y una sesión aeróbica suave si la temporada lo permite. Todo lo demás es práctica en cancha, que en sí misma es acondicionamiento si mueves bien los pies.\n\nEl trabajo de velocidad va al principio de la sesión, cuando estás fresco. El de resistencia va al final o en un día aparte. Nunca intentes entrenar velocidad cansado; solo ensayarás ser lento.',
      },
      {
        type: 'list',
        items: [
          'Ajusta el descanso al trabajo. Recuperación completa para la velocidad, recuperación corta para los sprints repetidos.',
          'La desaceleración es donde ocurren las lesiones y se pierden los puntos. Entrena frenar tanto como entrenas arrancar.',
          'Hidrátate antes de tener sed. Un dos por ciento de deshidratación ralentiza de forma medible el tiempo de reacción.',
          'Registra una prueba simple cada mes, como el tiempo del ejercicio de la araña, para ver si el entrenamiento funciona.',
        ],
      },
    ],
  },

  // ----------------------------------------------------------------- táctica
  {
    id: 'first-tactics-consistency-and-depth',
    section: 'tactics',
    title: 'Primeras tácticas: regularidad y profundidad',
    summary: 'Antes de patrones o colocación, dos cosas ganan casi todos los partidos por debajo del nivel avanzado.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'A nivel de club, aproximadamente tres de cada cuatro puntos terminan con un error y no con un tiro ganador. El jugador que comete menos errores gana, y no es por poco. Esta es la primera verdad táctica del tenis y la que más jugadores resisten, porque pegar tiros ganadores es más divertido que hacer que el otro falle.\n\nLa segunda verdad es que la **profundidad** genera errores. Una pelota que cae a uno o dos metros de la línea de fondo obliga a tu rival a golpear desde detrás de su propia línea de fondo, le quita los ángulos y te da tiempo. Una pelota que cae cerca de la línea de saque lo invita a avanzar y le permite atacar.',
      },
      {
        type: 'callout',
        title: 'La regla de una pelota más',
        body: 'Ante la duda, mete una pelota más en la cancha. Cruzada, profunda, con margen sobre la red. Deja que el rival sea quien intente algo ingenioso.',
      },
      {
        type: 'list',
        items: [
          'Apunta al menos un metro por encima de la red en las pelotas neutras. Los errores en la red son los más evitables del tenis.',
          'Apunta un metro o más dentro de las líneas. Nadie necesita pegar en la línea para ganar un partido de club.',
          'Golpea cruzado por defecto. La red es más baja en el medio y la cancha es más larga en la diagonal.',
          'Usa topspin para conseguir profundidad con seguridad, o una pelota alta y pesada cuando te empujen atrás.',
          'Juega el golpe de porcentaje cuando el marcador está ajustado y guarda el ambicioso para cuando vas ganando.',
        ],
      },
      {
        type: 'text',
        body: 'Un ejercicio útil es el **juego de la profundidad**: pelotea cruzado con un compañero y cuenta solo las pelotas que caen más allá de la línea de saque. Luego coloca un blanco, una toalla o una fila de pelotas, dos metros dentro de la línea de fondo y cuenta solo las pelotas que caen más allá de él. La mayoría de los jugadores se sorprende de lo corta que es su pelota de peloteo normal.\n\nA medida que tu regularidad mejore te ganarás el derecho a ser más agresivo. Pero la agresividad debe asentarse siempre sobre una base de no fallar, no en lugar de ella.',
      },
      {
        type: 'link',
        to: '/learn/tactics',
        label: 'Siguiente: las cinco situaciones de juego',
      },
    ],
  },
  {
    id: 'the-five-game-situations',
    section: 'tactics',
    title: 'Las cinco situaciones de juego',
    summary: 'Cada punto cae en una de cinco situaciones. Saber en cuál estás te dice qué hacer.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'El pensamiento táctico se vuelve mucho más simple cuando te das cuenta de que cada pelota que golpeas pertenece a una de cinco situaciones. Cada una tiene sus propios objetivos, sus propias opciones de alto porcentaje y sus propios errores típicos. Cuando un punto se siente confuso, la primera pregunta es: ¿en qué situación estoy ahora mismo?',
      },
      {
        type: 'table',
        columns: ['Situación', 'Tu objetivo principal', 'Jugada de alto porcentaje', 'Error común'],
        rows: [
          ['Sacando', 'Empezar el punto en tus términos', 'Alto porcentaje de primeros saques, segundo saque con efecto al revés, planificar el golpe más uno', 'Arriesgar demasiado en el primer saque y luego flotar un segundo débil'],
          ['Devolviendo', 'Neutralizar el saque y entrar al peloteo', 'Bloquear o hacer chip profundo cruzado en los primeros saques, adelantarse y pegar los segundos', 'Pararse demasiado cerca en los primeros saques, demasiado atrás en los segundos'],
          ['Ambos en el fondo', 'Construir el punto hasta conseguir una pelota para atacar', 'Profundidad cruzada, cambiar de dirección solo en pelotas cortas, mover al rival', 'Cambiar de dirección en una pelota profunda, golpear plano y bajo sobre la red'],
          ['Subiendo o en la red', 'Terminar el punto en dos golpes', 'Subir profundo paralelo, split step, volear a la cancha abierta', 'Detenerse tras la subida, volear de vuelta a donde está el rival'],
          ['Rival en la red', 'Hacerlo jugar una primera pelota difícil', 'Pelota baja que cae a sus pies, globo sobre el hombro del revés, passing solo cuando tienes un pasillo claro', 'Intentar un passing de bajo porcentaje cuando un globo o un tiro al cuerpo estaba disponible'],
        ],
      },
      {
        type: 'text',
        body: 'Saque y devolución deciden juntos los dos primeros golpes de cada punto, y en todos los niveles el jugador que gana más de esos intercambios gana el partido. Tu porcentaje de primeros saques importa mucho más que la velocidad de tu saque. Un día de 65 % de primeros saques con un segundo saque fiable con efecto le gana a un día de 45 % con más aces casi siempre.\n\nEn el fondo, la paciencia es una táctica. Estás esperando una pelota corta, un error de colocación o una pelota a media cancha sobre la que puedas avanzar. La tentación es forzar algo en una pelota neutra profunda, y de ahí vienen los errores.',
      },
      {
        type: 'text',
        body: 'Las situaciones de red son donde los amateurs regalan más puntos. Subir significa comprometerse: sigue moviéndote, haz el split a tiempo y volea al espacio abierto, no de vuelta al rival. Cuando tu rival está en la red, recuerda que tiene que volear lo que le des. Una pelota pesada que cae a sus pies es una opción mucho mejor que un passing que pinta la línea.',
      },
      {
        type: 'callout',
        title: 'Practica por situación',
        body: 'Estructura los sets de práctica en torno a una situación a la vez: solo saque y primera pelota, o solo juegos de devolución, o cada punto empieza con una subida. Es la forma más rápida de encontrar tu situación más débil y corregirla.',
      },
      {
        type: 'link',
        to: '/studio/return',
        label: 'Estudia la devolución en el estudio 3D',
      },
    ],
  },
  {
    id: 'patterns-of-play',
    section: 'tactics',
    title: 'Patrones de juego',
    summary: 'Cuatro patrones repetibles que dan estructura a tus puntos: cruzado por defecto, cambio en la pelota corta, saque más uno y alto y pesado al revés.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Un patrón es una secuencia de golpes que has practicado tantas veces que no necesitas pensarla bajo presión. Los profesionales tienen decenas. Los jugadores de club que tienen dos o tres en los que confían juegan notablemente mejor que los que deciden cada golpe desde cero. Estos cuatro son la base de casi todos los patrones que vas a ver.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Cruzado por defecto',
            body: 'La diagonal es 2,4 metros más larga que la línea lateral y la red es 15 centímetros más baja en el medio. El cruzado es el golpe más seguro del juego y además te deja más cerca de la bisectriz para la respuesta. Pelotea cruzado hasta que algo cambie.',
          },
          {
            title: 'Cambia de dirección en una pelota corta',
            body: 'Cuando la pelota del rival cae corta, dentro de la línea de saque o cerca, puedes adelantarte e ir paralelo o invertido con mucho menos riesgo. Cambia de dirección cuando estés dentro de la cancha, no desde detrás de la línea de fondo.',
          },
          {
            title: 'Saque más uno',
            body: 'Decide adónde vas a sacar y adónde va el primer golpe de fondo antes de lanzar. Un saque abierto seguido de una derecha a la cancha abierta, o un saque al cuerpo seguido de una pelota profunda al revés. Dos golpes, una decisión.',
          },
          {
            title: 'Alto y pesado al revés',
            body: 'La mayoría de los jugadores por debajo del máximo nivel detesta una pelota alta con topspin en el revés. Levántala profunda con efecto y espera la respuesta corta, luego atácala. Aburrido y devastadoramente efectivo.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Derecha invertida',
        body: 'Una vez que tu revés cruzado sea fiable, añade la derecha invertida: rodea una pelota en tu lado del revés y pega una derecha cruzada a la esquina del revés del rival. Combina la seguridad del cruzado con tu mejor golpe y es el patrón de ataque más común del tenis moderno.',
      },
      {
        type: 'table',
        columns: ['Patrón', 'Cuándo usarlo', 'Qué prepara'],
        rows: [
          ['Peloteo cruzado', 'Pelotas neutras, marcadores ajustados, cuando no estás seguro', 'Una pelota corta para atacar, o un error del rival'],
          ['Paralelo en una pelota corta', 'Pelota dentro de la línea de saque, estás equilibrado', 'Un rival a contrapié o una subida a la red'],
          ['Saque abierto, derecha a la cancha abierta', 'Lado de iguales para un diestro, marcadores tipo 30-0 o 40-15', 'Un punto de dos golpes'],
          ['Alto y pesado al revés', 'Rival con revés a una mano o un revés a dos manos plano', 'Una respuesta corta y flotada sobre la que puedes adelantarte'],
        ],
      },
      {
        type: 'text',
        body: 'Elige un patrón por semana y juega sets de práctica en los que lo uses cada vez que esté disponible. Se sentirá artificial durante unas sesiones. Luego, un día en un partido real, ocurrirá sin pensarlo, y entenderás por qué los profesionales hablan de patrones y no de golpes.',
      },
      {
        type: 'link',
        to: '/studio/serve',
        label: 'Trabaja el saque en el estudio 3D',
      },
    ],
  },
  {
    id: 'doubles-tactics-basics',
    section: 'tactics',
    title: 'Fundamentos de la táctica de dobles',
    summary: 'Posiciones, el medio, la primera volea y la comunicación. El dobles es otro juego y premia a la pareja que lo conoce.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'El dobles no es individuales con un compañero. La cancha es 2,7 metros más ancha pero hay dos personas por lado, la red es donde se ganan los puntos, y el saque y la devolución importan aún más porque cada punto involucra al menos a un jugador ya en la red. Una pareja que entiende la colocación y juega los porcentajes le gana a dos mejores jugadores de individuales con sorprendente frecuencia.',
      },
      {
        type: 'table',
        columns: ['Rol', 'Posición inicial', 'Tarea principal'],
        rows: [
          ['Sacador', 'A mitad de camino entre la marca central y la línea lateral de dobles', 'Meter un alto porcentaje de primeros saques y seguirlos hacia adelante, o mantener la línea de fondo y pegar el más uno'],
          ['Compañero del sacador', 'Medio del cuadro de saque, a unos dos metros de la red', 'Cubrir el medio, interceptar las devoluciones débiles, proteger el pasillo solo cuando el receptor muestre que va a ir ahí'],
          ['Receptor', 'Cerca de la línea de fondo, entre la línea de individuales y el pasillo según el saque', 'Devolver cruzado, bajo y profundo, lejos del jugador de red. Una devolución con globo es una buena opción contra un jugador de red agresivo'],
          ['Compañero del receptor', 'Alrededor de la línea de saque', 'Vigilar al jugador de red, cantar el saque, avanzar si la devolución es buena y retroceder si es débil'],
        ],
      },
      {
        type: 'list',
        items: [
          '**Por el medio se resuelve el enredo.** Una pelota entre dos rivales crea confusión y quita ángulos. Ante la duda, golpea por el medio.',
          '**Mete la primera volea.** La primera volea o el primer golpe de fondo del sacador debe ser profundo y seguro. Define en la segunda pelota.',
          '**Muévanse juntos.** Ambos jugadores se mueven como una unidad, de lado a lado y adelante y atrás. Un hueco entre compañeros es un pasillo para los rivales.',
          '**Devuelve cruzado y bajo.** El jugador de red no puede hacerte daño si la pelota cae por debajo de la red en el otro lado.',
          '**Globo cuando la red está llena.** Un globo por encima del jugador de red obliga a la pareja a cambiar y defender.',
        ],
      },
      {
        type: 'text',
        body: 'La comunicación no es opcional. Hablen antes de cada punto: adónde va el saque, si el jugador de red intercepta, si te quedas atrás o subes. Canten las pelotas en el aire: tuya, mía, cambio. Y tras un punto perdido, un choque de puños o una palabra dice que la pareja está bien. El dobles silencioso es dobles perdedor.\n\nLas formaciones como la formación en I y la australiana son útiles contra un receptor que te está matando cruzado, pero vienen después de lo básico: saque adentro, primera volea profunda, cubrir el medio, moverse juntos.',
      },
      {
        type: 'callout',
        title: 'El pasillo es una trampa',
        body: 'Los jugadores de red que se pegan al pasillo para protegerlo dejan todo el medio abierto. El receptor raramente va por el pasillo porque es el golpe más difícil de la cancha. Párate en el medio del cuadro y desafíalo.',
      },
      {
        type: 'link',
        to: '/studio/forehand-volley',
        label: 'Afina la volea en el estudio 3D',
      },
    ],
  },

  // ------------------------------------------------------------------ mental
  {
    id: 'between-point-routine',
    section: 'mental',
    title: 'La rutina entre puntos',
    summary: 'Tienes 20 segundos entre puntos. Lo que hagas con ellos decide cómo juegas el siguiente.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'El tenis es aproximadamente 20 % jugar y 80 % esperar. La espera es donde se pierden los partidos: repasando el último error, preocupándose por el marcador, mirando al rival, tensándose. Los grandes competidores no son personas que no sienten nada entre puntos. Son personas con una rutina que los lleva del final de un punto al inicio del siguiente en un estado emocional fiable.\n\nLa versión más conocida es la **cura de 16 segundos** descrita por el psicólogo deportivo Jim Loehr, quien descubrió que los mejores jugadores pasaban por las mismas cuatro etapas entre puntos, casi como un ritual.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Reacciona (3 a 5 segundos)',
            body: 'Termina el punto. Date la vuelta alejándote de la red de inmediato, pase lo que pase. Mantén un lenguaje corporal fuerte: cabeza arriba, hombros atrás, raqueta en la mano no dominante. Un puño rápido tras un buen punto está bien; una caminata encorvada tras uno malo, no.',
          },
          {
            title: 'Relájate (6 a 15 segundos)',
            body: 'Camina hacia la cerca del fondo o el costado. Exhala despacio. Ajusta tus cuerdas, sécate la mano en una toalla, deja que baje el pulso. Aquí es donde al último punto se le permite terminar.',
          },
          {
            title: 'Prepárate (3 a 5 segundos)',
            body: 'Camina a la línea de fondo y decide, en una frase, qué vas a hacer. Adónde va el saque, o adónde irá la devolución. Un plan para los dos primeros golpes, nada más.',
          },
          {
            title: 'Ritual (5 a 8 segundos)',
            body: 'La misma secuencia física cada vez: bota la pelota el mismo número de veces, toma la misma respiración, mira el blanco y ve. El ritual le dice a tu cuerpo que el pensar terminó.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Date la vuelta',
        body: 'El hábito más útil de todos es darle la espalda a la red en el instante en que termina un punto. Elimina el disparador visual de la frustración, te da un espacio privado y arranca la rutina de forma automática.',
      },
      {
        type: 'text',
        body: 'Construye la rutina en la práctica, no en los partidos. Juega sets de práctica en los que pases deliberadamente por las cuatro etapas entre cada punto, incluso los que no importan. Se sentirá lento. En un par de semanas se sentirá mal no hacerlo, y notarás que las rachas de tres o cuatro errores rápidos seguidos han desaparecido en gran parte.',
      },
      {
        type: 'link',
        to: '/learn/mental',
        label: 'Siguiente: manejar los nervios y los bloqueos',
      },
    ],
  },
  {
    id: 'handling-nerves-and-chokes',
    section: 'mental',
    title: 'Manejar los nervios y los bloqueos',
    summary: 'Qué es realmente bloquearse, por qué ocurre en los puntos grandes y las herramientas prácticas que te sacan del apuro.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Todos se bloquean. Los profesionales se bloquean a 5-5 en un tie-break, los jugadores de club se bloquean sacando para el set, los juniors se bloquean en el momento en que llega un padre. No es un defecto de carácter. Es una respuesta predecible del cuerpo a la presión, y una vez que sabes lo que hace puedes trabajar con ella.\n\nBajo presión, tus músculos se tensan, tu respiración se acorta, tu swing se vuelve más corto y lento y tu atención se estrecha sobre el resultado en vez de la pelota. El resultado es el segundo saque empujado, la derecha que cae corta, la volea a la que nunca terminas de comprometerte.',
      },
      {
        type: 'table',
        columns: ['Qué notas', 'Qué está pasando', 'Qué hacer'],
        rows: [
          ['Brazo tenso, swing corto', 'Tensión muscular por la adrenalina', 'Sacude el brazo, afloja la empuñadura, haz el swing más grande y más lento a propósito'],
          ['Corazón acelerado, respiración corta', 'Respiración de lucha o huida', 'Una exhalación larga antes del punto, el doble de larga que la inhalación'],
          ['Pensar en el marcador', 'Atención en el resultado en vez de en la tarea', 'Reemplázalo con una clave de proceso: mira la pelota, o golpea a través del blanco'],
          ['Pies más lentos', 'Respuesta de congelamiento', 'Rebota en la punta de los pies antes del saque o la devolución, exagera el split step'],
        ],
      },
      {
        type: 'text',
        body: 'El antídoto más fiable para un brazo tenso es **mantener los pies en movimiento y la raqueta acelerando**. Los nervios te hacen desacelerar hacia la pelota. Decide de antemano que en los puntos grandes harás el swing con libertad a un blanco grande con más efecto, en lugar de dirigirla. Un swing confiado al medio de la cancha le gana a un swing cauteloso a la línea todas las veces.\n\nLa segunda herramienta es tu respiración. No puedes relajar directamente un músculo por orden, pero una exhalación lenta lo hace por ti. Hazla parte del ritual antes de cada punto, no solo de los que dan miedo.',
      },
      {
        type: 'callout',
        title: 'Los nervios significan que te importa',
        body: 'Intentar sentirse tranquilo suele ser contraproducente. En su lugar, espera los nervios, nómbralos y trátalos como una señal de que el momento importa. Los campeones también están nerviosos. Solo han practicado jugar bien estando nerviosos.',
      },
      {
        type: 'list',
        items: [
          'Juega puntos de práctica con consecuencias: el que pierde recoge las pelotas, o empieza cada juego en 30-30. La presión es una habilidad que se ensaya.',
          'Ten una jugada predefinida para los puntos grandes: para muchos jugadores es un saque con efecto al revés y un más uno cruzado.',
          'Ve más despacio entre puntos cuando te sientas apurado. Usa los 20 segundos completos.',
          'Tras un bloqueo, no lo analices en la cancha. Rutina, siguiente punto. Analízalo en tu diario esa noche.',
        ],
      },
    ],
  },
  {
    id: 'practice-with-purpose',
    section: 'mental',
    title: 'Practicar con propósito',
    summary: 'Pegar durante una hora no es practicar. La práctica deliberada, un diario y la cámara del teléfono duplicarán lo que sacas de tu tiempo en cancha.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'La mayoría de los jugadores practica de la misma forma durante años y se queda en el mismo nivel, y la razón no es el talento ni el tiempo. Es que pelotear cómodamente desde el fondo con un amigo es agradable pero no cambia nada. Ensaya lo que ya sabes hacer.\n\nLa **práctica deliberada** es distinta. Apunta a una debilidad específica, trabaja en el límite de tu capacidad actual donde fallas a menudo, te da retroalimentación inmediata en cada intento y exige atención plena. Es cansadora, a veces frustrante, y es el único tipo de práctica que te hace avanzar de forma fiable.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Elige una sola cosa',
            body: 'Antes de cada sesión, escribe la única cosa en la que vas a trabajar. No «revés», sino «terminar el revés a dos manos por encima del hombro con las caderas totalmente rotadas». Un foco por sesión.',
          },
          {
            title: 'Fija un objetivo medible',
            body: 'Veinte pelotas seguidas cruzadas más allá de la línea de saque. Seis de diez segundos saques en una toalla en la esquina del revés. Los números convierten la práctica en un juego y te dicen si funciona.',
          },
          {
            title: 'Consigue retroalimentación en cada pelota',
            body: 'Blancos en la cancha, un compañero que cante la profundidad, un entrenador o tu teléfono en un clip en la cerca. Sin retroalimentación estás adivinando.',
          },
          {
            title: 'Para cuando baje la calidad',
            body: 'Veinte minutos concentrados le ganan a una hora de repetición cansada y descuidada que automatiza lo equivocado.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Grábate',
        body: 'Lo que sientes que haces y lo que realmente haces suelen ser muy distintos. Un teléfono en la cerca detrás de la línea de fondo, grabando a 60 cuadros por segundo o más, te mostrará en 30 segundos lo que un entrenador quizás necesite tres clases para convencerte. Compara las imágenes con los modelos profesionales del estudio 3D.',
      },
      {
        type: 'text',
        body: 'Lleva un **diario de entrenamiento**. No tiene que ser elaborado: fecha, en qué trabajaste, cuáles fueron los números, una cosa que notaste, una cosa para probar la próxima vez. Después de un partido, añade qué funcionó, qué no y cómo te sentiste en los puntos grandes.\n\nA lo largo de unos meses el diario te muestra patrones que nunca verías de otro modo: que tu saque se desarma cuando estás cansado, que ganas más cuando juegas cruzado temprano, que el revés mejoró cuando dejaste de pensar en la muñeca. También hace obvia la única cosa de la siguiente sesión.',
      },
      {
        type: 'list',
        items: [
          'Divide el tiempo de práctica en tercios aproximados: técnica con pelotas dejadas caer o canasto, ejercicios en vivo con un compañero, y puntos o sets de práctica.',
          'Practica los golpes que evitas en los partidos. Si nunca pegas segundos saques bajo presión en la práctica, nunca lo harás en un partido.',
          'Los compañeros de peloteo son para ejercicios cooperativos. Pide lo que necesitas: «tírame pelotas cortas para subir» es una petición normal.',
          'Revisa tu diario una vez al mes y fija el foco del mes siguiente a partir de él.',
        ],
      },
      {
        type: 'link',
        to: '/pros',
        label: 'Compara tus grabaciones con los profesionales',
      },
    ],
  },
  {
    id: 'how-to-learn-a-stroke',
    section: 'mental',
    title: 'Cómo aprender un golpe',
    summary: 'Una progresión en cinco etapas desde los swings en sombra hasta el partido, y cómo usar la cámara lenta para que la imagen en tu cabeza sea la correcta.',
    level: 'beginner',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Un golpe nuevo, o un cambio en uno viejo, no llega en una clase. Pasa por etapas, y cada etapa necesita un tipo distinto de práctica. Los jugadores que se atascan normalmente se han adelantado: prueban la nueva derecha en un partido antes de que sobreviva a una pelota dejada caer, se desarma, y concluyen que no funciona.\n\nLa progresión de abajo es la que la mayoría de los entrenadores usa de alguna forma. Pasa todo el tiempo que necesites en cada etapa, y retrocede una etapa cada vez que el golpe se desarme.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Estudia la imagen',
            body: 'Mira el golpe en cámara lenta hasta que puedas describir la secuencia: preparación, carga, contacto, terminación. Usa el estudio 3D para pausarlo y rotarlo. Tu cuerpo copia imágenes mucho mejor que palabras.',
          },
          {
            title: 'Swings en sombra',
            body: 'Sin pelota. Haz el swing despacio frente a un espejo o tu teléfono, revisando las posiciones clave. Cincuenta swings lentos al día durante una semana construyen el patrón sin la presión de golpear nada.',
          },
          {
            title: 'Pelota dejada caer',
            body: 'Deja caer la pelota tú mismo desde la mano y golpéala. El timing perfecto es fácil, así que puedes concentrarte por completo en el movimiento. Apunta a un blanco grande en la cancha, no a un punto.',
          },
          {
            title: 'Lanzamiento de un compañero',
            body: 'Un compañero o entrenador lanza pelotas suaves desde el otro lado de la red, luego desde un canasto, aumentando poco a poco la velocidad y añadiendo movimiento. Ahora tienes que sincronizar una pelota que llega mientras mantienes la forma.',
          },
          {
            title: 'Peloteo en vivo',
            body: 'Peloteo cooperativo con el golpe nuevo. Empieza despacio y cruzado. El golpe empeorará antes de mejorar. Persiste.',
          },
          {
            title: 'Partido',
            body: 'Primero sets de práctica, luego partidos reales. Acepta que bajo presión a veces volverás al golpe viejo. Cada vez que mantengas el nuevo bajo presión, se vuelve tuyo.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'La cámara lenta es el atajo',
        body: 'Estudiar en cámara lenta funciona porque te deja ver las partes del golpe que ocurren demasiado rápido para notarlas en vivo: el retraso de la raqueta, la cadera adelantándose al hombro, la posición de la muñeca en el contacto. Estudia el modelo, grábate desde el mismo ángulo y compara cuadro a cuadro.',
      },
      {
        type: 'text',
        body: 'Espera una caída. Cambiar un golpe casi siempre lo empeora durante dos a seis semanas, porque el movimiento viejo era automático y el nuevo todavía necesita pensarse. Este es el punto en que la mayoría se rinde. Si sabes que viene, puedes planificarlo: haz el cambio fuera de temporada o en un periodo tranquilo, y quédate en las etapas de pelota dejada caer y lanzamiento de compañero hasta que se sienta aburrido.\n\nUn cambio a la vez. Corrige la empuñadura, luego la preparación, luego la terminación. Intentar cambiar todo a la vez es intentar no cambiar nada.',
      },
      {
        type: 'link',
        to: '/studio/forehand',
        label: 'Estudia la derecha cuadro a cuadro en el estudio 3D',
      },
    ],
  },
]
