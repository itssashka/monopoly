export let gamesList = {
    count: 10,
    pages: 1,
    current: {},
    games: [
        {
            title: "qwe",
            type: "public",
            id: 1,
            maxPlayers: 5,
            playersList: [
                {
                    name: "qwe",
                    photo: "./imgs/player_2.png",
                    id: 1,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe2",
            type: "public",
            id: 2,
            maxPlayers: 4,
            playersList: [
                {
                    name: "qwe2",
                    photo: "./imgs/player_2.png",
                    id: 2,
                    email: 'qwe@gmail.com',
                },
                {
                    name: "qwe9",
                    photo: "./imgs/player_2.png",
                    id: 9,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe3",
            type: "public",
            id: 3,
            maxPlayers: 6,
            playersList: [
                {
                    name: "qwe3",
                    photo: "./imgs/player_2.png",
                    id: 3,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe4",
            type: "public",
            id: 4,
            maxPlayers: 5,
            playersList: [
                {
                    name: "qwe4",
                    photo: "./imgs/player_2.png",
                    id: 4,
                    email: 'qwe@gmail.com',
                },
                {
                    name: "qwe10",
                    photo: "./imgs/player_2.png",
                    id: 10,
                    email: 'qwe@gmail.com',
                },
                {
                    name: "qwe11",
                    photo: "./imgs/player_2.png",
                    id: 11,
                    email: 'qwe@gmail.com',
                },
                {
                    name: "qwe12",
                    photo: "./imgs/player_2.png",
                    id: 12,
                    email: 'qwe@gmail.com',
                },
                {
                    name: "qwe13",
                    photo: "./imgs/player_2.png",
                    id: 13,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe5",
            type: "public",
            id: 5,
            maxPlayers: 3,
            playersList: [
                {
                    name: "qwe5",
                    photo: "./imgs/player_2.png",
                    id: 5,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qw6e",
            type: "public",
            id: 6,
            maxPlayers: 5,
            playersList: [
                {
                    name: "qwe6",
                    photo: "./imgs/player_2.png",
                    id: 6,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe64",
            type: "public",
            id: 7,
            maxPlayers: 6,
            playersList: [
                {
                    name: "qwe7",
                    photo: "./imgs/player_2.png",
                    id: 7,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe22",
            type: "public",
            id: 8,
            maxPlayers: 6,
            playersList: [
                {
                    name: "qwe8",
                    email: 'qwe@gmail.com',
                    photo: "./imgs/player_2.png",
                    id: 8,
                },
            ],
        },
    ],
    privateGames: [
        {
            title: "qwe",
            type: 'private',
            id: 1,
            maxPlayers: 5,
            gamePassword: 'asd',
            playersList: [
                {
                    name: "qwe",
                    photo: "./imgs/player_2.png",
                    id: 1,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe",
            type: 'private',
            id: 1,
            maxPlayers: 5,
            gamePassword: 'asd',
            playersList: [
                {
                    name: "qwe",
                    photo: "./imgs/player_2.png",
                    id: 1,
                    email: 'qwe@gmail.com',
                },
            ],
        },
        {
            title: "qwe",
            type: 'private',
            id: 1,
            maxPlayers: 5,
            gamePassword: 'asd',
            playersList: [
                {
                    name: "qwe",
                    photo: "./imgs/player_2.png",
                    id: 1,
                    email: 'qwe@gmail.com',
                },
            ],
        },
    ]
    
};


export const createGameSup = (gameInfo) => {
    const newGames = [...gamesList.games];
    const newCurrentGame = {
        title: gameInfo.title,
        id: new Date().getMilliseconds(),
        maxPlayers: gameInfo.maxPlayers,
        playersList: [currentPlayer]
    }
    newGames.push(newCurrentGame)

    gamesList = {
        ...gamesList,
        games: newGames,
        current: newCurrentGame
    }

    console.log(gamesList);
}

export let currentPlayer = {
    name: "qwe13",
    photo: "./imgs/player.png",
    id: 13,
    email: 'qwe@gmail.com',
};

export const joinGameSup = (id) => {
    let current = {};
    const newGames = gamesList.games.map(game => {
        if(game.id === id) {
            current = {
                ...game,
                playersList: [...game.playersList, currentPlayer]
            }
            return current
        }
        return game;
    })

    gamesList = {
        ...gamesList,
        games: newGames,
        current
    }
}

export const leftGameSup = (id) => {
    const newGames = gamesList.games.map(game => {
        if(game.id === id) {
            return {
                ...game,
                playersList: game.playersList.filter(player => player.id !== currentPlayer.id)
            }         
        }
        return game;
    })

    gamesList = {
        ...gamesList,
        games: newGames,
        current: {}
    }
}



export const loginReguser = (userData) => {
    currentPlayer = userData;
}


  
