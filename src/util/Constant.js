/**
 * Config file, referencing some env vars and constants
 * @author dassiorleando
 */
const Constant = {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
    MESSAGE_ENDPOINT: process.env.REACT_APP_MESSAGE_ENDPOINT,
    SOCKET_ENDPOINT: process.env.REACT_APP_SOCKET_ENDPOINT,
    CAPTCHA_CLIENT_KEY: process.env.REACT_APP_CAPTCHA_CLIENT_KEY,
    NATIONWIDE_RADIUS: 3000,
    ROUTE_CATMAP: {
        appliance: 'appliances',
        arts: 'Collectibles/Arts/',
        athleticwomen: 'Fashion/Women/Athletic',
        auto: 'auto',
        autoservice: 'autoservice',
        antiques: 'antiques',
        beauty: 'beauty',
        cell: 'cell',
        clothing: 'clothing',
        collectibles: 'collectibles',
        commutercar: 'Vehicles/Cars/Commuter',
        comequip: 'comequip',
        decorehome: 'Home/Decore/',
        furniture: 'furniture',
        furniturehome: 'Home/Furniture/',
        games: 'games',
        harleydavidsons: 'Vehicles/Motorcycles/Harley-Davidsons',
        homeservice: 'homeservice',
        housing: 'housing',
        importcar: 'Vehicles/Cars/Import',
        importtrucks: 'Vehicles/Trucks/Import',
        instruments: 'Collectibles/Instruments/',
        lowridestrucks: 'Vehicles/Trucks/Low-Rides',
        misc: 'misc',
        modernhome: 'Home/Modern/',
        modernmen: 'Fashion/Men/Modern',
        modernmotorcycles: 'Vehicles/Motorcycles/Modern',
        modernwomen: 'Fashion/Women/Modern',
        moto: 'moto',
        musclecar: 'Vehicles/Cars/Muscle',
        offroadtrucks: 'Vehicles/Trucks/Off-Road',
        offroadmotorcycles: 'Vehicles/Motorcycles/Off-Road',
        other: 'other',
        othercards: 'Collectibles/Cards/Others',
        otherfashion: 'Fashion/Others/',
        otherhome: 'Home/Other/',
        personalelectronics: 'Electronics/Personal-Electronics/',
        pokemoncards: 'Collectibles/Cards/Pokemon',
        rarevehicles: 'rarevehicles',
        records: 'Collectibles/Records/',
        sportscards: 'Collectibles/Cards/Sports',
        stereos: 'Electronics/Stereos/',
        videogames: 'Electronics/Video-Games/',
        vintage: 'vintage',
        vintagecar: 'Vehicles/Cars/Vintage',
        vintagehome: 'Home/Vintage/',
        vintageconsolegames: 'Electronics/Vintage-Console-Games/',
        vintageHome: 'vintageHome',
        vintagemen: 'Fashion/Men/Vintage',
        vintagemotorcycles: 'Vehicles/Motorcycles/Vintage',
        vintagewomen: 'Fashion/Women/Vintage',
        worktrucks: 'Vehicles/Trucks/Work',
        wrestlingcards: 'Collectibles/Cards/Wrestling',
        
    }
};

JSON.stringify(Constant.ROUTE_CATMAP, null, 2);



export default Constant;
