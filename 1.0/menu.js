// Librerias y paquetes
var moment = require('moment');
const prompt = require("prompt-sync")({sigint: true});


// Variables con las horas
var hora = moment().format('HH');
var hora_minuto = moment().format('LT');


// variable con numeros aleatorios
var num_random = Math.floor(Math.random() * 10);


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


// Crear arrays y objetos vacios para trabajarlos despues
let seleccion_desayuno = [];
let seleccion_PrecioDesayuno = [];
let seleccion_menu = {'principal':'', 'segundo':'', 'postre':''};
let seleccion_precio = {'principal':'', 'segundo':'', 'postre':''};


// Condicional para saber a que momento del dia corresponde la hora actual
if (hora >= 8 && hora < 12) {
    var momento_Actual = 'desayunos';
    var menu_disponible = platos['desayuno'];
    var PrecioMenu_disponible = platos_precios['desayuno'];
    var comentario_disponible = comentarios['desayuno'];
}
else if (hora >= 13 && hora < 16) {
    var momento_Actual = 'almuerzos';
    var menu_disponible = platos['no_desayuno'];
    var PrecioMenu_disponible = platos_precios['no_desayuno'];
    var comentario_disponible = comentarios['no_desayuno'];
}
else if (hora >= 20 && hora <= 23){
    var momento_Actual = 'cenas';
    var menu_disponible = platos['no_desayuno'];
    var PrecioMenu_disponible = platos_precios['no_desayuno'];
    var comentario_disponible = comentarios['no_desayuno'];
}
else {
    var momento_Actual = 'Cerrado';
    console.log('El restaurante BOTTEGA esta actualmente cerrado.\nNuestro horario de apertura es el siguiente:\n08:00 - 16:00 y 20:00 - 23:00');
}


// Presentacion inicial al usuario solo si esta en horario de apertura
if (momento_Actual != 'Cerrado') {
    console.log("Bienvenido/a al restaurante BOTTEGA");
    console.log(`Son las ${hora_minuto} y le ofrecemos un servicio de ${momento_Actual}`);
}



