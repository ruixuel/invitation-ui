import { isNil } from "../utils/Utils";
import axios, { Method } from "axios";

class NetworkManager {
    private static instance: NetworkManager;

    private construcor() {
        /** */
    }

    public static getInstance() {
        if (isNil(this.instance)) {
            this.instance = new NetworkManager();
        }
        return this.instance;
    }

    public async request({
        url = "",
        method = "post",
        requestBody = {},
        headers = { "Content-Type": "application/json" },
    }) {
        return new Promise((resolve, reject) => {
            axios({
                method: method as Method,
                url,
                headers,
                data: requestBody,
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }
}

export default NetworkManager.getInstance();
