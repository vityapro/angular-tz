import { StoreService } from "./store/data-access";
export function initServicesFactory( storeService: StoreService ) {
  return async () => {
    console.log('initServicesFactory - started');
    // await configService.loadConfiguration();
    console.log('initServicesFactory - completed');
  };
}
