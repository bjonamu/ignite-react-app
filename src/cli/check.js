// NOTE:  this file is intentionally written with es3

const Sniff = require('gluegun/sniff');
const which = require('which');

// check the node version
if (!Sniff.isNewEnough) {
  console.log(
    'Node.js 7.6+ is required to run. You have ' +
      Sniff.nodeVersion +
      '. Womp, womp.'
  );
  process.exit(1);
}

// // check for async and await
// if (!Sniff.hasAsyncAwait) {
//   console.log(
//     'The async feature is not available. Please ensure your Node is up to date.'
//   )
//   process.exit(2)
// }

// Quick n dirty dependency checking
// Saves us 0.350s on startup over full dependency checking
// cost: 0.010s
try {
  which.sync('create-react-app');
} catch (e) {
  console.log(
    'Missing create-react-app. Install with `npm i -g create-react-app` and try again.'
  );
  process.exit(3);
}
