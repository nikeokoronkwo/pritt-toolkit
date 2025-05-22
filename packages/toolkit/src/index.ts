import { AdapterResolve, AdapterResolveType, AdapterRequestObject, AdapterResult } from "./adapter";
import { CRSArchiveController, CRSDBController } from "./crs";
import { Config, PackageManager, PrittContext, PrittLocalConfigUnawareController, PrittLocalController, Workspace } from "./handler";



/**
 * A Pritt Adapter
 * 1. Split adapter into 
 *   - metadata
 *   - onRequest
 *   - onResolve and onRetrieve
*/
interface PrittAdapter {
    /**
     * The function called upon resolving of the adapter request.
     * @param res 
     * @returns 
     */
    resolve: (res: AdapterResolve) => AdapterResolveType;

    /**
     * The function called when a request is delegated to the given adapter.
     * @param req 
     * @param crs 
     * @returns 
     */
    metaRequest: (req: AdapterRequestObject, crs: CRSDBController) => Promise<AdapterResult> | AdapterResult;

    /**
     * Similar to {@link PrittAdapter.metaRequest}, but used for archive requests
     * @param req 
     * @param crs 
     * @returns 
     */
    archiveRequest: (req: AdapterResolve, crs: CRSArchiveController) => Promise<AdapterResult> | AdapterResult;
}

/**
 * A Pritt Handler for configuring workspace
 */
interface PrittHandler {
    packageManager?: PackageManager;

    /**
     * 
     * @param directory 
     * @param controller 
     * @returns 
     */
    onGetConfig: (directory: string, controller: PrittLocalConfigUnawareController) => Promise<Config | undefined> | (Config | undefined);

    onGetWorkspace: (directory: string, controller: PrittLocalController) => Promise<Workspace | undefined> | (Workspace | undefined);

    onConfigure: (context: PrittContext, controller: PrittLocalController) => Promise<any> | any;
}

/** Need to be able to do the following:
 * 1. Evaluate plugin on CLI side to get metadata
 * 2. Split plugin object into various parts to be run by runner
 * 3. Run parts on plugin side
 */
interface PrittPlugin {
    /** The id of the plugin */
    id: string;
    /** The name of the plugin */
    name: string;
    /** The description of the plugin */
    description?: string;
    /** The plugin's language */
    language?: string;
    /** The plugin's version. If not specified, deduced from the current (git) */
    version?: string;
    /** The adapter of the plugin */
    adapter: PrittAdapter;
    /** The handler of the plugin */
    handler: PrittHandler;
}



export function definePrittPlugin(plugin: PrittPlugin) {
    // more...

    return plugin;
}

export function definePrittAdapter(adapter: PrittAdapter) {
    // more...

    return adapter;
}

export function definePrittProjectHandler(handler: PrittHandler) {
    // more...

    return handler;
}

interface PrittBuiltAdapter {

}