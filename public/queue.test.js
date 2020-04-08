const Queue = require('./Nodbqueue');

beforeEach(() => {
    Queue.emptyQueue();     
});

test("one", ()=> {
    Queue.putInQueue("1", "black");
    expect(Queue.getCustomer("A")).toBe("1");
})

test("two same tag", ()=> {
    Queue.putInQueue("1", "black");
    Queue.putInQueue("2", "black");
    expect(Queue.getCustomer("B")).toBe("2");
})

test("two different tags, 1", ()=> {
    Queue.putInQueue("1", "white");
    Queue.putInQueue("2", "black");
    expect(Queue.getCustomer("A")).toBe("1");
    expect(Queue.getCustomer("B")).toBe("2");
})

test("two different tags, 2", ()=> {
    Queue.putInQueue("1", "black");
    Queue.putInQueue("2", "white");
    expect(Queue.getCustomer("A")).toBe("1");
    expect(Queue.getCustomer("A")).toBe("2");
})

test("test all", ()=> {
    Queue.putInQueue("1", "white");
    Queue.putInQueue("2", "white");
    Queue.putInQueue("3", "black");
    Queue.putInQueue("4", "black");
    expect(Queue.getCustomer("A")).toBe("1");
    expect(Queue.getCustomer("A")).toBe("2");
    expect(Queue.getCustomer("B")).toBe("3");
    expect(Queue.getCustomer("C")).toBe("4");
})

test("empty", ()=> {
    expect(Queue.getCustomer("A")).toBe("Empty");
    expect(Queue.getCustomer("B")).toBe("Empty");
})

test("availability", ()=> {
    expect(Queue.checkAvail("A")).toBe(true);
    expect(Queue.checkAvail("B")).toBe(true);
})

test("set availability false", ()=> {
    Queue.setBusy("A");
    expect(Queue.checkAvail("A")).toBe(false);
})

test("set availability true", ()=> {
    Queue.setBusy("A");
    Queue.setAvail("A")
    expect(Queue.checkAvail("A")).toBe(true);
})