// Condicional para los cuatro estados posibles, desayuno, almuerzo, cena y local cerrado
if (momento_Actual === 'desayunos') {
    console.log(`Para comenzar a tomar su pedido debe elegir el tipo de desayuno de entre los siguientes disponibles:\n`);
    F_Desayuno();

    function F_Desayuno () {
        // Bucle para sacar las opciones disponibles con saltos de linea para que visualmente sea mas facil verlo
        menu_disponible.forEach((elemento) => {console.log(elemento);});

        F_SeleccionDesayuno();

        function F_SeleccionDesayuno() {
            // Seleccion por parte del usuario y añadirlo al array 'seleccion_desayuno'
            console.log('')
            let desayuno_seleccionado = prompt('Escriba el numero correspondiente a su seleccion: ');

            if (desayuno_seleccionado >= 1 && desayuno_seleccionado <= 4) {
                seleccion_desayuno.push(menu_disponible[desayuno_seleccionado - 1].replace(/[^a-zA-Z ]/g, ""));
                seleccion_PrecioDesayuno.push(PrecioMenu_disponible[desayuno_seleccionado - 1]);
                console.log(`\n${comentario_disponible[Math.floor(Math.random() * 10)]}`);
                console.log(`Su seleccion del desayuno ha sido: ${seleccion_desayuno[0]}, y su precio asciende a ${seleccion_PrecioDesayuno[0]}€\n`);
                F_AceptarDesayuno();
            } else {
                console.log('\nNo ha escrito correctamente el numero asociado al tipo de desayuno.\nDebe volver a escribirlo.');
                F_SeleccionDesayuno();
            }
        }
    }
 
    // Cambiar el desayuno
    function F_AceptarDesayuno () {
        let desayuno_aceptado = prompt('¿Es correcta su seleccion de desayuno? - Escriba si o no: ');
        
        if (desayuno_aceptado.toLowerCase() === 'no') {
            seleccion_desayuno = [];
            seleccion_PrecioDesayuno = [];
            console.log('\nSe va a modificar su seleccion de desayuno\n');
            F_Desayuno();
        } else if (desayuno_aceptado.toLowerCase() === 'si') {
            console.log(`\nSu desayuno ha sido registrado correctamente y se compone de ${seleccion_desayuno[0]}, con un precio total de ${seleccion_PrecioDesayuno[0]}€`);
        } else {
            console.log('\nEscriba su respuesta de forma correcta');
            F_AceptarDesayuno();
        }
    }



}
else if (momento_Actual === 'almuerzos' || momento_Actual === 'cenas') {
    console.log(`Para comenzar a tomar su pedido debe elegir el plato principal de entre los siguientes disponibles:\n`);

    F_SeleccionPrimerPlato();
    function F_SeleccionPrimerPlato () {
        // Bucle para sacar las opciones disponibles con saltos de linea para que visualmente sea mas facil verlo
        menu_disponible[0]['principal'].forEach((elemento) => {console.log(elemento);});

        // Seleccion por parte del usuario y añadirlo al array 'seleccion_menu'
        console.log('');
        let primer_plato = prompt('Escriba el numero correspondiente a su seleccion: ');

        if (primer_plato >=1 && primer_plato <= 4) {
            seleccion_menu['principal'] = (menu_disponible[0]['principal'][primer_plato - 1].replace(/[^a-zA-Z ]/g, ""));
            if (momento_Actual === 'cenas') {
                seleccion_precio['principal'] = (PrecioMenu_disponible[0]['principal'][primer_plato - 1] + (PrecioMenu_disponible[0]['principal'][primer_plato - 1]*(15/100)));
            } else {
                seleccion_precio['principal'] = (PrecioMenu_disponible[0]['principal'][primer_plato - 1]);
            }
            console.log(`\n${comentario_disponible[0]['principal'][Math.floor(Math.random() * 10)]}`);
            console.log(`Su seleccion del plato principal ha sido: ${seleccion_menu['principal']}, y su precio es de ${seleccion_precio['principal']}€\n`);
        } else {
            console.log('\nNo ha escrito correctamente el numero asociado al plato principal\nDebe volver a escribirlo.');
            F_SeleccionPrimerPlato();
        }
    }



    // Seleccion del segundo plato y añadirlo al array 'seleccion_menu'
    console.log(`Para continuar con su pedido debe elegir el segundo plato de entre los siguientes disponibles:\n`);

    F_SeleccionSegundoPlato();
    function F_SeleccionSegundoPlato() {
        // Bucle para sacar las opciones disponibles con saltos de linea para que visualmente sea mas facil verlo
        menu_disponible[1]['segundo'].forEach((elemento) => {console.log(elemento);});    

        console.log('');
        let segundo_plato = prompt('Escriba el numero correspondiente a su seleccion: ', '0');

        if(segundo_plato >=1 && segundo_plato <= 4) {
            seleccion_menu['segundo'] = (menu_disponible[1]['segundo'][segundo_plato - 1].replace(/[^a-zA-Z ]/g, ""));
            if (momento_Actual === 'cenas') {
                seleccion_precio['segundo'] = (PrecioMenu_disponible[1]['segundo'][segundo_plato - 1] + (PrecioMenu_disponible[1]['segundo'][segundo_plato - 1]*(15/100)));
            } else {
                seleccion_precio['segundo'] = (PrecioMenu_disponible[1]['segundo'][segundo_plato - 1]);
            }
            console.log(`\n${comentario_disponible[1]['segundo'][Math.floor(Math.random() * 10)]}`);
            console.log(`Su seleccion del segundo plato ha sido: ${seleccion_menu['segundo']}, y su precio es de ${seleccion_precio['segundo']}€\n`);
        } else {
            console.log('\nNo ha escrito correctamente el numero asociado al segundo plato\nDebe volver a escribirlo.');
            F_SeleccionSegundoPlato();
        }
    }



    // Seleccion del postre y añadirlo al array 'seleccion_menu'
    console.log(`Para finalizar con su pedido debe elegir el postre de entre los siguientes disponibles:\n`);

    F_SeleccionPostre();
    function F_SeleccionPostre() {   
        // Bucle para sacar las opciones disponibles con saltos de linea para que visualmente sea mas facil verlo
        menu_disponible[2]['postre'].forEach((elemento) => {console.log(elemento);});    
        
        console.log('');
        let postre = prompt('Escriba el numero correspondiente a su seleccion: ', '0');

        if (postre >=1 && postre <= 4) {
            seleccion_menu['postre'] = (menu_disponible[2]['postre'][postre - 1].replace(/[^a-zA-Z ]/g, ""));
            if (momento_Actual === 'cenas') {
                seleccion_precio['postre'] = (PrecioMenu_disponible[2]['postre'][postre - 1] + (PrecioMenu_disponible[2]['postre'][postre - 1]*(15/100)));
            } else {
                seleccion_precio['postre'] = (PrecioMenu_disponible[2]['postre'][postre - 1]);
            }
            console.log(`\n${comentario_disponible[2]['postre'][Math.floor(Math.random() * 10)]}`);            
            console.log(`Su seleccion del postre ha sido: ${seleccion_menu['postre']}, y su precio es de ${seleccion_precio['postre']}€\n`);
        } else {
            console.log('\nNo ha escrito correctamente el numero asociado al postre\nDebe volver a escribirlo.');
            F_SeleccionPostre();  
        }
    }


    // Resumen del pedido
    F_ResumenPedido();
    function F_ResumenPedido () {
        let totales = 0;
        for (let precios in seleccion_precio) {
            totales = totales + seleccion_precio[precios];
        }

        let pedido_actual = `Su comanda se compone de un primer plato de ${seleccion_menu['principal']} (${seleccion_precio['principal']}€),\nseguido de un segundo plato de ${seleccion_menu['segundo']} (${seleccion_precio['segundo']}€)\ny para finalizar un postre de ${seleccion_menu['postre']} (${seleccion_precio['postre']}€),\nesto hace un precio total de ${totales}€\n`;
        console.log(pedido_actual);
    }
    F_AceptarMenu();


    // Cambiar el menu
    function F_AceptarMenu () {
        let menu_aceptado = prompt('¿Es correcta su seleccion de menu? - Escriba si o no: ');
        
        if (menu_aceptado.toLowerCase() === 'no') {
            console.log('\nSe va a modificar su seleccion de Menu\n');

            F_CambiarMenu();
            function F_CambiarMenu () {
                i = 1;
                for (platos_cambiar in seleccion_menu){
                    console.log(i + '-' + seleccion_menu[platos_cambiar]);
                    i++;
                }
                        
                console.log('');    
                let cambiar_menu = prompt('¿Que numero de plato desea cambiar?');
                console.log('');

                if (cambiar_menu == 1) {
                    F_SeleccionPrimerPlato();
                    F_ResumenPedido()
                    F_AceptarMenu();
                } else if (cambiar_menu == 2) {
                    F_SeleccionSegundoPlato();
                    F_ResumenPedido()
                    F_AceptarMenu();
                } else if (cambiar_menu == 3) {
                    F_SeleccionPostre();
                    F_ResumenPedido()
                    F_AceptarMenu();
                } else {
                    console.log('No ha escrito correctamente el numero asociado al plato que desea cambiar\nDebe volver a escribir el numero correcto');
                    F_CambiarMenu();
                }
            }


        } else if (menu_aceptado.toLowerCase() === 'si') {
            console.log('\nSu menu ha sido registrado correctamente\nGracias por elegir restaurante BOTTEGA, deseamos que disfrute de su pedido y le volvamos a ver pronto\n¡Bon appetit!');
        } else {
            console.log('\nEscriba su respuesta de forma correcta');
            F_AceptarMenu();
        }
    }


}
else {
    // Restaurante fuera de horario de apertura
    // Se trabajan los mensajes de aviso en otra zona del codigo
}