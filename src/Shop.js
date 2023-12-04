import initialRenders from "./core/initialRenders";
import listeners from "./core/listeners";
import observers from "./core/observers";

class Shop {
    init(){
        console.log("shop app start");
        observers();
        initialRenders();
        listeners();
    }
}

export default Shop;