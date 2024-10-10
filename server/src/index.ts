import DIContainer from "@inversify/inversify.config"
import { TYPES } from "@inversify/types";
import App from "@provider/App";

const appInstance = DIContainer.getContainer().get<App>(TYPES.App);

appInstance.loadDatabase()
appInstance.loadServer();