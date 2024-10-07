import DIContainer from "@inversify/inversify.config"
import { TYPES } from "@inversify/types";
import App from "@provider/App";

const diContainer = DIContainer.getContainer();

const appInstance = diContainer.get<App>(TYPES.App);
appInstance.loadDatabase()
appInstance.loadServer();