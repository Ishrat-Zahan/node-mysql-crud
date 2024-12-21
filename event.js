const School = require('./event2');

const school = new School();

school.startPeriod();

// Now emit the events
school.emit('bellRing');
school.emit('bellRing', 'second period ended');
