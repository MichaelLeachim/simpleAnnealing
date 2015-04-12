## This is an implementation of simulated annealing in Typescript
It is described [here](http://vbifrkbvjd.github.io/DataMining).
How to try it:
```bash
   git clone https://github.com/VbifRkbvjd/simpleAnnealing
   google-chrome annealing.html
```
How to use it:
```typescript
///<reference path='./utils.ts' />
///<reference path='./annealing.ts' />
module SomeVerySimpleAnnealingProblem {
    // IProblem parameter is your data format. Like: number|string|number[]|string[] e.t.c
    var quadratic:Annealing.IProblem<number> = {
        energy:function(x:number):number{
            return Math.abs((110+x)*(213+x)*(245+x)*(143+x))
        },
        neighbour:function(data:number){
            return data + _.sample([-3,-2,-1,1,2,3])
        },
        startingTemp:40000,
        stopTemp:0.4,
        decreaseRate:0.03,
        initState:0
    }
    console.log(Annealing.Solution(quadratic))
}
```

