const EventEmitter = require('events');

class School extends EventEmitter {

     startPeriod() {
        console.log('class started');
    
        this.on('bellRing', () => {  
            console.log(`chutttiiiiii because amar iccha`)
        });
    };

}


module.exports =  School;