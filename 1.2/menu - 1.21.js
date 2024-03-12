// Librerias y paquetes
const moment = require('moment');
const prompt = require('cli-prompt');


// funcion para los prompt asincronos
function hacerPregunta(pregunta) {
    return new Promise((resolve, reject) => {
        prompt(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
  }


comenzarInteraccion();
async function comenzarInteraccion() {

    // Variables con las horas
    const hora = moment().format('HH');
    const hora_minuto = moment().format('LT');

    // variable con numeros aleatorios - Se puede hacer añadiendo todo de golpe en una variable (Linea 10) como con una funcion (Lineas desde 11 hasta 16)
    //const num_random = Math.floor(Math.random() * 10);
    function F_num_random() {
        let num_random = Math.random();
        num_random = num_random * 10;
        num_random = Math.floor(num_random);
        return num_random;
    }

    // Menu completo en un objeto con arrays y otros objetos anidados
    const platos = {
        'desayuno':['1-Zumo de naranja, cafe con leche y bolleria',
                '2-Zumo de naranja y batido de frutas',
                '3-Cafe con leche y huevos escalfados con jamon',
                '4-Cafe con leche y tostada con tomate y jamon'],
        'no_desayuno':[{
            'principal':['1-Ensalada de marisco',
                        '2-Menestra de verduras',
                        '3-Pulpo al estilo tradicional gallego',
                        '4-Alcachofas confitadas sobre ajoblanco y taquitos de jamon']},{
            'segundo':['1-Solomillo al roquefort',
                        '2-Carrillera Iberica al Vino Tinto',
                        '3-Merluza en salsa verde',
                        '4-Chipirones en su tinta']},{
            'postre':['1-Pantxineta al estilo tradicional',
                    '2-Milhojas con crema pastelera y nata',
                    '3-Mousse de queso con frambuesa',
                    '4-Cuajada de leche de Oveja con Miel']
        }]
    }

    // Precios de cada uno de los platos o desayunos disponibles
    const platos_precios = {
        'desayuno':[5, 8, 10, 8],
        'no_desayuno':[{
            'principal':[15, 10, 18, 12]},{
            'segundo':[18, 15, 16, 12]},{
            'postre':[8, 7, 5, 4]
        }]
    }

    // Comentarios de la camarera hacia los desayunos y menus
    const comentarios = {
        'desayuno':['Esa elección es una delicia para comenzar el día',
                'Eso sí que es empezar con energía por la mañana',
                'Que forma más sabrosa de despertar tus papilas gustativas',
                'Esa combinación es perfecta para un desayuno equilibrado',
                'Se ve que sabes cómo disfrutar de un buen desayuno',
                'Esa opción es siempre una apuesta segura para empezar bien el día',
                'Con esa elección, definitivamente vas a tener un desayuno de reyes',
                'Qué bueno es empezar el día con algo tan apetitoso',
                'Esa elección tiene todos los ingredientes necesarios para un desayuno perfecto',
                'No hay mejor manera de comenzar el día que con algo tan delicioso'],
        'no_desayuno':[{
            'principal':['Excelente elección! Es uno de nuestros platos más populares',
                        'Buena elección! ¡Te garantizo que quedarás satisfecho con este plato',
                        'Oh, ese plato es una delicia! ¡Te va a encantar',
                        'Me encanta tu elección! Este plato es una excelente opción',
                        'Genial elección! Este plato es una verdadera maravilla',
                        'Perfecto! Este plato es simplemente delicioso',
                        'Ese plato es una excelente elección! ¡Te va a sorprender lo delicioso que es',
                        'Interesante elección! Este plato es realmente exquisito',
                        'Ese plato es una opción fantástica! ¡Te va a encantar',
                        'Estupenda elección! Este plato es una explosión de sabores']},{
            'segundo':['Esa elección es una excelente combinación de sabores',
                    'Es una opción muy popular entre nuestros clientes',
                    'Esa elección siempre se ve tan deliciosa en el plato',
                    'Definitivamente es una buena elección',
                    'Ese plato siempre es una apuesta segura',
                    'Esa elección siempre deja a los clientes satisfechos',
                    'Es una opción tan tentadora',
                    'Esa elección siempre se ve tan bien presentada',
                    'No te arrepentirás de haber elegido ese plato',
                    'Esa elección es sin duda una delicia para el paladar']},{
            'postre':['Buena elección! Ese es uno de nuestros favoritos aquí',
                    'Ese postre es una delicia, estoy segura de que te va a encantar', 
                    'Oh, ese postre siempre es una apuesta segura para satisfacer tu antojo de dulce', 
                    'Delicioso! Recomiendo ese postre a todos los que buscan algo dulce', 
                    'Una elección clásica que nunca decepciona',
                    'Ese postre es nuestra especialidad, ¡no te arrepentirás de haberlo elegido',
                    'Excelente elección! Es el postre perfecto para terminar tu comida con un toque dulce',
                    'Buena decisión! Este postre seguramente te hará sentir como si estuvieras en el cielo',
                    'Hmm, ese postre es una delicia irresistible, estoy segura de que lo disfrutarás',
                    'Estoy segura de que ese postre será el punto culminante de tu cena']
        }]
    }

    // Crear variables, arrays y objetos vacios para trabajarlos despues
    let seleccion_menu = {'principal':'', 'segundo':'', 'postre':'', 'desayuno':''};
    let seleccion_precio = {'principal':'', 'segundo':'', 'postre':'', 'desayuno':''};
    let momento_Actual = '';
    let menu_disponible = '';
    let PrecioMenu_disponible = '';
    let comentario_disponible = '';

    // Condicional para saber a que momento del dia corresponde la hora actual
    if (hora >= 8 && hora <= 12) {
        momento_Actual = 'desayunos';
        menu_disponible = platos['desayuno'];
        PrecioMenu_disponible = platos_precios['desayuno'];
        comentario_disponible = comentarios['desayuno'];
    } else if (hora >= 13 && hora < 16) {
        momento_Actual = 'almuerzos';
        menu_disponible = platos['no_desayuno'];
        PrecioMenu_disponible = platos_precios['no_desayuno'];
        comentario_disponible = comentarios['no_desayuno'];
    } else if (hora >= 20 && hora <= 23){
        momento_Actual = 'cenas';
        menu_disponible = platos['no_desayuno'];
        PrecioMenu_disponible = platos_precios['no_desayuno'];
        comentario_disponible = comentarios['no_desayuno'];
    }
    else {
        momento_Actual = 'Cerrado';
        console.log('El restaurante BOTTEGA esta actualmente cerrado.\nNuestro horario de apertura es el siguiente:\n08:00 - 16:00 y 20:00 - 23:00');
    }

    // Presentacion inicial al usuario solo si esta en horario de apertura
    if (momento_Actual != 'Cerrado') {
        console.log("Bienvenido/a al restaurante BOTTEGA");
        console.log(`Son las ${hora_minuto} y le ofrecemos un servicio de ${momento_Actual}`);
    }

    // condicional para hacer llamada a las funciones especificas de desayuno, almuerzo o cena
    F_llamadas();
    async function F_llamadas () {
        if (momento_Actual === 'desayunos') {
            console.log(`Para comenzar a tomar su pedido debe elegir el tipo de desayuno de entre los siguientes disponibles:\n`);
            F_SeleccionPlatos('', 'desayuno', 'desayuno', 'si');
        } else if (momento_Actual === 'almuerzos' || momento_Actual === 'cenas') {
            console.log(`Para comenzar a tomar su pedido debe elegir el plato principal de entre los siguientes disponibles:\n`);
            await F_SeleccionPlatos(0, 'principal', 'plato principal', 'no');

            console.log(`Para continuar con su pedido debe elegir el segundo plato de entre los siguientes disponibles:\n`);
            await F_SeleccionPlatos(1, 'segundo', 'segundo plato', 'no');

            console.log(`Para finalizar con su pedido debe elegir el postre de entre los siguientes disponibles:\n`);
            await F_SeleccionPlatos(2, 'postre', 'postre', 'no');

            await F_ResumenPedido();
        }
    }

    // Funcion con argumentos para la seleccion y guardado de informacion de los platos. Sirve tanto para menus completos como para desayunos
    async function F_SeleccionPlatos (i, posicionPlato, nombrePlato, desayuno) {
        this.i = i;
        this.posicionPlato = posicionPlato;
        this.nombrePlato = nombrePlato;
        this.desayuno = desayuno;

        // condicional para diferenciar entre almuerzo/cena y desayuno, ya que la info del desayuno esta menos anidada en los objetos 'platos',  'platos_precios' y 'comentarios'
        if (this.desayuno === 'no') {
            menu_disponible_ = menu_disponible[this.i][this.posicionPlato];
            PrecioMenu_disponible_ = PrecioMenu_disponible[this.i][this.posicionPlato];
            comentario_disponible_ = comentario_disponible[this.i][this.posicionPlato];
        } else {
            menu_disponible_ = menu_disponible;
            PrecioMenu_disponible_ = PrecioMenu_disponible;
            comentario_disponible_ = comentario_disponible;
        }

        // Bucle para sacar las opciones disponibles con saltos de linea para que visualmente sea mas facil verlo
        menu_disponible_.forEach((elemento) => {console.log(elemento);});

        // Seleccion por parte del usuario y añadir informacion al objeto 'seleccion_menu' y 'seleccion_precio'
        let plato = '';
        await F_inputPlato_1();
        async function F_inputPlato_1() {
            plato = await hacerPregunta('\nEscriba el numero correspondiente a su seleccion: ');

            if (plato >= 1 && plato <= 4){
                // entrada correcta
            } else {
                console.log(`\nNo ha escrito correctamente el numero asociado al ${this.nombrePlato}\nDebe volver a escribir el numero entre los cuatro disponibles\n`);
                await F_SeleccionPlatos(this.i, this.posicionPlato, this.nombrePlato, this.desayuno);
            }
        }

        if (plato >=1 && plato <= 4) {
            seleccion_menu[this.posicionPlato] = (menu_disponible_[plato - 1].replace(/[^a-zA-Z ]/g, ""));

            // condicional para que haya una diferencia de precio del 15% entre un almuerzo y una cena, siendo la misma carta de platos
            if (momento_Actual === 'cenas') {
                seleccion_precio[this.posicionPlato] = (PrecioMenu_disponible_[plato - 1] + (PrecioMenu_disponible_[plato - 1]*(15/100)));
            } else {
                seleccion_precio[this.posicionPlato] = (PrecioMenu_disponible_[plato - 1]);
            }

            console.log(`\n${comentario_disponible_[F_num_random()]}`); // Comentario aleatorio de la camarera

            // condicional para diferenciar entre menus y desayunos para dar un mensaje especifico de la eleccion
            if (this.desayuno === 'no') {
                console.log(`Su seleccion del ${this.nombrePlato} ha sido: ${seleccion_menu[this.posicionPlato]}, y su precio es de ${seleccion_precio[this.posicionPlato]}€\n`);
            } else {
                console.log(`Su desayuno ha sido registrado correctamente y se compone de ${seleccion_menu[this.posicionPlato]}, con un precio total de ${seleccion_precio[this.posicionPlato]}€\n`);
                F_AceptarMenu();
            }
        } else {
            //console.log(`\nNo ha escrito correctamente el numero asociado al ${this.nombrePlato}\nDebe volver a escribir el numero entre los cuatro disponibles\n`);
            //F_SeleccionPlatos(this.i, this.posicionPlato, this.nombrePlato, this.desayuno);
        }
    }

    // Resumen del pedido en el que se detalla cada uno de los platos junto con su precio individual y su precio total
    // Se usa un condicional para usar solo para almuerzos y cenas
    async function F_ResumenPedido () {
        if (momento_Actual != 'desayunos') {
                let totales = 0;
                for (let precios in seleccion_precio) {  // Bucle para hacer la suma de los tres platos que componen el objeto y obtener el precio total, no solo el individual
                    totales = totales + seleccion_precio[precios];
                    totales = Math.round(totales * 100) / 100;
                }

                let pedido_actual = `Su comanda se compone de un primer plato de ${seleccion_menu['principal']} (${seleccion_precio['principal']}€),\nseguido de un segundo plato de ${seleccion_menu['segundo']} (${seleccion_precio['segundo']}€)\ny para finalizar un postre de ${seleccion_menu['postre']} (${seleccion_precio['postre']}€),\nEsto hace un precio total de ${totales}€\n`;
                console.log(pedido_actual);
                F_AceptarMenu()
        }
    }

    // Dar la opcion al usuario de cambiar unos platos por otros
    async function F_AceptarMenu () {

        let menu_aceptado = '';
        await F_aceptarCambio();
        async function F_aceptarCambio() {
            menu_aceptado = await hacerPregunta('¿Es correcta su seleccion de pedido? - Escriba si o no: ');

            if (menu_aceptado.toLowerCase() === 'no' || menu_aceptado.toLowerCase() === 'si'){
                // entrada correcta
            } else {
                console.log('\nEscriba su respuesta de forma correcta\nDebe elegir entre si y no');
                await F_AceptarMenu();
            }

        if (menu_aceptado.toLowerCase() === 'no') {
            console.log('\nSe va a modificar su seleccion de pedido\n');

            F_CambiarMenu();
            async function F_CambiarMenu () {
                
                    // Bucle en el que muestra los tres platos seleccionados numerados para poder decidir el que se quiera cambiar
                    // Se añade condicional para diferenciar entre desayunos y cenas/almuerzos
                    if (momento_Actual != 'desayunos') {
                        let cambiar_menu = '';

                        await F_inputPlato_2();
                        async function F_inputPlato_2() {
                            i = 1;
                            for (platos_cambiar in seleccion_menu){
                                console.log(i + '-' + seleccion_menu[platos_cambiar]);
                                i++;
                                if (i == 4){ // se añade una condicional con 'break;' para que no aparezca el elemento especifico del desayuno del objeto, unicamente los tres primeros platos
                                    break;
                                }  
                            }

                            cambiar_menu = await hacerPregunta('\n¿Que numero de plato desea cambiar? ');
                            
                            if (cambiar_menu >= 1 && cambiar_menu <= 3){
                                // entrada correcta
                            } else {
                                console.log('\nNo ha escrito correctamente el numero asociado al plato que desea cambiar\nDebe volver a escribir el numero entre los tres disponibles\n');
                                await F_CambiarMenu();
                            }
                        }
                
            
                        // condicional para saber cual de los tres platos es el que el usuario desea cambiar y hace llamada a las funciones de dicho plato
                        if (cambiar_menu == 1) {
                            console.log('Se le muestra de nuevo los cuatro platos disponibles\n')
                            await F_SeleccionPlatos(0, 'principal', 'plato principal', 'no');
                            await F_ResumenPedido()
                        } else if (cambiar_menu == 2) {
                            console.log('Se le muestra de nuevo los cuatro platos disponibles\n')
                            await F_SeleccionPlatos(1, 'segundo', 'segundo plato', 'no');
                            await F_ResumenPedido()
                        } else if (cambiar_menu == 3) {
                            console.log('Se le muestra de nuevo los cuatro platos disponibles\n')
                            await F_SeleccionPlatos(2, 'postre', 'postre', 'no');
                            await F_ResumenPedido()
                        } else {
                            //console.log('No ha escrito correctamente el numero asociado al plato que desea cambiar\nDebe volver a escribir el numero entre los tres disponibles\n');
                            //F_CambiarMenu();
                        }
                    } else {
                        console.log('Se le muestra de nuevo los cuatro desayunos disponibles\n')
                        F_SeleccionPlatos('', 'desayuno', 'desayuno', 'si');
                    }   
                }
            } else if (menu_aceptado.toLowerCase() === 'si') {
                console.log('\nSu orden ha sido registrada correctamente\nGracias por elegir restaurante BOTTEGA, deseamos que disfrute de su pedido y le volvamos a ver pronto\n¡Bon appetit!');
            } else {
                //console.log('\nEscriba su respuesta de forma correcta\nDebe elegir entre si y no');
                //F_AceptarMenu();
            }
        }
    }
}
