const dev = {
    url: "http://localhost:5000/",

    testCountDown: 1,
    test1:{
        duration: 20,
        reps: 4
    },
    test2:{
        duration: 3,
        reps: 2
    },
    startDiv: 0, // #######################################
    music: {
        controls: 2,
        duration: 5
    },
    minWidth: 980
};


const prod = {
    url: "https://elia-doumerc.herokuapp.com/",
    testCountDown: 5,
    test1:{
        duration: 14,
        reps: 14
    },
    test2:{
        duration: 14,
        reps: 14
    },
    startDiv: 0,
    music:{
        controls: 0,
        duration: 360
    },
    minWidth: 980
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;