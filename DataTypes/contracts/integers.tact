import "@stdlib/deploy";

contract integers with Deployable {
    
    // max size int257
    // max size uint256
    // full time alive
    i1: Int as int32;
    i2: Int as uint32;

    init() {
        self.i1 = 1;
        self.i2 = 2;
    }

    receive() {
        // temporally
        let int1: Int as uint32 = 1;
        let int2: Int as uint32 = 1;
        let i : Int as uint32 = 0;

        i = int1 + int2; // 2
        i = int1 - int2; // 0
        i = int1 * int2; // 1
        i = int1 / int2; // 1; 3001 / 3000 = 3 
        i = int1 % int2; // 0
     

    }
}
