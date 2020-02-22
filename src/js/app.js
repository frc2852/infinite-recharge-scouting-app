import '../main.css';
import registerWorker from './functions/register-worker';
import connectionWatcher from './functions/connection-watcher';

registerWorker();
connectionWatcher();
