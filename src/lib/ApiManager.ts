import { isNil } from "../utils/Utils";
import NetworkManager from "./NetworkManager";

class ApiManager {
    private static instance: ApiManager;
    private REGISTER_API =
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

    private construcor() {
        /** */
    }

    public static getInstance() {
        if (isNil(this.instance)) {
            this.instance = new ApiManager();
        }
        return this.instance;
    }

    public async register(requestBody: Record<string, string>) {
        return await NetworkManager.request({
            method: "post",
            url: this.REGISTER_API,
            requestBody,
        });
    }
}

export default ApiManager.getInstance();
