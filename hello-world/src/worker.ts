// @@@SNIPSTART nodejs-hello-worker
import { Worker } from '@temporalio/worker';
import path from 'path';
import * as activities from './activities';

run().catch((err) => console.log(err));

async function run() {
  // Automatically locate and register Activities and Workflows relative to __dirname
  // (assuming package was bootstrapped with `npm init @temporalio`).
  // Worker connects to localhost by default and uses console error for logging.
  // Customize the Worker by passing more options to create().
  // create() tries to connect to the server and will throw if a connection could not be established.
  // You may create multiple Workers in a single process in order to poll on multiple task queues.
  // In order to configure the server connection parameters and other global options,
  // use the Core.install() method to configure the Rust Core SDK singleton.
  const worker = await Worker.create({
    workflowsPath: path.join(__dirname, 'workflows'),
    nodeModulesPath: path.join(__dirname, '../node_modules'),
    activities,
    taskQueue: 'tutorial',
  });
  // Start accepting tasks on the `tutorial` queue
  await worker.run();
}
// @@@SNIPEND
