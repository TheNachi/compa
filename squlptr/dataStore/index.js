import { AsyncStorage } from 'react-native';
class DataStore {

    store = AsyncStorage;

    save = (key, value) => {
        if (typeof(value) == "undefined") {
            this.store.setItem(key, "undefined");

        } else {
            this.store.setItem(key, JSON.stringify(value));
        }
    };

    delete = (key) => {
        this.store.removeItem(key);
    };

    get = (key) => {
        var value = this.store.getItem(key);
        if (value !== "undefined") {
            value = JSON.parse(value);
        } else {
            value = undefined;
        }

        return value;
    };

    clear = () => {
        this.store.clear();
    };
}

export default new DataStore();