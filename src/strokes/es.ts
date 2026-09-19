import type { Phase, Stroke } from '../engine/types'

/**
 * The translatable part of a stroke. Phases carry text only and are merged
 * onto the English phases by index, so timings live in one place.
 */
export interface StrokeText {
  name: string
  aka?: string
  tagline: string
  description: string
  grips: Stroke['grips']
  phases: Pick<Phase, 'name' | 'summary' | 'cues'>[]
  commonErrors: Stroke['commonErrors']
  drills: string[]
}

/** stroke id → Spanish text. Filled by translation; missing ids fall back to English. */
export const STROKE_TEXT_ES: Record<string, StrokeText> = {
  // ------------------------------------------------------------ golpes de fondo
  forehand: {
    name: 'Derecha (drive)',
    aka: 'Derecha con topspin',
    tagline: 'El golpe que más vas a pegar en tu vida. Las caderas guían, los hombros siguen, la raqueta llega al final.',
    description:
      'Una derecha moderna con topspin pegada con empuñadura semioeste desde una posición semiabierta. La potencia viene desde el suelo: las piernas cargan, las caderas disparan, los hombros se liberan y el brazo se latiguea al final. La cabeza de la raqueta baja por debajo de la pelota y cepilla hacia arriba a través del contacto, que es lo que produce el topspin y te permite pegar fuerte manteniendo la pelota adentro.',
    grips: [
      { id: 'semi-western', note: 'Nudillo base del índice en el bisel 4. El estándar para un drive moderno con topspin.' },
      { id: 'eastern', note: 'Bisel 3. Más plana, más rápida a través de la cancha, más fácil de sincronizar en pelotas bajas. Federer y del Potro.' },
    ],
    phases: [
      {
        name: 'Espera y split',
        summary: 'Base atlética. Rodillas flexionadas, peso en la punta de los pies, raqueta al frente con la mano izquierda en el corazón.',
        cues: ['Pies más abiertos que los hombros', 'Punta de la raqueta arriba, manos relajadas al frente', 'Ojos en la raqueta del rival'],
      },
      {
        name: 'Giro de unidad',
        summary: 'Caderas y hombros giran juntos, de lado a la red, mientras la mano izquierda sigue sosteniendo la raqueta. Los pies se colocan en posición semiabierta y la punta de la raqueta apunta hacia arriba.',
        cues: ['Gira todo el tronco, no solo el brazo', 'La mano izquierda se queda en la raqueta lo más posible', 'El pie derecho apunta a la cerca lateral'],
      },
      {
        name: 'Preparación y carga',
        summary: 'El brazo izquierdo se estira cruzando el cuerpo paralelo a la línea de fondo, cabeza de la raqueta por encima de la mano, caderas hundidas unos 10 cm en la pierna derecha. Los hombros están girados más allá de las caderas.',
        cues: ['Cabeza de la raqueta por encima de la muñeca', 'Señala la cerca lateral con la mano izquierda', 'Siente cómo el peso se hunde en la pierna de atrás'],
      },
      {
        name: 'Caída de la raqueta y retraso',
        summary: 'Las caderas empiezan a abrirse mientras los hombros siguen cerrados: esta es la separación cadera-hombro que almacena energía elástica. La raqueta cae por debajo de la pelota, cuerdas mirando al suelo, la punta rezagada respecto a la mano.',
        cues: ['Caderas primero, los hombros esperan', 'Las cuerdas miran a la cancha («acariciar al perro»)', 'El codo se queda relajado, la raqueta se retrasa respecto a la mano'],
      },
      {
        name: 'Contacto',
        summary: 'La pelota se encuentra a medio metro delante de la cadera delantera a la altura de la cintura, caderas ligeramente abiertas, hombros de frente, peso sobre el pie delantero y la raqueta más o menos nivelada. La cabeza se queda quieta y los ojos en el punto de contacto.',
        cues: ['Contacto adelante, no a tu lado', 'Cara de la raqueta apenas cerrada, cepillando de abajo hacia arriba', 'Cabeza quieta durante el golpe'],
      },
      {
        name: 'Extensión y limpiaparabrisas',
        summary: 'La mano sigue impulsando hacia el blanco después del contacto; solo entonces el antebrazo rota y manda la punta de la raqueta hacia arriba y por encima: el limpiaparabrisas.',
        cues: ['Extiende primero hacia el blanco', 'Luego rota el antebrazo, punta hacia arriba y por encima', 'El talón de atrás se despega del suelo'],
      },
      {
        name: 'Terminación y recuperación',
        summary: 'Raqueta sobre el hombro izquierdo con el codo apuntando al blanco, pecho a la red, pie de atrás pasado hacia adelante. Luego la raqueta baja al frente y los pies hacen el split de vuelta a la espera.',
        cues: ['El codo apunta adonde fue la pelota', 'Atrapa la raqueta con la mano izquierda', 'Recupera con pasos laterales, nunca caminando'],
      },
    ],
    commonErrors: [
      { error: 'Pegar solo con el brazo: hacer el swing con el brazo mientras las caderas siguen cerradas.', fix: 'Inicia el swing hacia adelante girando la cadera de atrás hacia la red. Practica swings en sombra con la raqueta sujeta contra el pecho con ambas manos para que solo pueda moverse el tronco.' },
      { error: 'Contacto tardío, al lado o detrás del cuerpo.', fix: 'Colócate un paso completo más atrás de lo que se siente natural. Di «bote… golpe» en voz alta; el contacto debería llegar antes de lo que piensas.' },
      { error: 'La cabeza de la raqueta cae demasiado pronto, bucle con el brazo recto.', fix: 'Mantén la punta por encima de la mano hasta que los hombros hayan girado por completo; la caída ocurre cuando disparan las caderas, no antes.' },
      { error: 'La cabeza se levanta para mirar el golpe.', fix: 'Congela la mirada en el punto de contacto hasta que termine la terminación.' },
    ],
    drills: [
      'Swings en sombra con pelota dejada caer: deja caer una pelota delante de la cadera delantera, déjala botar una vez y pégala contra la cerca. 3 series de 10.',
      'Giros con la raqueta en el pecho: cruza los brazos sobre la raqueta y rota caderas y hombros desde el giro de unidad hasta la terminación sin mover los brazos.',
      'Peloteo con cono: apunta diez pelotas cruzadas por encima de un cono colocado en la línea de saque; solo cuentan las que pasan la red al menos por el largo de una raqueta.',
    ],
  },

  'backhand-two-handed': {
    name: 'Revés a dos manos',
    tagline: 'Dos manos, una unidad. El brazo izquierdo impulsa como una derecha de zurdo mientras el derecho guía.',
    description:
      'El revés a dos manos es el más común del juego moderno porque es estable, fácil de sincronizar en pelotas altas y tolerante en la devolución. La mano derecha sostiene una empuñadura continental abajo, la mano izquierda una este de derecha encima. Piénsalo como una derecha de zurdo con la mano derecha acompañando: el tronco se enrolla, la raqueta cae por debajo de la pelota y ambos brazos se extienden a través del contacto antes de la terminación en limpiaparabrisas sobre el hombro derecho.',
    grips: [
      { id: 'two-handed-backhand', note: 'Mano derecha continental (bisel 2), mano izquierda este de derecha (bisel 3 para la mano izquierda). Manos en contacto.' },
    ],
    phases: [
      {
        name: 'Espera y cambio de empuñadura',
        summary: 'Al salir del split step la mano izquierda gira la raqueta para que la mano derecha caiga en una empuñadura continental mientras la izquierda se acomoda en una este de derecha encima.',
        cues: ['La mano izquierda hace el cambio de empuñadura', 'Las manos se tocan, sin hueco', 'La cabeza de la raqueta se queda por encima de las muñecas'],
      },
      {
        name: 'Giro de unidad',
        summary: 'Caderas y hombros giran a la izquierda juntos; el pie derecho cruza hacia una posición neutra. Ambas manos llevan la raqueta atrás como una unidad, punta arriba.',
        cues: ['Gira con las caderas, no con los brazos', 'El pie derecho cruza por delante del cuerpo', 'Hombro derecho bajo el mentón'],
      },
      {
        name: 'Preparación y carga',
        summary: 'El peso se hunde en la pierna de atrás (izquierda), manos a la altura de la cadera detrás del cuerpo, hombros girados más que las caderas.',
        cues: ['Siéntate en la pierna de atrás', 'Las manos se quedan cerca del cuerpo', 'La punta de la raqueta apunta a la cerca de atrás'],
      },
      {
        name: 'Caída de la raqueta',
        summary: 'Las caderas se abren hacia la red mientras la raqueta cae por debajo de la pelota, cara de golpeo hacia abajo. El brazo izquierdo está a punto de tomar el mando.',
        cues: ['Caderas primero', 'Raqueta por debajo de la pelota', 'Codo izquierdo recogido, listo para impulsar'],
      },
      {
        name: 'Contacto',
        summary: 'Contacto delante de la cadera delantera (derecha), a la altura de la cintura, ambos brazos extendiéndose, raqueta nivelada, caderas de frente a la red.',
        cues: ['Encuentra la pelota delante de la cadera delantera', 'El brazo izquierdo atraviesa como una derecha', 'Cabeza quieta'],
      },
      {
        name: 'Extensión',
        summary: 'Ambas manos siguen hacia el blanco, luego el antebrazo izquierdo rota y la punta sube: el limpiaparabrisas a dos manos.',
        cues: ['Empuja ambas manos hacia el blanco', 'Luego rota: punta arriba y por encima', 'El talón de atrás se levanta'],
      },
      {
        name: 'Terminación y recuperación',
        summary: 'Raqueta sobre el hombro derecho, pecho a la red, la pierna de atrás pasa hacia adelante. Recupera con pasos laterales.',
        cues: ['Termina alto y relajado', 'El codo derecho apunta al blanco', 'Pasos laterales de vuelta al medio'],
      },
    ],
    commonErrors: [
      { error: 'El brazo derecho domina y tira cruzando el cuerpo, mandando la pelota afuera.', fix: 'Pega derechas solo con la mano izquierda durante unos minutos antes de volver a añadir la mano derecha.' },
      { error: 'Contacto demasiado atrás, encerrado contra el cuerpo.', fix: 'Cruza con el pie derecho antes y golpea la pelota cuando sube pasando la cadera delantera.' },
      { error: 'Quedarse erguido en las pelotas altas.', fix: 'Toma la pelota antes, en la subida, o retrocede y déjala caer a la zona de golpeo. Los jugadores a dos manos también pueden elevar el punto de contacto con los codos flexionados.' },
    ],
    drills: [
      'Derechas de zurdo: 20 pelotas golpeando el lado del revés solo con la mano izquierda, luego añade la mano derecha.',
      'Pelotas dejadas caer: un compañero deja caer pelotas a la altura de la cadera delantera; pega cruzado a una zona objetivo más allá de la línea de saque.',
      'Bloqueos de devolución: acorta la preparación y bloquea 10 saques hacia el lado de iguales.',
    ],
  },

  'backhand-one-handed': {
    name: 'Revés a una mano',
    tagline: 'El golpe más elegante del tenis. Una palanca larga, un giro profundo de hombros y un punto de contacto sin miedo, bien adelante.',
    description:
      'El revés a una mano con topspin usa una empuñadura este de revés y un giro de hombros mayor que cualquier otro golpe de fondo, de modo que la parte trasera del hombro derecho casi mira a la red en lo alto de la preparación. La mano izquierda sostiene el corazón hasta que empieza el swing hacia adelante y luego vuela hacia atrás para equilibrar. El brazo se endereza antes del contacto y se mantiene recto, encontrando la pelota bien adelante, y ambos brazos se abren como alas en la terminación. Premia la preparación temprana y castiga el contacto tardío.',
    grips: [
      { id: 'eastern-backhand', note: 'Nudillo del índice en el bisel 1 (arriba). Federer, Wawrinka, Thiem, Tsitsipas.' },
      { id: 'extreme-eastern-backhand', note: 'Bisel 8. Más topspin, más difícil en pelotas bajas. Gasquet, Kuerten.' },
    ],
    phases: [
      {
        name: 'Espera y cambio de empuñadura',
        summary: 'La mano izquierda en el corazón rota la raqueta para que la mano derecha pase a una empuñadura este de revés con el nudillo arriba.',
        cues: ['Cambia de empuñadura con la mano izquierda', 'Nudillo encima del mango', 'Raqueta arriba temprano'],
      },
      {
        name: 'Giro de unidad',
        summary: 'Una posición cerrada: el pie derecho cruza y los hombros giran hasta que el omóplato derecho mira a la red. La mano izquierda sigue acunando el corazón.',
        cues: ['Gira más de lo que se siente normal', 'Muéstrale la espalda al rival', 'La mano izquierda sigue en el corazón'],
      },
      {
        name: 'Preparación y carga',
        summary: 'Cabeza de la raqueta por encima de la mano detrás del hombro izquierdo, peso cargado en la pierna de atrás, mentón sobre el hombro delantero.',
        cues: ['Mentón en el hombro delantero', 'Cabeza de la raqueta arriba, muñeca firme', 'Peso en el pie de atrás'],
      },
      {
        name: 'Caída y liberación',
        summary: 'La raqueta cae por debajo de la pelota mientras la mano izquierda suelta y empieza a moverse hacia atrás. El brazo empieza a enderezarse.',
        cues: ['La mano izquierda suelta y va hacia atrás', 'Raqueta por debajo de la pelota', 'Endereza el brazo temprano'],
      },
      {
        name: 'Contacto',
        summary: 'Brazo recto, contacto un paso completo delante del pie delantero, hombros aún de lado. El brazo izquierdo se extiende atrás como contrapeso.',
        cues: ['Contacto bien adelante', 'Los hombros se quedan de lado', 'Brazo izquierdo atrás, como abriendo una puerta'],
      },
      {
        name: 'Extensión',
        summary: 'La raqueta sube con inclinación pronunciada a lo largo de la línea del blanco, los dos brazos separándose para evitar que el pecho se abra antes de tiempo.',
        cues: ['La raqueta va hacia arriba y hacia afuera', 'Los brazos se abren como alas', 'El pecho se queda cerrado hasta que la raqueta está alta'],
      },
      {
        name: 'Terminación',
        summary: 'Raqueta alta por encima del hombro derecho, canto al cielo, brazo de atrás nivelado. Mantenlo un instante y luego recupera.',
        cues: ['Termina erguido', 'Posa para la foto', 'Recupera con un paso cruzado'],
      },
    ],
    commonErrors: [
      { error: 'El pecho se abre antes de tiempo y la pelota se va abierta o corta.', fix: 'Mantén el brazo izquierdo yendo hacia atrás durante el contacto; si la mano izquierda viene hacia adelante, el pecho se abre.' },
      { error: 'Contacto tardío, cucharazo de muñeca.', fix: 'Prepara durante el bote, no después. Golpea delante de la rodilla delantera.' },
      { error: 'El brazo se flexiona en el contacto.', fix: 'Endereza antes de que empiece el swing hacia adelante; un brazo flexionado se derrumba ante la velocidad.' },
    ],
    drills: [
      'Swings en sombra sosteniendo una pelota en la mano izquierda: debe moverse hacia atrás mientras la raqueta va hacia adelante.',
      'Pelota dejada caer y congelar: golpea, luego congela la terminación dos segundos y revisa la apertura de los brazos.',
      'Peloteo paralelo a blancos desde una posición cerrada.',
    ],
  },

  slice: {
    name: 'Revés cortado (slice)',
    tagline: 'De arriba hacia abajo, a través de la pelota, no hacia abajo contra ella. El golpe que compra tiempo y cambia el ritmo.',
    description:
      'El revés cortado se pega con empuñadura continental y un swing de arriba hacia abajo que le da efecto cortado a la pelota, haciéndola deslizar y quedarse baja. La raqueta empieza por encima de la pelota cerca del hombro izquierdo, la cara se abre unos grados y el brazo impulsa hacia adelante y ligeramente hacia abajo, manteniéndose largo a través del contacto. Los principiantes hachean; los buenos cortadores atraviesan la pelota con la raqueta viajando casi nivelada en el contacto, y terminan con ambos brazos abiertos y la cara de la raqueta todavía abierta.',
    grips: [
      { id: 'continental', note: 'Bisel 2. La misma empuñadura con la que sacas y voleas, así que no requiere cambio en la red.' },
    ],
    phases: [
      {
        name: 'Gira y prepara alto',
        summary: 'Posición cerrada, hombros girados, la raqueta llevada atrás alta cerca del hombro izquierdo con la mano izquierda en el corazón y la cara ligeramente abierta.',
        cues: ['Cabeza de la raqueta por encima de la pelota', 'La mano izquierda sostiene el corazón', 'Cara abierta unos grados, no plana al cielo'],
      },
      {
        name: 'Carga',
        summary: 'Manos altas junto a la oreja izquierda, codo flexionado, peso en el pie de atrás. Desde aquí el swing viajará hacia abajo y hacia adelante.',
        cues: ['Manos a la altura de la oreja', 'Peso atrás', 'Mira por encima del hombro delantero'],
      },
      {
        name: 'Swing hacia adelante',
        summary: 'La mano izquierda suelta y se mueve hacia atrás; la raqueta viaja hacia adelante y hacia abajo hacia la pelota mientras el brazo se endereza.',
        cues: ['La mano izquierda va hacia atrás', 'Impulsa más hacia adelante que hacia abajo', 'Brazo enderezándose'],
      },
      {
        name: 'Contacto',
        summary: 'Delante de la cadera delantera con la cara abierta unos 20 grados y la trayectoria de la raqueta casi nivelada. Muñeca firme, brazo largo.',
        cues: ['Cara ligeramente abierta', 'Plano a través de la zona de golpeo', 'Muñeca firme, sin latigazo'],
      },
      {
        name: 'Extensión',
        summary: 'La raqueta sigue hacia el blanco, manteniéndose baja y larga, mientras el brazo izquierdo se estira atrás para mantener los hombros cerrados.',
        cues: ['Terminación larga hacia el blanco', 'Los hombros se quedan de lado', 'Los brazos se abren como un libro'],
      },
      {
        name: 'Terminación',
        summary: 'La raqueta termina al frente y ligeramente por encima de la cintura con la cara todavía abierta, peso en el pie delantero.',
        cues: ['Cara todavía abierta al final', 'Peso adelante', 'Recupera y haz el split'],
      },
    ],
    commonErrors: [
      { error: 'Hachear hacia abajo con mucha inclinación, la pelota flota y se queda alta.', fix: 'Empieza la raqueta más baja y haz el swing más hacia adelante que hacia abajo; imagina deslizar las cuerdas sobre una mesa.' },
      { error: 'Cara demasiado abierta, la pelota salta hacia arriba.', fix: 'Cierra la cara a unos 20 grados; revisa la terminación: las cuerdas deben mirar a la red, no al cielo.' },
      { error: 'El pecho se abre y el slice se va cruzado sin querer.', fix: 'Manda el brazo izquierdo hacia atrás durante el contacto.' },
    ],
    drills: [
      'Slices contra la pared: 30 slices seguidos contra una pared, apuntando a una línea a un metro de altura.',
      'Ejercicio de la mesa: sostén la raqueta sobre un banco y desliza las cuerdas hacia adelante sobre él para sentir la trayectoria plana.',
      'Slice y subida: corta profundo paralelo y sigue el golpe hasta la red.',
    ],
  },

  return: {
    name: 'Devolución de saque',
    tagline: 'Split cuando el sacador golpea, gira, bloquea. La mitad de la preparación, todo el giro de hombros.',
    description:
      'La devolución es una derecha o un revés con la preparación cortada a la mitad, porque un saque llega en bastante menos de un segundo. El split step se sincroniza con el contacto del sacador para que aterrices cuando la pelota sale de la raqueta. Los hombros giran por completo pero las manos se quedan delante del cuerpo; la raqueta bloquea a través de la pelota con muñeca firme y una terminación compacta. Ante un segundo saque el swing crece y te adelantas; ante un primer saque el objetivo es profundidad y neutralizar, no ganar el punto de una vez.',
    grips: [
      { id: 'semi-western', note: 'Tu empuñadura de derecha, sostenida a medio camino entre la de derecha y la de revés, con la mano izquierda lista para girar la raqueta.' },
    ],
    phases: [
      {
        name: 'Split step',
        summary: 'Un pequeño salto sincronizado para aterrizar ancho y bajo exactamente cuando el sacador hace contacto.',
        cues: ['Salta cuando el sacador sube el swing', 'Aterriza cuando golpea', 'Ancho y bajo al aterrizar'],
      },
      {
        name: 'Giro de unidad, compacto',
        summary: 'Giro completo de hombros pero la raqueta se detiene junto al cuerpo, nunca detrás. La mano izquierda suelta y señala cruzando.',
        cues: ['Gira por completo, prepara la mitad', 'Raqueta junto al cuerpo', 'Mano izquierda cruzada'],
      },
      {
        name: 'Caída corta',
        summary: 'Una caída pequeña por debajo de la pelota; las caderas empiezan a abrirse cuando la pelota sale del bote.',
        cues: ['Caída pequeña', 'Las caderas arrancan temprano', 'Lee el bote'],
      },
      {
        name: 'Contacto de bloqueo',
        summary: 'Contacto bien adelante con muñeca firme y la cara perpendicular; deja que la velocidad del saque haga el trabajo.',
        cues: ['Contacto adelante', 'Muñeca firme, cara perpendicular', 'Toma prestada su velocidad'],
      },
      {
        name: 'Terminación compacta',
        summary: 'Una terminación más corta que la de una derecha de peloteo, y directo a la recuperación hacia el medio.',
        cues: ['Terminación corta', 'Recupera al medio', 'Listo para el saque más uno'],
      },
    ],
    commonErrors: [
      { error: 'Preparación completa, contacto tardío, pelota desperdigada.', fix: 'Practica devoluciones con la espalda a la cerca para que la raqueta no pueda ir hacia atrás.' },
      { error: 'Split step demasiado pronto: aterrizado y quieto cuando llega el saque.', fix: 'Salta cuando la raqueta del sacador sube, aterriza en el contacto.' },
      { error: 'Intentar ganar el punto con la devolución.', fix: 'Apunta profundo por el medio ante primeros saques; ataca solo los segundos.' },
    ],
    drills: [
      'Un compañero saca desde la línea de saque; tú bloqueas devoluciones a un blanco profundo.',
      'Timing del split step: aplaude cuando el sacador golpea; luego reemplaza el aplauso por el aterrizaje.',
      'Ataque al segundo saque: adelántate un metro y pega 10 devoluciones a una esquina.',
    ],
  },

  // -------------------------------------------------------------------- saque
  serve: {
    name: 'Saque',
    aka: 'Primer saque plano, posición de plataforma',
    tagline: 'El único golpe que controlas por completo. Un lanzamiento, no un golpe.',
    description:
      'El saque es un movimiento de lanzamiento con una raqueta al final. Una empuñadura continental permite que el antebrazo prone a través del contacto, que es de donde sale la velocidad sin esfuerzo de los buenos sacadores. El ritmo es abajo juntos, arriba juntos: ambos brazos bajan, luego el brazo del lanzamiento sube con el brazo de la raqueta. Las piernas se flexionan en la posición de trofeo, la raqueta cae por la espalda mientras las piernas impulsan hacia arriba, y el contacto ocurre en máxima extensión delante del cuerpo, con el cuerpo inclinado hombro sobre hombro. Esta versión muestra un primer saque plano desde una posición de plataforma; un saque cortado cepilla la pelota a las 2 en punto, un saque con kick cepilla de las 7 a la 1.',
    grips: [
      { id: 'continental', note: 'Bisel 2, la empuñadura de martillo. No negociable para un saque que prona.' },
    ],
    phases: [
      {
        name: 'Posición',
        summary: 'De lado a la línea de fondo. Pie delantero apuntando al poste derecho de la red, pie de atrás paralelo a la línea de fondo, peso en el pie delantero, raqueta y pelota juntas al frente.',
        cues: ['Punta del pie delantero al poste de la red', 'Hombros de lado al blanco', 'Pelota apoyada en las cuerdas, manos juntas'],
      },
      {
        name: 'Abajo juntos',
        summary: 'Ambos brazos bajan al mismo tiempo mientras el peso se balancea al pie de atrás. Despacio. Esto marca el ritmo de todo lo que sigue.',
        cues: ['Abajo juntos', 'El peso se balancea atrás', 'Empuñadura relajada, el canto de la raqueta guía'],
      },
      {
        name: 'Lanzamiento',
        summary: 'El brazo del lanzamiento sube recto, soltando la pelota a la altura de los ojos con los dedos abriéndose, sin latiguear. El brazo de la raqueta sube atrás al mismo tiempo: arriba juntos.',
        cues: ['Elevación con el brazo recto', 'Suelta a la altura de los ojos', 'Lanza ligeramente adelante y a la derecha'],
      },
      {
        name: 'Posición de trofeo',
        summary: 'Brazo del lanzamiento apuntando a la pelota, punta de la raqueta arriba con el codo flexionado y alto, rodillas bien flexionadas, cadera empujada hacia la red para que el cuerpo forme un arco.',
        cues: ['Codo alto, punta arriba', 'Las rodillas se flexionan cuando la pelota llega a lo más alto', 'Pecho al cielo, cadera adelante'],
      },
      {
        name: 'Impulso de piernas y caída de la raqueta',
        summary: 'Las piernas explotan hacia arriba mientras la cabeza de la raqueta cae por la espalda: cuanto más profunda la caída mientras las piernas impulsan, más rápida será la raqueta en el contacto.',
        cues: ['Las piernas suben mientras la raqueta baja', 'El codo guía la raqueta hacia arriba', 'Talones despegados del suelo'],
      },
      {
        name: 'Contacto',
        summary: 'Completamente extendido, despegado del suelo, el hombro que golpea muy por encima del otro. Contacto delante del cuerpo en lo más alto del alcance, cabeza aún mirando arriba.',
        cues: ['Estírate hacia arriba, no hacia afuera', 'Hombro sobre hombro', 'Mantén la cabeza arriba durante el golpe'],
      },
      {
        name: 'Pronación',
        summary: 'El antebrazo rota para que la cara de la raqueta gire hacia la derecha después del contacto. Es el final natural del movimiento de lanzamiento, no algo que forzar.',
        cues: ['Deja que el antebrazo rote', 'El canto de la raqueta termina hacia la cerca lateral', 'Aterriza sobre el pie delantero'],
      },
      {
        name: 'Aterrizaje y terminación',
        summary: 'Aterriza dentro de la línea de fondo sobre el pie izquierdo con la pierna derecha pateando hacia atrás, la raqueta terminando cruzada por el lado izquierdo del cuerpo. Split step para la devolución.',
        cues: ['Aterriza dentro de la cancha', 'La pierna de atrás patea hacia atrás para equilibrar', 'Directo a un split step'],
      },
    ],
    commonErrors: [
      { error: 'Empuñadura de derecha en el saque (bandeja de mesero): la cara se queda abierta y la pelota flota.', fix: 'Empuñadura continental, luego saca desde la línea de saque con un movimiento de lanzamiento hasta que la pronación se sienta natural.' },
      { error: 'Lanzamiento demasiado bajo o que se va detrás de la cabeza.', fix: 'Eleva con el brazo recto desde la pierna, suelta a la altura de los ojos, atrapa el lanzamiento diez veces sin golpear.' },
      { error: 'El pie delantero se mueve antes del contacto (falta de pie) o el cuerpo se abre antes de tiempo.', fix: 'Mantén los hombros de lado hasta que la raqueta caiga; practica con un tubo de pelotas colocado delante de la punta del pie delantero.' },
      { error: 'Contacto detrás de la cabeza, la pelota se va larga.', fix: 'Lanza más hacia dentro de la cancha y estírate hacia arriba y adelante.' },
    ],
    drills: [
      'Lanza pelotas por encima de la red desde la línea de fondo con un lanzamiento completo por encima del hombro. Sacar es lanzar.',
      'Lanza y atrapa: 10 lanzamientos atrapados en máxima extensión sin mover los pies.',
      'Congelar el trofeo: pausa en la posición de trofeo dos segundos y luego termina el saque.',
      'Saque a blancos: 20 saques a la T, 20 abiertos, cuenta los aciertos.',
    ],
  },

  // ---------------------------------------------------------------------- red
  'forehand-volley': {
    name: 'Volea de derecha',
    tagline: 'Sin swing. Gira, da el paso, golpea seco. La cabeza de la raqueta se queda por encima de la muñeca y la pelota hace el trabajo.',
    description:
      'Una volea es un bloqueo o golpe seco pegado antes de que la pelota bote, desde la zona de la línea de saque hasta la red. Con empuñadura continental la cabeza de la raqueta se queda por encima de la mano, los hombros giran para llevar la raqueta atrás no más allá del hombro de atrás, y el pie izquierdo cruza hacia la pelota mientras la raqueta avanza y baja ligeramente a través del contacto. La cara está un poco abierta para que la pelota pase la red con efecto cortado. La terminación es corta: la pelota ya viene rápida, tu trabajo es dirección y profundidad.',
    grips: [{ id: 'continental', note: 'Bisel 2. Una sola empuñadura para ambas voleas significa que no hay cambio en la red, donde no hay tiempo para uno.' }],
    phases: [
      {
        name: 'Posición de espera en la red',
        summary: 'Más alta que la espera de fondo: cabeza de la raqueta a la altura del mentón, manos al frente, peso adelante sobre la punta de los pies.',
        cues: ['Cabeza de la raqueta a la altura del mentón', 'Manos bien al frente', 'Peso en la punta de los pies'],
      },
      {
        name: 'Giro de hombros',
        summary: 'Los hombros giran y llevan la raqueta atrás, no más allá del hombro de atrás, punta arriba. El codo se queda delante del cuerpo.',
        cues: ['Gira, no hagas swing', 'La raqueta se detiene en el hombro', 'Codo delante del cuerpo'],
      },
      {
        name: 'Paso y contacto',
        summary: 'El pie izquierdo cruza hacia la pelota mientras la raqueta avanza. Contacto delante del hombro delantero, cabeza de la raqueta por encima de la muñeca, cara ligeramente abierta.',
        cues: ['Da el paso con el pie contrario', 'Contacto delante del hombro', 'Cabeza de la raqueta por encima de la muñeca'],
      },
      {
        name: 'Golpe seco a través',
        summary: 'Una terminación corta y firme hacia adelante y un poco hacia abajo; la raqueta recorre menos de medio metro después del contacto.',
        cues: ['Terminación corta y firme', 'Aprieta la empuñadura en el contacto', 'Las cuerdas terminan mirando al blanco'],
      },
      {
        name: 'Recupera hacia adelante',
        summary: 'Lleva la raqueta directo de vuelta a la posición de espera de red mientras avanzas para cerrar la red.',
        cues: ['Raqueta arriba de inmediato', 'Cierra un paso', 'Split step cuando el rival golpea'],
      },
    ],
    commonErrors: [
      { error: 'Hacer swing como en un golpe de fondo y tirar la pelota a la red.', fix: 'Practica voleas con la espalda contra una cerca para que la raqueta no pueda ir hacia atrás.' },
      { error: 'La cabeza de la raqueta cae por debajo de la muñeca en pelotas bajas.', fix: 'Flexiona las rodillas para bajar, mantén la cabeza de la raqueta al nivel de la muñeca o por encima.' },
      { error: 'Dar el paso con el pie del mismo lado.', fix: 'Di «pie izquierdo» en voz alta en cada volea de derecha hasta que el paso cruzado sea automático.' },
    ],
    drills: [
      'Voleas en la cerca: párate con la espalda a la cerca y volea los lanzamientos suaves de un compañero.',
      'Ejercicio de atrapar: sin raqueta, atrapa los lanzamientos delante del hombro con un paso cruzado.',
      'Volea-volea: dos jugadores en las líneas de saque manteniendo un peloteo sin bote.',
    ],
  },

  'backhand-volley': {
    name: 'Volea de revés',
    tagline: 'Una mano, una muñeca firme y la mano izquierda tirando hacia el otro lado.',
    description:
      'Incluso la mayoría de los jugadores de revés a dos manos volea el revés con una mano: el alcance es mayor y la raqueta es más fácil de mantener por encima de la muñeca. La mano izquierda sostiene el corazón durante el giro y suelta cuando la raqueta avanza, moviéndose hacia atrás para equilibrar el cuerpo y mantener los hombros de lado. El pie derecho cruza, y el contacto ocurre delante del hombro delantero con la cabeza de la raqueta arriba y la cara ligeramente abierta.',
    grips: [{ id: 'continental', note: 'Bisel 2. Los nudillos miran al blanco en el contacto.' }],
    phases: [
      {
        name: 'Posición de espera en la red',
        summary: 'Cabeza de la raqueta a la altura del mentón, mano izquierda acunando el corazón, peso en la punta de los pies.',
        cues: ['Raqueta arriba', 'Mano izquierda en el corazón', 'Puntas de los pies, no talones'],
      },
      {
        name: 'Giro de hombros',
        summary: 'Los hombros giran a la izquierda con ambas manos aún en la raqueta; la raqueta se coloca junto al hombro izquierdo, punta arriba.',
        cues: ['Ambas manos la llevan atrás', 'Raqueta junto al hombro, no más allá', 'Nudillos hacia la red'],
      },
      {
        name: 'Paso y contacto',
        summary: 'Pie derecho cruza, la mano izquierda suelta y va hacia atrás, la raqueta avanza para encontrar la pelota delante del hombro delantero.',
        cues: ['El pie derecho cruza', 'La mano izquierda suelta y va hacia atrás', 'Contacto adelante, cabeza por encima de la muñeca'],
      },
      {
        name: 'Golpe seco a través',
        summary: 'Terminación corta hacia adelante y ligeramente hacia abajo, muñeca firme, los dos brazos separándose.',
        cues: ['Muñeca firme', 'Los brazos se separan', 'Terminación corta'],
      },
      {
        name: 'Recupera hacia adelante',
        summary: 'Ambas manos de vuelta en la raqueta, raqueta arriba otra vez, un paso más cerca de la red.',
        cues: ['Primero la raqueta arriba', 'Cierra la red', 'Split step'],
      },
    ],
    commonErrors: [
      { error: 'La mano izquierda se queda en la raqueta y la volea se convierte en un empujón a dos manos sin alcance.', fix: 'Suelta la mano izquierda cuando la raqueta empieza a avanzar; siente cómo se mueve hacia atrás.' },
      { error: 'La muñeca latiguea y la pelota flota.', fix: 'Aprieta la empuñadura justo antes del contacto; la cara de la raqueta no debería cambiar de ángulo durante el golpe.' },
    ],
    drills: [
      'Simula la volea con la mano izquierda sosteniendo una pelota: la pelota debe moverse hacia atrás mientras la raqueta avanza.',
      'Voleas alternas: el compañero lanza derecha, revés, derecha; tú cruzas el paso cada vez.',
    ],
  },

  'swing-volley': {
    name: 'Volea con swing',
    aka: 'Volea liftada / drive volley',
    tagline: 'Una derecha completa con topspin tomada en el aire sobre una pelota flotada, mientras avanzas.',
    description:
      'Cuando un rival flota una pelota alta y lenta, la volea con swing te permite tomarla en el aire cerca de la línea de saque con un swing completo de golpe de fondo en lugar de esperar el bote. Es una derecha con una preparación ligeramente abreviada, contacto a la altura del pecho delante del cuerpo y el impulso llevándote hacia adelante a la red. Como no hay bote que leer, el timing viene del giro de hombros: gira temprano, espera, luego libera.',
    grips: [
      { id: 'semi-western', note: 'Tu empuñadura normal de derecha: esto es un golpe de fondo pegado en el aire, no una volea.' },
    ],
    phases: [
      {
        name: 'Lee y avanza',
        summary: 'Reconoce la pelota flotada temprano y avanza con los hombros ya girando, raqueta colocada alta.',
        cues: ['Decide temprano', 'Avanza mientras giras', 'Raqueta colocada a la altura del hombro'],
      },
      {
        name: 'Preparación compacta',
        summary: 'Más corta que una derecha de fondo pero con giro completo de hombros; el brazo izquierdo señala cruzado para equilibrar.',
        cues: ['Preparación más corta, mismo giro de hombros', 'Manos altas', 'Quédate en la punta de los pies'],
      },
      {
        name: 'Caída y retraso',
        summary: 'La raqueta cae por debajo de la pelota mientras las caderas se abren; la trayectoria del swing es más plana que en un golpe de fondo porque la pelota ya está alta.',
        cues: ['Las caderas guían', 'Baja la raqueta solo un poco por debajo de la pelota', 'Trayectoria más plana'],
      },
      {
        name: 'Contacto',
        summary: 'Contacto a la altura del pecho bien adelante, peso avanzando sobre el pie delantero, raqueta acelerando a través de la pelota.',
        cues: ['Contacto entre el pecho y el hombro', 'Atraviesa, no levantes', 'Peso hacia el golpe'],
      },
      {
        name: 'Terminación y cierre',
        summary: 'Terminación en limpiaparabrisas sobre el hombro izquierdo mientras el pie de atrás pasa hacia adelante, llevándote a la red para la siguiente pelota.',
        cues: ['Termina sobre el hombro', 'El impulso te lleva hacia adelante', 'Listo en la red de inmediato'],
      },
    ],
    commonErrors: [
      { error: 'Mal timing: golpear tarde porque la pelota nunca se frenó con un bote.', fix: 'Practica con lanzamientos suaves y altos; di «gira» cuando la pelota sale de la mano del lanzador, «golpe» en el contacto.' },
      { error: 'Pegarle de más a una pelota que solo necesita colocarse.', fix: 'Apunta a la cancha abierta con el 70 por ciento de potencia; la colocación gana el punto, no la velocidad.' },
    ],
    drills: [
      'Lanzamientos altos y flotados desde la línea de fondo contraria; toma cada uno en el aire desde la línea de saque hacia una esquina.',
      'Subida y swing: pega una subida, avanza, volea con swing la respuesta flotada y termina con una volea.',
    ],
  },

  smash: {
    name: 'Remate (smash)',
    tagline: 'Un saque abreviado pegado en movimiento. Gira de lado, señala la pelota, colócate detrás y luego lanza.',
    description:
      'El smash es un saque en el que el lanzamiento se reemplaza por el globo del rival, así que la parte difícil es el juego de pies: gira de lado de inmediato, da un paso atrás con el pie derecho y ajusta con pasos laterales hasta que la pelota te caería en la cabeza. La mano izquierda señala la pelota para seguirla y mantener los hombros de lado; la raqueta sube directo a la posición de trofeo con una preparación acortada. Luego es un saque: las piernas impulsan, la raqueta cae, extensión completa, pronación y aterrizaje hacia adelante.',
    grips: [{ id: 'continental', note: 'Bisel 2, como en el saque. Te permite pronar y angular el smash.' }],
    phases: [
      {
        name: 'Gira y señala',
        summary: 'En cuanto lees el globo: el pie derecho retrocede, hombros de lado, raqueta directo arriba al trofeo, mano izquierda señalando la pelota.',
        cues: ['Paso atrás con el pie derecho', 'Raqueta directo arriba, sin gran bucle', 'Señala la pelota con la mano izquierda'],
      },
      {
        name: 'Sigue y ajusta',
        summary: 'Pequeños pasos laterales mantienen la pelota ligeramente delante del hombro que golpea mientras el brazo que señala y la raqueta se mantienen colocados.',
        cues: ['Pasos laterales, quédate de lado', 'Pelota delante del hombro que golpea', 'Quédate en la punta de los pies'],
      },
      {
        name: 'Caída de la raqueta',
        summary: 'Las piernas se flexionan e impulsan mientras la raqueta cae detrás de la espalda; el brazo que señala empieza a recogerse.',
        cues: ['Las piernas impulsan', 'La raqueta cae, el codo guía', 'Cabeza arriba, en la pelota'],
      },
      {
        name: 'Contacto',
        summary: 'Extensión completa, contacto delante y por encima del hombro que golpea, la muñeca latigueando la cara de la raqueta hacia abajo sobre la pelota.',
        cues: ['Estírate hacia arriba', 'Contacto adelante', 'Latiguea la cara hacia abajo a través de la pelota'],
      },
      {
        name: 'Prona y aterriza',
        summary: 'El antebrazo prona, la raqueta termina en el lado izquierdo, el cuerpo aterriza hacia adelante y recupera a la red.',
        cues: ['Prona', 'Aterriza hacia adelante', 'De vuelta a la espera de red'],
      },
    ],
    commonErrors: [
      { error: 'La pelota se te queda detrás y la pegas a la red o larga.', fix: 'El primer movimiento es siempre el paso atrás; colócate detrás de la pelota y luego avanza hacia ella.' },
      { error: 'De frente a la red con empuñadura de derecha, manoteando la pelota.', fix: 'Gira de lado y usa la empuñadura continental; un smash es un saque.' },
      { error: 'Mirar el blanco en vez de la pelota.', fix: 'Señala la pelota con la mano izquierda y mantén la cabeza arriba hasta después del contacto.' },
    ],
    drills: [
      'Ejercicio de señalar: el compañero tira globos, tú giras, señalas y atrapas la pelota con la mano izquierda en máxima extensión.',
      'Smash en sombra desde la posición de trofeo, luego globos reales con lanzamientos cada vez más profundos.',
      'Smash y recupera: remata, toca la red con la raqueta, split step, siguiente globo.',
    ],
  },

  // ------------------------------------------------------------- especialidad
  'drop-shot': {
    name: 'Dejada',
    tagline: 'La misma preparación que el slice, y luego quítale la velocidad. El disimulo es todo el golpe.',
    description:
      'Una dejada es un slice pegado con la suavidad suficiente para botar dos veces antes de la línea de saque. La preparación debe verse idéntica a un slice normal o a una subida, hasta el swing hacia adelante. Luego la raqueta desacelera hacia el contacto, la cara se abre más y la terminación es corta, absorbiendo velocidad en lugar de añadirla. Pégala desde dentro de la línea de fondo, cuando el rival está atrás o cansado, y nunca desde una posición defensiva.',
    grips: [{ id: 'continental', note: 'Bisel 2, sostenida con suavidad para que la mano pueda absorber la pelota.' }],
    phases: [
      {
        name: 'Disimulo',
        summary: 'Todo parece un slice o un golpe de subida: mismo giro, misma preparación alta, misma transferencia de peso.',
        cues: ['Preparación idéntica', 'Avanza como si fueras a atacar', 'Los ojos nunca en el blanco'],
      },
      {
        name: 'Suaviza la mano',
        summary: 'Cuando la raqueta avanza la empuñadura se afloja y la raqueta se frena. La cara se abre más que para un slice.',
        cues: ['La presión de la empuñadura baja a 2 sobre 10', 'La raqueta desacelera', 'La cara se abre'],
      },
      {
        name: 'Contacto de toque',
        summary: 'La pelota se atrapa más que se golpea; las cuerdas la acunan con mucho efecto cortado para que muera después del bote.',
        cues: ['Atrápala en las cuerdas', 'Cepilla por debajo de la pelota', 'Apunta a pasar la red por un metro'],
      },
      {
        name: 'Terminación corta',
        summary: 'Terminación corta con la cara todavía abierta, luego avanza para cubrir la respuesta.',
        cues: ['Terminación corta', 'Sigue el golpe hacia la red', 'Espera un globo o una contradejada'],
      },
    ],
    commonErrors: [
      { error: 'Telegrafiada: el rival la lee y esprinta.', fix: 'Graba tu slice y tu dejada uno junto al otro hasta que el primer metro del swing sea idéntico.' },
      { error: 'Demasiado larga, se queda alta en la línea de saque.', fix: 'Haz que la red sea el punto más alto del arco; añade efecto cortado en vez de levantar.' },
    ],
    drills: [
      'Slice o dejada: un compañero lanza, tú alternas al azar; él debe adivinar antes del bote.',
      'Blanco de dos botes: mete diez dejadas que boten dos veces antes de la línea de saque.',
    ],
  },

  'back-smash': {
    name: 'Smash de revés',
    aka: 'Remate de revés',
    tagline: 'El remate de emergencia. Espalda a la red, codo al cielo y un latigazo de muñeca.',
    description:
      'Cuando un globo pasa por encima del hombro izquierdo y no hay tiempo de rodearlo, el smash de revés es la respuesta. Gira hasta que tu espalda casi mire a la red, lleva la raqueta arriba junto a la oreja izquierda con el codo apuntando a la pelota, luego extiende el brazo y latiguea la muñeca para que la cara de la raqueta pase por encima de la pelota. La potencia viene del antebrazo y la muñeca, no del cuerpo, así que es un golpe de colocación: apunta a la cancha abierta o a un ángulo en lugar de intentar atravesar al rival.',
    grips: [
      { id: 'eastern-backhand', note: 'Bisel 1, o continental para más sensación. Los nudillos guían la raqueta por encima de la pelota.' },
    ],
    phases: [
      {
        name: 'Da la espalda',
        summary: 'El globo pasa sobre el hombro del revés; gira fuerte a la izquierda hasta que la espalda casi mire a la red, raqueta arriba junto a la oreja izquierda.',
        cues: ['Gira hasta el final', 'Raqueta arriba temprano', 'Pie izquierdo atrás, pie derecho cruzado'],
      },
      {
        name: 'Codo al cielo',
        summary: 'El codo apunta a la pelota con la cabeza de la raqueta colgando detrás de la espalda; la cara de golpeo mira hacia la cerca de atrás.',
        cues: ['Apunta el codo a la pelota', 'La raqueta cuelga detrás de la espalda', 'Mira la pelota por encima del hombro'],
      },
      {
        name: 'Extiende y latiguea',
        summary: 'El brazo se extiende recto hacia arriba y la muñeca latiguea para que los nudillos guíen la cara por encima de la pelota; contacto por encima y ligeramente detrás del hombro derecho.',
        cues: ['Endereza el brazo rápido', 'Los nudillos guían', 'Latiguea por encima de la pelota'],
      },
      {
        name: 'Terminación y vuelta',
        summary: 'La raqueta termina hacia el lado derecho, baja; el cuerpo se desenrolla y vuelve a mirar a la red.',
        cues: ['Terminación corta a la derecha', 'Desenróllate para mirar a la red', 'Recupera a la espera'],
      },
    ],
    commonErrors: [
      { error: 'No girar lo suficiente, así que la pelota se pega con un empujón plano y débil.', fix: 'Gira hasta que puedas ver la pelota por encima de tu hombro derecho; la espalda debe mirar a la red.' },
      { error: 'Intentar pegar fuerte con el cuerpo, perdiendo el timing.', fix: 'Pega al 60 por ciento con el latigazo de muñeca; apunta a la cancha abierta.' },
    ],
    drills: [
      'El compañero tira globos sobre el hombro izquierdo desde cerca; atrapa la pelota con la mano derecha por encima del hombro derecho para aprender el punto de contacto.',
      'Simula la posición de codo arriba y latiguea 20 veces, luego pega globos suaves.',
    ],
  },

  tweener: {
    name: 'Tweener',
    aka: 'El Gran Willy',
    tagline: 'Bautizado en honor a Guillermo Vilas. Espalda a la red, la pelota cayendo entre las piernas, la raqueta directo hacia abajo y a través.',
    description:
      'Cuando un globo te ha superado y ha botado detrás de ti, darte la vuelta cuesta demasiado tiempo: el tweener te permite golpearla mientras sigues corriendo alejándote de la red. Esprinta más allá de la pelota para que esté cayendo justo detrás y entre tus pies, planta con los pies anchos, sube la raqueta al frente y hazla bajar directo entre las piernas como un péndulo, con la cara apuntando de vuelta hacia la red. La muñeca latiguea en el punto más bajo y la pelota vuelve en globo. Vilas lo hizo famoso en los años 70; Federer, Kyrgios y Monfils lo convirtieron en un arma. Es un golpe de último recurso, y la alternativa, girar y tirar un globo, suele ser la jugada de mayor porcentaje.',
    grips: [{ id: 'continental', note: 'Bisel 2 para que la cara pueda abrirse hacia la red mientras la raqueta pasa entre las piernas.' }],
    phases: [
      {
        name: 'Persigue el globo',
        summary: 'Esprinta directo hacia atrás con los ojos en la pelota por encima del hombro. Corre más allá de donde va a caer la pelota, no hacia ella.',
        cues: ['Gira y esprinta, no corras de espaldas', 'Corre más allá del bote', 'Ojos en la pelota'],
      },
      {
        name: 'Planta y eleva',
        summary: 'Los pies aterrizan anchos con la pelota a punto de caer entre ellos. La raqueta sube directo al frente, punta al cielo.',
        cues: ['Base ancha', 'Pelota entre los pies', 'Raqueta arriba como un péndulo en su punto más alto'],
      },
      {
        name: 'Péndulo hacia abajo',
        summary: 'La raqueta baja directo delante del cuerpo y hacia atrás entre las piernas; la cara gira para apuntar hacia la red.',
        cues: ['Directo hacia abajo, sin bucle', 'La cara se abre hacia la red', 'Quédate bajo, pecho adelante'],
      },
      {
        name: 'Contacto y latigazo',
        summary: 'Contacto a la altura de la rodilla entre las piernas; la muñeca latiguea hacia arriba para que la pelota vuelva en globo por encima de la red.',
        cues: ['Contacto entre las rodillas', 'Latiguea hacia arriba con la muñeca', 'Flexiona las rodillas, no la espalda'],
      },
      {
        name: 'Gira y recupera',
        summary: 'Gira de vuelta hacia la red de inmediato; la respuesta llegará rápido.',
        cues: ['Gira enseguida', 'Recupera hacia adelante', 'Listo para una respuesta de smash'],
      },
    ],
    commonErrors: [
      { error: 'Pegar la pelota contra tus propias piernas.', fix: 'Corre más allá de la pelota; el contacto debe llegar cuando cae detrás de tus caderas, no delante.' },
      { error: 'Intentarlo cuando hay un globo normal disponible.', fix: 'Si puedes girar de lado y pegar un globo de revés, hazlo. El tweener es para cuando no hay tiempo.' },
    ],
    drills: [
      'Autolanzamiento: bota una pelota alta detrás de ti, déjala caer y pégala entre las piernas contra una cerca.',
      'El compañero tira globos desde la red por encima de tu cabeza; alterna un giro y globo con un tweener para sentir cuándo está disponible cada uno.',
    ],
  },

  // -------------------------------------------------------------- movimiento
  'split-step': {
    name: 'Split step y primer paso',
    tagline: 'Un pequeño salto que aterriza cuando el rival golpea. Convierte estar parado en estar en movimiento.',
    description:
      'El split step (paso de ajuste) es la base de todo el movimiento en tenis. Justo antes de que el rival golpee la pelota saltas unos centímetros del suelo y aterrizas sobre la punta de ambos pies, más ancho que los hombros, rodillas flexionadas. Aterrizar en el momento de su contacto significa que tus músculos ya están cargados cuando lees la pelota, y el primer paso explota desde el pie exterior. Sin él, cada pelota se siente un paso demasiado lejos.',
    grips: [],
    phases: [
      {
        name: 'Posición de espera',
        summary: 'Pies más abiertos que los hombros, rodillas flexionadas, peso adelante, raqueta al frente.',
        cues: ['Más ancho que los hombros', 'Peso en la punta de los pies', 'Raqueta arriba al frente'],
      },
      {
        name: 'El salto',
        summary: 'Un pequeño salto, solo unos centímetros, iniciado cuando el rival hace el swing hacia adelante.',
        cues: ['Salto pequeño, no un brinco', 'Empiézalo cuando él hace el swing', 'Quédate relajado'],
      },
      {
        name: 'Aterrizaje',
        summary: 'Aterriza sobre ambos pies, ancho y bajo, exactamente cuando el rival hace contacto. Es cuando lees la pelota.',
        cues: ['Aterriza cuando golpea', 'Ancho y bajo', 'Ojos en su punto de contacto'],
      },
      {
        name: 'Primer paso',
        summary: 'Impúlsate con el pie más alejado de la pelota y da el paso con el pie cercano hacia la pelota; los hombros empiezan a girar al mismo tiempo.',
        cues: ['Impúlsate con el pie lejano', 'Gira los hombros mientras das el paso', 'Quédate bajo'],
      },
      {
        name: 'Recupera',
        summary: 'Vuelve hacia el medio con pasos laterales y haz el split otra vez para la siguiente pelota.',
        cues: ['Pasos laterales, no camines', 'Mira a la red mientras te mueves', 'Split otra vez'],
      },
    ],
    commonErrors: [
      { error: 'Hacer el split demasiado pronto y quedarse quieto cuando llega la pelota.', fix: 'Salta cuando la raqueta del rival empieza a ir hacia adelante; aterriza en el contacto.' },
      { error: 'Saltar demasiado alto.', fix: 'Piensa en un saltito, no en un brinco; los pies apenas dejan el suelo.' },
    ],
    drills: [
      'El entrenador o compañero aplaude al azar; haz el split con el aplauso y esprinta dos pasos en la dirección que señale.',
      'Puntos en sombra: haz el split en cada contacto imaginado durante un minuto completo.',
    ],
  },

  shuffle: {
    name: 'Pasos laterales',
    tagline: 'El paso de recuperación. Los pies nunca se cruzan, las caderas se mantienen de frente a la red.',
    description:
      'Los pasos laterales son la forma de moverte distancias cortas a lo largo de la línea de fondo y de recuperar después de cada golpe. Los pies empujan y se deslizan de lado sin cruzarse, caderas y hombros siguen mirando a la red, y el peso se mantiene bajo sobre la punta de los pies. Es más lento que correr, pero te mantiene equilibrado y listo para cambiar de dirección en el instante en que el rival golpea.',
    grips: [],
    phases: [
      {
        name: 'Empuja y da el paso',
        summary: 'Impúlsate con el pie interior; el pie exterior da un paso de lado. La cabeza se mantiene nivelada.',
        cues: ['Empuja desde el pie interior', 'La cabeza se mantiene nivelada', 'Quédate bajo'],
      },
      {
        name: 'Junta, no cruces',
        summary: 'El pie que sigue se desliza hacia adentro pero nunca más allá del pie que guía. Las caderas siguen de frente a la red.',
        cues: ['Los pies nunca se cruzan', 'Caderas hacia la red', 'La raqueta se queda al frente'],
      },
      {
        name: 'Recupera de vuelta',
        summary: 'Invierte la dirección con el mismo empuje y deslizamiento de vuelta hacia el medio, terminando en un split step.',
        cues: ['Mismo ritmo de vuelta', 'Aterriza en la posición de espera', 'Split step al final'],
      },
    ],
    commonErrors: [
      { error: 'Rebotar arriba y abajo.', fix: 'Imagina un techo justo por encima de tu cabeza; muévete por debajo.' },
      { error: 'Los pies chocan entre sí o se cruzan.', fix: 'Mantén un puño de espacio entre los pies en el punto más cercano.' },
    ],
    drills: [
      'Pasos laterales en el pasillo: cruza el pasillo de dobles y vuelve 10 veces con pasos laterales, manteniéndote bajo.',
      'Pasos laterales y sombra: dos pasos laterales, simula una derecha, pasos laterales de vuelta, simula un revés.',
    ],
  },

  crossover: {
    name: 'Paso cruzado',
    tagline: 'Para la pelota abierta. Gira las caderas, cruza la pierna interior por delante y corre.',
    description:
      'Cuando la pelota está a más de un par de pasos laterales, el paso cruzado cubre terreno más rápido: las caderas giran hacia la pelota, el pie interior cruza por delante del pie exterior y corres la distancia restante antes de colocarte. La recuperación después de una pelota abierta normalmente también empieza con un paso cruzado, seguido de pasos laterales cuando estás cerca del medio. La habilidad está en las caderas: gíralas y las piernas siguen.',
    grips: [],
    phases: [
      {
        name: 'Gira las caderas',
        summary: 'Al salir del split step las caderas giran hacia la pelota y el pie exterior se abre en esa dirección.',
        cues: ['Caderas primero', 'El pie exterior se abre', 'Quédate bajo'],
      },
      {
        name: 'Paso cruzado',
        summary: 'El pie interior cruza por delante del pie exterior en un paso largo. La parte superior del cuerpo sigue mirando mayormente hacia la red.',
        cues: ['Cruza por delante, no por detrás', 'Paso largo', 'Raqueta arriba mientras corres'],
      },
      {
        name: 'Corre y colócate',
        summary: 'Una o dos zancadas de carrera, luego el pie exterior planta para preparar el golpe.',
        cues: ['Corre hacia la pelota', 'Planta el pie exterior', 'Carga la pierna exterior'],
      },
      {
        name: 'Recupera con paso cruzado y luego pasos laterales',
        summary: 'Impúlsate con el pie exterior, cruza hacia el medio, luego el último metro con pasos laterales y split.',
        cues: ['Impúlsate fuerte', 'Primero paso cruzado, pasos laterales al final', 'Split al final'],
      },
    ],
    commonErrors: [
      { error: 'Ir con pasos laterales a una pelota demasiado lejana y llegar tarde.', fix: 'Regla general: a más de dos pasos laterales, cruza.' },
      { error: 'Girar todo el cuerpo y perder de vista al rival.', fix: 'Gira las caderas, mantén el pecho y los ojos hacia la cancha.' },
    ],
    drills: [
      'Sprints a conos: desde la marca central, corre con paso cruzado a un cono en la línea lateral, simula un golpe, recupera con paso cruzado y luego pasos laterales. 8 por lado.',
      'Ejercicio de la araña con pasos cruzados a cada esquina.',
    ],
  },
}
