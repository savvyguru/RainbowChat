class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) { //add to back of queue
        return this.queue.unshift(item);
    }

    dequeue() { //remove from front of queue
        return this.queue.pop();
    }

    peek() { //returns item at front of queue
        return this.queue[this.length - 1];
    }

    get length() {
        return this.queue.length;
    }

    isEmpty() { //returns true if empty
        return this.queue.length === 0;
    }
}
const queue = [];
const allAgents = ["A", "B", "C"];
const avail = [true, true, true];

for (i = 0; i < allAgents.length; i++){
    queue[i] = new Queue();
}


function NoDBQueue(){

}

function findAgents(tag){
    var agents = [];
    if (tag == "black"){
        agents = ["A", "B", "C"];
    }
    if (tag == "white"){
        agents = ["A"];
    }
    return agents;
}

NoDBQueue.putInQueue = function(customerId, customerTag){ //put in shortest queue that matches the tag
    var agents = findAgents(customerTag);
    var queueIndex = [];
    for (i = 0; i < agents.length; i++){
        if (allAgents.includes(agents[i])){
            queueIndex.push(allAgents.indexOf(agents[i]));
        }
    }
    
    var queueLength = [];
    for (i = 0; i < queueIndex.length; i++){
        queueLength.push(queue[queueIndex[i]].length);
    }

    var minLength = Math.min(...queueLength);
    queue[queueIndex[queueLength.indexOf(minLength)]].enqueue(customerId);

    return queue;
}

NoDBQueue.getCustomer = function(agent){
    var index = allAgents.indexOf(agent);
    if (queue[index].isEmpty()){
        return "Empty";
    }
    var customer = queue[index].dequeue();

    return customer;
}

NoDBQueue.emptyQueue = function(){
    for (i = 0; i < allAgents.length; i++){
        queue[i] = new Queue();
    }
}

NoDBQueue.checkAvail = function(agent){
    var index = allAgents.indexOf(agent);
    return avail[index];
}

NoDBQueue.setBusy = function(agent){
    var index = allAgents.indexOf(agent);
    avail[index] = false;
}

NoDBQueue.setAvail = function(agent){
    var index = allAgents.indexOf(agent);
    avail[index] = true;
}

module.exports = NoDBQueue;



