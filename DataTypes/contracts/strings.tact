import "@stdlib/deploy";

contract Strings with Deployable {
    
    s1: String = "hello world";
    
    init() {
        let sb: StringBuilder = beginString();
        sb.append("         ");        
        sb.append(s1);        
        sb.append(" !!!! ");

        let s6L String = sb.toString();        
    }
}
