var utils;
(function (utils) {
    function randomIndexFromArray(array) {
        return Math.floor(Math.random() * array.length);
    }
    utils.randomIndexFromArray = randomIndexFromArray;
})(utils || (utils = {}));
///<reference path='./typings/lodash/lodash.d.ts' />
///<reference path='./utils.ts' />
var Annealing;
(function (Annealing) {
    function ifChange(energy, newEnergy, temperature) {
        // This solution is better. Use it
        if (newEnergy < energy) {
            return true;
        }
        // Choose if we are to use worse solution or not
        var random = Math.random();
        var probability = Math.pow(Math.E, ((energy - newEnergy) / temperature));
        return probability >= random;
    }
    function Solution(data) {
        var state = data.initState;
        var bestState = data.initState;
        var nowTemp = data.startingTemp;
        console.log("Starting optimization with state: ", state, " and startingTemp: ", data.startingTemp);
        while (nowTemp > data.stopTemp) {
            var newRandomState = data.neighbour(state);
            if (ifChange(data.energy(state), data.energy(newRandomState), nowTemp)) {
                state = newRandomState;
            }
            nowTemp = nowTemp * (1 - data.decreaseRate);
            // Keep track of the best solution found
            if (data.energy(state) < data.energy(bestState)) {
                bestState = state;
            }
        }
        console.log("Cooled down. Best solution so far: ", bestState, "with energy: ", data.energy(bestState));
        return bestState;
    }
    Annealing.Solution = Solution;
})(Annealing || (Annealing = {}));
var SampleAnnealingSolution;
(function (SampleAnnealingSolution) {
    var quadratic = {
        energy: function (x) {
            return Math.abs((110 + x) * (213 + x) * (245 + x) * (143 + x));
        },
        neighbour: function (data) {
            return data + _.sample([-3, -2, -1, 1, 2, 3]);
        },
        startingTemp: 40000,
        stopTemp: 0.4,
        decreaseRate: 0.03,
        initState: 0
    };
    console.log(Annealing.Solution(quadratic));
})(SampleAnnealingSolution || (SampleAnnealingSolution = {}));
//interface quadraticEquasion extends Problem {
//    fitness:(x1:number,x2:number)=>number
//}
//
//
//var quadraticEquasion:quadraticEquasion = {
//    fitness: function(){
//
//
//    }
//
//
//
//
//}
