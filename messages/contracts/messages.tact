import "@stdlib/deploy";

message Subtract {
    amount: Int as uint32;
}

message Add {
    amount: Int as uint32;
}

message MultiMath {
    add: Int as uint32;
    subtract: Int as uint32;
    multiply: Int as uint32;
}

contract Messages with Deployable {
    
    val: Int as int64;

    init() {
        self.val = 0;
    }

    receive(msg: Add) {
        self.val = self.val + msg.amount;
    }

    receive(msg: Subtract) {
        self.val = self.val - msg.amount;
    }

    receive(msg: MultiMath) {
        self.val = self.val + msg.add;
        self.val = self.val - msg.subtract;
        self.val = self.val * msg.multiply;
    }
}
