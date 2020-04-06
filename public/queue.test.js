const Queue = require('./Nodbqueue');

beforeAll(() => {     
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