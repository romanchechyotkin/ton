import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

message Subtraction {
    amount: Int as uint32;
}

contract FirstLesson with Deployable {
    
    counter: Int as uint32;
    id: Int as uint32;

    init(id: Int) {
        self.counter = 0;
        self.id = id;
    }

    receive("increment") {
        self.counter = self.counter + 1;
    }

    receive(msg: Add) {
        self.counter = self.counter + msg.amount;
    }

    receive(msg: Subtraction) {
        self.counter = self.counter - msg.amount;
    }

    receive("decrement") {
        self.counter = self.counter - 1;
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
}
